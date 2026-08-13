"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { SemesterBanner } from "@/components/layout/SemesterBanner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <main className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <p className="text-sm">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-50">
      <SemesterBanner />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </main>
  );
}
