"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/shared/providers/ThemeProvider";
import { useSession } from "@/shared/providers/SessionProvider";
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard } from "lucide-react";

// Compass rose overlaid on an open book node
export function BrandLogo() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
      <svg
        className="absolute inset-0 w-full h-full text-lifeguide-primary stroke-[2]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
      <svg
        className="absolute inset-0 w-full h-full text-lifeguide-primary stroke-[2]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 10v4M10 12h4" className="text-lifeguide-secondary stroke-[2.5]" />
      </svg>
    </div>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, signOut } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Tracks", href: "/#tracks" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 h-18 z-50 bg-lifeguide-surface/80 backdrop-blur-md border-b border-lifeguide-border/80 transition-all duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-12 h-full flex items-center justify-between">
        {/* Branding & Logo */}
        <Link
          href="/"
          id="nav-logo"
          className="flex items-center gap-2 select-none group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <BrandLogo />
          <span className="font-heading text-lg md:text-xl font-semibold text-lifeguide-text-primary tracking-tight">
            LifeGuide AI
          </span>
        </Link>

        {/* Center Links (Desktop only) */}
        <nav className="hidden md:flex items-center gap-8 pl-12 mr-auto">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-medium text-lifeguide-text-secondary hover:text-lifeguide-text-primary transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section Controls (Desktop only) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            id="desktop-theme-toggle"
            aria-label="Toggle visual theme"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-lifeguide-border text-lifeguide-text-secondary hover:text-lifeguide-text-primary hover:bg-lifeguide-surface-elevated transition-all duration-150 cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Authentication States */}
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                id="desktop-dashboard-btn"
                className="h-9 px-4 flex items-center gap-1.5 text-xs font-semibold text-lifeguide-primary border border-lifeguide-primary/30 rounded-md-input hover:bg-lifeguide-primary/5 transition-all duration-150"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                id="desktop-logout-btn"
                className="h-9 px-3 flex items-center justify-center text-xs font-semibold text-lifeguide-text-muted hover:text-lifeguide-danger-text hover:bg-lifeguide-danger-bg/20 rounded-md-input transition-all duration-150 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                id="desktop-signin-btn"
                className="text-sm font-medium text-lifeguide-text-secondary hover:text-lifeguide-text-primary transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                id="desktop-signup-btn"
                className="h-9 px-4 flex items-center justify-center text-sm font-semibold text-white bg-lifeguide-secondary hover:bg-lifeguide-secondary/90 rounded-md-input shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
              >
                Start Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile controls: Hamburger & Theme switcher */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            id="mobile-theme-toggle"
            aria-label="Toggle visual theme"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-lifeguide-border text-lifeguide-text-secondary"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-btn"
            aria-label="Toggle menu"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-lifeguide-border text-lifeguide-text-primary"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden fixed inset-x-0 top-18 bottom-0 bg-lifeguide-surface/95 backdrop-blur-lg border-t border-lifeguide-border flex flex-col p-6 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          {/* Navigation Links */}
          <nav className="flex flex-col gap-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-lifeguide-text-primary hover:text-lifeguide-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="mt-auto border-t border-lifeguide-border pt-6 flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-1 py-2">
                  <div className="w-9 h-9 rounded-full bg-lifeguide-primary/10 border border-lifeguide-primary/20 flex items-center justify-center text-lifeguide-primary font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-lifeguide-text-primary">
                      {user?.name}
                    </span>
                    <span className="text-xs text-lifeguide-text-muted">{user?.email}</span>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-11 w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-lifeguide-primary rounded-md-input shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="h-11 w-full flex items-center justify-center gap-2 text-sm font-semibold text-lifeguide-text-secondary border border-lifeguide-border rounded-md-input"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-11 w-full flex items-center justify-center text-sm font-semibold text-lifeguide-text-primary border border-lifeguide-border rounded-md-input hover:bg-lifeguide-surface-elevated transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-11 w-full flex items-center justify-center text-sm font-semibold text-white bg-lifeguide-secondary hover:bg-lifeguide-secondary/90 rounded-md-input shadow-md"
                >
                  Start Free Assessment
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
