"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { SEMESTERS } from "@/lib/constants";

export function SemesterBanner() {
  const { session, updateSemester } = useAuth();
  const router = useRouter();

  if (!session || session.semester !== null) return null;

  function choose(semester: number) {
    updateSemester(semester);
    router.push(`/notes?semester=${semester}`);
  }

  return (
    <div className="border-b border-blue-100 bg-blue-50">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <p className="text-sm font-medium text-blue-900">
          Welcome, {session.name.split(" ")[0]}! Select your semester to see relevant
          study material. This bar will disappear once you choose.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SEMESTERS.map((semester) => (
            <button
              key={semester}
              type="button"
              onClick={() => choose(semester)}
              className="h-9 min-w-10 rounded-lg border border-blue-200 bg-white px-3 text-sm font-medium text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-100"
            >
              Sem {semester}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
