"use client";

import { useState } from "react";
import type { Project, ProjectProgress, ProjectStatus } from "../types";

interface ProgressTrackerProps {
  project: Project;
  progress: ProjectProgress | null;
  onUpdateProgress: (patch: {
    completedTasks?: string[];
    status?: ProjectStatus;
    githubRepoUrl?: string;
    liveDemoUrl?: string;
  }) => Promise<ProjectProgress | null>;
}

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "review_pending", label: "Review Pending" },
  { value: "completed", label: "Completed" },
];

export function ProgressTracker({
  project,
  progress,
  onUpdateProgress,
}: ProgressTrackerProps) {
  // Derive initial state from props at render time (no useEffect needed)
  const [localStatus, setLocalStatus] = useState<ProjectStatus>(
    progress?.status ?? "not_started"
  );
  const [localGithub, setLocalGithub] = useState(
    progress?.githubRepoUrl ?? ""
  );
  const [localDemo, setLocalDemo] = useState(progress?.liveDemoUrl ?? "");
  const [savingLinks, setSavingLinks] = useState(false);

  // Keep local state in sync if parent updates progress (controlled sync)
  const progressStatus = progress?.status ?? "not_started";
  const progressGithub = progress?.githubRepoUrl ?? "";
  const progressDemo = progress?.liveDemoUrl ?? "";

  // Reconcile: only update local state when progress prop changes AND local state
  // has not drifted (i.e., user hasn't started editing). We use a simple approach:
  // just always derive from progress when not saving.
  const syncedStatus = localStatus !== progressStatus && !savingLinks ? progressStatus : localStatus;
  const syncedGithub = localGithub !== progressGithub && !savingLinks ? progressGithub : localGithub;
  const syncedDemo = localDemo !== progressDemo && !savingLinks ? progressDemo : localDemo;

  const completedTasks = progress?.completedTasks ?? [];
  const totalTasks = project.requirements.length;
  const completedCount = completedTasks.length;
  const completionPct =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const handleStatusChange = async (newStatus: ProjectStatus) => {
    setLocalStatus(newStatus);
    await onUpdateProgress({
      completedTasks,
      status: newStatus,
      githubRepoUrl: syncedGithub,
      liveDemoUrl: syncedDemo,
    });
  };

  const handleSaveLinks = async () => {
    setSavingLinks(true);
    await onUpdateProgress({
      completedTasks,
      status: syncedStatus,
      githubRepoUrl: syncedGithub,
      liveDemoUrl: syncedDemo,
    });
    setSavingLinks(false);
  };

  const getProgressColor = () => {
    if (completionPct === 100) return "bg-emerald-500";
    if (completionPct >= 66) return "bg-indigo-600";
    if (completionPct >= 33) return "bg-amber-500";
    return "bg-slate-400";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
      <h3 className="text-sm font-bold text-slate-900">Progress Tracker</h3>

      {/* Completion bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-500 uppercase tracking-wider">Completion</span>
          <span className={completionPct === 100 ? "text-emerald-600" : "text-indigo-600"}>
            {completedCount}/{totalTasks} — {completionPct}%
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${completionPct}%` }}
          />
        </div>
        {completionPct === 100 && (
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            All milestones completed!
          </p>
        )}
      </div>

      {/* Status selector */}
      <div className="space-y-1.5">
        <label
          htmlFor="tracker-status"
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-400"
        >
          Project Status
        </label>
        <select
          id="tracker-status"
          value={syncedStatus}
          onChange={(e) => handleStatusChange(e.target.value as ProjectStatus)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Links */}
      <div className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Project Links</p>
        <div className="space-y-1.5">
          <label htmlFor="tracker-github" className="block text-xs font-medium text-slate-500">
            GitHub Repository
          </label>
          <input
            id="tracker-github"
            type="url"
            value={syncedGithub}
            onChange={(e) => setLocalGithub(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="tracker-demo" className="block text-xs font-medium text-slate-500">
            Live Demo URL
          </label>
          <input
            id="tracker-demo"
            type="url"
            value={syncedDemo}
            onChange={(e) => setLocalDemo(e.target.value)}
            placeholder="https://my-project.vercel.app"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <button
          type="button"
          onClick={handleSaveLinks}
          disabled={savingLinks}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
        >
          {savingLinks ? "Saving..." : "Save Links"}
        </button>
      </div>

      {/* Quick links display */}
      {(progress?.githubRepoUrl || progress?.liveDemoUrl) && (
        <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-2">
          {progress.githubRepoUrl && (
            <a
              href={progress.githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {progress.liveDemoUrl && (
            <a
              href={progress.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[10px] font-semibold text-indigo-700 hover:bg-indigo-100 transition"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
