"use client";

import Link from "next/link";
import { BrandLogo } from "@/shared/components/Navbar";
import { Mail } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011 13.983 13.983 0 0 0 12.012 0 .075.075 0 0 1 .078.012c.12.097.246.194.373.287a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Supported Tracks",
      links: [
        { label: "Frontend Engineering", href: "/#tracks" },
        { label: "Backend Engineering", href: "/#tracks" },
        { label: "Product Management", href: "/#tracks" },
      ],
    },
    {
      title: "Platform Resources",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "System Status", href: "/status" },
      ],
    },
    {
      title: "Legal & Contact",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Email Support", href: "mailto:support@lifeguide.ai" },
      ],
    },
  ];

  const socialLinks = [
    { label: "GitHub", icon: GithubIcon, href: "https://github.com/kamalcodezen/Lifeguide-ai" },
    { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
    { label: "Twitter", icon: TwitterIcon, href: "https://twitter.com" },
    { label: "Discord", icon: DiscordIcon, href: "https://discord.gg" },
    { label: "Email", icon: Mail, href: "mailto:support@lifeguide.ai" },
  ];

  return (
    <footer
      id="main-footer"
      className="bg-lifeguide-surface border-t border-lifeguide-border pt-12 pb-8 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-12">
        {/* Top 4-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12">
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 select-none">
              <BrandLogo />
              <span className="font-heading text-lg font-semibold text-lifeguide-text-primary tracking-tight">
                LifeGuide AI
              </span>
            </div>
            <p className="text-sm leading-relaxed text-lifeguide-text-secondary pr-4">
              Your personalized AI-powered Career & Learning Copilot, designed to resolve choice
              paralysis and map your skill growth journey.
            </p>
          </div>

          {/* Directory Columns */}
          {sections.map((sec) => (
            <div key={sec.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold text-lifeguide-text-primary uppercase tracking-wider">
                {sec.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-lifeguide-text-secondary hover:text-lifeguide-primary transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Base Row: Copyright & Social links */}
        <div className="border-t border-lifeguide-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-lifeguide-text-muted">
            &copy; {currentYear} LifeGuide AI. All rights reserved.
          </span>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-lifeguide-border/40 text-lifeguide-text-muted hover:text-lifeguide-primary hover:border-lifeguide-primary/30 hover:bg-lifeguide-surface-elevated transition-all duration-150"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
