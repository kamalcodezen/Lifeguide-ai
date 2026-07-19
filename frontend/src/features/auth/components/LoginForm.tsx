"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { Mail, Lock, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Caps Lock detection
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState("CapsLock"));
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState("CapsLock"));
    }
  };

  // Run form validation
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email address format.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFieldErrors({});

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Call Better Auth client signIn email action
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (ctx) => {
            setErrorMsg(ctx.error.message || "Invalid email or password.");
            setLoading(false);
          },
        },
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Registered Success Banner */}
      {isRegistered && !errorMsg && (
        <div className="mb-6 p-4 rounded-md bg-lifeguide-success-bg border border-lifeguide-success-border flex items-start gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-lifeguide-success-text shrink-0 mt-0.5" />
          <p className="text-sm text-lifeguide-success-text leading-tight font-medium">
            Account created successfully! Please sign in below.
          </p>
        </div>
      )}

      {/* Global Error message */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-md bg-lifeguide-danger-bg border border-lifeguide-danger-border flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-lifeguide-danger-text shrink-0 mt-0.5" />
          <p className="text-sm text-lifeguide-danger-text leading-tight">{errorMsg}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-lifeguide-text-secondary uppercase tracking-wider mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lifeguide-text-muted w-4.5 h-4.5" />
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!fieldErrors.email}
              className={`bg-lifeguide-canvas border ${
                fieldErrors.email
                  ? "border-lifeguide-danger-border focus:ring-lifeguide-danger-text/20"
                  : "border-lifeguide-border focus:ring-lifeguide-primary/20"
              } focus:border-lifeguide-primary focus:outline-none focus:ring-2 rounded-md-input h-11 w-full pl-11 pr-4 text-sm text-lifeguide-text-primary placeholder:text-lifeguide-text-muted/50 transition-all duration-150`}
            />
          </div>
          {fieldErrors.email && (
            <p className="text-xs text-lifeguide-danger-text mt-2 pl-1 animate-slide-down">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-lifeguide-text-secondary uppercase tracking-wider"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-lifeguide-primary hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lifeguide-text-muted w-4.5 h-4.5" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!fieldErrors.password}
              className={`bg-lifeguide-canvas border ${
                fieldErrors.password
                  ? "border-lifeguide-danger-border focus:ring-lifeguide-danger-text/20"
                  : "border-lifeguide-border focus:ring-lifeguide-primary/20"
              } focus:border-lifeguide-primary focus:outline-none focus:ring-2 rounded-md-input h-11 w-full pl-11 pr-12 text-sm text-lifeguide-text-primary placeholder:text-lifeguide-text-muted/50 transition-all duration-150`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-lifeguide-text-muted hover:text-lifeguide-text-primary transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          </div>

          {/* Caps Lock warning */}
          {capsLockActive && (
            <div className="mt-2 text-xs text-lifeguide-warning-text flex items-center gap-1.5 bg-lifeguide-warning-bg border border-lifeguide-warning-border rounded-md px-2.5 py-1.5 animate-shake">
              <AlertCircle className="w-4 h-4" />
              <span>Caps Lock is active</span>
            </div>
          )}

          {fieldErrors.password && (
            <p className="text-xs text-lifeguide-danger-text mt-2 pl-1 animate-slide-down">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-warm-dawn text-white hover:opacity-95 active:scale-98 transition-all duration-150 rounded-md-input h-11 w-full flex items-center justify-center font-heading text-sm font-semibold tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
