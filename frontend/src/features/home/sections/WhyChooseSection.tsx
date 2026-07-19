"use client";

import { Compass, Calendar, Code } from "lucide-react";

export function WhyChooseSection() {
  const differentiators = [
    {
      title: "Warmth vs. Anxiety",
      icon: Compass,
      desc: "We replace clinical grids and dark matrix patterns with a warm, soft morning workspace designed to reduce cognitive overwhelm.",
    },
    {
      title: "Adaptive Rhythm",
      icon: Calendar,
      desc: "Your schedule is not fixed. If you have 5 hours this week and 20 hours next week, your learning path dynamically recalibrates.",
    },
    {
      title: "Actionable Proof",
      icon: Code,
      desc: "Don't build cookie-cutter projects. We generate unique, gap-targeted portfolios that prove your capabilities to recruiters.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-surface/30"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
            A Digital Sanctuary for Career Transition
          </h2>
          <p className="font-sans text-base text-lifeguide-text-secondary">
            Why we choose warm, structured guidance over tech-focused career anxiety.
          </p>
        </div>

        {/* Grid Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={index}
                className="group bg-lifeguide-surface border border-lifeguide-border rounded-xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-lifeguide-primary/10 border border-lifeguide-primary/20 flex items-center justify-center text-lifeguide-primary mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-heading text-lg font-bold text-lifeguide-text-primary mb-3">
                  {diff.title}
                </h3>
                <p className="font-sans text-sm text-lifeguide-text-secondary leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
