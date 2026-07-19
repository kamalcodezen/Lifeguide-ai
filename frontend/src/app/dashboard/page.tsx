"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/shared/providers/SessionProvider";

interface DashboardStats {
  hasProfile: boolean;
  hasRoadmap: boolean;
  roadmapProgress: number;
}

export default function DashboardHome() {
  const { user } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    hasProfile: false,
    hasRoadmap: false,
    roadmapProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardState = async () => {
      try {
        const [profileRes, roadmapRes] = await Promise.all([
          fetch("http://localhost:5000/api/v1/profile", { credentials: "include" }),
          fetch("http://localhost:5000/api/v1/roadmaps", { credentials: "include" }),
        ]);

        const hasProfile = profileRes.status === 200;
        const hasRoadmap = roadmapRes.status === 200;
        let roadmapProgress = 0;

        if (hasRoadmap) {
          const roadmapData = await roadmapRes.json();
          roadmapProgress = roadmapData.data?.progressPercentage || 0;
        }

        setStats({
          hasProfile,
          hasRoadmap,
          roadmapProgress,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to load dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardState();
  }, []);

  const featureCards = [
    {
      title: "AI Career Copilot",
      description: "Get real-time job path recommendations, gap details, and custom project briefs.",
      status: stats.hasProfile ? "Active" : "Pending Profile",
      statusClass: stats.hasProfile
        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
        : "bg-slate-100 text-slate-600 border-slate-200",
      href: "/dashboard/ai",
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Interactive Skill Profiler",
      description: "Diagnose your strengths and skill gaps using tailored track questionnaires.",
      status: stats.hasProfile ? "Completed" : "Not Started",
      statusClass: stats.hasProfile
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-amber-50 text-amber-700 border-amber-200",
      href: "/dashboard/profiler",
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
    },
    {
      title: "AI Learning Roadmap",
      description: "Step-by-step personalized syllabus with curated links and time allocation.",
      status: stats.hasRoadmap ? `${stats.roadmapProgress}% Complete` : "Not Generated",
      statusClass: stats.hasRoadmap
        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
        : "bg-slate-100 text-slate-600 border-slate-200",
      href: "/dashboard/roadmap",
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      title: "Custom Project Builder",
      description: "AI-generated briefs targeting gaps with boilerplate mock directory setups.",
      status: "Not Started",
      statusClass: "bg-slate-100 text-slate-600 border-slate-200",
      href: "/dashboard/projects",
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "ATS Resume Matcher",
      description: "Verify resume compatibility scores, keyword match density, and format gaps.",
      status: "On standby",
      statusClass: "bg-slate-100 text-slate-600 border-slate-200",
      href: "/dashboard/resume",
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "AI Mock Interviews",
      description: "Practice interactive tech/coding dialogs with simulated feedback metrics.",
      status: "Locked",
      statusClass: "bg-slate-100 text-slate-600 border-slate-200",
      href: "/dashboard/interview",
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-xl"></div>
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-violet-500/20 blur-xl"></div>

        <div className="relative z-10 space-y-2">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            Overview Dashboard
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || "Candidate"}!
          </h1>
          <p className="max-w-xl text-indigo-100 text-sm font-medium leading-relaxed">
            Ready to enhance your career milestones? Access diagnostic assessments, track personalized study plans, and generate boilerplate briefs.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-48 w-full animate-pulse rounded-2xl bg-white border border-slate-100"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Preparation Milestones</h2>
            <span className="text-xs font-semibold text-slate-400">Aurora Blossom Design System v1.0.0</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                      {card.icon}
                    </div>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${card.statusClass}`}>
                      {card.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-800 text-base tracking-tight">{card.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{card.description}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                    href={card.href}
                    className="inline-flex items-center text-xs font-bold text-indigo-600 transition hover:text-indigo-700"
                  >
                    <span>Open Module</span>
                    <svg className="ml-1.5 h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
