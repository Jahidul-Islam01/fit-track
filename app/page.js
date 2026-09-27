"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  LoaderCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import WorkoutCard from "@/components/WorkoutCard";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    async function getWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to load workouts");
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    }

    getWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const sorted = [...workouts];

    if (sortBy === "duration") {
      sorted.sort(
        (a, b) =>
          Number(a.duration) - Number(b.duration)
      );
    }

    if (sortBy === "calories") {
      sorted.sort(
        (a, b) =>
          Number(b.caloriesBurned) -
          Number(a.caloriesBurned)
      );
    }

    if (sortBy === "rating") {
      sorted.sort(
        (a, b) =>
          Number(b.rating) - Number(a.rating)
      );
    }

    return sorted;
  }, [workouts, sortBy]);

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-12 sm:px-5 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#ccff00] sm:text-sm">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-[42px] font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[64px]">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today&apos;s plan,
              and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3.5 text-sm font-bold text-black transition hover:brightness-90 sm:mt-8 sm:px-7"
            >
              BROWSE WORKOUTS
              <ArrowRight
                size={18}
                strokeWidth={2.5}
              />
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <Image
              src="/assets/banner.png"
              alt="FitLog workout"
              width={600}
              height={600}
              priority
              className="h-auto w-full max-w-[460px] object-contain sm:max-w-[520px] lg:max-w-[560px]"
            />
          </div>
        </section>

        {/* WORKOUT LIBRARY */}
        <section
          id="library"
          className="border-t border-white/10 bg-[#0d0d0d] py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="mb-9 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
                  THE LIBRARY
                </h2>

                <p className="mt-3 text-sm text-gray-400 sm:text-base">
                  Twelve lifts covering every major muscle
                  group.
                </p>
              </div>

              {/* SORT */}
              <div className="w-full sm:w-auto">
                <label
                  htmlFor="sort"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gray-500"
                >
                  Sort by
                </label>

                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                    className="w-full appearance-none rounded-full border border-white/20 bg-[#111111] py-3 pl-5 pr-12 text-sm font-bold text-white outline-none transition focus:border-[#ccff00] sm:w-auto"
                  >
                    <option value="duration">
                      Duration
                    </option>
                    <option value="calories">
                      Calories
                    </option>
                    <option value="rating">
                      Rating
                    </option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ccff00]"
                  />
                </div>
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
                <LoaderCircle
                  size={36}
                  className="animate-spin text-[#ccff00]"
                />

                <p className="text-sm text-gray-400">
                  Loading workouts...
                </p>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="flex min-h-[250px] items-center justify-center text-center">
                <p className="text-gray-400">
                  {error}
                </p>
              </div>
            )}

            {/* CARDS */}
            {!loading && !error && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}