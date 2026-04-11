from fastapi import APIRouter, HTTPException
from app.models.question import SimulateRequest
from app.services.evaluation_service import get_interviewer_response
from app.models.session import Answer
from app.database import get_db
from app.routers.reports import in_memory_sessions

router = APIRouter(prefix="/api/simulate", tags=["simulate"])

@router.post("/respond")
async def respond(request: SimulateRequest):
    try:
        response = await get_interviewer_response(
            request.question_text,
            request.answer_text,
            request.interviewer_style,
        )
        answer = Answer(question_id="sim", text=request.answer_text)

        if request.session_id in in_memory_sessions:
            session_data = in_memory_sessions[request.session_id]
            session_data.setdefault("answers", []).append(answer.model_dump())

        try:
            db = get_db()
            if db is not None:
                await db.sessions.update_one(
                    {"id": request.session_id},
                    {"$push": {"answers": answer.model_dump()}},
                )
        except Exception as db_error:
            print(f"DB save skipped: {db_error}")

        return {"response": response.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))