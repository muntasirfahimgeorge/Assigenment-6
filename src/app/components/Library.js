"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        return response.json();
      })
      .then((data) => {
        const requiredOrder = [
          "Barbell Bench Press",
          "Pull-Up",
          "Back Squat",
          "Overhead Press",
          "Dumbbell Bicep Curl",
          "Dumbbell Bicep Curl",
          "Hollow-Body Plank",
          "Dumbbell Bicep Curl",
          "Conventional Deadlift",
          "Push-Up",
          "Walking Lunge",
          "Russian Twist",
        ];

        const orderedWorkouts = requiredOrder.map((name, index) => {
          const sameNameWorkouts = data.filter(
            (workout) =>
              workout.name?.trim().toLowerCase() === name.toLowerCase()
          );

          return sameNameWorkouts[index] || sameNameWorkouts[0];
        });

        setWorkouts(orderedWorkouts.filter(Boolean));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const displayWorkouts =
    sortBy === "default"
      ? workouts
      : [...workouts].sort((a, b) => {
          if (sortBy === "duration") {
            return Number(a.duration || 0) - Number(b.duration || 0);
          }

          if (sortBy === "calories") {
            return Number(b.caloriesBurned || 0) - Number(a.caloriesBurned || 0);
          }

          if (sortBy === "rating") {
            return Number(b.rating || 0) - Number(a.rating || 0);
          }

          return 0;
        });

  return (
    <section
      id="library"
      className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pb-12 pt-8 sm:px-6"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[var(--font-oswald)] text-[24px] font-bold uppercase leading-none tracking-[-0.5px] text-white sm:text-[28px]">
            THE LIBRARY
          </h2>

          <p className="mt-1 font-[var(--font-inter)] text-[9px] leading-4 text-[#8a92a0] sm:text-[10px]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <label className="flex h-8 items-center gap-2 border border-[#292d34] bg-[#15171d] px-3">
          <span className="font-[var(--font-inter)] text-[8px] text-[#8a92a0]">
            Sort By
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="appearance-none bg-transparent pr-4 font-[var(--font-inter)] text-[8px] font-medium text-white outline-none"
            >
              <option value="default" className="bg-[#15171d]">
                Default
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
              size={10}
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#8a92a0]"
            />
          </div>
        </label>
      </div>

      {loading && (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#333] border-t-[#c2f800]" />
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayWorkouts.map((workout, index) => (
            <WorkoutCard
              key={`${workout.id}-${index}`}
              workout={workout}
              position={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}