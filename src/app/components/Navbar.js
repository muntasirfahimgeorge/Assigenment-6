"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "./FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <header className="border-b border-[#222630] bg-[#08090b]">
      <div className="mx-auto flex h-[46px] max-w-[1200px] items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="FitLog"
            className="h-6 w-6 object-contain"
          />

          <span className="font-[var(--font-inter)] text-[10px] font-extrabold tracking-[1px] text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#c2f800]"
                : "font-[var(--font-inter)] text-[8px] font-medium uppercase text-[#8a92a0]"
            }
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#c2f800]"
                : "font-[var(--font-inter)] text-[8px] font-medium uppercase text-[#8a92a0]"
            }
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#c2f800] px-3 py-1.5 font-[var(--font-inter)] text-[7px] font-bold uppercase text-black"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-[#c2f800] px-3 py-1.5 font-[var(--font-inter)] text-[7px] font-bold uppercase text-white"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>

      <nav className="flex items-center justify-center gap-7 border-t border-[#222630] py-2 md:hidden">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#c2f800]"
              : "font-[var(--font-inter)] text-[8px] font-medium uppercase text-[#8a92a0]"
          }
        >
          Workout
        </Link>

        <Link
          href="/my-plan"
          className={
            pathname === "/my-plan"
              ? "font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#c2f800]"
              : "font-[var(--font-inter)] text-[8px] font-medium uppercase text-[#8a92a0]"
          }
        >
          My Plan
        </Link>
      </nav>
    </header>
  );
}