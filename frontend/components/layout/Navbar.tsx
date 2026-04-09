import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Brain } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-night-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg">InterviewIQ</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/dashboard"><Button variant="ghost" size="sm">Dashboard</Button></Link>
          <Link href="/setup"><Button size="sm">New Interview</Button></Link>
        </div>
      </div>
    </nav>
  );
}
