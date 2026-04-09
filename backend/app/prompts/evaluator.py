def build_evaluation_prompt(question_text: str, category: str, difficulty: str, answer_text: str, job_role: str) -> str:
    return f"""You are an expert technical interviewer evaluating a candidate's answer.

Job Role: {job_role}
Question Category: {category}
Difficulty Level: {difficulty}
Question: {question_text}
Candidate's Answer: {answer_text}

Evaluate the answer and respond in this exact JSON format:

{{
  "correctness": "Correct|Partially Correct|Incorrect",
  "score": <integer 0-10>,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "ideal_answer": "A comprehensive ideal answer here",
  "suggestions": ["specific suggestion 1", "specific suggestion 2"]
}}

Scoring guide:
- 9-10: Exceptional, covers all aspects with depth
- 7-8: Good, covers main points with minor gaps
- 5-6: Adequate, covers basics but lacks depth
- 3-4: Below average, significant gaps
- 0-2: Poor or irrelevant answer

Be constructive and specific. Return ONLY valid JSON."""