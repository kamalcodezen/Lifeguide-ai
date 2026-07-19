"use client";

import { useState, useMemo } from "react";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { ProjectForm, type ProjectFormValues } from "@/features/projects/components/ProjectForm";
import { ProgressTracker } from "@/features/projects/components/ProgressTracker";
import type { Project, ProjectProgress, ProjectStatus } from "@/features/projects/types";

type ViewState = "list" | "detail" | "create" | "edit";

const DIFFICULTY_FILTER_OPTIONS = [
  { value: "all", label: "All Levels" },
  { value: "entry", label: "Entry" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "review_pending", label: "Review Pending" },
  { value: "completed", label: "Completed" },
];

const DIFFICULTY_STYLE: Record<string, string> = {
  entry: "bg-emerald-50 border-emerald-200 text-emerald-700",
  mid: "bg-amber-50 border-amber-200 text-amber-700",
  senior: "bg-red-50 border-red-200 text-red-700",
};

const DIFFICULTY_LABEL: Record<string, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
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

export default function ProjectsPage() {
  const {
    projects,
    progressMap,
    loading,
    error,
    successMsg,
    setError,
    setSuccessMsg,
    createProject,
    updateProject,
    deleteProject,
    updateProgress,
  } = useProjects();

  const [viewState, setViewState] = useState<ViewState>("list");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const dismissMessages = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)) ||
        p.requirements.some((r) => r.toLowerCase().includes(q));
      const matchesDifficulty =
        difficultyFilter === "all" || p.difficultyRating === difficultyFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (progressMap[p._id]?.status ?? "not_started") === statusFilter;
      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }, [projects, progressMap, searchQuery, difficultyFilter, statusFilter]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setViewState("detail");
    dismissMessages();
  };

  const handleCreateSubmit = async (values: ProjectFormValues) => {
    setSubmitting(true);
    try {
      await createProject(
        values.title,
        values.difficultyRating,
        values.requirements,
        values.techStack
      );
      setViewState("list");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (values: ProjectFormValues) => {
    if (!selectedProject) return;
    setSubmitting(true);
    try {
      await updateProject(
        selectedProject._id,
        values.title,
        values.difficultyRating,
        values.requirements,
        values.techStack
      );
      setViewState("detail");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update project.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this project? This action is permanent and cannot be undone."
      )
    )
      return;
    setSubmitting(true);
    try {
      await deleteProject(id);
      setViewState("list");
      setSelectedProject(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTask = async (task: string, checked: boolean) => {
    if (!selectedProject) return;
    const prog = progressMap[selectedProject._id];
    const current = prog?.completedTasks ?? [];
    const updated = checked
      ? [...current, task]
      : current.filter((t) => t !== task);
    await updateProgress(selectedProject._id, {
      completedTasks: updated,
      status: prog?.status,
      githubRepoUrl: prog?.githubRepoUrl,
      liveDemoUrl: prog?.liveDemoUrl,
    });
  };

  const handleUpdateProgress = async (patch: {
    completedTasks?: string[];
    status?: ProjectStatus;
    githubRepoUrl?: string;
    liveDemoUrl?: string;
  }): Promise<ProjectProgress | null> => {
    if (!selectedProject) return null;
    return updateProgress(selectedProject._id, patch);
  };

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600" />
        </div>
        <p className="animate-pulse text-sm font-medium text-slate-500">
          Loading your projects...
        </p>
      </div>
    );
  }

  const activeProgress = selectedProject
    ? progressMap[selectedProject._id] ?? null
    : null;

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
            Portfolio Builder
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Custom Projects
          </h1>
          <p className="text-sm text-slate-500">
            Build production-grade projects, track milestones, and ship deliverables.
          </p>
        </div>
        {viewState === "list" && (
          <button
            type="button"
            id="create-project-btn"
            onClick={() => {
              dismissMessages();
              setViewState("create");
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </button>
        )}
      </div>

      {/* ─── Notifications ────────────────────────────────────────────────────── */}
      {successMsg && (
        <div role="status" aria-live="polite" className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="flex-1 text-sm font-medium text-emerald-800">{successMsg}</p>
          <button type="button" onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-700" aria-label="Dismiss success">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {error && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="flex-1 text-sm font-medium text-red-800">{error}</p>
          <button type="button" onClick={() => setError(null)} className="text-red-400 hover:text-red-700" aria-label="Dismiss error">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* ─── Create Form ─────────────────────────────────────────────────────── */}
      {viewState === "create" && (
        <ProjectForm
          mode="create"
          submitting={submitting}
          onSubmit={handleCreateSubmit}
          onCancel={() => { setViewState("list"); dismissMessages(); }}
        />
      )}

      {/* ─── Edit Form ────────────────────────────────────────────────────────── */}
      {viewState === "edit" && selectedProject && (
        <ProjectForm
          mode="edit"
          initialValues={{
            title: selectedProject.title,
            difficultyRating: selectedProject.difficultyRating,
            requirements: selectedProject.requirements,
            techStack: selectedProject.techStack,
          }}
          submitting={submitting}
          onSubmit={handleEditSubmit}
          onCancel={() => { setViewState("detail"); dismissMessages(); }}
        />
      )}

      {/* ─── Detail View ─────────────────────────────────────────────────────── */}
      {viewState === "detail" && selectedProject && (
        <div className="space-y-6">
          {/* Back */}
          <button
            type="button"
            onClick={() => { setViewState("list"); setSelectedProject(null); dismissMessages(); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition focus-visible:outline-none"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to project list
          </button>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${DIFFICULTY_STYLE[selectedProject.difficultyRating]}`}>
                        {DIFFICULTY_LABEL[selectedProject.difficultyRating]}
                      </span>
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLE[activeProgress?.status ?? "not_started"]}`}>
                        {STATUS_LABEL[activeProgress?.status ?? "not_started"]}
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      id="edit-project-btn"
                      onClick={() => { dismissMessages(); setViewState("edit"); }}
                      title="Edit project"
                      className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      id="delete-project-btn"
                      onClick={() => handleDelete(selectedProject._id)}
                      title="Delete project"
                      className="rounded-xl border border-red-100 bg-white p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Overall progress bar */}
                {(() => {
                  const cc = activeProgress?.completedTasks?.length ?? 0;
                  const total = selectedProject.requirements.length;
                  const pct = total > 0 ? Math.round((cc / total) * 100) : 0;
                  return (
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-500 uppercase tracking-wider">Overall Completion</span>
                        <span className={pct === 100 ? "text-emerald-600" : "text-indigo-600"}>
                          {cc}/{total} — {pct}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${pct === 100 ? "bg-emerald-500" : "bg-indigo-600"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Milestones */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Requirements & Milestones</h3>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-500">
                    {activeProgress?.completedTasks?.length ?? 0}/{selectedProject.requirements.length}
                  </span>
                </div>
                <div className="grid gap-2.5">
                  {selectedProject.requirements.map((req, idx) => {
                    const isChecked = activeProgress?.completedTasks?.includes(req) ?? false;
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
                          onChange={(e) => handleToggleTask(req, e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          aria-label={req}
                        />
                        <p className={`flex-1 text-xs font-semibold leading-relaxed ${isChecked ? "text-slate-400 line-through" : "text-slate-700"}`}>
                          {req}
                        </p>
                        {isChecked && (
                          <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
                  {selectedProject.techStack.map((tech, idx) => (
                    <span key={idx} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress tracker sidebar */}
            <div>
              <ProgressTracker
                project={selectedProject}
                progress={activeProgress}
                onUpdateProgress={handleUpdateProgress}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── List View ───────────────────────────────────────────────────────── */}
      {viewState === "list" && (
        <div className="space-y-6">
          {/* Search & filters row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="project-search"
                type="search"
                placeholder="Search by title, tech stack, or requirement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <select
              id="difficulty-filter"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {DIFFICULTY_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {STATUS_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          {(searchQuery || difficultyFilter !== "all" || statusFilter !== "all") && (
            <p className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">{filteredProjects.length}</span> of{" "}
              <span className="font-semibold text-slate-700">{projects.length}</span> projects
            </p>
          )}

          {/* Empty — no projects */}
          {projects.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100">
                <svg className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800">No projects yet</h3>
              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Create your first portfolio project to start tracking milestones and progress.
              </p>
              <button
                type="button"
                onClick={() => setViewState("create")}
                className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
              >
                Create Your First Project
              </button>
            </div>
          )}

          {/* Empty — no filter results */}
          {projects.length > 0 && filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
              <svg className="mb-3 h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm font-semibold text-slate-500">No projects match your filters.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setDifficultyFilter("all"); setStatusFilter("all"); }}
                className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Project grid */}
          {filteredProjects.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  progress={progressMap[project._id]}
                  onClick={() => handleSelectProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
