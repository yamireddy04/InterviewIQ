import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Brain, Zap, Shield, BarChart2, Mic, Video, ArrowRight, Sparkles } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Question Engine", desc: "Generates role-specific technical, behavioral, and scenario questions tailored to your job description.", color: "from-violet-500 to-purple-600" },
  { icon: Zap, title: "Instant Feedback", desc: "Get detailed evaluation with scores, strengths, weaknesses, and ideal answers after every response.", color: "from-amber-500 to-orange-500" },
  { icon: Shield, title: "Simulation Mode", desc: "Experience a strict, realistic interview with no hints or feedback until the very end.", color: "from-blue-500 to-cyan-500" },
  { icon: Mic, title: "Voice Input", desc: "Answer naturally using your microphone with built-in speech-to-text transcription.", color: "from-emerald-500 to-teal-500" },
  { icon: Video, title: "Camera Feed", desc: "Practice with your camera on for a fully immersive, realistic interview environment.", color: "from-pink-500 to-rose-500" },
  { icon: BarChart2, title: "Progress Tracking", desc: "Detailed reports and performance trends so you can see exactly how you improve over time.", color: "from-indigo-500 to-blue-500" },
];

const stats = [
  { value: "10+", label: "Question Types" },
  { value: "3", label: "Difficulty Levels" },
  { value: "AI", label: "Powered Feedback" },
  { value: "PDF", label: "Export Reports" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-night-950 overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-blue-700/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-accent/70 border border-accent/20 bg-accent/5 px-4 py-1.5 rounded-full">
              ✦ AI Interview Coach
            </span>
          </div>
          <div className="mb-3">
            <span className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-none bg-gradient-to-r from-accent via-accent-light to-violet-400 bg-clip-text text-transparent tracking-tight">
              InterviewIQ
            </span>
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white mb-6">
            Ace your next interview<br className="hidden sm:block" /> with the power of AI
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Practice with personalized questions, get instant expert feedback, and simulate real interview environments — from setup to final report.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/setup">
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2">
                Start Practicing <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                View Dashboard
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-xl py-4 px-3 text-center">
                <p className="font-display text-2xl font-bold text-accent mb-0.5">{s.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 max-w-xl mx-auto mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-xs text-gray-600 uppercase tracking-widest font-mono">Everything you need</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group glass rounded-2xl p-6 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <f.icon size={18} className="text-white" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <div className="glass rounded-2xl p-10 max-w-2xl mx-auto border-accent/15 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
            <Sparkles size={24} className="text-accent mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-3">Ready to land your dream job?</h2>
            <p className="text-gray-400 mb-6 text-sm">Set up your first interview session in under 60 seconds.</p>
            <Link href="/setup">
              <Button size="lg" className="px-10">
                Get Started Free <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}