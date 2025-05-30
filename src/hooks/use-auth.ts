"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth({ required = false, redirectTo = "/auth/signIn" } = {}) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const router = useRouter();

  useEffect(() => {
    // If auth is required and user is not authenticated
    if (required && !isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, required, redirectTo, router]);

  return {
    session,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
  };
}