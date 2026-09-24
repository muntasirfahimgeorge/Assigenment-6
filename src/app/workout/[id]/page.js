"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Flame,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { useFitLog } from "../../components/FitLogContext";
import { getWorkout } from "../../lib/api";

const workoutTags = {
  "Barbell Bench Press": ["Chest", "Arms"],
  "Pull-Up": ["Back", "Arms"],
  "Back Squat": ["Legs", "Core"],
  "Overhead Press": ["Shoulders", "Arms"],
  "Dumbbell Bicep Curl": ["Arms"],
  "Hollow-Body Plank": ["Core"],
  "Burpee": ["Full Body"],
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

  const handleAddToPlan = () => {
    addToPlan(workout);
  };

  const handleSave = () => {
    saveWorkout(workout);
  };

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

          <div className="mt-7 border border-[#292d34]">
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-[#292d34] p-3">
                <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#8a92a0]">
                  Equipment
                </p>
                <p className="mt-1 font-[var(--font-inter)] text-[9px] font-medium text-white">
                  {workout.equipment}
                </p>
              </div>

              <div className="border-b border-[#292d34] p-3">
                <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#8a92a0]">
                  Difficulty
                </p>
                <p className="mt-1 font-[var(--font-inter)] text-[9px] font-medium text-white">
                  {workout.difficulty}
                </p>
              </div>

              <div className="border-b border-r border-[#292d34] p-3">
                <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#8a92a0]">
                  Sets
                </p>
                <p className="mt-1 font-[var(--font-inter)] text-[9px] font-medium text-white">
                  {workout.sets}
                </p>
              </div>

              <div className="border-b border-[#292d34] p-3">
                <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#8a92a0]">
                  Reps
                </p>
                <p className="mt-1 font-[var(--font-inter)] text-[9px] font-medium text-white">
                  {workout.reps}
                </p>
              </div>

              <div className="border-r border-[#292d34] p-3">
                <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#8a92a0]">
                  Duration
                </p>
                <div className="mt-1 flex items-center gap-1 font-[var(--font-inter)] text-[9px] font-medium text-white">
                  <Clock3 size={10} />
                  {workout.duration} min
                </div>
              </div>

              <div className="p-3">
                <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#8a92a0]">
                  Calories
                </p>
                <div className="mt-1 flex items-center gap-1 font-[var(--font-inter)] text-[9px] font-medium text-white">
                  <Flame size={10} />
                  {workout.caloriesBurned} kcal
                </div>
              </div>

              <div className="border-t border-r border-[#292d34] p-3">
                <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#8a92a0]">
                  Rating
                </p>
                <div className="mt-1 flex items-center gap-1 font-[var(--font-inter)] text-[9px] font-medium text-white">
                  <Star size={10} />
                  {workout.rating}
                </div>
              </div>

              <div className="border-t border-[#292d34] p-3">
                <p className="font-[var(--font-inter)] text-[7px] font-bold uppercase text-[#8a92a0]">
                  Muscle Group
                </p>
                <p className="mt-1 font-[var(--font-inter)] text-[9px] font-medium text-white">
                  {tags.join(", ")}
                </p>
              </div>
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
                <li className="font-[var(--font-inter)] text-[9px] text-[#8a92a0]">
                  Follow proper form and controlled movement throughout the
                  exercise.
                </li>
              )}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToPlan}
              className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#c2f800] px-5 py-3 font-[var(--font-inter)] text-[9px] font-bold uppercase text-black transition hover:bg-white"
            >
              <Check size={13} />
              Add to today&apos;s plan
            </button>

            <button
              type="button"
              onClick={handleSave}
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