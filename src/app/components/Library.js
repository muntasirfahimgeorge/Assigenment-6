"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        return response.json();
      })
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const defaultOrder = [
    "Barbell Bench Press",
    "Pull-up",
    "Back Squat",
    "Overhead Press",
    "Dumbbell Bicep Curl",
    "Dumbbell Bicep Curl",
    "Hollow-Body Plank",
    "Dumbbell Bicep Curl",
    "Conventional Deadlift",
    "Push-up",
    "Walking Lunge",
    "Russian Twist",
  ];

  const findWorkout = (name) => {
    return workouts.find(
      (workout) =>
        workout.name.toLowerCase() === name.toLowerCase()
    );
  };

  const orderedWorkouts = defaultOrder
    .map((name) => findWorkout(name))
    .filter(Boolean);

  const displayWorkouts =
    sortBy === ""
      ? orderedWorkouts
      : [...workouts].sort((a, b) => {
          if (sortBy === "duration") {
            return (
              Number(a.duration || 0) -
              Number(b.duration || 0)
            );
          }

          if (sortBy === "calories") {
            return (
              Number(b.caloriesBurned || 0) -
              Number(a.caloriesBurned || 0)
            );
          }

          if (sortBy === "rating") {
            return (
              Number(b.rating || 0) -
              Number(a.rating || 0)
            );
          }

          return 0;
        });

  return (
    <section
      id="library"
      className="mx-auto max-w-[1280px] scroll-mt-20 px-6 pb-16 pt-8"
    >
      <div className="mb-8">
        <h2 className="font-[var(--font-oswald)] text-[30px] font-bold uppercase leading-[1.2] tracking-[-0.75px] text-white">
          THE LIBRARY
        </h2>

        <p className="mt-1 text-sm leading-5 text-[#9ca3af]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="mb-8 flex justify-end">
        <label className="flex h-10 items-center gap-3 border border-[#222630] bg-[#15171d] px-4">
          <span className="text-xs text-[#8a92a0]">
            Sort By
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="appearance-none bg-transparent pr-5 text-xs font-medium text-white outline-none"
            >
              <option value="" className="bg-[#15171d]">
                Select
              </option>

              <option value="duration" className="bg-[#15171d]">
                Duration
              </option>

              <option value="calories" className="bg-[#15171d]">
                Calories
              </option>

              <option value="rating" className="bg-[#15171d]">
                Rating
              </option>
            </select>

            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#8a92a0]"
            />
          </div>
        </label>
      </div>

      {loading && (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#333] border-t-[#c2f800]" />
        </div>
      )}

      {!loading && workouts.length === 0 && (
        <div className="flex min-h-[400px] items-center justify-center text-center">
          <div>
            <h3 className="font-[var(--font-oswald)] text-2xl font-bold uppercase">
              NO WORKOUTS FOUND
            </h3>

            <p className="mt-2 text-sm text-[#8a92a0]">
              Unable to load the workout library.
            </p>
          </div>
        </div>
      )}

      {!loading && workouts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayWorkouts.map((workout, index) => (
            <WorkoutCard
              key={`${workout.id}-${index}`}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}