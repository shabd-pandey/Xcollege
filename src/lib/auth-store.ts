"use client";

import { authService } from "@/services/authService";
import type { Credentials, RegisterInput, Session } from "@/types";

let cachedSession: Session | null = null;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (!hydrated) {
    hydrated = true;
    cachedSession = authService.getSession();
  }
}

export function getSnapshot(): Session | null {
  if (typeof window !== "undefined") hydrate();
  return cachedSession;
}

export function getServerSnapshot(): Session | null {
  return null;
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export async function login(credentials: Credentials): Promise<void> {
  const next = await authService.login(credentials);
  cachedSession = next;
  emit();
}

export async function register(input: RegisterInput): Promise<void> {
  const next = await authService.register(input);
  cachedSession = next;
  emit();
}

export async function logout(): Promise<void> {
  await authService.logout();
  cachedSession = null;
  emit();
}

export function updateSemester(semester: number): void {
  if (!cachedSession) return;
  const next: Session = { ...cachedSession, semester };
  authService.setSession(next);
  cachedSession = next;
  emit();
}
