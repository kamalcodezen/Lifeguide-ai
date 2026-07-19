"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/shared/providers/SessionProvider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4 bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Redirecting to dashboard...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
