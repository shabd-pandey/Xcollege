"use client";

import type { UploadDraft, MaterialType } from "@/types";

const DRAFTS_KEY = "xcollege_uploads";

export interface UploadInput {
  title: string;
  subject: string;
  type: MaterialType;
  semester: number;
  branch: string;
  description: string;
  fileName: string;
  fileSize: string;
}

export const uploadService = {
  getDrafts(): UploadDraft[] {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(DRAFTS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as UploadDraft[];
    } catch {
      return [];
    }
  },

  async submit(input: UploadInput): Promise<UploadDraft> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const draft: UploadDraft = {
      id: `up-${Date.now()}`,
      title: input.title,
      subject: input.subject,
      type: input.type,
      semester: input.semester,
      branch: input.branch,
      description: input.description,
      fileName: input.fileName,
      fileSize: input.fileSize,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: "pending",
    };
    const drafts = this.getDrafts();
    drafts.unshift(draft);
    window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    return draft;
  },
};
