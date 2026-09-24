"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Check,
  Clock3,
  Flame,
  Star,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useFitLog } from "../components/FitLogContext";

export default function MyPlan() {
  const {
    plan,
    saved,
    done,
    removeFromPlan,
    removeSaved,
    markAsDone,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const minutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const calories = plan.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0
  );

  function handleDone(workout) {
    markAsDone(workout.id);
    toast.success(`${workout.name} marked as done!`);
  }

  function handleRemovePlan(workout) {
    removeFromPlan(workout.id);
    toast.success(`${workout.name} removed from your plan.`);
  }

  function handleRemoveSaved(workout) {
    removeSaved(workout.id);
    toast.success(`${workout.name} removed from saved.`);
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#c2f800]" />

          <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a92a0]">
            Loading My Plan
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">

      <div className="mb-10">
        <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.16em] text-[#c2f800]">
          02 / YOUR WORKOUT
        </p>

        <h1 className="mt-2 font-[var(--font-oswald)] text-5xl font-bold uppercase leading-none">
          MY PLAN
        </h1>

        <p className="mt-3 text-sm text-[#8a92a0]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Metric
          label="Exercises"
          value={plan.length}
          highlight
        />

        <Metric
          label="Minutes"
          value={minutes}
        />

        <Metric
          label="Calories"
          value={calories}
        />
      </div>

      <div className="mb-8 flex border-b border-[#222630]">

        <button
          onClick={() => setActiveTab("plan")}
          className={
            activeTab === "plan"
              ? "border-b-2 border-[#c2f800] px-5 py-3 text-xs font-bold uppercase text-[#c2f800]"
              : "border-b-2 border-transparent px-5 py-3 text-xs font-bold uppercase text-[#777] hover:text-white"
          }
        >
          Today&apos;s Plan
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={
            activeTab === "saved"
              ? "border-b-2 border-[#c2f800] px-5 py-3 text-xs font-bold uppercase text-[#c2f800]"
              : "border-b-2 border-transparent px-5 py-3 text-xs font-bold uppercase text-[#777] hover:text-white"
          }
        >
          Saved
        </button>

      </div>

      {activeTab === "plan" && (
        <section>
          {plan.length === 0 ? (
            <EmptyState text="Browse the library and add a lift to get today moving." />
          ) : (
            <div className="space-y-4">

              {plan.map((workout) => {
                const isDone = done.includes(workout.id);

                return (
                  <div
                    key={workout.id}
                    className="grid gap-5 rounded-2xl border border-[#222630] bg-[#15171d] p-5 sm:grid-cols-[180px_1fr_auto] sm:items-center"
                  >

                    <Link href={`/workout/${workout.id}`}>
                      <img
                        src={workout.image}
                        alt={workout.name}
                        className="h-32 w-full rounded-lg object-cover"
                      />
                    </Link>

                    <div>
                      <h3
                        className={
                          isDone
                            ? "font-[var(--font-oswald)] text-xl font-bold uppercase line-through text-[#666]"
                            : "font-[var(--font-oswald)] text-xl font-bold uppercase"
                        }
                      >
                        {workout.name}
                      </h3>

                      <p className="mt-2 text-xs text-[#777]">
                        {workout.equipment}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#888]">

                        <span className="flex items-center gap-1">
                          <Clock3 size={13} />
                          {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                          <Flame size={13} />
                          {workout.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1">
                          <Star size={13} />
                          {workout.rating}
                        </span>

                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:min-w-[145px]">

                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex items-center justify-center rounded-md border border-[#343943] px-4 py-3 text-[10px] font-bold uppercase hover:border-[#c2f800] hover:text-[#c2f800]"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => handleDone(workout)}
                        disabled={isDone}
                        className={
                          isDone
                            ? "flex items-center justify-center gap-2 rounded-md border border-[#343943] px-4 py-3 text-[10px] font-bold uppercase text-[#666]"
                            : "flex items-center justify-center gap-2 rounded-md bg-[#c2f800] px-4 py-3 text-[10px] font-bold uppercase text-black hover:bg-white"
                        }
                      >
                        <Check size={14} />
                        {isDone ? "Done" : "Mark as Done"}
                      </button>

                      <button
                        onClick={() => handleRemovePlan(workout)}
                        className="flex items-center justify-center gap-2 rounded-md border border-[#343943] px-4 py-3 text-[10px] font-bold uppercase hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}
        </section>
      )}

      {activeTab === "saved" && (
        <section>
          {saved.length === 0 ? (
            <EmptyState text="Save workouts from the library to find them here." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {saved.map((workout) => (
                <div
                  key={workout.id}
                  className="overflow-hidden rounded-2xl border border-[#222630] bg-[#15171d]"
                >

                  <Link href={`/workout/${workout.id}`}>
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-48 w-full object-cover"
                    />
                  </Link>

                  <div className="p-5">

                    <h3 className="font-[var(--font-oswald)] text-lg font-bold uppercase">
                      {workout.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#777]">
                      {workout.equipment}
                    </p>

                    <div className="mt-4 flex gap-4 text-[10px] text-[#888]">

                      <span className="flex items-center gap-1">
                        <Clock3 size={12} />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1">
                        <Flame size={12} />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {workout.rating}
                      </span>

                    </div>

                    <div className="mt-5 flex gap-2">

                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex-1 rounded-md border border-[#343943] px-3 py-3 text-center text-[10px] font-bold uppercase hover:border-[#c2f800] hover:text-[#c2f800]"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => handleRemoveSaved(workout)}
                        className="flex items-center justify-center rounded-md border border-[#343943] px-4 hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}
        </section>
      )}

    </main>
  );
}

function Metric({ label, value, highlight }) {
  return (
    <div className="rounded-2xl border border-[#222630] bg-[#15171d] p-6">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#777]">
        {label}
      </p>

      <p
        className={
          highlight
            ? "mt-3 font-[var(--font-oswald)] text-4xl font-bold text-[#c2f800]"
            : "mt-3 font-[var(--font-oswald)] text-4xl font-bold"
        }
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#343943] px-6 py-16 text-center">

      <h3 className="font-[var(--font-oswald)] text-2xl font-bold uppercase">
        NOTHING HERE YET
      </h3>

      <p className="mt-3 text-xs text-[#777]">
        {text}
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex rounded-md bg-[#c2f800] px-5 py-3 text-[10px] font-bold uppercase text-black hover:bg-white"
      >
        Go to workouts
      </Link>

    </div>
  );
}