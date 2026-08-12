"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Errors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (!password) nextErrors.password = "Password is required.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setFormError("");
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Login failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function fillDemo() {
    setEmail("demo@xcollege.com");
    setPassword("demo123");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}
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
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
      />
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Logging in..." : "Login"}
      </Button>
      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">
          Register
        </Link>
      </p>
      <div className="rounded-lg bg-gray-50 px-4 py-3 text-xs text-gray-500">
        <p className="font-medium text-gray-600">Prototype demo account</p>
        <p className="mt-1">
          Email: demo@xcollege.com · Password: demo123{" "}
          <button
            type="button"
            onClick={fillDemo}
            className="font-medium text-blue-600 underline hover:text-blue-700"
          >
            Fill
          </button>
        </p>
      </div>
    </form>
  );
}
