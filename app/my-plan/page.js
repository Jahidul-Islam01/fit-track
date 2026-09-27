"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Dumbbell,
  Clock3,
  Flame,
  Star,
  Check,
  X,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { useWorkout } from "@/components/WorkoutContext";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("plan");

  const {
    plan,
    saved,
    loaded,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = useWorkout();

  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  const displayedWorkouts =
    activeTab === "plan" ? plan : saved;

  const handleDone = (id) => {
    markAsDone(id);
    toast.success("Workout marked as done.");
  };

  const handleRemove = (id) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      toast.success(
        "Workout removed from today's plan."
      );
    } else {
      removeFromSaved(id);
      toast.success(
        "Workout removed from saved workouts."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-5 sm:py-12 lg:py-14">
        <section>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#ccff00] sm:text-sm">
            WORKOUT PLANNER
          </p>

          <h1 className="text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-10">
          <MetricCard
            icon={<Dumbbell size={22} />}
            label="Exercises"
            value={plan.length}
          />

          <MetricCard
            icon={<Clock3 size={22} />}
            label="Minutes"
            value={totalMinutes}
          />

          <MetricCard
            icon={<Flame size={22} />}
            label="Calories"
            value={totalCalories}
          />
        </section>

        <section className="mt-10 sm:mt-12">
          <div className="flex overflow-x-auto border-b border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`shrink-0 border-b-2 px-3 py-4 text-xs font-bold uppercase tracking-wide transition sm:px-5 sm:text-sm ${
                activeTab === "plan"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({plan.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`shrink-0 border-b-2 px-3 py-4 text-xs font-bold uppercase tracking-wide transition sm:px-5 sm:text-sm ${
                activeTab === "saved"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              Saved ({saved.length})
            </button>
          </div>

          {!loaded && (
            <div className="flex min-h-[360px] flex-col items-center justify-center gap-4">
              <LoaderCircle
                size={36}
                className="animate-spin text-[#ccff00]"
              />

              <p className="text-gray-400">
                Loading workouts…
              </p>
            </div>
          )}

          {loaded &&
            displayedWorkouts.length === 0 && (
              <div className="flex min-h-[360px] flex-col items-center justify-center px-4 text-center">
                <Dumbbell
                  size={42}
                  className="mb-5 text-[#ccff00]"
                />

                <h2 className="text-2xl font-bold uppercase sm:text-3xl">
                  NOTHING HERE YET
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
                  Browse the library and add a lift to get
                  today moving.
                </p>

                <Link
                  href="/#library"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
                >
                  Go to workouts
                  <ArrowRight size={18} />
                </Link>
              </div>
            )}

          {loaded &&
            displayedWorkouts.length > 0 && (
              <div className="mt-6 space-y-4 sm:mt-8">
                {displayedWorkouts.map(
                  (workout) => (
                    <div
                      key={workout.id}
                      className="flex flex-col gap-5 rounded-xl border border-white/10 bg-[#111111] p-4 md:flex-row md:items-center"
                    >
                      <div className="relative h-[190px] w-full shrink-0 overflow-hidden rounded-lg bg-[#181818] sm:h-[220px] md:h-[130px] md:w-[190px]">
                        <Image
                          src={workout.image}
                          alt={workout.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 767px) 100vw, 190px"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold uppercase leading-tight sm:text-2xl">
                          {workout.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-400">
                          {workout.equipment}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
                          <span className="flex items-center gap-2">
                            <Clock3
                              size={16}
                              className="text-[#ccff00]"
                            />
                            {workout.duration} min
                          </span>

                          <span className="flex items-center gap-2">
                            <Flame
                              size={16}
                              className="text-[#ccff00]"
                            />
                            {workout.caloriesBurned} kcal
                          </span>

                          <span className="flex items-center gap-2">
                            <Star
                              size={16}
                              className="text-[#ccff00]"
                            />
                            {workout.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 md:justify-end">
                        <Link
                          href={`/workout/${workout.id}`}
                          className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-bold transition hover:border-[#ccff00] hover:text-[#ccff00]"
                        >
                          View Details
                        </Link>

                        {activeTab === "plan" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleDone(
                                workout.id
                              )
                            }
                            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
                          >
                            <Check size={16} />
                            Mark as Done
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(
                              workout.id
                            )
                          }
                          aria-label={`Remove ${workout.name}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-gray-300 transition hover:border-red-400 hover:text-red-400"
                        >
                          <X size={17} />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
        </section>
      </main>
    </>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-5 sm:p-6">
      <div className="flex items-center gap-2 text-[#ccff00]">
        {icon}

        <span className="text-xs font-bold uppercase tracking-[0.16em]">
          {label}
        </span>
      </div>

      <p className="mt-4 text-3xl font-black sm:text-4xl">
        {value}
      </p>
    </div>
  );
}