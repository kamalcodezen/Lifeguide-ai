"use client";

import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-32 pb-20 min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="mb-8">
            <Link href="/" className="text-indigo-600 font-medium hover:underline text-sm mb-6 inline-block">
              &larr; Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-slate-500">Last updated: July 19, 2026</p>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
            <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-indigo-600">
              <h2>1. Introduction</h2>
              <p>
                Welcome to LifeGuide AI. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered career mentorship services.
              </p>

              <h2>2. Information We Collect</h2>
              <p>We may collect several types of information from and about users of our service, including:</p>
              <ul>
                <li><strong>Personal Data:</strong> Name, email address, and authentication credentials (including OAuth tokens from Google or GitHub).</li>
                <li><strong>Profile Data:</strong> Your skills, career goals, experience level, and industry preferences that you provide to generate your AI roadmaps.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our AI roadmap and project generation services.</li>
                <li>Personalize your experience and deliver content tailored to your career goals.</li>
                <li>Communicate with you regarding updates, security alerts, and support messages.</li>
                <li>Monitor and analyze usage trends to improve platform performance.</li>
              </ul>

              <h2>4. AI Processing</h2>
              <p>
                LifeGuide AI utilizes Google&apos;s Gemini AI to analyze your profile and generate recommendations. Your Profile Data (skills, goals, experience) is securely transmitted to our AI partners solely for the purpose of generating your personalized roadmaps and projects. We do not use your personal identifiable data (like your name or email) for AI model training.
              </p>

              <h2>5. Data Security</h2>
              <p>
                We have implemented robust, industry-standard security measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. This includes encryption, secure database architectures, and secure session management via Better Auth.
              </p>

              <h2>6. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. You can permanently delete your account and all associated data at any time from your Dashboard Settings. Once deleted, this action cannot be undone and all your roadmaps, projects, and profile data will be permanently wiped.
              </p>

              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@lifeguide.ai.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
