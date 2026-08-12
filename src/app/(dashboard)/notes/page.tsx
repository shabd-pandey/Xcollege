import type { Metadata } from "next";
import { noteService } from "@/services/noteService";
import { MATERIAL_TYPES, SEMESTERS } from "@/lib/constants";
import type { MaterialType } from "@/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterTabs, type FilterTabItem } from "@/components/ui/FilterTabs";
import { NoteCard } from "@/components/notes/NoteCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Notes & Study Material",
};

interface NotesPageProps {
  searchParams: Promise<{ semester?: string; type?: string }>;
}

function parseSemester(raw: string | undefined): number | null {
  if (!raw) return null;
  const value = Number(raw);
  return Number.isInteger(value) && value >= 1 && value <= 8 ? value : null;
}

function parseType(raw: string | undefined): MaterialType | "all" {
  if (raw && MATERIAL_TYPES.some((t) => t.value === raw)) {
    return raw as MaterialType;
  }
  return "all";
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;
  const semester = parseSemester(params.semester);
  const type = parseType(params.type);

  const notes = await noteService.getNotesBySemesterAndType(semester, type);

  function href(nextSemester: number | null, nextType: MaterialType | "all") {
    const search = new URLSearchParams();
    if (nextSemester !== null) search.set("semester", String(nextSemester));
    if (nextType !== "all") search.set("type", nextType);
    const qs = search.toString();
    return `/notes${qs ? `?${qs}` : ""}`;
  }

  const typeTabs: FilterTabItem[] = (
    [{ value: "all", label: "All" } as const, ...MATERIAL_TYPES]
  ).map((item) => ({
    label: item.label,
    href: href(semester, item.value),
    active: type === item.value,
  }));

  const semesterTabs: FilterTabItem[] = SEMESTERS.map((s) => ({
    label: `Sem ${s}`,
    href: href(s, type),
    active: semester === s,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notes & Study Material"
        description="Download notes, previous year papers, assignments and practicals for your semester."
      />

      <div className="space-y-3">
        <FilterTabs items={semesterTabs} />
        <FilterTabs items={typeTabs} />
      </div>

      <p className="text-sm text-gray-500">
        {semester ? `Showing Semester ${semester} material` : "Showing all semesters"} ·{" "}
        {notes.length} item{notes.length === 1 ? "" : "s"}
      </p>

      {notes.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No material found"
          description="Nothing matches this combination yet. Try a different semester or type, or upload it yourself!"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
