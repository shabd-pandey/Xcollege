import { mockNotes } from "@/data/mock";
import type { Note, MaterialType } from "@/types";

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const noteService = {
  async getNotes(): Promise<Note[]> {
    await delay();
    return mockNotes.filter((note) => note.status === "approved");
  },

  async getNotesBySemester(semester: number | null): Promise<Note[]> {
    await delay();
    const approved = mockNotes.filter((note) => note.status === "approved");
    if (semester === null) return approved;
    return approved.filter((note) => note.semester === semester);
  },

  async getNotesByType(type: MaterialType | "all"): Promise<Note[]> {
    await delay();
    const approved = mockNotes.filter((note) => note.status === "approved");
    if (type === "all") return approved;
    return approved.filter((note) => note.type === type);
  },

  async getNoteById(id: string): Promise<Note | null> {
    await delay();
    return mockNotes.find((note) => note.id === id && note.status === "approved") ?? null;
  },

  async getNotesBySemesterAndType(
    semester: number | null,
    type: MaterialType | "all",
  ): Promise<Note[]> {
    await delay();
    let notes = mockNotes.filter((note) => note.status === "approved");
    if (semester !== null) {
      notes = notes.filter((note) => note.semester === semester);
    }
    if (type !== "all") {
      notes = notes.filter((note) => note.type === type);
    }
    return notes;
  },

  async getRecentNotes(limit = 4): Promise<Note[]> {
    await delay();
    return [...mockNotes]
      .filter((note) => note.status === "approved")
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, limit);
  },

  async getSemesters(): Promise<number[]> {
    await delay(40);
    return [1, 2, 3, 4, 5, 6, 7, 8];
  },

  async countNotes(): Promise<number> {
    await delay(40);
    return mockNotes.filter((note) => note.status === "approved").length;
  },
};
