"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "./FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout/");

  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="border-b border-[#1b1f28] bg-[#0f1115]">
      <div className="mx-auto flex h-[56px] w-full max-w-[1280px] items-center justify-between gap-3 px-3 sm:h-[64px] sm:px-5 lg:h-[80px] lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <img
            src="/assets/logo.png"
            alt="FitLog"
            className="h-5 w-5 object-contain sm:h-6 sm:w-6 lg:h-7 lg:w-7"
          />

          <span className="font-[var(--font-oswald)] text-[13px] font-bold tracking-[0.8px] text-white sm:text-[16px] lg:text-[20px]">
            FITLOG
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
          <Link
            href="/"
            className={
              isWorkoutActive
                ? "font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#c2f800] sm:text-[10px] lg:text-[12px]"
                : "font-[var(--font-inter)] text-[8px] font-medium uppercase text-[#8a92a0] sm:text-[10px] lg:text-[12px]"
            }
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={
              isPlanActive
                ? "font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#c2f800] sm:text-[10px] lg:text-[12px]"
                : "font-[var(--font-inter)] text-[8px] font-medium uppercase text-[#d1d5db] sm:text-[10px] lg:text-[12px]"
            }
          >
            My Plan
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-2"
          >
            <span className="font-[var(--font-inter)] text-[7px] font-medium text-[#d1d5db] sm:text-[10px] lg:text-[12px]">
              Plan
            </span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c2f800] px-1 font-[var(--font-inter)] text-[8px] font-semibold leading-none text-black sm:h-5 sm:min-w-5 sm:text-[10px]">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-2"
          >
            <span className="font-[var(--font-inter)] text-[7px] font-medium text-[#9ca3af] sm:text-[10px] lg:text-[12px]">
              Saved
            </span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-[#c2f800] px-1 font-[var(--font-inter)] text-[8px] font-semibold leading-none text-[#c2f800] sm:h-5 sm:min-w-5 sm:text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}