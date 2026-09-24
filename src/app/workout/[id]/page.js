"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Check, ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useFitLog } from "../../components/FitLogContext";
import { getWorkout } from "../../lib/api";

const workoutTags = {
  "Barbell Bench Press": ["Chest", "Arms"],
  "Pull-Up": ["Back", "Arms"],
  "Pull-up": ["Back", "Arms"],
  "Back Squat": ["Legs", "Core"],
  "Overhead Press": ["Shoulders", "Arms"],
  "Dumbbell Bicep Curl": ["Arms"],
  "Hollow-Body Plank": ["Core"],
  "Hollow-body Plank": ["Core"],
  "Conventional Deadlift": ["Back", "Legs"],
  "Push-Up": ["Chest", "Arms", "Core"],
  "Push-up": ["Chest", "Arms", "Core"],
  "Walking Lunge": ["Legs"],
  "Russian Twist": ["Core"],
};

export default function WorkoutDetails() {
  const { id } = useParams();
  const { addToPlan, saveWorkout } = useFitLog();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getWorkout(id)
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#333] border-t-[#c2f800]" />
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 text-center">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#c2f800]">
            404 / NOT FOUND
          </p>

          <h1 className="mt-3 font-[var(--font-oswald)] text-5xl font-bold uppercase">
            Workout Not Found
          </h1>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-[3px] bg-[#c2f800] px-5 py-2.5 text-[8px] font-bold uppercase text-black"
          >
            Back to Workouts
          </Link>
        </div>
      </main>
    );
  }

  const tags = workoutTags[workout.name] || [];

  return (
    <main className="mx-auto max-w-[1000px] px-5 py-8 sm:px-6">

      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1 font-[var(--font-inter)] text-[8px] font-medium uppercase text-[#8a92a0] hover:text-[#c2f800]"
      >
        <ArrowLeft size={10} />
        Back to Library
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">

        <div className="overflow-hidden rounded-[3px]">
          <img
            src={workout.image}
            alt={workout.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>

          <h1 className="font-[var(--font-oswald)] text-[34px] font-bold uppercase leading-[0.9] tracking-[-1px] text-white sm:text-[40px]">
            {workout.name}
          </h1>

          <p className="mt-3 font-[var(--font-inter)] text-[9px] leading-[1.6] text-[#8a92a0]">
            {workout.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[2px] bg-[#c2f800] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.3px] text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 border border-[#292d34] bg-[#15171d] sm:grid-cols-3">

            <DetailRow label="Equipment" value={workout.equipment} />
            <DetailRow label="Difficulty" value={workout.difficulty} />
            <DetailRow label="Sets" value={workout.sets} />
            <DetailRow label="Reps" value={workout.reps} />
            <DetailRow label="Duration" value={`${workout.duration} min`} />
            <DetailRow label="Calories" value={`${workout.caloriesBurned} kcal`} />
            <DetailRow label="Rating" value={workout.rating} />

          </div>

          <section className="mt-5">

            <h2 className="border-b border-[#292d34] pb-2 font-[var(--font-inter)] text-[9px] font-extrabold uppercase tracking-[0.8px] text-[#c2f800]">
              Instructions
            </h2>

            <ol>
              {workout.instructions?.slice(0, 4).map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-3 border-b border-[#292d34] py-2.5"
                >
                  <span className="w-5 shrink-0 text-[9px] font-bold text-[#c2f800]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-[var(--font-inter)] text-[8px] leading-5 text-[#8a92a0]">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>

          </section>

          <div className="mt-5 flex flex-wrap gap-2">

            <button
              onClick={() => addToPlan(workout)}
              className="flex h-9 items-center gap-1.5 rounded-[2px] bg-[#c2f800] px-4 text-[8px] font-bold uppercase text-black hover:bg-white"
            >
              <Check size={11} />
              Add to today&apos;s plan
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              className="flex h-9 items-center gap-1.5 rounded-[2px] border border-[#343943] px-4 text-[8px] font-bold uppercase text-white hover:border-[#c2f800] hover:text-[#c2f800]"
            >
              <Bookmark size={11} />
              Save for later
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="min-h-[46px] border-b border-r border-[#292d34] px-3 py-2">
      <p className="font-[var(--font-inter)] text-[6px] font-bold uppercase tracking-[0.08em] text-[#666d78]">
        {label}
      </p>

      <p className="mt-1 font-[var(--font-inter)] text-[8px] font-medium text-white">
        {value}
      </p>
    </div>
  );
}