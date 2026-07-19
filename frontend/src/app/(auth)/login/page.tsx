"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-lifeguide-canvas bg-radial-ambient-glow transition-all duration-300">
      <div className="w-full max-w-[440px] bg-lifeguide-surface rounded-lg-card border border-lifeguide-border shadow-xl p-8 backdrop-blur-md transition-all duration-300 sm:border-0 sm:shadow-none sm:p-4 sm:bg-transparent">
        {/* Title Block */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-lifeguide-text-primary tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-lifeguide-text-secondary mt-2">
            Sign in to continue your career development
          </p>
        </div>

        {/* Suspense Wrapper to prevent client-side build deoptimization */}
        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 text-lifeguide-primary animate-spin" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-lifeguide-border">
          <p className="text-xs text-lifeguide-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-lifeguide-primary hover:underline font-semibold ml-1 transition-all"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

