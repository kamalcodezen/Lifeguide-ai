"use client";

import { useState } from "react";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Compass,
  Calendar,
  Code,
  Sparkles,
  Route,
  Briefcase,
  FileText,
  MessageSquare,
  Lock,
  CheckCircle2,
  ChevronDown,
  Star,
} from "lucide-react";

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

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

  const steps = [
    {
      step: "01",
      title: "Select Track",
      desc: "Pick Frontend, Backend, or Product Management.",
    },
    {
      step: "02",
      title: "Baseline Profile",
      desc: "Complete diagnostic assessment questions.",
    },
    {
      step: "03",
      title: "Learn & Refine",
      desc: "Study weekly milestones tailored to your study hours.",
    },
    {
      step: "04",
      title: "Build Spec",
      desc: "Generate and build a custom gap-filling portfolio project.",
    },
    {
      step: "05",
      title: "Simulate & Apply",
      desc: "Optimize your resume ATS score and run mock interview simulators.",
    },
  ];

  const testimonials = [
    {
      quote:
        "LifeGuide AI mapped out my exact gaps. I built a custom analytics dashboard project and landed my junior engineer job in 3 months.",
      author: "Sarah L.",
      title: "Recent Graduate",
      track: "Frontend Track",
    },
    {
      quote:
        "Coming from sales operations, I had 8 hours a week. The adaptive roadmap scheduled everything perfectly. The mock interview scorer built my confidence.",
      author: "David K.",
      title: "Transitioned to Product Manager",
      track: "PM Track",
    },
    {
      quote:
        "My resume was getting rejected immediately. The ATS matcher helped me optimize my formatting and keywords. I got three recruiter calls in 2 weeks.",
      author: "Elena R.",
      title: "Software Engineer",
      track: "Backend Track",
    },
  ];

  const faqs = [
    {
      question: "Which career tracks are supported?",
      answer: "We currently support Frontend Engineering, Backend Engineering, and Product Management tracks.",
    },
    {
      question: "How does the AI analyze my skill gaps?",
      answer:
        "Through a 5-10 diagnostic profiling assessment mapped during onboarding that evaluates core competencies dynamically.",
    },
    {
      question: "Can I import job descriptions?",
      answer:
        "Yes, you can paste links or copy-paste texts from specific target job postings to compare them directly against your baseline profile.",
    },
    {
      question: "How do custom portfolio briefs prevent generic templates?",
      answer:
        "The platform analyzes your unique skill gaps and details a custom business architecture requirement targeting those weaknesses instead of standard cookie-cutter templates.",
    },
    {
      question: "Is there a student discount?",
      answer: "Yes, verified student accounts receive special discounted pricing plans.",
    },
  ];

  const stats = [
    {
      value: "91.4%",
      label: "Career Placement Rate within 180 Days",
      gradient: "bg-gradient-warm-dawn",
    },
    {
      value: "14,200+",
      label: "Custom Roadmaps Generated & Executed",
      gradient: "bg-gradient-sunset-peach",
    },
    {
      value: "72%",
      label: "Average ATS Match Score Improvement",
      gradient: "bg-gradient-warm-dawn",
    },
  ];

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

        {/* Section 03: Trust & Statistics */}
        <section
          id="stats"
          className="relative w-full py-12 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-canvas z-10"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-lifeguide-surface border border-lifeguide-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200 select-none"
                >
                  <span
                    className={`font-heading text-4xl sm:text-5xl font-extrabold ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-lifeguide-text-secondary leading-normal max-w-[240px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 04: Why Choose LifeGuide AI */}
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

        {/* Section 05: Core Feature Grid */}
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

        {/* Section 06: How It Works Flow */}
        <section
          id="how-it-works"
          className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-surface/30 overflow-hidden"
        >
          <div className="max-w-[1360px] mx-auto">
            {/* Header Content */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
                The Step-by-Step Pathway to Employment
              </h2>
              <p className="font-sans text-base text-lifeguide-text-secondary">
                How LifeGuide AI structures your learning loop from profile setup to target role
                readiness.
              </p>
            </div>

            {/* Horizontal flow pipeline */}
            <div className="relative mt-8">
              {/* Connector line (desktop) */}
              <div className="absolute top-8 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-lifeguide-support/30 -translate-y-1/2 z-0 hidden md:block" />

              {/* Connector line (mobile/vertical) */}
              <div className="absolute top-0 bottom-0 left-[26px] w-0.5 border-l-2 border-dashed border-lifeguide-support/30 z-0 md:hidden" />

              {/* Pipeline Step Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6 relative z-10">
                {steps.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-5 md:gap-4 group"
                  >
                    {/* Circle Node indicator */}
                    <div className="w-13 h-13 rounded-full bg-lifeguide-surface border-2 border-lifeguide-border-strong flex items-center justify-center shrink-0 shadow-sm group-hover:border-lifeguide-primary group-hover:scale-105 transition-all duration-200">
                      <span className="font-heading text-sm font-bold text-lifeguide-primary">
                        {item.step}
                      </span>
                    </div>

                    {/* Step details content */}
                    <div className="flex flex-col">
                      <h3 className="font-heading text-base font-bold text-lifeguide-text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-lifeguide-text-secondary leading-relaxed max-w-[200px] md:mx-auto">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: AI Roadmap Interactive Preview */}
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

        {/* Section 08: Testimonials */}
        <section
          id="testimonials"
          className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-surface/30"
        >
          <div className="max-w-[1360px] mx-auto">
            {/* Header Content */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
                Success Stories from the Sanctuary
              </h2>
              <p className="font-sans text-base text-lifeguide-text-secondary">
                See how candidates have navigated the transition from learning tracks directly into
                professional roles.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-lifeguide-surface border border-lifeguide-border rounded-xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex flex-col">
                    {/* Stars indicator */}
                    <div className="flex items-center gap-1 mb-6 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current stroke-0" />
                      ))}
                    </div>

                    <p className="font-sans text-sm text-lifeguide-text-secondary italic leading-relaxed mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-lifeguide-border/60 pt-4 mt-2 select-none">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-lifeguide-text-primary">
                        {item.author}
                      </h4>
                      <p className="text-[10px] text-lifeguide-text-muted mt-0.5">{item.title}</p>
                    </div>
                    <span className="text-[9px] font-semibold text-lifeguide-primary bg-lifeguide-primary/10 px-2 py-0.5 rounded-full uppercase">
                      {item.track}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 09: Pricing Matrix */}
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

        {/* Section 10: FAQ Accordion */}
        <section
          id="faq"
          className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-surface/30"
        >
          <div className="max-w-[800px] mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
                Frequently Answered Questions
              </h2>
              <p className="font-sans text-base text-lifeguide-text-secondary">
                Find clear answers to key operations and platform behaviors.
              </p>
            </div>

            {/* FAQ List Accordion */}
            <div className="border-t border-lifeguide-border">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="border-b border-lifeguide-border py-4">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between text-left font-heading text-sm sm:text-base font-bold text-lifeguide-text-primary py-2 select-none"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-lifeguide-text-muted transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? "rotate-180 text-lifeguide-primary" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-sans text-xs sm:text-sm text-lifeguide-text-secondary leading-relaxed pb-2">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 11: Final CTA Banner */}
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
      </main>
      <Footer />
    </>
  );
}
