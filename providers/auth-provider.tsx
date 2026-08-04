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
import { createClient } from "@/lib/supabase/client";
import { isAuthSkipped } from "@/lib/auth/skip-auth";
import { DEV_PROFILE, DEV_USER } from "@/lib/auth/dev-user";
import type { User, Session } from "@supabase/supabase-js";
import type { DbUser } from "@/types/database";

interface AuthContextValue {
  user: User | null;
  profile: DbUser | null;
  session: Session | null;
  schoolId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SKIP_AUTH = isAuthSkipped();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(SKIP_AUTH ? DEV_USER : null);
  const [profile, setProfile] = useState<DbUser | null>(
    SKIP_AUTH ? DEV_PROFILE : null
  );
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(!SKIP_AUTH);
  const router = useRouter();
  const [supabase] = useState(() => (SKIP_AUTH ? null : createClient()));

  const fetchProfile = useCallback(
    async (authUser: User) => {
      if (!supabase) return;

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", authUser.id)
        .single();

      if (data) {
        setProfile(data as DbUser);
      }
    },
    [supabase]
  );

  useEffect(() => {
    if (SKIP_AUTH || !supabase) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadingTimeout = window.setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, 5000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      if (cancelled) return;

      if (event === "TOKEN_REFRESHED" && !nextSession) {
        await supabase.auth.signOut({ scope: "local" });
      }

      if (nextSession) {
        setSession(nextSession);
        setUser(nextSession.user);
        await fetchProfile(nextSession.user);
      } else {
        setSession(null);
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once on mount
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      if (SKIP_AUTH) {
        setUser(DEV_USER);
        setProfile(DEV_PROFILE);
        return { success: true };
      }

      if (!supabase) {
        return { success: false, error: "Auth is not configured" };
      }

      try {
        const res = await fetch("/api/auth/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const data = await res.json();
          return { success: false, error: data.error || "Invalid credentials" };
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setSession(session);
          setUser(session.user);
          await fetchProfile(session.user);
        }

        return { success: true };
      } catch {
        return { success: false, error: "Something went wrong" };
      }
    },
    [supabase, fetchProfile]
  );

  const logout = useCallback(async () => {
    if (SKIP_AUTH) {
      setUser(null);
      setProfile(null);
      setSession(null);
      router.push("/login");
      return;
    }

    await fetch("/api/auth/sign-out", { method: "POST" });
    await supabase?.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
    router.push("/login");
  }, [supabase, router]);

  const schoolId =
    profile?.school_id ?? user?.user_metadata?.school_id ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        schoolId,
        isAuthenticated: SKIP_AUTH ? true : !!user,
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
    if (SKIP_AUTH) return;
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
    if (SKIP_AUTH) return;
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return { isAuthenticated, isLoading };
}
