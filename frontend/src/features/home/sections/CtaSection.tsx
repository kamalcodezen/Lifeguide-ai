"use client";

import Link from "next/link";

export function CtaSection() {
  return (
    <section
      id="final-cta"
      className="relative w-full py-20 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-canvas z-10 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 -m-10 bg-radial-ambient-glow opacity-30 pointer-events-none rounded-full blur-3xl z-0" />

      <div className="relative max-w-[960px] mx-auto bg-gradient-sunset-peach rounded-3xl p-10 md:p-14 text-center shadow-xl border border-white/10 overflow-hidden group">
        {/* Background Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-lifeguide-text-primary tracking-tight leading-tight mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="font-sans text-sm sm:text-base text-lifeguide-text-primary/80 mb-8 max-w-lg leading-relaxed">
            Start profiling your skills and generate your custom learning copilot in under 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/signup"
              id="final-primary-cta"
              className="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center text-sm font-bold text-white bg-lifeguide-primary rounded-md-input shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all duration-150"
            >
              Start Free Assessment
            </Link>
            <Link
              href="/#pricing"
              id="final-secondary-cta"
              className="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center text-sm font-bold text-lifeguide-text-primary hover:bg-white/10 rounded-md-input active:scale-[0.98] transition-all duration-150 border border-lifeguide-border-strong/40 bg-white/5"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
