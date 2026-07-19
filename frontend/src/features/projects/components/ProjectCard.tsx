"use client";

import type { Project, ProjectProgress } from "../types";

interface ProjectCardProps {
  project: Project;
  progress?: ProjectProgress;
  onClick: () => void;
}

const DIFFICULTY_CONFIG = {
  entry: {
    label: "Entry Level",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  mid: {
    label: "Mid Level",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  senior: {
    label: "Senior Level",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; border: string; text: string }
> = {
  not_started: {
    label: "Not Started",
    bg: "bg-slate-50",
    border: "border-slate-200",
    text: "text-slate-500",
  },
  in_progress: {
    label: "In Progress",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  review_pending: {
    label: "Review Pending",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
};

export function ProjectCard({ project, progress, onClick }: ProjectCardProps) {
  const diff = DIFFICULTY_CONFIG[project.difficultyRating];
  const statusKey = progress?.status || "not_started";
  const status = STATUS_CONFIG[statusKey];

  const completedCount = progress?.completedTasks?.length || 0;
  const totalCount = project.requirements.length;
  const completionPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const isComplete = statusKey === "completed";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {/* Completion shimmer */}
      {isComplete && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-transparent pointer-events-none" />
      )}

      <div className="flex flex-col gap-4">
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${diff.bg} ${diff.border} ${diff.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
            {diff.label}
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${status.bg} ${status.border} ${status.text}`}
          >
            {status.label}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-base font-bold leading-snug tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {totalCount} milestone{totalCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
            <span>COMPLETION</span>
            <span className={completionPct === 100 ? "text-emerald-600" : "text-indigo-600"}>
              {completionPct}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                completionPct === 100
                  ? "bg-emerald-500"
                  : "bg-indigo-600"
              }`}
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        {/* Tech stack pills */}
        <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="self-center text-[10px] font-bold text-slate-400">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
