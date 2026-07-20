"use client";

import { useState } from "react";
import { Loader2, FileText, Briefcase, CheckCircle2, XCircle, AlertCircle, TrendingUp } from "lucide-react";

interface ResumeAnalysis {
  atsScore: number;
  summary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  improvements: string[];
}

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState("");
  const [targetJobDescription, setTargetJobDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !targetJobDescription.trim()) {
      setError("Please provide both resume text and job description.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE}/api/v1/ai/resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetJobDescription }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to analyze resume");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Resume ATS Matcher</h1>
        <p className="text-slate-500">Compare your resume against a target job description to get a detailed ATS compatibility score and actionable feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Column */}
        <div className="space-y-6">
          <form onSubmit={handleAnalyze} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText className="w-4 h-4 text-indigo-600" />
                Your Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-800 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Target Job Description
              </label>
              <textarea
                value={targetJobDescription}
                onChange={(e) => setTargetJobDescription(e.target.value)}
                placeholder="Paste the job description you are targeting..."
                className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-800 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !resumeText.trim() || !targetJobDescription.trim()}
              className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
              {loading ? "Analyzing Alignment..." : "Analyze Resume"}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div>
          {!result && !loading && (
            <div className="h-full bg-slate-50 border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 text-center text-slate-500">
              <TrendingUp className="w-12 h-12 mb-4 text-slate-300" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">No Analysis Yet</h3>
              <p className="text-sm">Paste your resume and the target job description, then click analyze to see how well you match.</p>
            </div>
          )}

          {loading && (
            <div className="h-full bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-12 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
              <p className="text-slate-600 font-medium">Running AI deep analysis...</p>
              <p className="text-xs text-slate-400 mt-2">Checking keywords, formats, and structural alignment.</p>
            </div>
          )}

          {result && !loading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Score Header */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center ${getScoreColor(result.atsScore)}`}>
                  <span className="text-4xl font-extrabold">{result.atsScore}%</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">ATS Match Score</h3>
                  <p className="text-sm text-slate-500 mt-1">{result.summary}</p>
                </div>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <h4 className="flex items-center gap-2 font-semibold text-emerald-800 mb-3 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Matched Keywords
                  </h4>
                  {result.matchedKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchedKeywords.map((kw, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-emerald-200 text-emerald-700 rounded-md text-xs font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-600/70 italic">None found.</p>
                  )}
                </div>

                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <h4 className="flex items-center gap-2 font-semibold text-red-800 mb-3 text-sm">
                    <XCircle className="w-4 h-4" /> Missing Keywords
                  </h4>
                  {result.missingKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-red-200 text-red-700 rounded-md text-xs font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-red-600/70 italic">None missing!</p>
                  )}
                </div>
              </div>

              {/* Formatting Issues */}
              {result.formattingIssues.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-amber-700 mb-3 text-sm">
                    <AlertCircle className="w-4 h-4" /> Formatting Issues
                  </h4>
                  <ul className="space-y-2">
                    {result.formattingIssues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" /> Actionable Improvements
                </h4>
                <ul className="space-y-3">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
