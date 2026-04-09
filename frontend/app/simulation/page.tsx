"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadSession, saveSession } from "@/lib/storage";
import { simulateRespond, generateReport } from "@/lib/api";
import { Question } from "@/types";
import { Navbar } from "@/components/layout/Navbar";
import { VideoPanel } from "@/components/interview/VideoPanel";
import { AudioRecorder } from "@/components/interview/AudioRecorder";
import { TimerBar } from "@/components/interview/TimerBar";
import { Button } from "@/components/ui/Button";
import { Loader2, ChevronRight } from "lucide-react";

interface Message { role: "ai" | "user"; text: string; }

export default function Simulation() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [answered, setAnswered] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = loadSession();
    if (!s) { router.push("/setup"); return; }
    setSession(s);
    setMessages([{ role: "ai", text: `Welcome. Let's begin. ${s.questions[0]?.text}` }]);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  if (!session) return null;

  const questions: Question[] = session.questions;
  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSubmit = async () => {
    if (!answer.trim() || loading) return;
    setLoading(true);
    setMessages((m) => [...m, { role: "user", text: answer }]);
    try {
      const { response } = await simulateRespond({
        session_id: session.session_id,
        question_text: current.text,
        answer_text: answer,
        interviewer_style: "professional",
      });
      setMessages((m) => [...m, { role: "ai", text: response }]);
      setAnswered(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (isLast) {
      const report = await generateReport(session.session_id);
      saveSession({ ...session, report });
      router.push(`/report/${session.session_id}`);
    } else {
      const next = questions[currentIndex + 1];
      setCurrentIndex((i) => i + 1);
      setAnswer(""); setAnswered(false); setTimerKey((k) => k + 1);
      setMessages((m) => [...m, { role: "ai", text: next.text }]);
    }
  };

  return (
    <div className="min-h-screen bg-night-950">
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <VideoPanel />
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-2">Time Remaining</p>
              <TimerBar key={timerKey} duration={120} onTimeout={handleSubmit} />
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Progress</span><span>{currentIndex + 1} / {questions.length}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
              </div>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-amber-400 border border-amber-500/20 bg-amber-500/10 px-3 py-2 rounded-lg">
                Simulation Mode — No feedback until the end.
              </p>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="glass rounded-2xl p-4 max-h-64 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center text-xs ${m.role === "ai" ? "bg-purple-500/20 text-purple-400" : "bg-accent/20 text-accent"}`}>
                    {m.role === "ai" ? "AI" : "U"}
                  </div>
                  <p className={`text-sm rounded-xl px-3 py-2 max-w-[80%] ${m.role === "ai" ? "bg-white/5 text-gray-200" : "bg-accent/15 text-white"}`}>{m.text}</p>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Your Response</p>
                <AudioRecorder onTranscript={(t) => setAnswer(t)} disabled={loading || answered} />
              </div>
              <textarea value={answer} onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type or record your answer..." rows={5} disabled={answered}
                className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/40 placeholder-gray-600 resize-none disabled:opacity-50" />
              {!answered ? (
                <Button onClick={handleSubmit} disabled={loading || !answer.trim()} className="w-full">
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Processing...</> : "Submit Answer"}
                </Button>
              ) : (
                <Button onClick={handleNext} className="w-full bg-purple-600 hover:bg-purple-500">
                  {isLast ? "View Assessment Report" : <>Next Question <ChevronRight size={16} /></>}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
