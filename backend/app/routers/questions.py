from fastapi import APIRouter, HTTPException, UploadFile, File
from app.models.question import GenerateQuestionsRequest
from app.services.question_service import generate_questions
from app.services.groq_service import transcribe_audio
from app.database import get_db
from app.models.session import Session, SessionMode
from app.routers.reports import in_memory_sessions
import uuid

router = APIRouter(prefix="/api/questions", tags=["questions"])

@router.post("/generate")
async def generate(request: GenerateQuestionsRequest):
    try:
        questions = await generate_questions(
            request.job_role,
            request.job_description,
            request.resume_text,
            request.num_technical,
            request.num_behavioral,
            request.num_scenario,
        )
        session_id = str(uuid.uuid4())
        session = Session(
            id=session_id,
            job_role=request.job_role,
            job_description=request.job_description,
            mode=SessionMode.practice,
            questions=questions,
        )
        session_data = session.model_dump()
        in_memory_sessions[session_id] = session_data

        try:
            db = get_db()
            if db is not None:
                await db.sessions.insert_one(session_data.copy())
        except Exception as db_error:
            print(f"DB save skipped: {db_error}")

        return {"session_id": session_id, "questions": [q.model_dump() for q in questions]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    try:
        audio_bytes = await audio.read()
        text = await transcribe_audio(audio_bytes, audio.filename or "audio.webm")
        return {"transcript": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))