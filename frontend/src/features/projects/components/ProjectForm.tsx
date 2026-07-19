"use client";

import { useState } from "react";
import type { DifficultyRating } from "../types";

export interface ProjectFormValues {
  title: string;
  difficultyRating: DifficultyRating;
  requirements: string[];
  techStack: string[];
}

interface ProjectFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<ProjectFormValues>;
  submitting: boolean;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  onCancel: () => void;
}

function parseCommaSeparated(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function ProjectForm({
  mode,
  initialValues,
  submitting,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [difficultyRating, setDifficultyRating] = useState<DifficultyRating>(
    initialValues?.difficultyRating || "mid"
  );
  const [requirementsRaw, setRequirementsRaw] = useState(
    initialValues?.requirements?.join(", ") || ""
  );
  const [techStackRaw, setTechStackRaw] = useState(
    initialValues?.techStack?.join(", ") || ""
  );
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (): boolean => {
    const errs: string[] = [];
    if (!title.trim()) errs.push("Project title is required.");
    if (!requirementsRaw.trim())
      errs.push("At least one requirement is required.");
    if (!techStackRaw.trim())
      errs.push("At least one tech stack item is required.");
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      title: title.trim(),
      difficultyRating,
      requirements: parseCommaSeparated(requirementsRaw),
      techStack: parseCommaSeparated(techStackRaw),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900">
          {mode === "create" ? "New Project Specification" : "Edit Project"}
        </h2>
        <p className="text-xs text-slate-500">
          {mode === "create"
            ? "Define a new portfolio project with requirements and tech stack."
            : "Update the project details below."}
        </p>
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 space-y-1">
          <p className="text-xs font-semibold text-red-700">
            Please fix the following:
          </p>
          <ul className="list-disc pl-4 space-y-0.5">
            {errors.map((err, idx) => (
              <li key={idx} className="text-xs text-red-600">
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Title */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            htmlFor="project-title"
            className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
          >
            Project Title *
          </label>
          <input
            id="project-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Full-Stack SaaS Dashboard with Real-time Analytics"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Difficulty */}
        <div className="space-y-1.5">
          <label
            htmlFor="project-difficulty"
            className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
          >
            Difficulty Level *
          </label>
          <select
            id="project-difficulty"
            value={difficultyRating}
            onChange={(e) =>
              setDifficultyRating(e.target.value as DifficultyRating)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>
        </div>

        {/* Placeholder column to keep grid alignment */}
        <div className="hidden md:block" />

        {/* Requirements */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            htmlFor="project-requirements"
            className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
          >
            Requirements / Milestones * (comma-separated)
          </label>
          <textarea
            id="project-requirements"
            value={requirementsRaw}
            onChange={(e) => setRequirementsRaw(e.target.value)}
            placeholder="e.g. Configure authentication routes, Build user schema model, Deploy CI/CD pipeline"
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 resize-none"
          />
          <p className="text-[10px] text-slate-400">
            Each item becomes a trackable milestone checkbox.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            htmlFor="project-tech"
            className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
          >
            Tech Stack * (comma-separated)
          </label>
          <input
            id="project-tech"
            type="text"
            value={techStackRaw}
            onChange={(e) => setTechStackRaw(e.target.value)}
            placeholder="e.g. Next.js, TypeScript, MongoDB, TailwindCSS, Prisma"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {submitting
            ? "Saving..."
            : mode === "create"
            ? "Create Project"
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
