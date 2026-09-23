import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-6">
      <div className="grid min-h-[430px] overflow-hidden rounded-2xl border border-[#222630] bg-[#15171d] lg:grid-cols-2">

        <div className="flex flex-col justify-center px-8 py-12 lg:px-12">

          <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.16em] text-[#c2f800]">
            WORKOUT LIBRARY
          </p>

          <h1 className="mt-4 max-w-[560px] font-[var(--font-oswald)] text-[56px] font-bold uppercase leading-[0.9] tracking-[-1.5px] text-white lg:text-[64px]">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-[460px] font-[var(--font-inter)] text-[13px] leading-[1.6] text-[#8a92a0]">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <Link
            href="#library"
            className="mt-7 flex w-fit items-center gap-2 rounded-md bg-[#c2f800] px-5 py-3 font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-wide text-black transition hover:bg-white"
          >
            Browse Workouts
            <ArrowDownRight size={14} />
          </Link>

        </div>

        <div className="relative min-h-[360px] overflow-hidden lg:min-h-0">
          <img
            src="/assets/banner.png"
            alt="FitLog workout"
            className="h-full w-full object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}