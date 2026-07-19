"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export function PricingSection() {
  const freeFeatures = [
    "1 active career track preference",
    "Baseline diagnostic skill assessment",
    "Initial study roadmap setup",
    "Standard learning resources links",
    "Email community support",
  ];

  const premiumFeatures = [
    "Unlimited roadmaps and track profiling",
    "Customized gap-filling project specs",
    "Resume ATS matcher & keyword scorecards",
    "Interactive mock interviews & evaluations",
    "Priority 24/7 dedicated support",
  ];

  return (
    <section
      id="pricing"
      className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-canvas"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
            Simple, Transparent Options
          </h2>
          <p className="font-sans text-base text-lifeguide-text-secondary">
            Select the path that fits your learning pace. Upgrade or cancel at any time.
          </p>
        </div>

        {/* Pricing Matrix 2-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto w-full">
          {/* Explorer (Free) */}
          <div className="bg-lifeguide-surface border border-lifeguide-border shadow-md rounded-lg-card p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-200">
            <div>
              <div className="mb-6">
                <h3 className="font-heading text-xl font-bold text-lifeguide-text-primary">
                  Explorer
                </h3>
                <p className="font-sans text-xs text-lifeguide-text-secondary mt-1">
                  Perfect for exploring career path options and baseline diagnostics.
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="font-heading text-3xl font-extrabold text-lifeguide-text-primary">
                  $0
                </span>
                <span className="text-xs font-semibold text-lifeguide-text-muted ml-1.5">
                  / lifetime
                </span>
              </div>

              {/* Feature checklist */}
              <ul className="space-y-3.5 mb-8 border-t border-lifeguide-border/60 pt-6">
                {freeFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-lifeguide-text-secondary">
                    <Check className="w-4 h-4 text-lifeguide-success-text shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/signup"
              id="pricing-free-cta"
              className="h-11 w-full border border-lifeguide-border-strong text-lifeguide-text-primary rounded-md-input text-sm font-bold hover:bg-lifeguide-surface-elevated active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Choose Free Explorer
            </Link>
          </div>

          {/* Copilot Pro ($19/mo) */}
          <div className="relative bg-lifeguide-surface p-8 shadow-xl rounded-lg-card flex flex-col justify-between group overflow-visible hover:shadow-2xl transition-all duration-200">
            {/* 1px gradient border backing */}
            <div className="absolute inset-0 -m-[1px] bg-gradient-warm-dawn rounded-lg-card z-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Popular floating badge */}
            <div className="absolute -top-3 left-6 text-[9px] font-bold text-white bg-gradient-warm-dawn px-3 py-0.5 rounded-full uppercase tracking-wider select-none z-20">
              Most Popular
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <h3 className="font-heading text-xl font-bold text-lifeguide-text-primary">
                  Copilot Pro
                </h3>
                <p className="font-sans text-xs text-lifeguide-text-secondary mt-1">
                  Comprehensive, gap-targeted acceleration suite to land roles.
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="font-heading text-3xl font-extrabold text-lifeguide-text-primary">
                  $19
                </span>
                <span className="text-xs font-semibold text-lifeguide-text-muted ml-1.5">
                  / month
                </span>
              </div>

              {/* Feature checklist */}
              <ul className="space-y-3.5 mb-8 border-t border-lifeguide-border/60 pt-6">
                {premiumFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-lifeguide-text-secondary">
                    <Check className="w-4 h-4 text-lifeguide-success-text shrink-0 mt-0.5" />
                    <span className="font-medium text-lifeguide-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/signup"
              id="pricing-premium-cta"
              className="relative z-10 h-11 w-full text-white bg-gradient-warm-dawn rounded-md-input text-sm font-bold hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center shadow-md"
            >
              Upgrade to Copilot Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
