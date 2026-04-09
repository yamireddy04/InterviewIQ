export type Difficulty = "easy" | "medium" | "hard";
export type Category = "technical" | "behavioral" | "scenario";
export type Correctness = "Correct" | "Partially Correct" | "Incorrect";
export type Mode = "practice" | "simulation";

export interface Question {
  id: string;
  text: string;
  category: Category;
  difficulty: Difficulty;
  expected_topics: string[];
}

export interface Feedback {
  question_id: string;
  correctness: Correctness;
  score: number;
  strengths: string[];
  weaknesses: string[];
  ideal_answer: string;
  suggestions: string[];
}

export interface CategoryScore {
  technical_knowledge: number;
  communication: number;
  clarity: number;
  confidence: number;
}

export interface Report {
  session_id: string;
  overall_score: number;
  category_scores: CategoryScore;
  weak_areas: string[];
  recommended_topics: string[];
  suggested_improvements: string[];
  question_breakdown: QuestionBreakdown[];
  total_questions: number;
  completed_questions: number;
}

export interface QuestionBreakdown {
  question: string;
  category: Category;
  difficulty: Difficulty;
  answer: string;
  score: number;
  correctness: Correctness;
}

export interface Session {
  id: string;
  mode: Mode;
  job_role: string;
  job_description: string;
  created_at: string;
  completed_at?: string;
  overall_score?: number;
}
