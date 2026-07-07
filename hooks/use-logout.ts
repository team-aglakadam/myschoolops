"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export function useLogout() {
  const { logout } = useAuth();
  const router = useRouter();

  return () => {
    logout();
    router.replace("/login");
  };
}
