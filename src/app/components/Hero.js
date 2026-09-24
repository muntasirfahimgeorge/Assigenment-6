import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1200px] px-3 pt-4 sm:px-5 sm:pt-5 lg:px-6 lg:pt-6">
      <div className="grid overflow-hidden rounded-[6px] border border-[#292d34] bg-[#15171d] lg:min-h-[300px] lg:grid-cols-[58%_42%]">
        <div className="flex min-w-0 flex-col justify-center px-5 py-8 sm:px-8 sm:py-9 lg:px-12 lg:py-10">
          <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase tracking-[0.16em] text-[#c2f800] sm:text-[8px] lg:text-[9px]">
            WORKOUT LIBRARY
          </p>

<h1 className="mt-3 max-w-full font-[var(--font-oswald)] text-[24px] font-bold uppercase leading-[0.95] tracking-[-0.7px] text-white sm:text-[36px] sm:tracking-[-1px] lg:text-[48px] lg:tracking-[-1px]">
  <span className="lg:whitespace-nowrap">
    TRAIN WITH INTENT. LOG
  </span>
  <br />
  EVERY SET.
</h1>

          <p className="mt-4 max-w-[390px] font-[var(--font-inter)] text-[8px] leading-[1.55] text-[#8a92a0] sm:text-[9px] lg:text-[10px]">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-5 flex w-fit items-center gap-2 rounded-[3px] bg-[#c2f800] px-4 py-2.5 font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-wide text-black transition hover:bg-white sm:text-[9px]"
          >
            Browse Workouts
            <ArrowDown size={11} strokeWidth={2.5} />
          </Link>
        </div>

        <div className="h-[220px] overflow-hidden sm:h-[280px] lg:h-auto">
          <img
            src="/assets/banner.png"
            alt="FitLog workout"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}