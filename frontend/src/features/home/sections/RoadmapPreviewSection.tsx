"use client";

import Link from "next/link";
import { CheckCircle2, Lock } from "lucide-react";

export function RoadmapPreviewSection() {
  return (
    <section
      id="roadmap-preview"
      className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-canvas"
    >
      <div className="max-w-[1360px] mx-auto text-center">
        {/* Header Content */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
            Interactive Career Curriculum
          </h2>
          <p className="font-sans text-base text-lifeguide-text-secondary">
            Preview the clean roadmap dashboard experience compiling skill diagnostics into
            timed milestones.
          </p>
        </div>

        {/* AI Roadmap Preview Card */}
        <div className="relative max-w-[800px] mx-auto bg-lifeguide-surface p-8 shadow-xl rounded-lg-card shadow-inset-ambient group overflow-visible">
          {/* Gradient border backing */}
          <div className="absolute inset-0 -m-[1px] bg-gradient-warm-dawn rounded-lg-card z-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 text-left">
            {/* Insights Badge & Title */}
            <div className="mb-8">
              <span className="text-[10px] font-bold text-lifeguide-secondary uppercase tracking-widest block mb-1">
                AI Assessment Insights
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-lifeguide-text-primary">
                Dynamic React & Redux Mastery Roadmap
              </h3>
            </div>

            {/* Horizontal Timeline Steps */}
            <div className="relative mb-10 py-4">
              {/* Dotted horizontal line connectors */}
              <div className="absolute top-[38px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-lifeguide-border-strong -translate-y-1/2 z-0 hidden md:block" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
                {/* Node 1: Completed */}
                <div className="flex items-center md:flex-col gap-4 md:gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-warm-dawn flex items-center justify-center text-white shrink-0 shadow-md">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col md:items-center text-left md:text-center">
                    <span className="text-[10px] font-bold text-lifeguide-secondary uppercase tracking-wider">
                      Week 1 &bull; Done
                    </span>
                    <h4 className="text-sm font-bold text-lifeguide-text-primary mt-1">
                      State Management Foundations
                    </h4>
                  </div>
                </div>

                {/* Node 2: In-Progress */}
                <div className="flex items-center md:flex-col gap-4 md:gap-3">
                  <div className="w-9 h-9 rounded-full bg-lifeguide-surface border-2 border-lifeguide-primary flex items-center justify-center shrink-0 shadow-md relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-lifeguide-primary animate-pulse" />
                  </div>
                  <div className="flex flex-col md:items-center text-left md:text-center">
                    <span className="text-[10px] font-bold text-lifeguide-primary uppercase tracking-wider">
                      Week 2 &bull; Active
                    </span>
                    <h4 className="text-sm font-bold text-lifeguide-text-primary mt-1">
                      Advanced Hooks & Custom Selectors
                    </h4>
                  </div>
                </div>

                {/* Node 3: Locked */}
                <div className="flex items-center md:flex-col gap-4 md:gap-3 opacity-30 select-none">
                  <div className="w-9 h-9 rounded-full bg-lifeguide-border flex items-center justify-center text-lifeguide-text-muted shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col md:items-center text-left md:text-center">
                    <span className="text-[10px] font-bold text-lifeguide-text-muted uppercase tracking-wider">
                      Week 3 &bull; Locked
                    </span>
                    <h4 className="text-sm font-bold text-lifeguide-text-primary mt-1">
                      Redux Middleware & Thunk Integrations
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Action footer */}
            <div className="flex justify-center border-t border-lifeguide-border/60 pt-6 mt-2">
              <Link
                href="/signup"
                id="roadmap-preview-action"
                className="h-9 px-6 inline-flex items-center justify-center text-xs font-semibold text-lifeguide-text-primary border border-lifeguide-border-strong rounded-md-input hover:bg-lifeguide-surface-elevated transition-colors"
              >
                View Full Roadmap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
