import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Brain, Zap, Shield, BarChart2, Mic, Video } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Question Engine", desc: "Generates role-specific technical, behavioral, and scenario questions." },
  { icon: Zap, title: "Instant Feedback", desc: "Get detailed evaluation with scores, strengths, and ideal answers." },
  { icon: Shield, title: "Simulation Mode", desc: "Experience a real interview with a strict AI interviewer. No hints." },
  { icon: Mic, title: "Voice Input", desc: "Answer naturally using your microphone with speech-to-text." },
  { icon: Video, title: "Camera Feed", desc: "Practice with your camera on for a realistic interview feel." },
  { icon: BarChart2, title: "Progress Tracking", desc: "Detailed reports and performance trends across all sessions." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-night-950">
      <Navbar />
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              InterviewIQ
            </span>
          </h2>
          <h1 className="font-display text-6xl font-bold leading-tight mb-6">
            Ace your next<br />
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              interview
            </span>{" "}
            with AI
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed mb-10">
            Practice with personalized questions, get instant expert feedback, and simulate real interview environments — all powered by AI.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/setup">
              <Button size="lg">Start Practicing</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">View Dashboard</Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/25 transition-colors">
                <f.icon size={18} className="text-accent" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}