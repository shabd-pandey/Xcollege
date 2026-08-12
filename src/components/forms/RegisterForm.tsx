"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { BRANCHES, SEMESTERS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("1");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = "Full name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (confirm !== password) nextErrors.confirm = "Passwords do not match.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setFormError("");
    try {
      await register({
        name,
        email,
        password,
        branch,
        semester: Number(semester),
      });
      router.push("/dashboard");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}
      <Input
        id="name"
        label="Full name"
        autoComplete="name"
        placeholder="e.g. Aarav Mehta"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={errors.name}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@college.edu"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={errors.email}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="Min 6 characters"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <Input
          id="confirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          error={errors.confirm}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          id="branch"
          label="Branch"
          value={branch}
          onChange={(event) => setBranch(event.target.value)}
          options={BRANCHES}
        />
        <Select
          id="semester"
          label="Semester"
          value={semester}
          onChange={(event) => setSemester(event.target.value)}
          options={SEMESTERS.map((s) => ({ value: String(s), label: `Semester ${s}` }))}
        />
      </div>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Creating account..." : "Create account"}
      </Button>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
          Login
        </Link>
      </p>
    </form>
  );
}
