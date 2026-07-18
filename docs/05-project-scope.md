# Project Scope: LifeGuide AI

**Project Name:** LifeGuide AI – Career & Learning Copilot  
**Author:** Principal Product Manager & Senior Software Architect  
**Document Status:** Approved (MVP Scope Definition)  
**File Path:** `docs/05-project-scope.md`

---

This document establishes the official project scope boundaries for the development of LifeGuide AI. It details the precise feature set allocated for the initial assignment MVP (Version 1), maps the future product roadmap (Version 2), defines technical and design constraints, and sets the rules and success metrics that govern implementation.

This project strictly follows an MVP-first approach to maximize velocity, validate core value propositions, and avoid early scope creep.

---

## 1. Project Vision

LifeGuide AI is designed to bridge the growing gap between academic/self-guided education and real-world employment demands. The platform empowers students, job seekers, and career changers by providing a personalized, AI-driven copilot that resolves choice paralysis, assesses skill gaps, structures custom learning paths, and generates tailored portfolio project blueprints.

By focusing on personalized guidance and interactive growth, LifeGuide AI aims to transform career transitions into structured, objective, and executable journeys, helping users move with confidence from learning to employment.

---

## 2. Project Goal

- **Establish Product-Market Fit (PMF):** Validate the core value proposition across three initial high-demand career tracks: Frontend Engineering, Backend Engineering, and Product Management.
- **Optimize User Activation:** Guide users from registration to baseline skill profiling and personalized roadmap generation with minimal friction.
- **Demonstrate Educational Efficacy:** Drive consistent weekly learning progress and milestone completion through structured tracking.
- **Validate Scalable Architecture:** Build a robust, responsive, and cost-controlled AI integration pipeline capable of generating structured schemas.

---

## 3. Version 1 (Assignment MVP)

Version 1 contains only the core features required to establish the learning loop and guide the user's career path. The MVP is restricted to the following ten components:

1. **Authentication:**
   - Secure user registration and login.
   - Integration of Google OAuth and GitHub OAuth Single Sign-On (SSO) providers.
   - Session persistence and secure sign-out controls.
2. **Landing Page:**
   - High-impact hero section presenting the core value proposition.
   - Selection interface detailing the three launch tracks (Frontend, Backend, Product Management).
   - Feature preview highlighting the user journey (Profiling → Roadmap → Projects).
   - Clear primary and secondary Call-to-Action (CTA) triggers converting visitors to signups.
3. **User Onboarding:**
   - Dynamic wizard prompting the user to select one target career track.
   - Weekly study availability setting (slider range: 1 to 40 hours/week).
   - Simple profile background setup (text input for career goals and target roles).
4. **Dashboard:**
   - Core workspace summarizing current progress (streak tracker, roadmap completion percentage).
   - Primary action card displaying the immediate next milestone due on the user's active roadmap.
   - Grid layout providing direct entry points to all active MVP modules.
5. **Skill Assessment:**
   - Diagnostic questionnaire (5-10 multiple-choice or short-response questions) specific to the selected career track.
   - Baseline skill scoring mapping capability across sub-skills.
   - Visual skill matrix categorizing competencies into baseline levels (e.g., Novice, Intermediate, Advanced).
6. **AI Career Roadmap Generator:**
   - Dynamic roadmap builder generating structured weekly learning milestones based on identified skill gaps and target tracks.
   - Integration of curated, verified external resource links (documentation, tutorials, videos) for each milestone.
7. **AI Project Recommendation Generator:**
   - Dynamic generation of custom, non-trivial portfolio project specifications tailored to the user's skill gaps and stack.
   - Output includes business cases, user stories, technical architecture suggestions, and implementation milestones.
8. **Progress Tracking:**
   - Interactive check-off capabilities for learning milestones and roadmap steps.
   - Visual progress bars representing track completion percentage.
   - Dynamic recalibration based on changes in weekly study hours.
9. **Settings:**
   - Profile configuration (name, profile picture, track preferences).
   - Security credentials management and OAuth link status.
   - Option to reset profile data or permanently delete the account.
10. **Responsive Design:**
    - Fluid interface utilizing responsive grids and flexible layouts.
    - Full design parity across desktop, tablet, and mobile breakpoints (320px to 1440px+).

---

## 4. Version 2 (Future Roadmap)

Version 2 will expand the platform's scope to introduce validation, automation, career simulation, monetization, and collaboration tools. Planned features include:

1. **Resume Analyzer:** PDF upload and automatic parsing of experience, education, and skills.
2. **ATS Score:** Comparingparsed resumes against target job descriptions to produce matching percentages and keyword optimization feedback.
3. **Mock Interview Simulator:** Interactive, text-based multi-turn chat environment simulating technical and behavioral loops.
4. **Voice AI Interview:** Audio-based mockup interviews with verbal pacing, filler word checks, and vocal tone analysis.
5. **GitHub Portfolio Analyzer:** Scanning user repositories to evaluate code quality, structure, and automated testing implementations.
6. **Recruiter Dashboard:** Search engine for recruiters to find, filter, and view candidates based on verified skill scores.
7. **Team Collaboration:** Cross-functional matchmaking pairing PMs, Frontend developers, and Backend developers to build group projects.
8. **Premium Subscription:** Integrated paywall (e.g., Stripe) providing unlimited roadmaps, project briefs, and advanced interview simulators.
9. **Notifications:** Email and push notification triggers for goal reminders, weekly summaries, and system updates.
10. **Advanced Analytics:** In-depth user performance dashboards, cohort progress tracking, and employment placement analytics.

---

## 5. Features Excluded from MVP

To enforce strict timeline control and ensure project completion, the following features are **explicitly out of scope** for Version 1:

- Parsing of PDF files or automated resume data extraction.
- ATS optimization reporting and matching score calculators.
- Conversational mock interview chats (both text and voice formats).
- GitHub OAuth API repository scanners and code auditing tools.
- Admin or recruiter-specific workspace views.
- Group projects, matching queues, and collaborative workspaces.
- Paywall interfaces, pricing models, and payment processor integrations.
- Direct email delivery systems or web push notification protocols (dashboard notifications only).
- Institutional cohort management tools and enterprise dashboards.

---

## 6. Technical Constraints

- **Frontend Architecture:** Modern, single-page application structure leveraging React, TypeScript, and Vanilla CSS for layout control.
- **State Management & Routing:** Standard React context and clientside routing engines optimized for SPA responsiveness.
- **Authentication Security:** Secure, token-based session handling via NextAuth.js or Supabase Auth, preventing standard password storage and securing OAuth loops.
- **AI API Pipeline:** Structured prompt formatting connecting with the Google Gemini API. Output schemas must enforce JSON structures to map directly to UI components.
- **Performance SLA:**
  - Initial page loads must complete in under 3.0 seconds under standard mobile network conditions.
  - AI-generated content (roadmaps and project briefs) must initiate streaming or return response objects in under 5.0 seconds.
- **Data Security & Privacy:** Compliance with GDPR/CCPA. Personal data and assessment results must be encrypted in transit and at rest.

---

## 7. Design Principles

- **Rich Modern Aesthetics:** High-fidelity, premium dark-mode interface utilizing glassmorphism, depth layers (using subtle shadows), clear color hierarchies (slate/indigo/cyan accents), and smooth micro-animations on interactive triggers.
- **Low Cognitive Load:** Minimizing choices on any single view. Information must follow a flat structure, ensuring users are never more than two clicks away from any MVP feature.
- **Visual Accessibility:** Strict compliance with WCAG 2.1 Level AA contrast guidelines, text sizing, and keyboard navigation triggers.
- **Typography & Hierarchy:** Unified typography (e.g., Outfit or Inter) with clean, consistent spacing scales, avoiding generic browser styling defaults.

---

## 8. Development Rules

- **No Code or Visual Placeholders:** The interface must not contain dummy lorem-ipsum content, blank wireframes, or missing graphics. Generate specific asset items or content using AI utilities before delivery.
- **Strict Semantic HTML5:** Layouts must use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) to maximize accessibility and SEO.
- **Component Isolation:** Keep code and styling encapsulated in discrete modules. Reusable blocks (e.g., buttons, input fields, cards) must adhere strictly to predefined design system tokens.
- **Unique Interactive IDs:** Every button, input, anchor, and modal container must possess a unique, descriptive HTML `id` attribute for integration and automated testing.
- **Strict Scope Isolation:** Do not implement features outside the defined Version 1 list. Any requested modifications must update this scope document prior to writing code.

---

## 9. Success Criteria

- **Onboarding Activation Rate:** >70% of new users successfully register, complete the onboarding wizard, and perform their first skill assessment within 24 hours.
- **User Engagement Level:** >45% of registered users actively check off milestones and update their progress metrics weekly.
- **System Generation Reliability:** >98% success rate in receiving valid, non-corrupted JSON structures from AI API endpoints during roadmap and project generation.
- **Mobile Breakpoint Parity:** 100% layout consistency across targeted screen resolutions (mobile, tablet, desktop) without content clipping or navigation failures.
- **Performance Compliance:** Average frontend rendering load times remain under 3.0 seconds, and database read/write queries resolve in under 200ms.

---

## Related Documents

- [00-project-vision.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/00-project-vision.md)
- [01-product-discovery.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/01-product-discovery.md)
- [02-prd.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/02-prd.md)
- [03-user-flow.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/03-user-flow.md)
- [04-information-architecture.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/04-information-architecture.md)
