"use client";

import { mockUsers } from "@/data/mock";
import type { Credentials, RegisterInput, Session } from "@/types";

const SESSION_KEY = "xcollege_session";

export const authService = {
  getSession(): Session | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Session;
    } catch {
      return null;
    }
  },

  setSession(session: Session): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  clearSession(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(SESSION_KEY);
  },

  async login(credentials: Credentials): Promise<Session> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === credentials.email.toLowerCase() &&
        u.password === credentials.password,
    );
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    const session: Session = {
      userId: user.id,
      name: user.name,
      email: user.email,
      branch: user.branch,
      semester: user.semester,
      role: user.role,
      avatarInitial: user.avatarInitial,
    };
    this.setSession(session);
    return session;
  },

  async register(input: RegisterInput): Promise<Session> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const exists = mockUsers.some(
      (u) => u.email.toLowerCase() === input.email.toLowerCase(),
    );
    if (exists) {
      throw new Error("An account with this email already exists.");
    }
    const session: Session = {
      userId: `u-${Date.now()}`,
      name: input.name,
      email: input.email,
      branch: input.branch,
      semester: input.semester,
      role: "student",
      avatarInitial: input.name.trim().charAt(0).toUpperCase() || "S",
    };
    this.setSession(session);
    return session;
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    this.clearSession();
  },

  async updateSemester(semester: number): Promise<Session> {
    const session = this.getSession();
    if (!session) {
      throw new Error("Not authenticated.");
    }
    const updated: Session = { ...session, semester };
    this.setSession(updated);
    return updated;
  },
};
