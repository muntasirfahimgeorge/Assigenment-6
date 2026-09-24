import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

const workoutTags = {
  "Barbell Bench Press": ["CHEST", "ARMS"],
  "Pull-Up": ["BACK", "ARMS"],
  "Pull-up": ["BACK", "ARMS"],
  "Back Squat": ["LEGS", "CORE"],
  "Overhead Press": ["SHOULDERS", "ARMS"],
  "Dumbbell Bicep Curl": ["ARMS"],
  "Hollow-Body Plank": ["CORE"],
  "Conventional Deadlift": ["BACK", "LEGS"],
  "Push-Up": ["CHEST", "ARMS", "CORE"],
  "Push-up": ["CHEST", "ARMS", "CORE"],
  "Walking Lunge": ["LEGS"],
  "Russian Twist": ["CORE"],
};

export default function WorkoutCard({ workout }) {
  const tags = workoutTags[workout.name] || [];

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block h-[368px] overflow-hidden rounded-2xl border border-[#222630] bg-[#15171d] transition hover:border-[#c2f800]"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="h-[174px] p-6">

        <div className="flex h-[21px] flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-[21px] items-center rounded-full bg-[#c2f800] px-[10px] py-[2px] font-[var(--font-inter)] text-[11px] font-bold uppercase leading-[1.5] tracking-[0.55px] text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-1 font-[var(--font-oswald)] text-lg font-bold uppercase leading-[1.555] tracking-[0.45px] text-white">
          {workout.name}
        </h3>

        <p className="text-xs leading-[1.333] text-[#9ca3af]">
          {workout.equipment}
        </p>

        <div className="mt-4 border-t border-[#222630] pt-3">
          <div className="flex items-center gap-5 text-xs leading-[1.333] text-[#9ca3af]">

            <span className="flex items-center gap-1.5">
              <Clock3 size={14} />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1.5">
              <Flame size={14} />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1.5">
              <Star size={14} />
              {workout.rating}
            </span>

          </div>
        </div>

      </div>
    </Link>
  );
}