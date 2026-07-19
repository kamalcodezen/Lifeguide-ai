"use client";

import React, { createContext, useContext, useCallback } from "react";
import { authClient } from "@/lib/auth/client";

interface UserInfo {
  id: string;
  email: string;
  name: string;
  image?: string;
}

interface SessionContextType {
  user: UserInfo | null;
  session: unknown;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();

  const handleSignOut = useCallback(async () => {
    await authClient.signOut();
  }, []);

  const value: SessionContextType = {
    user: data?.user
      ? {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          image: data.user.image || undefined,
        }
      : null,
    session: data?.session || null,
    loading: isPending,
    isAuthenticated: !!data?.session,
    signOut: handleSignOut,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
