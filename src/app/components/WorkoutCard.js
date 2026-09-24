import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

const workoutTags = {
  "Barbell Bench Press": ["CHEST", "ARMS"],
  "Pull-Up": ["BACK", "ARMS"],
  "Back Squat": ["LEGS", "CORE"],
  "Overhead Press": ["SHOULDERS", "ARMS"],
  "Dumbbell Bicep Curl": ["ARMS"],
  "Hollow-Body Plank": ["CORE"],
  "Conventional Deadlift": ["BACK", "LEGS"],
  "Push-Up": ["CHEST", "ARMS", "CORE"],
  "Walking Lunge": ["LEGS"],
  "Russian Twist": ["CORE"],
};

export default function WorkoutCard({ workout }) {
  const tags = workoutTags[workout.name?.trim()] || [];

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-[5px] border border-[#292d34] bg-[#15171d] transition hover:border-[#c2f800]"
    >
      <div className="h-[150px] overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="min-h-[126px] p-3">
        <div className="flex min-h-[17px] flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-[16px] items-center rounded-[2px] bg-[#c2f800] px-1.5 font-[var(--font-inter)] text-[6px] font-bold uppercase tracking-[0.3px] text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-1 font-[var(--font-oswald)] text-[11px] font-bold uppercase leading-[1.3] tracking-[0.25px] text-white">
          {workout.name}
        </h3>

        <p className="font-[var(--font-inter)] text-[7px] leading-4 text-[#8a92a0]">
          {workout.equipment}
        </p>

        <div className="mt-2 border-t border-[#292d34] pt-2">
          <div className="flex items-center gap-3 font-[var(--font-inter)] text-[7px] text-[#8a92a0]">
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
      </div>
    </Link>
  );
}