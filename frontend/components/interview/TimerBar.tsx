"use client";
import { useEffect, useState } from "react";

export function TimerBar({ duration = 120, onTimeout }: { duration?: number; onTimeout?: () => void }) {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    if (seconds <= 0) { onTimeout?.(); return; }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onTimeout]);

  const pct = (seconds / duration) * 100;
  const color = pct > 50 ? "from-emerald-500 to-teal-400" : pct > 25 ? "from-amber-500 to-yellow-400" : "from-red-500 to-rose-400";
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm text-gray-400 min-w-[48px]">{mm}:{ss}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
