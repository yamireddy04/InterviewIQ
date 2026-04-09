import { Feedback } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge, Progress } from "@/components/ui/Badge";
import { CheckCircle2, XCircle, Lightbulb, TrendingUp } from "lucide-react";
import { scoreColor } from "@/lib/utils";

export function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
    <Card className="animate-slide-up space-y-5 border-white/8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge text={feedback.correctness} type="correctness" />
          <span className={`font-display text-2xl font-bold ${scoreColor(feedback.score)}`}>
            {feedback.score}<span className="text-sm font-normal text-gray-500">/10</span>
          </span>
        </div>
        <Progress value={feedback.score} className="w-32" />
      </div>

      {feedback.strengths.length > 0 && (
        <div>
          <p className="text-xs font-medium text-emerald-400 mb-2 flex items-center gap-1.5"><CheckCircle2 size={12} /> Strengths</p>
          <ul className="space-y-1">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2"><span className="text-emerald-500 mt-0.5">•</span>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {feedback.weaknesses.length > 0 && (
        <div>
          <p className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1.5"><XCircle size={12} /> Areas to Improve</p>
          <ul className="space-y-1">
            {feedback.weaknesses.map((w, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2"><span className="text-red-500 mt-0.5">•</span>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white/3 rounded-xl p-4 border border-white/5">
        <p className="text-xs font-medium text-accent mb-2 flex items-center gap-1.5"><Lightbulb size={12} /> Ideal Answer</p>
        <p className="text-sm text-gray-300 leading-relaxed">{feedback.ideal_answer}</p>
      </div>

      {feedback.suggestions.length > 0 && (
        <div>
          <p className="text-xs font-medium text-amber-400 mb-2 flex items-center gap-1.5"><TrendingUp size={12} /> Suggestions</p>
          <ul className="space-y-1">
            {feedback.suggestions.map((s, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2"><span className="text-amber-500 mt-0.5">→</span>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
