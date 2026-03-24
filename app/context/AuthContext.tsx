"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { loginAction, logoutAction } from "@/app/actions/auth";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  /**
   * Initialise from sessionStorage so state survives a page refresh.
   * The `typeof window` guard prevents a server-side crash during SSR.
   */
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("fitfuel_auth") === "1";
  });

  /**
   * Delegates credential validation to a Server Action so the credentials
   * never appear in the client bundle. Sets an httpOnly cookie server-side
   * and mirrors the result in React state + sessionStorage for UI reactivity.
   */
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      const success = await loginAction(email, password);
      if (success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("fitfuel_auth", "1");
      }
      return success;
    },
    []
  );

  /**
   * Clears the httpOnly cookie via a Server Action, then clears local state.
   */
  const logout = useCallback(async (): Promise<void> => {
    await logoutAction();
    setIsAuthenticated(false);
    sessionStorage.removeItem("fitfuel_auth");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
