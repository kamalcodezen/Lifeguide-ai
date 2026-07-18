import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

// Floating Card 1: Assessment Dialog
function AssessmentDialogCard() {
  return (
    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 w-[180px] sm:w-[220px] md:w-[240px] bg-lifeguide-surface border border-lifeguide-border shadow-lg rounded-xl p-4 animate-float-slow">
      <div className="flex flex-col gap-2 select-none">
        <div>
          <span className="text-[9px] font-bold text-lifeguide-primary uppercase tracking-wider bg-lifeguide-primary/10 px-2 py-0.5 rounded-full">
            Diagnostics
          </span>
          <h4 className="text-xs font-bold text-lifeguide-text-primary mt-1.5">
            Skill Profiler
          </h4>
        </div>

        <div className="space-y-1.5 mt-1 border-t border-lifeguide-border/60 pt-2.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-lifeguide-success-bg border border-lifeguide-success-border flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-lifeguide-success-text stroke-[3]" />
            </div>
            <span className="text-[10px] text-lifeguide-text-secondary truncate">
              React Component Lifecycle
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-lifeguide-success-bg border border-lifeguide-success-border flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-lifeguide-success-text stroke-[3]" />
            </div>
            <span className="text-[10px] text-lifeguide-text-secondary truncate">
              Zod API Payload Schema
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-lifeguide-border-strong flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-lifeguide-primary animate-pulse" />
            </div>
            <span className="text-[10px] text-lifeguide-text-primary font-medium truncate">
              Mongoose Query Indexing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating Card 2: Weekly Progress Metric
function WeeklyProgressCard() {
  return (
    <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 w-[160px] sm:w-[190px] md:w-[220px] bg-lifeguide-surface border border-lifeguide-border shadow-lg rounded-xl p-4 animate-float-medium">
      <div className="flex items-center justify-between gap-3 select-none">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-lifeguide-text-muted uppercase tracking-wider">
            Commitment
          </span>
          <span className="text-xs sm:text-sm font-bold text-lifeguide-text-primary mt-0.5">
            78% Complete
          </span>
          <span className="text-[8px] sm:text-[9px] text-lifeguide-success-text font-semibold mt-1 bg-lifeguide-success-bg border border-lifeguide-success-border px-1.5 py-0.5 rounded-full w-max">
            +12% Streak 🔥
          </span>
        </div>

        {/* Circular progress display */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-lifeguide-border/40"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-lifeguide-success-text"
              strokeWidth="3.5"
              strokeDasharray="78, 100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-[8px] sm:text-[9px] font-bold text-lifeguide-text-primary">
            78%
          </span>
        </div>
      </div>
    </div>
  );
}

// Floating Card 3: Roadmap Node Card
function RoadmapNodeCard() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[240px] sm:w-[260px] md:w-[280px] bg-lifeguide-surface-elevated border border-lifeguide-primary/20 shadow-2xl rounded-2xl p-5 hover:scale-[1.03] transition-all duration-300">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center select-none">
          <span className="text-[9px] font-bold tracking-wider text-white bg-lifeguide-secondary px-2.5 py-0.5 rounded-full">
            Week 3 Milestone
          </span>
          <span className="text-[9px] text-lifeguide-text-muted font-medium">Backend Track</span>
        </div>
        <h4 className="text-xs sm:text-sm font-bold text-lifeguide-text-primary">
          REST API Integration
        </h4>
        <p className="text-[11px] sm:text-xs text-lifeguide-text-secondary leading-relaxed">
          Create type-safe Next.js route handlers, authorize sessions using Better Auth, and validate
          requests.
        </p>
        <div className="border-t border-lifeguide-border/60 pt-3 mt-1 flex justify-between items-center">
          <span className="text-[10px] text-lifeguide-text-muted">Target: 15 Hours</span>
          <span className="text-[10px] text-lifeguide-primary font-semibold hover:underline cursor-pointer flex items-center gap-0.5">
            Start Learning <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[960px] h-[340px] sm:h-[400px] md:h-[480px] mx-auto mt-12 overflow-visible">
      {/* Background radial glow */}
      <div className="absolute inset-0 -m-6 sm:-m-10 bg-radial-ambient-glow opacity-60 pointer-events-none rounded-full blur-3xl z-0" />

      {/* Dashboard Preview Canvas */}
      <div className="relative w-full h-full bg-lifeguide-surface/85 backdrop-blur-md border border-lifeguide-border rounded-lg-card shadow-2xl overflow-hidden z-10 flex items-center justify-center">
        {/* Mock Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        {/* Curved connection vector path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block"
          viewBox="0 0 960 480"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 160 120 C 300 120, 200 360, 480 240 C 700 120, 600 360, 800 360"
            stroke="url(#warm-dawn-grad)"
            strokeWidth="3.5"
            strokeDasharray="8,6"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="warm-dawn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Overlapping contextual mockup cards */}
        <AssessmentDialogCard />
        <RoadmapNodeCard />
        <WeeklyProgressCard />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-18 min-h-screen bg-lifeguide-canvas transition-colors duration-300">
        {/* Section 02: Hero Section */}
        <section
          id="hero"
          className="relative w-full overflow-hidden bg-radial-ambient-glow pt-16 md:pt-24 pb-20 md:pb-28 px-4 md:px-6 lg:px-12"
        >
          <div className="max-w-[1360px] mx-auto text-center relative z-10">
            {/* Upper Centered Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] md:text-xs font-semibold text-lifeguide-primary bg-lifeguide-primary/10 border border-lifeguide-primary/20 select-none mb-6 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-lifeguide-primary" />
              AI-Powered Copilot v1.0
            </div>

            {/* Display Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-lifeguide-text-primary tracking-tight leading-tight max-w-4xl mx-auto mb-6">
              Bridge the Gap Between{" "}
              <span className="bg-gradient-warm-dawn bg-clip-text text-transparent">
                Learning & Careers
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="font-sans text-base sm:text-lg text-lifeguide-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Identify your skill gaps, generate a personalized weekly learning roadmap, and build
              unique portfolio projects designed specifically for the role you want.
            </p>

            {/* Call to Action Triggers */}
            <div className="flex flex-col items-center gap-3.5 mb-12">
              <Link
                href="/signup"
                id="hero-primary-cta"
                className="h-11 px-8 inline-flex items-center justify-center text-sm font-bold text-white bg-gradient-warm-dawn rounded-md-input shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all duration-150"
              >
                Start Free Assessment
              </Link>
              <span className="text-xs text-lifeguide-text-muted select-none">
                No credit card required &bull; Under 5 minutes
              </span>
            </div>

            {/* Interactive compositions visualization */}
            <HeroVisual />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
