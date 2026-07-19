"use client";

import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-32 pb-20 min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
            About <span className="text-indigo-600">LifeGuide AI</span>
          </h1>
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="lead text-xl text-slate-600 mb-8 font-medium">
              We believe that everyone deserves a personalized path to success. LifeGuide AI was built to bridge the gap between ambition and execution using the power of advanced Agentic AI.
            </p>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
              <p className="text-slate-600">
                To democratize career growth by providing every individual with a personalized, AI-driven learning roadmap, intelligent project scaffolding, and actionable career insights tailored exactly to their unique skills and aspirations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-900 mb-3">AI-Powered Roadmaps</h3>
                <p className="text-indigo-700/80">
                  Stop guessing what to learn next. Our AI analyzes your current skills and career goals to generate a step-by-step curriculum that adapts as you grow.
                </p>
              </div>
              <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100">
                <h3 className="text-xl font-bold text-purple-900 mb-3">Intelligent Projects</h3>
                <p className="text-purple-700/80">
                  Build a portfolio that stands out. We recommend and scope out real-world projects with precise technical requirements based on your desired industry.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Why We Built This</h2>
            <p className="text-slate-600 mb-6">
              The modern landscape of continuous learning is overwhelming. There are endless tutorials, bootcamps, and courses, but very little guidance on what actually matters for *you*. LifeGuide AI cuts through the noise by acting as your personal technical mentor, available 24/7.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
