"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "./FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <header className="border-b border-[#222630] bg-[#08090b]">
      <div className="mx-auto flex min-h-[64px] max-w-[1280px] items-center justify-between px-4 sm:px-6">

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="FitLog"
            className="h-8 w-8 object-contain"
          />

          <span className="font-[var(--font-inter)] text-[15px] font-extrabold tracking-[-0.4px] text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#c2f800] px-3 py-2 text-[9px] font-bold uppercase text-black sm:px-4 sm:text-[10px]"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-[#343943] px-3 py-2 text-[9px] font-bold uppercase text-white sm:px-4 sm:text-[10px]"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>

      <nav className="flex items-center justify-center gap-8 border-t border-[#222630] px-4 py-3 md:hidden">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-[var(--font-inter)] text-[10px] font-bold uppercase text-[#c2f800]"
              : "font-[var(--font-inter)] text-[10px] font-medium uppercase text-[#8a92a0]"
          }
        >
          Workout
        </Link>

        <Link
          href="/my-plan"
          className={
            pathname === "/my-plan"
              ? "font-[var(--font-inter)] text-[10px] font-bold uppercase text-[#c2f800]"
              : "font-[var(--font-inter)] text-[10px] font-medium uppercase text-[#8a92a0]"
          }
        >
          My Plan
        </Link>
      </nav>
    </header>
  );
}