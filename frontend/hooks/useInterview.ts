import { useState } from "react";
import { Question, Feedback } from "@/types";

export function useInterview(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const next = () => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const addFeedback = (fb: Feedback) => {
    setFeedbacks((prev) => [...prev, fb]);
  };

  return { current, currentIndex, isLast, feedbacks, next, addFeedback };
}
