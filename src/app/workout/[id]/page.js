"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, Check } from "lucide-react";
import { useParams } from "next/navigation";
import { useFitLog } from "../../components/FitLogContext";
import { getWorkout } from "../../lib/api";

const workoutTags = {
  "Barbell Bench Press": ["Chest", "Arms"],
  "Pull-Up": ["Back", "Arms"],
  "Back Squat": ["Legs", "Core"],
  "Overhead Press": ["Shoulders", "Arms"],
  "Dumbbell Bicep Curl": ["Arms"],
  "Hollow-Body Plank": ["Core"],
  Burpee: ["Full Body"],
  "Conventional Deadlift": ["Back", "Legs"],
  "Push-Up": ["Chest", "Arms", "Core"],
  "Walking Lunge": ["Legs"],
  "Russian Twist": ["Core"],
  "Kettlebell Swing": ["Full Body", "Shoulders"],
};

export default function WorkoutDetails() {
  const params = useParams();
  const { addToPlan, saveWorkout } = useFitLog();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkout(params.id);
        setWorkout(data);
      } catch {
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadWorkout();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#c2f800]" />
          <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a92a0]">
            Loading workout
          </p>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#c2f800]">
            404 / WORKOUT NOT FOUND
          </p>

          <h1 className="mt-3 font-[var(--font-oswald)] text-5xl font-bold uppercase leading-none text-white sm:text-7xl">
            Lost Rep
          </h1>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-[3px] bg-[#c2f800] px-5 py-3 font-[var(--font-inter)] text-[9px] font-bold uppercase text-black"
          >
            <ArrowLeft size={12} />
            Back to Workouts
          </Link>
        </div>
      </main>
    );
  }

  const tags = workoutTags[workout.name?.trim()] || ["Full Body"];

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : [];

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-2 font-[var(--font-inter)] text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8a92a0] transition hover:text-[#c2f800]"
      >
        <ArrowLeft size={12} />
        Back to Library
      </Link>

      <div className="grid overflow-hidden rounded-[6px] border border-[#292d34] bg-[#15171d] lg:grid-cols-[48%_52%]">
        <div className="min-h-[380px] overflow-hidden sm:min-h-[500px] lg:min-h-[735px]">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          <p className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.16em] text-[#c2f800]">
            WORKOUT DETAILS
          </p>

          <h1 className="mt-3 font-[var(--font-oswald)] text-[32px] font-bold uppercase leading-[0.95] tracking-[-0.8px] text-white sm:text-[42px]">
            {workout.name}
          </h1>

          <p className="mt-4 font-[var(--font-inter)] text-[10px] leading-5 text-[#8a92a0] sm:text-[11px]">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-[2px] bg-[#c2f800] px-2 py-1 font-[var(--font-inter)] text-[7px] font-bold uppercase tracking-[0.3px] text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-[8px] border border-[#292d34] bg-[#15171d]">
            <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#292d34] px-5 py-3">
              <span className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.08em] text-[#8a92a0] sm:text-[9px]">
                Equipment
              </span>
              <span className="text-right font-[var(--font-inter)] text-[9px] font-medium text-white sm:text-[10px]">
                {workout.equipment}
              </span>
            </div>

            <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#292d34] px-5 py-3">
              <span className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.08em] text-[#8a92a0] sm:text-[9px]">
                Difficulty
              </span>
              <span className="text-right font-[var(--font-inter)] text-[9px] font-medium text-white sm:text-[10px]">
                {workout.difficulty}
              </span>
            </div>

            <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#292d34] px-5 py-3">
              <span className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.08em] text-[#8a92a0] sm:text-[9px]">
                Sets
              </span>
              <span className="text-right font-[var(--font-inter)] text-[9px] font-medium text-white sm:text-[10px]">
                {workout.sets}
              </span>
            </div>

            <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#292d34] px-5 py-3">
              <span className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.08em] text-[#8a92a0] sm:text-[9px]">
                Reps
              </span>
              <span className="text-right font-[var(--font-inter)] text-[9px] font-medium text-white sm:text-[10px]">
                {workout.reps}
              </span>
            </div>

            <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#292d34] px-5 py-3">
              <span className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.08em] text-[#8a92a0] sm:text-[9px]">
                Duration
              </span>
              <span className="text-right font-[var(--font-inter)] text-[9px] font-medium text-white sm:text-[10px]">
                {workout.duration} min
              </span>
            </div>

            <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#292d34] px-5 py-3">
              <span className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.08em] text-[#8a92a0] sm:text-[9px]">
                Calories
              </span>
              <span className="text-right font-[var(--font-inter)] text-[9px] font-medium text-white sm:text-[10px]">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex min-h-[52px] items-center justify-between gap-4 px-5 py-3">
              <span className="font-[var(--font-inter)] text-[8px] font-bold uppercase tracking-[0.08em] text-[#8a92a0] sm:text-[9px]">
                Rating
              </span>
              <span className="text-right font-[var(--font-inter)] text-[9px] font-medium text-white sm:text-[10px]">
                {workout.rating}
              </span>
            </div>
          </div>

          <div className="mt-7">
            <h2 className="font-[var(--font-oswald)] text-[20px] font-bold uppercase text-white">
              Instructions
            </h2>

            <ol className="mt-4 space-y-3">
              {instructions.length > 0 ? (
                instructions.map((instruction, index) => (
                  <li
                    key={`${instruction}-${index}`}
                    className="flex gap-3 font-[var(--font-inter)] text-[9px] leading-5 text-[#8a92a0]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#c2f800] font-[var(--font-inter)] text-[8px] font-bold text-[#c2f800]">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))
              ) : (
                <li className="font-[var(--font-inter)] text-[9px] leading-5 text-[#8a92a0]">
                  Follow proper form and controlled movement throughout the
                  exercise.
                </li>
              )}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToPlan(workout)}
              className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#c2f800] px-5 py-3 font-[var(--font-inter)] text-[9px] font-bold uppercase text-black transition hover:bg-white"
            >
              <Check size={13} />
              Add to today&apos;s plan
            </button>

            <button
              type="button"
              onClick={() => saveWorkout(workout)}
              className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-[#343943] px-5 py-3 font-[var(--font-inter)] text-[9px] font-bold uppercase text-white transition hover:border-[#c2f800] hover:text-[#c2f800]"
            >
              <Bookmark size={13} />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}