from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class DifficultyLevel(str, Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"

class QuestionCategory(str, Enum):
    technical = "technical"
    behavioral = "behavioral"
    scenario = "scenario"

class Question(BaseModel):
    id: str
    text: str
    category: QuestionCategory
    difficulty: DifficultyLevel
    expected_topics: List[str] = []

class Answer(BaseModel):
    question_id: str
    text: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Feedback(BaseModel):
    question_id: str
    correctness: str
    score: int
    strengths: List[str]
    weaknesses: List[str]
    ideal_answer: str
    suggestions: List[str]

class SessionMode(str, Enum):
    practice = "practice"
    simulation = "simulation"

class Session(BaseModel):
    id: Optional[str] = None
    user_id: str = "default"
    mode: SessionMode
    job_role: str
    job_description: str
    questions: List[Question] = []
    answers: List[Answer] = []
    feedbacks: List[Feedback] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    overall_score: Optional[float] = None