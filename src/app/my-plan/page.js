"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock3, Flame, Star, Check, X } from "lucide-react";
import { useFitLog } from "../components/FitLogContext";

export default function MyPlan() {
  const {
    plan,
    saved,
    done,
    loaded,
    removeFromPlan,
    removeSaved,
    markAsDone,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState("plan");

  const currentItems = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, item) => total + Number(item.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, item) => total + Number(item.caloriesBurned || 0),
    0
  );

  if (!loaded) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#333] border-t-[#c2f800]" />

          <p className="font-[var(--font-inter)] text-[9px] font-bold uppercase tracking-[0.15em] text-[#8a92a0]">
            Loading workouts...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[70vh] max-w-[1000px] px-5 py-9 sm:px-6">
      <div>
        <h1 className="font-[var(--font-oswald)] text-[34px] font-bold uppercase leading-none tracking-[-1px] text-white sm:text-[40px]">
          MY PLAN
        </h1>

        <p className="mt-2 font-[var(--font-inter)] text-[9px] text-[#8a92a0] sm:text-[10px]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        <Metric label="Exercises" value={plan.length} />

        <Metric label="Minutes" value={totalMinutes} />

        <Metric label="Calories" value={totalCalories} />
      </div>

      <div className="mt-7 flex border-b border-[#292d34]">
        <button
          onClick={() => setActiveTab("plan")}
          className={
            activeTab === "plan"
              ? "border-b-2 border-[#c2f800] px-4 pb-2 font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#c2f800]"
              : "px-4 pb-2 font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#666d78]"
          }
        >
          Today&apos;s Plan
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={
            activeTab === "saved"
              ? "border-b-2 border-[#c2f800] px-4 pb-2 font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#c2f800]"
              : "px-4 pb-2 font-[var(--font-inter)] text-[8px] font-bold uppercase text-[#666d78]"
          }
        >
          Saved
        </button>
      </div>

      {currentItems.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center text-center">
          <div>
            <h2 className="font-[var(--font-oswald)] text-[26px] font-bold uppercase text-white">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 font-[var(--font-inter)] text-[9px] text-[#8a92a0]">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-[2px] bg-[#c2f800] px-5 py-2.5 font-[var(--font-inter)] text-[8px] font-bold uppercase text-black"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {currentItems.map((workout) => {
            const isDone = done.includes(workout.id);

            return (
              <div
                key={workout.id}
                className="flex flex-col overflow-hidden rounded-[4px] border border-[#292d34] bg-[#15171d] sm:flex-row"
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-[150px] w-full object-cover sm:h-[120px] sm:w-[180px]"
                />

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="font-[var(--font-oswald)] text-[15px] font-bold uppercase leading-none text-white">
                      {workout.name}
                    </h3>

                    <p className="mt-1 font-[var(--font-inter)] text-[8px] text-[#8a92a0]">
                      {workout.equipment}
                    </p>

                    <div className="mt-3 flex items-center gap-4 font-[var(--font-inter)] text-[7px] text-[#8a92a0]">
                      <span className="flex items-center gap-1">
                        <Clock3 size={9} />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1">
                        <Flame size={9} />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <Star size={9} />
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-[2px] bg-[#c2f800] px-3 py-2 font-[var(--font-inter)] text-[7px] font-bold uppercase text-black"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => markAsDone(workout.id)}
                        disabled={isDone}
                        className={
                          isDone
                            ? "flex cursor-default items-center gap-1 rounded-[2px] border border-[#c2f800] px-3 py-2 font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#c2f800]"
                            : "flex items-center gap-1 rounded-[2px] border border-[#343943] px-3 py-2 font-[var(--font-inter)] text-[7px] font-bold uppercase text-white hover:border-[#c2f800] hover:text-[#c2f800]"
                        }
                      >
                        <Check size={9} />
                        {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeSaved(workout.id)
                      }
                      aria-label={`Remove ${workout.name}`}
                      className="flex items-center justify-center rounded-[2px] border border-[#343943] px-2 py-2 text-[#8a92a0] hover:border-red-400 hover:text-red-400"
                    >
                      <X size={11} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="border border-[#292d34] bg-[#15171d] px-3 py-4">
      <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase tracking-[0.08em] text-[#666d78]">
        {label}
      </p>

      <p className="mt-1 font-[var(--font-oswald)] text-[25px] font-bold leading-none text-white">
        {value}
      </p>
    </div>
  );
}