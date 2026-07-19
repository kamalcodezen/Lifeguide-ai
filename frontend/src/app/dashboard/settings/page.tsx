"use client";

import { useState } from "react";
import { useSession } from "@/shared/providers/SessionProvider";
import { authClient } from "@/lib/auth/client";
import { AlertTriangle, Loader2, Key, Trash2, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, loading, signOut } = useSession();
  const router = useRouter();
  
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone and all your progress, roadmaps, and data will be lost.")) {
      return;
    }

    setDeleteLoading(true);
    setErrorMsg(null);

    try {
      // First, try to delete the profile data through the backend profile API
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await fetch(`${API_BASE}/api/v1/profile`, {
        method: "DELETE",
        credentials: "include",
      });

      // Then delete the user account via better-auth
      await authClient.deleteUser({
        callbackURL: "/",
      });

      // Sign out just in case
      await signOut();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to delete account:", error);
      setErrorMsg("Failed to delete your account. Please try again or contact support.");
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-lifeguide-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-lifeguide-text-secondary">
          Account Management
        </span>
        <h1 className="font-heading text-3xl font-bold text-lifeguide-text-primary tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-lifeguide-text-secondary">
          Manage your account credentials, view connected services, and handle data privacy.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-md bg-lifeguide-danger-bg border border-lifeguide-danger-border flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-lifeguide-danger-text shrink-0 mt-0.5" />
          <p className="text-sm text-lifeguide-danger-text font-medium">{errorMsg}</p>
        </div>
      )}

      {/* Account Info Section */}
      <div className="bg-lifeguide-surface-elevated border border-lifeguide-border rounded-lg-card shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-lifeguide-border">
          <h2 className="text-lg font-semibold text-lifeguide-text-primary flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-lifeguide-text-secondary" />
            Profile Information
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-lifeguide-text-secondary uppercase mb-1">
                Full Name
              </label>
              <div className="text-sm font-medium text-lifeguide-text-primary bg-lifeguide-canvas px-4 py-2.5 rounded-md border border-lifeguide-border/50">
                {user?.name || "Not specified"}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-lifeguide-text-secondary uppercase mb-1">
                Email Address
              </label>
              <div className="text-sm font-medium text-lifeguide-text-primary bg-lifeguide-canvas px-4 py-2.5 rounded-md border border-lifeguide-border/50">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-lifeguide-surface-elevated border border-lifeguide-border rounded-lg-card shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-lifeguide-border">
          <h2 className="text-lg font-semibold text-lifeguide-text-primary flex items-center gap-2">
            <Key className="w-5 h-5 text-lifeguide-text-secondary" />
            Security & Authentication
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-lifeguide-text-primary">Password</h3>
              <p className="text-xs text-lifeguide-text-secondary mt-1">
                You can change your password by signing out and using the &quot;Forgot Password&quot; flow.
              </p>
            </div>
            <button
              onClick={() => {
                signOut();
                router.push("/forgot-password");
              }}
              className="px-4 py-2 text-sm font-semibold text-lifeguide-primary bg-lifeguide-primary/10 hover:bg-lifeguide-primary/20 rounded-md transition-colors whitespace-nowrap"
            >
              Reset Password
            </button>
          </div>
          
          <div className="border-t border-lifeguide-border/50 pt-6">
            <h3 className="text-sm font-semibold text-lifeguide-text-primary mb-3">Connected Accounts</h3>
            <div className="flex gap-3">
              {/* Note: In a full implementation, you'd fetch `listAccounts` from better-auth to see which providers are linked. For the MVP, we just show standard info. */}
              <div className="px-4 py-3 border border-slate-200 rounded-md flex items-center gap-3 bg-white w-full max-w-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-medium text-slate-700">Google SSO Configured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg-card shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-red-200/60 bg-red-100/50">
          <h2 className="text-lg font-semibold text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-red-900">Delete Account & Data</h3>
              <p className="text-xs text-red-700 mt-1 max-w-lg">
                Permanently delete your account, learning roadmaps, assessment scores, and all generated projects. This action cannot be undone.
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
              className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md shadow-sm transition-colors whitespace-nowrap flex items-center justify-center min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteLoading ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-4.5 h-4.5 mr-2" />
                  Delete Account
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
