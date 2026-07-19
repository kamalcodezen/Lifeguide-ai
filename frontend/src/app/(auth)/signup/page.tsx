"use client";

import { SignupForm } from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-lifeguide-canvas bg-radial-ambient-glow transition-all duration-300">
      <div className="w-full max-w-md bg-lifeguide-surface rounded-lg-card border border-lifeguide-border shadow-xl p-8 backdrop-blur-md transition-all duration-300">
        {/* Title Block */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-lifeguide-text-primary tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-lifeguide-text-secondary mt-2">
            Start your journey with LifeGuide AI Copilot
          </p>
        </div>

        <SignupForm />
      </div>
    </main>
  );
}

