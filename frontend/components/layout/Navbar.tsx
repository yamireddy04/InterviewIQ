import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-night-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm leading-none">IQ</span>
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif" }} className="font-bold text-lg text-white">
            InterviewIQ
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <Link href="/setup">
            <Button size="sm">New Interview</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
