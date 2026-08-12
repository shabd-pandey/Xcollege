"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { noteService } from "@/services/noteService";
import { foodService } from "@/services/foodService";
import { productService } from "@/services/productService";
import { uploadService } from "@/services/uploadService";
import type { Note } from "@/types";
import { StatCard } from "@/components/dashboard/StatCard";
import { NoteCard } from "@/components/notes/NoteCard";
import { Card, CardContent } from "@/components/ui/Card";

interface Stats {
  notes: number;
  food: number;
  products: number;
  uploads: number;
  pending: number;
}

export default function DashboardPage() {
  const { session } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function load() {
      const [notes, food, products, recent] = await Promise.all([
        noteService.countNotes(),
        foodService.countPlaces(),
        productService.countProducts(),
        noteService.getRecentNotes(3),
      ]);
      const drafts = uploadService.getDrafts();
      setStats({
        notes,
        food,
        products,
        uploads: drafts.length,
        pending: drafts.filter((d) => d.status === "pending").length,
      });
      setRecentNotes(recent);
    }
    load();
  }, []);

  const firstName = session?.name?.split(" ")[0] ?? "Student";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {session?.semester
              ? `Here's an overview for your Semester ${session.semester}.`
              : "Pick your semester from the bar above to personalise your study material."}
          </p>
        </div>
        <div className="flex gap-2">
          {session?.branch && (
            <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {session.branch}
            </span>
          )}
          {session?.semester && (
            <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Semester {session.semester}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Study materials"
          value={stats?.notes ?? "—"}
          icon="📚"
          href="/notes"
        />
        <StatCard
          title="Food & shop spots"
          value={stats?.food ?? "—"}
          icon="🍜"
          href="/food"
        />
        <StatCard
          title="Products listed"
          value={stats?.products ?? "—"}
          icon="♻️"
          href="/products"
        />
        <StatCard
          title="Your uploads"
          value={stats?.uploads ?? 0}
          icon="⬆️"
          href="/upload"
        />
      </div>

      {stats && stats.pending > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <span className="text-xl">⏳</span>
          <div>
            <p className="text-sm font-medium text-amber-900">
              {stats.pending} upload{stats.pending > 1 ? "s" : ""} awaiting admin approval
            </p>
            <p className="text-sm text-amber-700">
              Your submitted material will be visible to everyone once the admin approves it.
            </p>
          </div>
        </div>
      )}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Most downloaded</h2>
          <Link
            href="/notes"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all →
          </Link>
        </div>
        {recentNotes.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-sm text-gray-500">
              Loading study material...
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
