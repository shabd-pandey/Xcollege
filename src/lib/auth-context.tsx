"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import * as authStore from "@/lib/auth-store";
import type { Credentials, RegisterInput, Session } from "@/types";

interface AuthContextValue {
  session: Session | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  updateSemester: (semester: number) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
    authStore.getServerSnapshot,
  );

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: session !== null,
        login: authStore.login,
        register: authStore.register,
        logout: authStore.logout,
        updateSemester: authStore.updateSemester,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
