"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { BRANCHES, MATERIAL_TYPES, SEMESTERS } from "@/lib/constants";
import { uploadService } from "@/services/uploadService";
import type { MaterialType, UploadDraft } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatFileSize } from "@/utils/format";

interface Errors {
  title?: string;
  subject?: string;
  file?: string;
  description?: string;
}

export function UploadMaterialForm() {
  const { session } = useAuth();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState<MaterialType>("notes");
  const [semester, setSemester] = useState(String(session?.semester ?? 1));
  const [branch, setBranch] = useState(session?.branch ?? "CSE");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<UploadDraft | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const myDrafts = uploadService.getDrafts();

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!title.trim()) nextErrors.title = "Title is required.";
    if (!subject.trim()) nextErrors.subject = "Subject is required.";
    if (!fileName) nextErrors.file = "Please attach a file.";
    if (!description.trim()) nextErrors.description = "Add a short description.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const draft = await uploadService.submit({
        title,
        subject,
        type,
        semester: Number(semester),
        branch,
        description,
        fileName,
        fileSize,
      });
      setSubmitted(draft);
      setTitle("");
      setSubject("");
      setDescription("");
      setFileName("");
      setFileSize("");
      setType("notes");
      setSemester(String(session?.semester ?? 1));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {submitted && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <p className="font-medium">Upload submitted successfully!</p>
          <p className="mt-1">
            &quot;{submitted.title}&quot; is now pending admin approval. Once approved it
            will appear in the Notes section for everyone.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="title"
          label="Material title"
          placeholder="e.g. Data Structures Unit 3 Notes"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={errors.title}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="subject"
            label="Subject"
            placeholder="e.g. Data Structures & Algorithms"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            error={errors.subject}
          />
          <Select
            id="type"
            label="Material type"
            value={type}
            onChange={(event) => setType(event.target.value as MaterialType)}
            options={MATERIAL_TYPES.map((t) => ({ value: t.value, label: t.label }))}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            id="semester"
            label="Semester"
            value={semester}
            onChange={(event) => setSemester(event.target.value)}
            options={SEMESTERS.map((s) => ({ value: String(s), label: `Semester ${s}` }))}
          />
          <Select
            id="branch"
            label="Branch"
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
            options={BRANCHES}
          />
        </div>
        <div>
          <label htmlFor="file" className="mb-1.5 block text-sm font-medium text-gray-700">
            Attach file
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFile}
            className="block w-full cursor-pointer rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:border-blue-400"
          />
          {fileName && (
            <p className="mt-1 text-xs text-gray-500">
              {fileName} · {fileSize}
            </p>
          )}
          {errors.file && <p className="mt-1 text-xs text-red-600">{errors.file}</p>}
        </div>
        <Textarea
          id="description"
          label="Description"
          placeholder="What does this material cover? Who is it useful for?"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          error={errors.description}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit for approval"}
        </Button>
      </form>

      {myDrafts.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Your uploads</h3>
          <div className="space-y-2">
            {myDrafts.map((draft) => (
              <div
                key={draft.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{draft.title}</p>
                  <p className="text-xs text-gray-500">
                    {draft.subject} · Sem {draft.semester} · {draft.fileName}
                  </p>
                </div>
                <Badge variant={draft.status === "pending" ? "amber" : "green"}>
                  {draft.status === "pending" ? "Pending approval" : draft.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
