from fastapi import APIRouter, HTTPException
from app.models.question import EvaluateAnswerRequest
from app.services.evaluation_service import evaluate_answer
from app.models.session import Answer
from app.database import get_db
from app.routers.reports import in_memory_sessions

router = APIRouter(prefix="/api/evaluate", tags=["evaluate"])

@router.post("/answer")
async def evaluate(request: EvaluateAnswerRequest):
    try:
        feedback = await evaluate_answer(
            request.question_id,
            request.question_text,
            request.question_category,
            request.question_difficulty,
            request.answer_text,
            request.job_role,
        )
        answer = Answer(question_id=request.question_id, text=request.answer_text)

        if request.session_id in in_memory_sessions:
            session_data = in_memory_sessions[request.session_id]
            session_data.setdefault("answers", []).append(answer.model_dump())
            session_data.setdefault("feedbacks", []).append(feedback.model_dump())

        try:
            db = get_db()
            if db is not None:
                await db.sessions.update_one(
                    {"id": request.session_id},
                    {"$push": {"answers": answer.model_dump(), "feedbacks": feedback.model_dump()}},
                )
        except Exception as db_error:
            print(f"DB save skipped: {db_error}")

        return feedback.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))