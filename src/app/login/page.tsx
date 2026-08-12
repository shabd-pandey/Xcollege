import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Login to access your notes, uploads and campus community.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
