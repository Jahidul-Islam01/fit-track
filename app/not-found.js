import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-5">
      <div className="max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10">
          <Dumbbell
            size={30}
            className="text-[#ccff00]"
          />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ccff00]">
          ERROR 404
        </p>

        <h1 className="mt-4 text-5xl font-black uppercase tracking-tight md:text-6xl">
          PAGE NOT FOUND
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-7 text-gray-400">
          The page you are looking for does not exist.
          Head back to the workout library and keep training.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:brightness-90"
        >
          <ArrowLeft size={18} />
          BACK TO WORKOUTS
        </Link>
      </div>
    </main>
  );
}