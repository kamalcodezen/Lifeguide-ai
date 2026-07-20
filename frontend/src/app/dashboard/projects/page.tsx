"use client";

import { useState } from "react";
import { Loader2, Briefcase, Zap, Layers, FolderDot, ArrowRight, LayoutDashboard, Terminal } from "lucide-react";

interface ProjectSuggestion {
  title: string;
  difficultyRating: "entry" | "mid" | "senior";
  summary: string;
  techStack: string[];
  requirements: string[];
  businessCase: string;
  userStories: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectSuggestion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setProjects(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE}/api/v1/ai/project-suggestions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to fetch project suggestions.");
      }

      setProjects(data.data.projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyStyles = (level: string) => {
    switch (level) {
      case "entry":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "mid":
        return "bg-amber-50 border-amber-200 text-amber-700";
      case "senior":
        return "bg-rose-50 border-rose-200 text-rose-700";
      default:
        return "bg-slate-50 border-slate-200 text-slate-700";
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case "entry":
        return "Beginner Friendly";
      case "mid":
        return "Intermediate";
      case "senior":
        return "Advanced";
      default:
        return level;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Custom Project Ideas</h1>
          <p className="text-slate-500 max-w-2xl">
            Generate portfolio-ready project blueprints tailored specifically to your skill gaps and target career track.
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 h-[46px] shadow-sm shrink-0"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
          {loading ? "Generating Ideas..." : projects ? "Generate New Ideas" : "Generate Ideas"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            !
          </div>
          {error}
        </div>
      )}

      {!projects && !loading && !error && (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center p-16 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <FolderDot className="w-8 h-8 text-indigo-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">Ready to build something?</h3>
          <p className="text-sm text-slate-500 max-w-md">
            Click the generate button above and our AI will design custom project blueprints matching your exact skill profile and goals.
          </p>
        </div>
      )}

      {loading && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-16 text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-slate-700 font-medium">Brainstorming project concepts...</p>
          <p className="text-xs text-slate-400 mt-2">Analyzing your profile, skills, and industry trends.</p>
        </div>
      )}

      {projects && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-slate-100 flex-1">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${getDifficultyStyles(project.difficultyRating)}`}>
                    {getDifficultyLabel(project.difficultyRating)}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {project.summary}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Business Case
                    </h4>
                    <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                      &quot;{project.businessCase}&quot;
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Core Requirements
                  </h4>
                  <ul className="space-y-2">
                    {project.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-indigo-500 mt-0.5">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <LayoutDashboard className="w-3.5 h-3.5" /> User Stories
                  </h4>
                  <ul className="space-y-2">
                    {project.userStories.map((story, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{story}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
