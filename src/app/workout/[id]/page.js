"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Bookmark,
  Check,
  Clock3,
  Flame,
  Star,
  Dumbbell,
} from "lucide-react";
import { useFitLog } from "../../components/FitLogContext";
import { getWorkout } from "../../lib/api";

const workoutTags = {
  "Barbell Bench Press": ["Chest", "Arms"],
  "Pull-Up": ["Back", "Arms"],
  "Back Squat": ["Legs", "Barbell"],
  "Overhead Press": ["Shoulders", "Arms"],
  "Dumbbell Bicep Curl": ["Arms", "Dumbbell"],
  "Hollow-body Plank": ["Core"],
  "Conventional Deadlift": ["Back", "Barbell"],
  "Push-Up": ["Chest", "Arms"],
  "Walking Lunge": ["Legs"],
  "Russian Twist": ["Core"],
  "Kettlebell Swing": ["Glutes", "Kettlebell"],
  Burpee: ["Full Body"],
};

export default function WorkoutDetails() {
  const { id } = useParams();
  const { addToPlan, saveWorkout } = useFitLog();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    getWorkout(id)
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Workout not found");
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

  if (error || !workout) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-5 text-center">
        <div>
          <h1 className="text-5xl font-black uppercase">
            Workout Not Found
          </h1>

          <Link
            href="/"
            className="mt-6 inline-flex bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black"
          >
            Back to Workouts
          </Link>
        </div>
      </main>
    );
  }

  const tags = workoutTags[workout.name] || [];

  return (
    <main className="mx-auto max-w-[1232px] px-5 py-12">
      <div className="grid gap-14 lg:grid-cols-2">

        <div className="overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-auto min-h-[735px] w-full rounded-2xl object-cover"
          />
        </div>

        <div>

          <h1 className="text-[40px] font-black uppercase leading-none tracking-[-0.02em]">
            {workout.name}
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#8a92a0]">
            {workout.description}
          </p>

          <div className="mt-5 flex h-6 items-center gap-0">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-6 items-center rounded-full bg-[#ccff00] px-[14px] py-1 text-[11px] font-bold uppercase leading-none text-black"
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

          <div className="mt-7">

            <h2 className="text-sm font-black uppercase tracking-[0.12em]">
              Instructions
            </h2>

            <ol className="mt-4">
              {workout.instructions?.slice(0, 4).map(
                (instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 border-b border-[#222630] py-3 first:pt-0"
                  >
                    <span className="w-5 shrink-0 text-sm font-bold text-white">
                      {index + 1}.
                    </span>

                    <span className="text-sm leading-6 text-[#8a92a0]">
                      {instruction}
                    </span>
                  </li>
                )
              )}
            </ol>

          </div>

          <div className="mt-8 flex gap-4">

            <button
              onClick={() => addToPlan(workout)}
              className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#ccff00] px-6 text-sm font-bold text-black transition hover:bg-white"
            >
              <Check size={16} />
              Add to today&apos;s plan
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#343943] px-6 text-sm font-medium text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
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
    <div className="flex min-h-12 items-center justify-between border-b border-[#222630] px-6 last:border-b-0">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#8a92a0]">
        {label}
      </span>

      <span className="text-sm font-medium text-white">
        {value}
      </span>
    </div>
  );
}