import { Question } from "@/types";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Props {
  question: Question;
  index: number;
  total: number;
}

export function QuestionCard({ question, index, total }: Props) {
  return (
    <Card className="border-accent/20 glow-accent animate-slide-up">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-gray-500">Question {index + 1} of {total}</span>
          <div className="flex items-center gap-2">
            <Badge text={question.category} type="category" />
            <Badge text={question.difficulty} type="difficulty" />
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-accent/40 to-transparent rounded-full mb-4" />
      </CardHeader>
      <p className="font-display text-xl leading-relaxed text-white">{question.text}</p>
      {question.expected_topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {question.expected_topics.map((t) => (
            <span key={t} className="text-xs bg-white/5 text-gray-500 px-2 py-0.5 rounded-md">{t}</span>
          ))}
        </div>
      )}
    </Card>
  );
}
