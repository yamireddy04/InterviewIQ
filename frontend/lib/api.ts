const BASE = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

export async function generateQuestions(payload: {
  job_role: string;
  job_description: string;
  resume_text?: string;
  num_technical?: number;
  num_behavioral?: number;
  num_scenario?: number;
}) {
  return apiFetch<{ session_id: string; questions: any[] }>("/api/questions/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function transcribeAudio(blob: Blob): Promise<{ transcript: string }> {
  const form = new FormData();
  form.append("audio", blob, "audio.webm");
  const res = await fetch(`${BASE}/api/questions/transcribe`, { method: "POST", body: form });
  if (!res.ok) throw new Error("Transcription failed");
  return res.json();
}

export async function evaluateAnswer(payload: {
  session_id: string;
  question_id: string;
  question_text: string;
  question_category: string;
  question_difficulty: string;
  answer_text: string;
  job_role: string;
}) {
  return apiFetch<any>("/api/evaluate/answer", { method: "POST", body: JSON.stringify(payload) });
}

export async function simulateRespond(payload: {
  session_id: string;
  question_text: string;
  answer_text: string;
  interviewer_style?: string;
}) {
  return apiFetch<{ response: string }>("/api/simulate/respond", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function generateReport(session_id: string) {
  return apiFetch<any>(`/api/reports/generate/${session_id}`, { method: "POST" });
}

export async function getReport(session_id: string) {
  return apiFetch<any>(`/api/reports/${session_id}`);
}

export async function getSessions() {
  return apiFetch<{ sessions: any[] }>("/api/reports/sessions/all");
}
