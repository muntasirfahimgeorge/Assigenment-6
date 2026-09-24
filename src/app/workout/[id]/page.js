"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bookmark, Check } from "lucide-react";
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
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#333] border-t-[#ccff00]" />
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 text-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            404 / NOT FOUND
          </p>

          <h1 className="mt-3 font-[var(--font-oswald)] text-6xl font-bold uppercase">
            Workout Not Found
          </h1>

          <Link
            href="/"
            className="mt-7 inline-flex rounded-xl bg-[#ccff00] px-6 py-3 text-[10px] font-bold uppercase text-black"
          >
            Back to Workouts
          </Link>
        </div>
      </main>
    );
  }

  const tags = workoutTags[workout.name] || [];

  return (
    <main className="mx-auto max-w-[1232px] px-6 py-12">
      <div className="grid gap-14 lg:grid-cols-[588px_588px]">

        <div className="overflow-hidden rounded-2xl">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-[773px] w-full object-cover"
          />
        </div>

        <div>

          <h1 className="font-[var(--font-oswald)] text-[36px] font-bold uppercase leading-[1.11] tracking-[-0.9px] text-white">
            {workout.name}
          </h1>

          <p className="mt-4 text-sm leading-[1.43] text-[#8a92a0]">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-6 items-center rounded-full bg-[#ccff00] px-3.5 text-[11px] font-bold uppercase tracking-[0.55px] text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-2xl border border-[#222630] bg-[#15171d]">

            <DetailRow
              label="Equipment"
              value={workout.equipment}
            />

            <DetailRow
              label="Difficulty"
              value={workout.difficulty}
            />

            <DetailRow
              label="Sets"
              value={workout.sets}
            />

            <DetailRow
              label="Reps"
              value={workout.reps}
            />

            <DetailRow
              label="Duration"
              value={`${workout.duration} min`}
            />

            <DetailRow
              label="Calories"
              value={`${workout.caloriesBurned} kcal`}
            />

            <DetailRow
              label="Rating"
              value={workout.rating}
            />

          </div>

          <section className="mt-0">

            <h2 className="border-b border-[#222630] py-4 font-[var(--font-inter)] text-base font-extrabold uppercase tracking-[0.8px]">
              Instructions
            </h2>

            <ol>
              {workout.instructions?.slice(0, 4).map(
                (instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 border-b border-[#222630] py-3"
                  >
                    <span className="w-4 shrink-0 text-sm font-medium text-white">
                      {index + 1}.
                    </span>

                    <span className="text-sm leading-6 text-[#8a92a0]">
                      {instruction}
                    </span>
                  </li>
                )
              )}
            </ol>

          </section>

          <div className="mt-7 flex flex-wrap gap-4">

            <button
              onClick={() => addToPlan(workout)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-6 text-sm font-bold text-black transition hover:bg-white"
            >
              <Check size={16} />
              Add to today&apos;s plan
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              className="flex h-[46px] items-center justify-center gap-2 rounded-xl border border-[#374151] px-6 text-sm font-medium text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              <Bookmark size={16} />
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
    <div className="flex min-h-[49px] items-center justify-between border-b border-[#222630] px-6 last:border-b-0">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#8a92a0]">
        {label}
      </span>

      <span className="text-sm font-medium text-white">
        {value}
      </span>
    </div>
  );
}