import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function difficultyColor(d: string) {
  return d === "easy" ? "text-emerald-400" : d === "medium" ? "text-amber-400" : "text-red-400";
}

export function categoryColor(c: string) {
  return c === "technical"
    ? "bg-purple-500/15 text-purple-300"
    : c === "behavioral"
    ? "bg-blue-500/15 text-blue-300"
    : "bg-teal-500/15 text-teal-300";
}

export function scoreColor(s: number) {
  if (s >= 8) return "text-emerald-400";
  if (s >= 6) return "text-amber-400";
  if (s >= 4) return "text-orange-400";
  return "text-red-400";
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
