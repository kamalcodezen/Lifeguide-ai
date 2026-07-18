"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import {
  User as UserIcon,
  Mail,
  Lock,
  Check,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Password rules validation helper
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const satisfiedCount = Object.values(rules).filter(Boolean).length;

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

    if (!name.trim()) {
      errors.name = "Name must be non-empty.";
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email address format.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else {
      if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
      }
      if (!rules.uppercase) {
        errors.password = "Password requires at least one uppercase letter.";
      }
      if (!rules.number) {
        errors.password = "Password requires at least one number.";
      }
      if (!rules.special) {
        errors.password = "Password requires at least one special character.";
      }
    }

    if (!agreeTerms) {
      errors.terms = "You must agree to the Terms of Service.";
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
      // Direct call to Better Auth signUp client action
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/login?registered=true",
        },
        {
          onSuccess: () => {
            router.push("/login?registered=true");
          },
          onError: (ctx) => {
            setErrorMsg(ctx.error.message || "An unexpected error occurred.");
            setLoading(false);
          },
        },
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

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
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-lifeguide-text-secondary uppercase tracking-wider mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lifeguide-text-muted w-4.5 h-4.5" />
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!fieldErrors.name}
                className={`bg-lifeguide-canvas border ${
                  fieldErrors.name
                    ? "border-lifeguide-danger-border focus:ring-lifeguide-danger-text/20"
                    : "border-lifeguide-border focus:ring-lifeguide-primary/20"
                } focus:border-lifeguide-primary focus:outline-none focus:ring-2 rounded-md-input h-11 w-full pl-11 pr-4 text-sm text-lifeguide-text-primary placeholder:text-lifeguide-text-muted/50 transition-all duration-150`}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs text-lifeguide-danger-text mt-2 pl-1 animate-slide-down">
                {fieldErrors.name}
              </p>
            )}
          </div>

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
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-lifeguide-text-secondary uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lifeguide-text-muted w-4.5 h-4.5" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
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
                {showPassword ? (
                  <EyeOff className="w-4.5 h-4.5" />
                ) : (
                  <Eye className="w-4.5 h-4.5" />
                )}
              </button>
            </div>

            {/* Caps Lock warning */}
            {capsLockActive && (
              <div className="mt-2 text-xs text-lifeguide-warning-text flex items-center gap-1.5 bg-lifeguide-warning-bg border border-lifeguide-warning-border rounded-md px-2.5 py-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Caps Lock is active</span>
              </div>
            )}

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="mt-3">
                <div className="flex gap-1.5 h-1.5 mb-2">
                  <div
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      satisfiedCount >= 1
                        ? satisfiedCount === 2
                          ? "bg-amber-500"
                          : satisfiedCount >= 3
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        : "bg-lifeguide-border"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      satisfiedCount >= 2
                        ? satisfiedCount >= 3
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                        : "bg-lifeguide-border"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      satisfiedCount >= 4 ? "bg-emerald-500" : "bg-lifeguide-border"
                    }`}
                  />
                </div>
                <span className="text-xs text-lifeguide-text-secondary">
                  Password Strength:{" "}
                  <strong
                    className={
                      satisfiedCount <= 1
                        ? "text-red-500"
                        : satisfiedCount <= 3
                          ? "text-amber-500"
                          : "text-emerald-500"
                    }
                  >
                    {satisfiedCount <= 1 ? "Weak" : satisfiedCount <= 3 ? "Medium" : "Strong"}
                  </strong>
                </span>

                {/* Password rules checklist panel */}
                <div className="mt-3 bg-lifeguide-surface-elevated rounded-lg p-3.5 border border-lifeguide-border space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-lifeguide-text-secondary mb-2">
                    Requirements
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      { label: "At least 8 characters", met: rules.length },
                      { label: "At least 1 uppercase letter", met: rules.uppercase },
                      { label: "At least 1 number", met: rules.number },
                      { label: "At least 1 special character (@, #, $, %)", met: rules.special },
                    ].map((rule, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs transition-all duration-150"
                      >
                        {rule.met ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center shrink-0 scale-100 transition-all duration-150">
                            <Check className="w-2.5 h-2.5 text-emerald-500 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-lifeguide-text-muted/40 shrink-0 transition-all duration-150" />
                        )}
                        <span
                          className={
                            rule.met ? "text-lifeguide-text-primary" : "text-lifeguide-text-muted"
                          }
                        >
                          {rule.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {fieldErrors.password && (
              <p className="text-xs text-lifeguide-danger-text mt-2 pl-1 animate-slide-down">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-2.5 pt-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              aria-invalid={!!fieldErrors.terms}
              className="mt-0.5 accent-lifeguide-primary focus:ring-lifeguide-primary cursor-pointer w-4 h-4 border-lifeguide-border rounded"
            />
            <label
              htmlFor="terms"
              className="text-xs text-lifeguide-text-secondary leading-normal cursor-pointer select-none"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-lifeguide-primary hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-lifeguide-primary hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {fieldErrors.terms && (
            <p className="text-xs text-lifeguide-danger-text pl-1 animate-slide-down">
              {fieldErrors.terms}
            </p>
          )}

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
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-lifeguide-border">
          <p className="text-xs text-lifeguide-text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-lifeguide-primary hover:underline font-semibold ml-1 transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
