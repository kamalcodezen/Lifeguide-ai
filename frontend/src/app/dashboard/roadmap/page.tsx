"use client";

import { useState } from "react";
import { Loader2, Map, Clock, CheckCircle2, BookOpen, RefreshCw } from "lucide-react";

interface Resource {
  name: string;
  type: string;
  description: string;
}

interface Week {
  weekNumber: number;
  milestone: string;
  estimatedHours: number;
  topics: string[];
  description: string;
  suggestedResources: Resource[];
}

interface Roadmap {
  title: string;
  track: string;
  skillLevel: string;
  durationWeeks: number;
  weeks: Week[];
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [identifiedGaps, setIdentifiedGaps] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRoadmap(null);

    const gapsArray = identifiedGaps
      .split(",")
      .map((gap) => gap.trim())
      .filter((gap) => gap.length > 0);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE}/api/v1/ai/roadmap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiedGaps: gapsArray }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to generate roadmap.");
      }

      setRoadmap(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Learning Roadmap</h1>
        <p className="text-slate-500">
          Generate a custom, week-by-week learning curriculum tailored to your profile, skill level, and available time.
        </p>
      </div>

      {/* Generator Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-semibold text-slate-700">Identified Skill Gaps (Optional)</label>
            <input
              type="text"
              value={identifiedGaps}
              onChange={(e) => setIdentifiedGaps(e.target.value)}
              placeholder="e.g., System Design, Docker, Advanced React (comma separated)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 h-[46px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Map className="w-5 h-5" />}
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Placeholder State */}
      {!roadmap && !loading && !error && (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center p-16 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <Map className="w-8 h-8 text-indigo-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">No Roadmap Generated</h3>
          <p className="text-sm text-slate-500 max-w-md">
            Click the button above to generate a highly personalized AI learning curriculum based on your profile settings.
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-16 text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-slate-700 font-medium">Designing your curriculum...</p>
          <p className="text-xs text-slate-400 mt-2">Analyzing your skill level, track, and finding resources.</p>
        </div>
      )}

      {/* Results View */}
      {roadmap && !loading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header Info */}
          <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/50 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-400/50">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {roadmap.skillLevel}
            </div>
            <h2 className="text-3xl font-bold mb-2">{roadmap.title}</h2>
            <div className="flex flex-wrap gap-6 text-indigo-100 text-sm mt-6 pt-6 border-t border-indigo-500/50">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-indigo-300" />
                Track: <span className="font-semibold text-white">{roadmap.track}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-300" />
                Duration: <span className="font-semibold text-white">{roadmap.durationWeeks} Weeks</span>
              </div>
            </div>
          </div>

          {/* Weeks List */}
          <div className="space-y-6">
            {roadmap.weeks.map((week) => (
              <div key={week.weekNumber} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                      Week {week.weekNumber}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{week.milestone}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 shrink-0 shadow-sm">
                    <Clock className="w-4 h-4 text-slate-400" />
                    ~{week.estimatedHours} hrs
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {week.description}
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Topics to Cover
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {week.topics.map((topic, i) => (
                        <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md border border-indigo-100">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-500" /> Suggested Resources
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {week.suggestedResources.map((resource, i) => (
                        <li key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-colors cursor-default group relative">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">
                              {resource.name}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full shrink-0">
                              {resource.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            {resource.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 flex justify-center">
             <button
                onClick={() => setRoadmap(null)}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
              >
                <RefreshCw className="w-4 h-4" /> Start Over
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
