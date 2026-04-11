from fastapi import APIRouter, HTTPException
from app.services.report_service import generate_report
from app.services.evaluation_service import evaluate_answer
from app.database import get_db
from app.models.session import Session, SessionMode, Feedback, Answer
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
            try:
                data = await db.sessions.find_one({"id": session_id})
                if data:
                    data.pop("_id", None)
            except Exception as db_err:
                print(f"DB read failed: {db_err}")

        if not data and session_id in in_memory_sessions:
            data = in_memory_sessions[session_id]

        if not data:
            raise HTTPException(status_code=404, detail="Session not found")

        session = Session(**data)

        if len(session.feedbacks) == 0 and len(session.answers) > 0:
            print(f"Simulation mode: evaluating {len(session.answers)} answers...")
            feedbacks = []
            questions = session.questions
            answers = session.answers

            for i, answer in enumerate(answers):
                if i < len(questions):
                    q = questions[i]
                else:
                    q = questions[-1] if questions else None

                if q:
                    try:
                        fb = await evaluate_answer(
                            question_id=q.id,
                            question_text=q.text,
                            category=str(q.category.value),
                            difficulty=str(q.difficulty.value),
                            answer_text=answer.text,
                            job_role=session.job_role,
                        )
                        feedbacks.append(fb)
                    except Exception as eval_err:
                        print(f"Eval error for Q{i}: {eval_err}")
                        feedbacks.append(Feedback(
                            question_id=q.id,
                            correctness="Partially Correct",
                            score=5,
                            strengths=["Answer provided"],
                            weaknesses=["Could not evaluate"],
                            ideal_answer="",
                            suggestions=[],
                        ))

            session.feedbacks = feedbacks

            if session_id in in_memory_sessions:
                in_memory_sessions[session_id]["feedbacks"] = [f.model_dump() for f in feedbacks]

        report = await generate_report(session)
        in_memory_reports[session_id] = report.model_dump()

        if db is not None:
            try:
                await db.sessions.update_one(
                    {"id": session_id},
                    {"$set": {
                        "overall_score": report.overall_score,
                        "completed_at": datetime.utcnow().isoformat(),
                        "feedbacks": [f.model_dump() for f in session.feedbacks],
                    }},
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
            try:
                data = await db.reports.find_one({"session_id": session_id}, {"_id": 0})
                if data:
                    return data
            except Exception as db_error:
                print(f"DB read skipped: {db_error}")

        raise HTTPException(status_code=404, detail="Report not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))