"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { createProject } from "@/features/projects/services/projectsService";
import type { DifficultyRating } from "@/features/projects/types";

interface CareerRecommendation {
  role: string;
  matchScore: number;
  summary: string;
  reasons: string[];
  existingStrengths: string[];
  requiredUpskilling: string[];
}

interface CareerData {
  recommendations: CareerRecommendation[];
}

interface ProjectSuggestion {
  title: string;
  difficultyRating: "entry" | "mid" | "senior";
  summary: string;
  techStack: string[];
  requirements: string[];
  businessCase: string;
  userStories: string[];
}

interface ProjectsData {
  projects: ProjectSuggestion[];
}

type TabType = "career" | "projects" | "gaps";

export default function AiCopilotPage() {
  const [activeTab, setActiveTab] = useState<TabType>("career");
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  // Data States
  const [careerData, setCareerData] = useState<CareerData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  
  // UX States
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState("Initializing Career Copilot...");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [profileExists, setProfileExists] = useState(true);
  
  // Action state trackers
  const [savingProjectId, setSavingProjectId] = useState<string | null>(null);

  const fetchAiData = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      // 1. Verify user profile exists first
      setLoadingStep("Checking user profile settings...");
      const profileRes = await fetch(`${API_BASE}/api/v1/profile`, {
        credentials: "include",
      });

      if (profileRes.status === 404) {
        setProfileExists(false);
        setLoading(false);
        return;
      }
      setProfileExists(true);

      // 2. Fetch AI Insights and project ideas in parallel
      setLoadingStep("Consulting Gemini AI Career Engine...");
      const [careerRes, projectsRes] = await Promise.all([
        fetch(`${API_BASE}/api/v1/ai/career-recommendations`, { credentials: "include" }),
        fetch(`${API_BASE}/api/v1/ai/project-suggestions`, { credentials: "include" }),
      ]);

      setLoadingStep("Validating AI response structured outputs...");
      
      if (!careerRes.ok) {
        const errBody = await careerRes.json();
        throw new Error(errBody?.error?.message || "Failed to load career recommendations.");
      }

      if (!projectsRes.ok) {
        const errBody = await projectsRes.json();
        throw new Error(errBody?.error?.message || "Failed to load portfolio suggestions.");
      }

      const careerBody = await careerRes.json();
      const projectsBody = await projectsRes.json();

      setCareerData(careerBody.data);
      setProjectsData(projectsBody.data);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected AI pipeline error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAiData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveProject = async (proj: ProjectSuggestion) => {
    setSavingProjectId(proj.title);
    setError(null);
    setSuccessMsg(null);

    try {
      await createProject({
        title: proj.title,
        difficultyRating: proj.difficultyRating as DifficultyRating,
        requirements: proj.requirements,
        techStack: proj.techStack,
      });
      setSuccessMsg(`Project "${proj.title}" added to your workspace successfully! Check it out in Custom Projects.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import portfolio project brief.");
    } finally {
      setSavingProjectId(null);
    }
  };

  // Color mappings
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 75) return "text-indigo-600 bg-indigo-50 border-indigo-200";
    return "text-amber-600 bg-amber-50 border-amber-200";
  };

  const getDifficultyBadge = (difficulty: string) => {
    if (difficulty === "senior") return "bg-red-50 border-red-200 text-red-700";
    if (difficulty === "mid") return "bg-amber-50 border-amber-200 text-amber-700";
    return "bg-emerald-50 border-emerald-200 text-emerald-700";
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center space-y-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-base font-bold text-slate-800 animate-pulse">{loadingStep}</p>
          <p className="text-xs text-slate-400">This can take up to 8 seconds depending on Gemini response times...</p>
        </div>
      </div>
    );
  }

  if (!profileExists) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-800">Profile Required for Copilot Insights</h2>
          <p className="mx-auto max-w-md text-sm text-slate-500 leading-relaxed">
            Please create a target career profile first. The AI engine uses your goals and target tracks to build suggestions.
          </p>
        </div>
        <Link
          href="/dashboard/profiler"
          className="inline-flex items-center space-x-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  // Extract all gaps dynamically for the gap analysis view
  const allUpskillingGaps = Array.from(
    new Set(careerData?.recommendations.flatMap((r) => r.requiredUpskilling) || [])
  );
  const allStrengths = Array.from(
    new Set(careerData?.recommendations.flatMap((r) => r.existingStrengths) || [])
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Copilot Core
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            AI Career Copilot
          </h1>
          <p className="text-sm text-slate-500">
            Intelligent career pathway matching, skill gaps analysis, and custom boilerplate project blueprints.
          </p>
        </div>
        <button
          onClick={fetchAiData}
          className="inline-flex items-center space-x-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
          </svg>
          <span>Regenerate Insights</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 flex items-start justify-between space-x-3">
          <div className="flex items-start space-x-3">
            <svg className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 flex items-start justify-between space-x-3">
          <div className="flex items-start space-x-3">
            <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Tabs Menu */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {[
            { id: "career", name: "Career Pathway Options" },
            { id: "projects", name: "Suggested Gaps Projects" },
            { id: "gaps", name: "Skill Gaps Matrix" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`border-b-2 py-4 px-1 text-sm font-bold transition-all duration-200 outline-none ${
                  isActive
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {/* --- CAREER TAB --- */}
        {activeTab === "career" && (
          <div className="grid gap-6 md:grid-cols-2">
            {careerData?.recommendations.map((rec, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition">
                <div className="space-y-4">
                  {/* Top line with match score */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
                      {rec.role}
                    </h3>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${getScoreColor(rec.matchScore)}`}>
                      {rec.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {rec.summary}
                  </p>

                  {/* Reasons list */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Why this fits</span>
                    <ul className="space-y-1.5">
                      {rec.reasons.map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                          <span className="text-indigo-500 shrink-0">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Grid for Gaps and Strengths */}
                <div className="grid gap-4 sm:grid-cols-2 border-t border-slate-100 pt-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strengths Matched</span>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.existingStrengths.map((str, sIdx) => (
                        <span key={sIdx} className="rounded bg-emerald-50 border border-emerald-150 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 capitalize">
                          {str}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Target Gaps to Learn</span>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.requiredUpskilling.map((gap, gIdx) => (
                        <span key={gIdx} className="rounded bg-amber-50 border border-amber-150 px-2 py-0.5 text-[10px] font-semibold text-amber-700 capitalize">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-500 flex items-start space-x-3 leading-relaxed">
              <svg className="h-5 w-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                These custom portfolio briefs are designed targeting your skill gaps. Click **&quot;Import Project Brief&quot;** to immediately add them to your interactive dashboard checklist.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {projectsData?.projects.map((proj, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition">
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className={`inline-flex rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getDifficultyBadge(proj.difficultyRating)}`}>
                          {proj.difficultyRating}
                        </span>
                        <h3 className="text-lg font-bold text-slate-800 leading-tight">
                          {proj.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {proj.summary}
                    </p>

                    {/* Tech Stack pills */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Business Case */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Business Case</span>
                      <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                        {proj.businessCase}
                      </p>
                    </div>

                    {/* Requirements checklist */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Features Requirements</span>
                      <ul className="space-y-1.5">
                        {proj.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start space-x-2 text-xs text-slate-600">
                            <span className="text-slate-400 shrink-0">[ ]</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* User Stories */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">User Stories</span>
                      <ul className="space-y-1.5">
                        {proj.userStories.map((story, sIdx) => (
                          <li key={sIdx} className="flex items-start space-x-2 text-xs text-slate-600">
                            <span className="text-indigo-500 shrink-0">→</span>
                            <span className="leading-relaxed">{story}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSaveProject(proj)}
                    disabled={savingProjectId !== null}
                    className="w-full text-center rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {savingProjectId === proj.title ? "Importing Brief..." : "Import Project Brief"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- GAPS MATRIX TAB --- */}
        {activeTab === "gaps" && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Strengths Matrix */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-800">Your Verified Strengths</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                These competency sub-skills match your onboarding parameters or assessments scores exceeding baseline thresholds.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {allStrengths.length > 0 ? (
                  allStrengths.map((str, idx) => (
                    <span key={idx} className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 capitalize">
                      {str}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No matched strengths identified yet. Try complete assessments first.</span>
                )}
              </div>
            </div>

            {/* Gaps / Growth matrix */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-800">Identified Gaps & Gaps Areas</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                AI targeted gap areas to develop. Your learning roadmaps and suggested portfolio projects target these exact items.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {allUpskillingGaps.length > 0 ? (
                  allUpskillingGaps.map((gap, idx) => (
                    <span key={idx} className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-bold text-amber-700 capitalize">
                      {gap}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No upskilling gaps identified.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
