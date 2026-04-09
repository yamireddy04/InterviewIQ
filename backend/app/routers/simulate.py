from fastapi import APIRouter, HTTPException
from app.models.question import SimulateRequest
from app.services.evaluation_service import get_interviewer_response
from app.models.session import Answer
from app.database import get_db

router = APIRouter(prefix="/api/simulate", tags=["simulate"])

@router.post("/respond")
async def respond(request: SimulateRequest):
    try:
        response = await get_interviewer_response(request.question_text, request.answer_text, request.interviewer_style)
        db = get_db()
        answer = Answer(question_id=request.question_id if hasattr(request, 'question_id') else "q", text=request.answer_text)
        await db.sessions.update_one(
            {"id": request.session_id},
            {"$push": {"answers": answer.model_dump()}},
        )
        return {"response": response.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))