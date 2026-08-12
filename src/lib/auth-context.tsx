"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authService } from "@/services/authService";
import type { Credentials, RegisterInput, Session } from "@/types";

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  updateSemester: (semester: number) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSession(authService.getSession());
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials: Credentials) => {
    const next = await authService.login(credentials);
    setSession(next);
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const next = await authService.register(input);
    setSession(next);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setSession(null);
  }, []);

  const updateSemester = useCallback((semester: number) => {
    setSession((current) => {
      if (!current) return current;
      const updated: Session = { ...current, semester };
      authService.setSession(updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        isAuthenticated: session !== null,
        login,
        register,
        logout,
        updateSemester,
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
