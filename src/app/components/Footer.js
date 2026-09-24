import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#222630] bg-[#08090b]">
      <div className="mx-auto flex min-h-[96px] max-w-[1280px] items-center justify-between px-6">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <img
            src="/assets/logo.png"
            alt="FitLog"
            className="h-8 w-8 object-contain"
          />

          <span className="font-[var(--font-inter)] text-[15px] font-extrabold tracking-[-0.4px] text-white">
            FITLOG
          </span>
        </Link>

        <p className="font-[var(--font-inter)] text-[10px] text-[#666d78]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}