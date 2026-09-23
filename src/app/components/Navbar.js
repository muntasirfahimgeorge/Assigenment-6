"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "./FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <header className="border-b border-[#222630] bg-[#08090b]">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-6">

        <Link href="/" className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="FitLog"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-[var(--font-inter)] text-xs font-bold uppercase text-[#c2f800]"
                : "font-[var(--font-inter)] text-xs font-medium uppercase text-[#8a92a0] transition hover:text-white"
            }
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "font-[var(--font-inter)] text-xs font-bold uppercase text-[#c2f800]"
                : "font-[var(--font-inter)] text-xs font-medium uppercase text-[#8a92a0] transition hover:text-white"
            }
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">

          <Link
            href="/my-plan"
            className="rounded-full bg-[#c2f800] px-4 py-2 text-[10px] font-bold uppercase text-black"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-[#343943] px-4 py-2 text-[10px] font-bold uppercase text-white"
          >
            Saved {saved.length}
          </Link>

        </div>

      </div>
    </header>
  );
}