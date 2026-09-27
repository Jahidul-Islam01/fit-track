"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Clock3,
  Flame,
  Star,
  Dumbbell,
  Gauge,
  Layers3,
  Repeat2,
  Bookmark,
  Plus,
  LoaderCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { useWorkout } from "@/components/WorkoutContext";

export default function WorkoutDetails() {
  const params = useParams();
  const { addToPlan, saveWorkout } = useWorkout();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getWorkout() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load workout");
        }

        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        setError("Failed to load workout details.");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      getWorkout();
    }
  }, [params.id]);

  const handleAddToPlan = () => {
    const result = addToPlan(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleSaveWorkout = () => {
    const result = saveWorkout(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5">
          <LoaderCircle
            size={40}
            className="animate-spin text-[#ccff00]"
          />

          <p className="text-gray-400">
            Loading workout...
          </p>
        </main>
      </>
    );
  }

  if (error || !workout) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-5 text-center">
          <h1 className="text-3xl font-black uppercase">
            Workout not found
          </h1>

          <p className="text-gray-400">
            {error || "This workout could not be found."}
          </p>

          <Link
            href="/"
            className="rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
          >
            Back to workouts
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-5 sm:py-10 lg:py-12">
        {/* BACK LINK */}
        <Link
          href="/#library"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#ccff00] sm:mb-8"
        >
          <ArrowLeft size={18} />
          BACK TO LIBRARY
        </Link>

        {/* DETAILS */}
        <section className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* IMAGE */}
          <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-white/10 bg-[#111111] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[560px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* CONTENT */}
          <div>
            {/* TAGS */}
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ccff00]"
                >
                  {muscle}
                </span>
              ))}

              <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-300">
                {workout.difficulty}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {workout.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              {workout.description}
            </p>

            {/* SPECS */}
            <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <SpecItem
                  icon={<Dumbbell size={18} />}
                  label="Equipment"
                  value={workout.equipment}
                />

                <SpecItem
                  icon={<Gauge size={18} />}
                  label="Difficulty"
                  value={workout.difficulty}
                />

                <SpecItem
                  icon={<Layers3 size={18} />}
                  label="Sets"
                  value={workout.sets}
                />

                <SpecItem
                  icon={<Repeat2 size={18} />}
                  label="Reps"
                  value={workout.reps}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <SpecItem
                  icon={<Clock3 size={18} />}
                  label="Duration"
                  value={`${workout.duration} min`}
                />

                <SpecItem
                  icon={<Flame size={18} />}
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <SpecItem
                  icon={<Star size={18} />}
                  label="Rating"
                  value={workout.rating}
                />
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-9">
              <h2 className="text-2xl font-black uppercase">
                Instructions
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-4 text-gray-300"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-black text-black">
                        {index + 1}
                      </span>

                      <p className="pt-1 leading-6">
                        {instruction}
                      </p>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToPlan}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-3.5 text-sm font-bold text-black transition hover:brightness-90 sm:w-auto sm:px-7"
              >
                <Plus size={19} />
                ADD TO TODAY&apos;S PLAN
              </button>

              <button
                type="button"
                onClick={handleSaveWorkout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00] sm:w-auto sm:px-7"
              >
                <Bookmark size={18} />
                SAVE FOR LATER
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function SpecItem({ icon, label, value }) {
  return (
    <div className="border-b border-white/10 p-4 sm:border-r sm:last:border-r-0">
      <div className="flex items-center gap-2 text-[#ccff00]">
        {icon}

        <span className="text-xs font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words font-semibold text-white">
        {value}
      </p>
    </div>
  );
}