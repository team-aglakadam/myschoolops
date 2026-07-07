"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  AUTH_STORAGE_KEY,
  DUMMY_CREDENTIALS,
  DUMMY_USER,
} from "@/lib/constants/auth";

export type AuthUser = {
  email: string;
  name: string;
  role: string;
  initials: string;
};

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(loadStoredUser());
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail !== DUMMY_CREDENTIALS.email ||
      password !== DUMMY_CREDENTIALS.password
    ) {
      return { success: false, error: "Invalid email or password" };
    }

    const authUser: AuthUser = {
      email: DUMMY_USER.email,
      name: DUMMY_USER.name,
      role: DUMMY_USER.role,
      initials: DUMMY_USER.initials,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function useRequireAuth(redirectTo = "/login") {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return { isAuthenticated, isLoading };
}

export function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return { isAuthenticated, isLoading };
}
