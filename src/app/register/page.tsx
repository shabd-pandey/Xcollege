import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Join Xcollege to access study material and the campus community.
          </p>
          <div className="mt-6">
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
