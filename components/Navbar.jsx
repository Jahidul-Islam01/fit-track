"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/components/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workout/");

  const myPlanActive = pathname === "/my-plan";

  return (
    <nav className="border-b border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={38}
              height={38}
              priority
            />

            <span className="hidden text-xl font-bold tracking-wide text-white sm:block">
              FITLOG
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center gap-4 sm:gap-8">
            <Link
              href="/"
              className={`text-sm transition sm:text-base ${
                workoutActive
                  ? "font-semibold text-[#ccff00]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className={`text-sm transition sm:text-base ${
                myPlanActive
                  ? "font-semibold text-[#ccff00]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

          {/* COUNTERS */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold text-black sm:px-4 sm:text-sm"
            >
              <span className="hidden sm:inline">
                Plan{" "}
              </span>
              {plan.length}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm"
            >
              <span className="hidden sm:inline">
                Saved{" "}
              </span>
              {saved.length}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}