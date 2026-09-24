"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Library from "./components/Library";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#c2f800]" />

          <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a92a0]">
            Loading FitLog
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Hero />
      <Library />
    </main>
  );
}