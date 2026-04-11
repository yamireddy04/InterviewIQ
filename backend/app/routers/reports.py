from fastapi import APIRouter, HTTPException
from app.services.report_service import generate_report
from app.database import get_db
from app.models.session import Session, SessionMode, Question, Answer, Feedback, QuestionCategory, DifficultyLevel
from app.models.report import Report, CategoryScore
from datetime import datetime

router = APIRouter(prefix="/api/reports", tags=["reports"])

in_memory_sessions = {}
in_memory_reports = {}

@router.post("/generate/{session_id}")
async def generate(session_id: str):
    try:
        db = get_db()
        data = None

        if db is not None:
            data = await db.sessions.find_one({"id": session_id})
            if data:
                data.pop("_id", None)

        if not data and session_id in in_memory_sessions:
            data = in_memory_sessions[session_id]

        if not data:
            raise HTTPException(status_code=404, detail="Session not found")

        session = Session(**data)
        report = await generate_report(session)

        in_memory_reports[session_id] = report.model_dump()

        if db is not None:
            try:
                await db.sessions.update_one(
                    {"id": session_id},
                    {"$set": {"overall_score": report.overall_score, "completed_at": datetime.utcnow().isoformat()}},
                )
                await db.reports.insert_one(report.model_dump())
            except Exception as db_error:
                print(f"DB save skipped: {db_error}")

        return report.model_dump()
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sessions/all")
async def get_sessions():
    try:
        db = get_db()
        if db is not None:
            try:
                cursor = db.sessions.find(
                    {},
                    {"_id": 0, "questions": 0, "answers": 0, "feedbacks": 0}
                ).sort("created_at", -1).limit(20)
                sessions = await cursor.to_list(length=20)
                return {"sessions": sessions}
            except Exception as db_error:
                print(f"DB read skipped: {db_error}")
        return {"sessions": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{session_id}")
async def get_report(session_id: str):
    try:
        if session_id in in_memory_reports:
            return in_memory_reports[session_id]

        db = get_db()
        if db is not None:
            data = await db.reports.find_one({"session_id": session_id}, {"_id": 0})
            if data:
                return data

        raise HTTPException(status_code=404, detail="Report not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))