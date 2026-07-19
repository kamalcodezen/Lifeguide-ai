"use client";

import type { Project, ProjectProgress, ProjectStatus } from "../types";

interface ProjectDetailProps {
  project: Project;
  progress: ProjectProgress | null;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleTask: (task: string, checked: boolean) => Promise<void>;
  onUpdateProgress: (patch: {
    completedTasks?: string[];
    status?: ProjectStatus;
    githubRepoUrl?: string;
    liveDemoUrl?: string;
  }) => Promise<ProjectProgress | null>;
}

const DIFFICULTY_LABEL: Record<string, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
};

const DIFFICULTY_STYLE: Record<string, string> = {
  entry: "bg-emerald-50 border-emerald-200 text-emerald-700",
  mid: "bg-amber-50 border-amber-200 text-amber-700",
  senior: "bg-red-50 border-red-200 text-red-700",
};

const STATUS_STYLE: Record<string, string> = {
  not_started: "bg-slate-50 border-slate-200 text-slate-500",
  in_progress: "bg-blue-50 border-blue-200 text-blue-700",
  review_pending: "bg-violet-50 border-violet-200 text-violet-700",
  completed: "bg-emerald-50 border-emerald-200 text-emerald-700",
};

const STATUS_LABEL: Record<string, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  review_pending: "Review Pending",
  completed: "Completed",
};

export function ProjectDetail({
  project,
  progress,
  onBack,
  onEdit,
  onDelete,
  onToggleTask,
}: ProjectDetailProps) {
  const completedTasks = progress?.completedTasks || [];
  const totalTasks = project.requirements.length;
  const completedCount = completedTasks.length;
  const completionPct =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const statusKey = progress?.status || "not_started";

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition focus-visible:outline-none"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to project list
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project header card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            {/* Top row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${DIFFICULTY_STYLE[project.difficultyRating]}`}
                  >
                    {DIFFICULTY_LABEL[project.difficultyRating]}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLE[statusKey]}`}
                  >
                    {STATUS_LABEL[statusKey]}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onEdit}
                  title="Edit project"
                  className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  title="Delete project"
                  className="rounded-xl border border-red-100 bg-white p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress summary bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 uppercase tracking-wider">
                  Overall Completion
                </span>
                <span className={completionPct === 100 ? "text-emerald-600" : "text-indigo-600"}>
                  {completedCount} / {totalTasks} milestones — {completionPct}%
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    completionPct === 100 ? "bg-emerald-500" : "bg-indigo-600"
                  }`}
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Requirements Milestones */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Requirements & Milestones
              </h3>
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-500">
                {completedCount}/{totalTasks}
              </span>
            </div>
            <div className="grid gap-2.5">
              {project.requirements.map((req, idx) => {
                const isChecked = completedTasks.includes(req);
                return (
                  <label
                    key={idx}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      isChecked
                        ? "border-slate-100 bg-slate-50/50"
                        : "border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => onToggleTask(req, e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      aria-label={req}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-xs font-semibold leading-relaxed ${
                          isChecked
                            ? "text-slate-400 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {req}
                      </p>
                    </div>
                    {isChecked && (
                      <svg
                        className="h-4 w-4 shrink-0 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — ProgressTracker is rendered by the parent page to keep state sync */}
        <div id="progress-tracker-slot" />
      </div>
    </div>
  );
}
