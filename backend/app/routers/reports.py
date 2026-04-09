from fastapi import APIRouter, HTTPException
from app.services.report_service import generate_report
from app.database import get_db
from app.models.session import Session
from datetime import datetime

router = APIRouter(prefix="/api/reports", tags=["reports"])

@router.post("/generate/{session_id}")
async def generate(session_id: str):
    try:
        db = get_db()
        data = await db.sessions.find_one({"id": session_id})
        if not data:
            raise HTTPException(status_code=404, detail="Session not found")
        session = Session(**data)
        report = await generate_report(session)
        await db.sessions.update_one(
            {"id": session_id},
            {"$set": {"overall_score": report.overall_score, "completed_at": datetime.utcnow().isoformat()}},
        )
        await db.reports.insert_one(report.model_dump())
        return report.model_dump()
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{session_id}")
async def get_report(session_id: str):
    try:
        db = get_db()
        data = await db.reports.find_one({"session_id": session_id}, {"_id": 0})
        if not data:
            raise HTTPException(status_code=404, detail="Report not found")
        return data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sessions/all")
async def get_sessions():
    try:
        db = get_db()
        cursor = db.sessions.find({}, {"_id": 0, "questions": 0, "answers": 0, "feedbacks": 0}).sort("created_at", -1).limit(20)
        sessions = await cursor.to_list(length=20)
        return {"sessions": sessions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))