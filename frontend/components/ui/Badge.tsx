import { cn, categoryColor, difficultyColor } from "@/lib/utils";

export function Badge({ text, type }: { text: string; type: "category" | "difficulty" | "correctness" }) {
  const style =
    type === "category"
      ? categoryColor(text)
      : type === "difficulty"
      ? cn("bg-white/5", difficultyColor(text))
      : text === "Correct"
      ? "bg-emerald-500/15 text-emerald-400"
      : text === "Partially Correct"
      ? "bg-amber-500/15 text-amber-400"
      : "bg-red-500/15 text-red-400";

  return (
    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-lg capitalize", style)}>
      {text}
    </span>
  );
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 bg-white/5 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, (value / 10) * 100)}%` }}
      />
    </div>
  );
}
