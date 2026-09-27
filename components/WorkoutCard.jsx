"use client";

import Image from "next/image";
import { Clock3, Flame, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkoutCard({ workout }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/workout/${workout.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50"
    >
      {/* WORKOUT IMAGE */}
      <div className="relative h-[210px] w-full overflow-hidden bg-[#181818] sm:h-[230px] lg:h-[240px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        {/* TAGS */}
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#ccff00]"
            >
              {muscle}
            </span>
          ))}

          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
            {workout.difficulty}
          </span>
        </div>

        {/* NAME */}
        <h3 className="text-2xl font-bold uppercase leading-tight tracking-tight text-white">
          {workout.name}
        </h3>

        {/* EQUIPMENT */}
        <p className="mt-2 text-sm text-gray-400">
          {workout.equipment}
        </p>

        {/* STATS */}
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-gray-300">
            <div className="flex items-center gap-1.5">
              <Clock3
                size={16}
                className="text-[#ccff00]"
              />
              <span>{workout.duration} min</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Flame
                size={16}
                className="text-[#ccff00]"
              />
              <span>
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Star
                size={16}
                className="text-[#ccff00]"
              />
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}