import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#222630] bg-[#08090b]">
      <div className="mx-auto flex min-h-[55px] max-w-[1200px] items-center justify-between px-5 sm:px-6">

        <Link href="/" className="flex items-center gap-1.5">
          <img
            src="/assets/logo.png"
            alt="FitLog"
            className="h-4 w-4 object-contain"
          />

          <span className="font-[var(--font-inter)] text-[7px] font-extrabold tracking-[0.7px] text-white">
            FITLOG
          </span>
        </Link>

        <p className="font-[var(--font-inter)] text-[6px] text-[#666d78] sm:text-[7px]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}