"use client";

import { useEffect, useState } from "react";

interface Resource {
  resourceId: string;
  title: string;
  resourceType: "video" | "documentation" | "practice_exercise" | "assignment";
  url: string;
  durationMinutes: number;
  isCompleted: boolean;
}

interface Milestone {
  milestoneId: string;
  title: string;
  sequenceNumber: number;
  status: "locked" | "active" | "completed";
  resources: Resource[];
}

interface RoadmapData {
  _id: string;
  trackName: string;
  progressPercentage: number;
  totalHoursRequired: number;
  milestones: Milestone[];
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const fetchRoadmap = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/v1/roadmaps", {
        credentials: "include",
      });

      if (res.status === 200) {
        const body = await res.json();
        setRoadmap(body.data);
      } else if (res.status === 404) {
        setRoadmap(null);
      } else {
        const errBody = await res.json();
        setError(errBody?.error?.message || "Failed to load roadmap.");
      }
    } catch {
      setError("Unable to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRoadmap();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateRoadmap = async () => {
    setGenerating(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch("http://localhost:5000/api/v1/roadmaps/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok && body.success) {
        setRoadmap(body.data);
        setSuccessMsg("Your AI career roadmap has been compiled successfully!");
      } else {
        setError(body?.error?.message || "Failed to generate roadmap. Ensure you have created a profile first.");
      }
    } catch {
      setError("Unable to trigger AI roadmap compiler due to a server connection issue.");
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleResource = async (milestoneId: string, resourceId: string, isCompleted: boolean) => {
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("http://localhost:5000/api/v1/roadmaps/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestoneId,
          resourceId,
          isCompleted,
        }),
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok && body.success) {
        setRoadmap(body.data);
        setSuccessMsg(isCompleted ? "Resource checked off! Progress updated." : "Progress status updated.");
      } else {
        setError(body?.error?.message || "Failed to update progress.");
      }
    } catch {
      setError("Unable to update progress due to connection error.");
    }
  };

  // Group milestones into Phases dynamically
  const getPhaseName = (sequenceNumber: number) => {
    if (sequenceNumber <= 2) return "Phase 1: Foundation Blocks";
    if (sequenceNumber <= 4) return "Phase 2: Core Engineering Concepts";
    return "Phase 3: Advanced Masteries & Testing";
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Retrieving AI career roadmap...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Learning Paths
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          AI Learning Roadmap
        </h1>
        <p className="text-sm text-slate-500">
          Step-by-step educational checkpoints configured to address your specific skill level gaps.
        </p>
      </div>

      {/* Message banners */}
      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 flex items-start space-x-3">
          <svg className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 flex items-start space-x-3">
          <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {roadmap ? (
        /* --- ROADMAP TIMELINE VIEW --- */
        <div className="space-y-8">
          {/* Dashboard Summary Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm grid gap-6 md:grid-cols-3 items-center">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Track Category</span>
              <p className="text-lg font-bold text-slate-800">{roadmap.trackName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Required Effort</span>
              <p className="text-lg font-bold text-slate-800">{roadmap.totalHoursRequired} Hours</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>Completion Status</span>
                <span className="text-indigo-600">{roadmap.progressPercentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 border border-slate-150">
                <div
                  className="h-2 rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${roadmap.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Learning path Timeline */}
          <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-12">
            {/* Dynamic Phase Grouping */}
            {(() => {
              const phasesMap: Record<string, Milestone[]> = {};
              roadmap.milestones.forEach((m) => {
                const phase = getPhaseName(m.sequenceNumber);
                if (!phasesMap[phase]) phasesMap[phase] = [];
                phasesMap[phase].push(m);
              });

              return Object.entries(phasesMap).map(([phaseName, milestonesList]) => (
                <div key={phaseName} className="space-y-6">
                  {/* Phase Label banner */}
                  <div className="relative -ml-[41px] flex items-center space-x-3">
                    <div className="h-[18px] w-[18px] rounded-full border-[3px] border-indigo-600 bg-white"></div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full">
                      {phaseName}
                    </h3>
                  </div>

                  <div className="grid gap-6">
                    {milestonesList.map((milestone) => {
                      const isCompleted = milestone.status === "completed";
                      const isActive = milestone.status === "active";

                      return (
                        <div
                          key={milestone.milestoneId}
                          className={`rounded-2xl border bg-white p-6 shadow-sm space-y-4 transition ${
                            isActive
                              ? "border-indigo-200 ring-1 ring-indigo-100"
                              : "border-slate-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2.5">
                                <span className="text-xs font-bold text-slate-400">
                                  Milestone {milestone.sequenceNumber}
                                </span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                    isCompleted
                                      ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                                      : isActive
                                      ? "bg-indigo-50 border border-indigo-200 text-indigo-700"
                                      : "bg-slate-50 border border-slate-200 text-slate-400"
                                  }`}
                                >
                                  {milestone.status}
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-slate-800">
                                {milestone.title}
                              </h4>
                            </div>
                          </div>

                          {/* Resources Checklist */}
                          {milestone.resources.length > 0 && (
                            <div className="border-t border-slate-100 pt-4 space-y-3">
                              <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Curated Training Resources
                              </h5>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {milestone.resources.map((res) => (
                                  <div
                                    key={res.resourceId}
                                    className={`flex items-start justify-between rounded-xl border p-4 transition ${
                                      res.isCompleted
                                        ? "border-slate-150 bg-slate-50/50"
                                        : "border-slate-200 hover:border-slate-350"
                                    }`}
                                  >
                                    <div className="flex items-start space-x-3">
                                      <input
                                        type="checkbox"
                                        checked={res.isCompleted}
                                        onChange={(e) =>
                                          handleToggleResource(
                                            milestone.milestoneId,
                                            res.resourceId,
                                            e.target.checked
                                          )
                                        }
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <div className="space-y-1">
                                        <p
                                          className={`text-xs font-bold ${
                                            res.isCompleted
                                              ? "text-slate-400 line-through"
                                              : "text-slate-700"
                                          }`}
                                        >
                                          {res.title}
                                        </p>
                                        <div className="flex items-center space-x-2 text-[10px] font-semibold text-slate-400 uppercase">
                                          <span className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5">
                                            {res.resourceType.replace("_", " ")}
                                          </span>
                                          <span>{res.durationMinutes} mins</span>
                                        </div>
                                      </div>
                                    </div>

                                    <a
                                      href={res.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-slate-400 hover:text-indigo-600"
                                    >
                                      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      ) : (
        /* --- EMPTY STATE BANNERS --- */
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-800">No Learning Roadmap Generated</h2>
            <p className="mx-auto max-w-md text-sm text-slate-500 leading-relaxed">
              Compile your personalized study syllabus matching your track category settings.
            </p>
          </div>
          <button
            onClick={handleGenerateRoadmap}
            disabled={generating}
            className="inline-flex items-center space-x-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <span>{generating ? "Compiling Path..." : "Generate AI Roadmap"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
