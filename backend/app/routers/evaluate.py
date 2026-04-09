from fastapi import APIRouter, HTTPException
from app.models.question import EvaluateAnswerRequest
from app.services.evaluation_service import evaluate_answer
from app.models.session import Answer
from app.database import get_db
from datetime import datetime

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
        db = get_db()
        answer = Answer(question_id=request.question_id, text=request.answer_text)
        await db.sessions.update_one(
            {"id": request.session_id},
            {"$push": {"answers": answer.model_dump(), "feedbacks": feedback.model_dump()}},
        )
        return feedback.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))