"use client";

import { Sparkles, Route, Briefcase, FileText, MessageSquare } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      badge: "Diagnostics",
      title: "Interactive Skill Profiler",
      desc: "A baseline diagnostic test (5-10 track-specific questions) identifying your strength and gap baseline scores.",
      icon: Sparkles,
    },
    {
      badge: "Roadmap",
      title: "AI Roadmap Generator",
      desc: "A dynamic learning path mapped around your weekly availability, sourcing the best free educational guides.",
      icon: Route,
    },
    {
      badge: "Portfolio",
      title: "Personalized Project Briefs",
      desc: "Context-driven project challenges designed specifically to strengthen your identified skill gaps.",
      icon: Briefcase,
    },
    {
      badge: "Resume",
      title: "Resume Analyzer & ATS Matcher",
      desc: "Upload your PDF resume to compare matching score percentages, missing keywords, and get ATS feedback.",
      icon: FileText,
    },
    {
      badge: "Interview",
      title: "Mock Interview Simulator",
      desc: "Practice text-based technical mock loops with AI interviewers and receive competency scorecards.",
      icon: MessageSquare,
    },
  ];

  return (
    <section
      id="features"
      className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-canvas"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
            Your Complete Career Preparation Suite
          </h2>
          <p className="font-sans text-base text-lifeguide-text-secondary">
            Five robust AI integrations designed to guide candidate activation from diagnostics to
            employment.
          </p>
        </div>

        {/* Feature Grid: 3-column top row, 2-column bottom row on desktop */}
        <div className="flex flex-col gap-8">
          {/* Row 1: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="group bg-lifeguide-surface border border-lifeguide-border rounded-lg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-11 h-11 rounded-lg bg-lifeguide-primary/10 border border-lifeguide-primary/20 flex items-center justify-center text-lifeguide-primary group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5.5 h-5.5 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-bold text-lifeguide-primary uppercase tracking-wider bg-lifeguide-primary/10 px-2.5 py-0.5 rounded-full select-none">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-lifeguide-text-primary mb-3">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-xs leading-relaxed text-lifeguide-text-secondary">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Row 2: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto w-full">
            {features.slice(3, 5).map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="group bg-lifeguide-surface border border-lifeguide-border rounded-lg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-11 h-11 rounded-lg bg-lifeguide-primary/10 border border-lifeguide-primary/20 flex items-center justify-center text-lifeguide-primary group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5.5 h-5.5 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-bold text-lifeguide-primary uppercase tracking-wider bg-lifeguide-primary/10 px-2.5 py-0.5 rounded-full select-none">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-lifeguide-text-primary mb-3">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-xs leading-relaxed text-lifeguide-text-secondary">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
