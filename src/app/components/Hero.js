import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-6 sm:px-6">
      <div className="grid min-h-[300px] overflow-hidden rounded-[6px] border border-[#292d34] bg-[#15171d] lg:grid-cols-[58%_42%]">
        <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-12">
          <p className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.16em] text-[#c2f800] sm:text-[9px]">
            WORKOUT LIBRARY
          </p>

          <h1 className="mt-3 whitespace-nowrap font-[var(--font-oswald)] text-[34px] font-bold uppercase leading-[0.9] tracking-[-1.2px] text-white sm:text-[48px] lg:text-[54px]">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="mt-4 max-w-[390px] font-[var(--font-inter)] text-[9px] leading-[1.55] text-[#8a92a0] sm:text-[10px]">
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

        <div className="relative min-h-[220px] overflow-hidden sm:min-h-[260px] lg:min-h-0">
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