from groq import AsyncGroq
from app.config import settings
import json
import re

groq_client = AsyncGroq(api_key=settings.groq_api_key)

async def call_groq(prompt: str, model: str = "llama-3.3-70b-versatile", max_tokens: int = 2048, temperature: float = 0.7) -> str:
    response = await groq_client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=temperature,
    )
    return response.choices[0].message.content

async def call_groq_json(prompt: str, max_tokens: int = 2048) -> dict:
    raw = await call_groq(prompt, max_tokens=max_tokens, temperature=0.3)
    cleaned = re.sub(r"```json\s*|\s*```", "", raw).strip()
    return json.loads(cleaned)

async def transcribe_audio(audio_bytes: bytes, filename: str = "audio.webm") -> str:
    transcription = await groq_client.audio.transcriptions.create(
        file=(filename, audio_bytes, "audio/webm"),
        model="whisper-large-v3",
        language="en",
    )
    return transcription.text