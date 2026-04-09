import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InterviewIQ — AI Interview Coach",
  description: "Practice, simulate, and ace your next interview with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ background: "#08090c", color: "#e8e8f0", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
