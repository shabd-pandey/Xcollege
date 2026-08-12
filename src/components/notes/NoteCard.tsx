import Link from "next/link";
import type { Note } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MaterialTypeBadge } from "@/components/notes/MaterialTypeBadge";
import { formatDate, formatDownloads } from "@/utils/format";

export function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/notes/${note.id}`} className="block h-full">
      <Card className="flex h-full flex-col p-5 transition-all hover:border-blue-300 hover:shadow-md">
        <div className="flex items-center justify-between">
          <MaterialTypeBadge type={note.type} />
          <span className="text-xs font-medium text-gray-500">
            Sem {note.semester}
          </span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-base font-semibold text-gray-900">
          {note.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-blue-600">{note.subject}</p>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">
          {note.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Badge variant="gray">{note.format.toUpperCase()}</Badge>
            {note.fileSize}
          </span>
          <span>{formatDownloads(note.downloads)} downloads</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span>by {note.uploadedBy}</span>
          <span>{formatDate(note.uploadedAt)}</span>
        </div>
      </Card>
    </Link>
  );
}
