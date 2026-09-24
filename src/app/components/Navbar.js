"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "./FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <header className="min-h-[81px] border-b border-[#1b1f28] bg-[#0f1115]">
      <div className="mx-auto flex min-h-[80px] w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-5 sm:gap-10 lg:gap-[60px]">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="FitLog"
              className="h-7 w-7 object-contain"
            />
            <span className="font-[var(--font-oswald)] text-[18px] font-bold leading-[1.4] tracking-[1px] text-white sm:text-[20px]">
              FITLOG
            </span>
          </Link>

          <nav className="flex shrink-0 items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "font-[var(--font-inter)] text-[10px] font-semibold text-[#c2f800] sm:text-[12px]"
                  : "font-[var(--font-inter)] text-[10px] font-medium text-[#9ca3af] sm:text-[12px]"
              }
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={
                pathname === "/my-plan"
                  ? "font-[var(--font-inter)] text-[10px] font-semibold text-[#c2f800] sm:text-[12px]"
                  : "font-[var(--font-inter)] text-[10px] font-medium text-[#d1d5db] sm:text-[12px]"
              }
            >
              My Plan
            </Link>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          <Link href="/my-plan" className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden font-[var(--font-inter)] text-[12px] font-medium text-[#d1d5db] sm:block">
              Plan
            </span>
            <span className="font-[var(--font-inter)] text-[9px] font-medium text-[#d1d5db] sm:hidden">
              P
            </span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c2f800] px-1.5 font-[var(--font-inter)] text-[10px] font-semibold leading-none text-black">
              {plan.length}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden font-[var(--font-inter)] text-[12px] font-medium text-[#9ca3af] sm:block">
              Saved
            </span>
            <span className="font-[var(--font-inter)] text-[9px] font-medium text-[#9ca3af] sm:hidden">
              S
            </span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#c2f800] px-1.5 font-[var(--font-inter)] text-[10px] font-semibold leading-none text-[#c2f800]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}