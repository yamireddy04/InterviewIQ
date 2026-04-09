from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from app.models.question import GenerateQuestionsRequest
from app.services.question_service import generate_questions
from app.services.groq_service import transcribe_audio
from app.database import get_db
from app.models.session import Session, SessionMode
from datetime import datetime
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
        db = get_db()
        await db.sessions.insert_one(session.model_dump())
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