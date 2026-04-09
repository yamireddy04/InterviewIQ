from pydantic import BaseModel
from typing import List, Dict

class CategoryScore(BaseModel):
    technical_knowledge: float
    communication: float
    clarity: float
    confidence: float

class Report(BaseModel):
    session_id: str
    overall_score: float
    category_scores: CategoryScore
    weak_areas: List[str]
    recommended_topics: List[str]
    suggested_improvements: List[str]
    question_breakdown: List[Dict]
    total_questions: int
    completed_questions: int