const KEY = "interviewiq_current";

export function saveSession(data: Record<string, any>) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(data));
  }
}

export function loadSession(): Record<string, any> | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
