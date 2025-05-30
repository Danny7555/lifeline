"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth({ required = false, redirectTo = "/auth/signIn" } = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";

  useEffect(() => {
    if (loading) return;
    
    if (required && !authenticated) {
      router.push(redirectTo);
    }
  }, [loading, authenticated, required, redirectTo, router]);

  return {
    session,
    loading,
    authenticated,
    signIn,
    signOut
  };
}