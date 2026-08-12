import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { noteService } from "@/services/noteService";
import { MaterialTypeBadge } from "@/components/notes/MaterialTypeBadge";
import { DownloadButton } from "@/components/notes/DownloadButton";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatDownloads } from "@/utils/format";

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await noteService.getNoteById(id);
  return { title: note ? note.title : "Note not found" };
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { id } = await params;
  const note = await noteService.getNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/notes"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Back to notes
      </Link>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <MaterialTypeBadge type={note.type} />
          <Badge variant="blue">Sem {note.semester}</Badge>
          <Badge variant="gray">{note.branch}</Badge>
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {note.title}
        </h1>
        <p className="mt-2 text-base font-medium text-blue-600">{note.subject}</p>
        <p className="mt-4 leading-7 text-gray-600">{note.description}</p>

        <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-xs text-gray-500">Format</p>
            <p className="mt-0.5 font-medium text-gray-900">{note.format.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">File size</p>
            <p className="mt-0.5 font-medium text-gray-900">{note.fileSize}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Downloads</p>
            <p className="mt-0.5 font-medium text-gray-900">
              {formatDownloads(note.downloads)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Uploaded</p>
            <p className="mt-0.5 font-medium text-gray-900">{formatDate(note.uploadedAt)}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Shared by <span className="font-medium text-gray-700">{note.uploadedBy}</span>
          </p>
          <DownloadButton title={note.title} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-base font-semibold text-gray-900">Have better material?</h2>
        <p className="mt-1 text-sm text-gray-500">
          Found something missing or outdated? Upload an improved version — it will be
          published after admin approval.
        </p>
        <Link href="/upload" className="mt-4 inline-block">
          <Button size="sm" variant="outline">
            Upload material
          </Button>
        </Link>
      </Card>
    </div>
  );
}
