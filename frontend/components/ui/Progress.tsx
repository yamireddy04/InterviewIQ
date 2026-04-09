import { cn } from "@/lib/utils";

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
