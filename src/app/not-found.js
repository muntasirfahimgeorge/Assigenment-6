import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">

        <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#c2f800]">
          404 / NOT FOUND
        </p>

        <h1 className="mt-3 font-[var(--font-oswald)] text-7xl font-bold uppercase leading-none sm:text-8xl">
          Lost Rep
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#8a92a0]">
          This workout or page does not exist.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-md bg-[#c2f800] px-6 py-3 text-[10px] font-bold uppercase text-black transition hover:bg-white"
        >
          Back to Workouts
        </Link>

      </div>
    </main>
  );
}