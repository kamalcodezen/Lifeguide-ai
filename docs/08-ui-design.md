# LifeGuide AI – Landing Page UI Design Specification

## Document Version: 1.0.0

## Theme: Aurora Blossom

## Status: Approved (Specification Ready for Frontend)

This specification defines the complete layout, visual structure, styling, responsiveness, components, animations, and accessibility rules for the **LifeGuide AI Landing Page (`/`)**. All frontend code implementation (HTML/CSS/Vite/Next.js) must strictly adhere to this document.

---

# Purpose

The primary purpose of the LifeGuide AI Landing Page is to serve as the high-converting entry portal of the ecosystem. It must:

1. **Clearly articulate the value proposition:** Define what a "Career & Learning Copilot" is and how it solves choice paralysis.
2. **Establish product credibility:** Demonstrate the efficacy of the AI engine through statistics, structured logic, and premium design presentation.
3. **Present supported disciplines:** Showcase the three launch MVP tracks (Frontend Engineering, Backend Engineering, Product Management).
4. **Drive user acquisition:** Funnel visitors directly into the onboarding diagnostic profiling assessment (`/auth` -> `/onboarding`).

---

# User Goal

Visitors landing on this page should achieve the following:

- Understand immediately how the platform converts career goals into personalized, executable roadmaps.
- Identify their target career track and see the core skills tested and covered.
- Gain trust in the platform's ability to help them land a role via real-world, gap-focused projects and resume/interview preparation.
- Convert by starting a free skill diagnostic assessment (Primary CTA).

---

# Layout Structure (Top to Bottom)

The landing page is constructed of 12 distinct visual sections, designed to build a progressive narrative of discovery, value, and conversion.

```
+-----------------------------------------------------------------------------------------+
| [Section 01: Sticky Glass Navbar]                                                       |
+-----------------------------------------------------------------------------------------+
| [Section 02: Hero Section (Warm Dawn Glow + Display Title + Primary CTA)]               |
+-----------------------------------------------------------------------------------------+
| [Section 03: Trust & Statistics (3-Column Metric Cards)]                                |
+-----------------------------------------------------------------------------------------+
| [Section 04: Why Choose LifeGuide AI (Intelligent Warmth vs High-Tech Anxiety)]         |
+-----------------------------------------------------------------------------------------+
| [Section 05: Core Feature Grid (5 Cards: Profiler, Roadmap, Project, ATS, Interview)]   |
+-----------------------------------------------------------------------------------------+
| [Section 06: How It Works Flow (Horizontal 5-Step Process Preview with Dotted Connectors)]|
+-----------------------------------------------------------------------------------------+
| [Section 07: AI Roadmap Interactive Preview (AI Co-pilot Card with Gradient Border)]    |
+-----------------------------------------------------------------------------------------+
| [Section 08: Testimonials Carousel (Student, Job Seeker, Career Changer Successes)]    |
+-----------------------------------------------------------------------------------------+
| [Section 09: Pricing (2-Card Matrix: Free vs Premium with Hover Elevate)]               |
+-----------------------------------------------------------------------------------------+
| [Section 10: FAQ Accordion (5-Item Keyboard Accessible Panel)]                          |
+-----------------------------------------------------------------------------------------+
| [Section 11: Final CTA Banner (Sunset Peach Gradient Banner + Dual CTAs)]               |
+-----------------------------------------------------------------------------------------+
| [Section 12: Public Footer (Logo, 4-Column Directory, Legal, Copyright)]                |
+-----------------------------------------------------------------------------------------+
```

---

### Section 01: Sticky Navbar

- **Aesthetic & Structure:** Fixed height of `72px`, anchored to the top of the viewport. Uses the `glass-container-light` or `glass-container-dark` styling rules to float softly over content.
- **Left Alignment (Navbar Branding):**
  - **Logo Style:** Duotone emblem with unified branding text.
  - **Icon:** Outline compass rose overlaid on an open book node (representing path guidance and learning catalog resources). Built using SVG strokes.
    - _Strokes:_ Fixed `2px` stroke-width, using token `color-light-primary` / `color-dark-primary`.
    - _Secondary Accents:_ Inner core node is colored in `color-light-secondary` / `color-dark-secondary`.
  - **Brand Typography:** "LifeGuide AI" using heading font Outfit (H4 style, size: `20px`, weight: `600` (SemiBold), letter-spacing: `0em`). Color matches `color-light-text-primary` / `color-dark-text-primary`.
  - **Spacing:** Brand icon and title text are separated horizontally by `8px` (sm). Logo block is separated from navigation list by `48px` (4xl) margins.
  - **Sizing:** Logo emblem box size is `24px` width by `24px` height. Title height conforms to line height `1.4` (`28px`).
- **Center Alignment:** Desktop nav links: "Tracks", "Features", "Pricing", "FAQ". Spaced with `32px` (3xl) column gap. Typography: Inter, Body Small, weight: 500.
- **Right Alignment:** Theme Switcher (outline icon), `[ Sign In ]` (Ghost Button), and `[ Start Free ]` (Secondary Button, 36px height).
- **Borders:** Bottom border only: `1px solid var(--color-border)`.

### Section 02: Hero Section

- **Aesthetic & Structure:** Large vertical layout block with an `Ambient Glow` radial background gradient positioned at top right. Maximum vertical rhythm padding: `64px` (5xl) top/bottom.
- **Header Content:** Upper centered Badge: "AI-Powered Copilot v1.0" (using Active/Primary Badge styling).
- **Main Title:** Display style heading (Outfit, 44px, line-height 1.2, centered): "Bridge the Gap Between Learning & Careers". Color is `color-light-text-primary` / `color-dark-text-primary`. The words "Learning & Careers" are wrapped in a text gradient using the **Warm Dawn Gradient**.
- **Subtitle:** Centered `Body Large` text block (Inter, 18px, max-width 640px): "Identify your skill gaps, generate a personalized weekly learning roadmap, and build unique portfolio projects designed specifically for the role you want." Color: `color-light-text-secondary` / `color-dark-text-secondary`.
- **Primary Action Area:** Centered stack of `[ Start Free Assessment ]` (Primary Large Button, 44px height) and sub-label text (Caption: "No credit card required • Under 5 minutes").
- **Hero Visual Illustration:**
  - **Layout:** Placed directly below the Primary Action Area, separated by `32px` (3xl). A simulated isometric dashboard composition representing the interactive copilot experience. Bounded by a container width of `960px` and height of `480px`, centered.
  - **Dashboard Preview Canvas:** A semi-opaque canvas card representing the web app background (`color-light-surface` at `0.85` opacity / `color-dark-surface` at `0.85` opacity), rounded at `radius-2xl` (32px), with standard `color-light-border` / `color-dark-border` and Elevated (Md) shadow.
  - **Floating Cards (Contextual Overlays):** Three distinct overlapping cards positioned at varying depth axes (Z-index layering):
    1.  _Assessment Dialog:_ Placed on the top-left edge, overlapping the canvas. Displays a mock diagnostic questionnaire frame. Contains 3 sample checklist nodes with checkmarks in Success semantic green. Sized `240px` width, rounded at `radius-lg` (16px), subtle border, subtle shadow.
    2.  _Weekly Progress Metric:_ Placed on the bottom-right edge. Features a circular ring chart demonstrating progress (e.g., "78% Complete"), featuring a trend line indicator in semantic Success text (`rgba(34, 139, 99, 1)` / `rgba(52, 211, 153, 1)`). Background: Default Surface, rounded at `radius-lg` (16px), Subtle (Sm) shadow.
    3.  _Roadmap Timeline Node:_ Centered overlap card showing a weekly milestone detail: "Week 3: REST API Integration" with standard metadata badge ("Backend"). Sized `280px` width, rounded at `radius-lg` (16px), Elevated (Md) shadow.
  - **Roadmap Connection Vector:** A soft, curved SVG vector line connecting the floating cards. Uses a `3px` stroke path styled with the **Warm Dawn Gradient** (representing the career path guide).
  - **Gradient Background atmospheric backing:** A soft atmospheric halo overlay directly underneath the illustration container. Renders using the `Ambient Glow` radial gradient token, scaled at `1.2` max size, creating a premium glowing wash that separates the hero visuals from the main body copy.

### Section 03: Trust & Statistics

- **Aesthetic & Structure:** 3-column layout. Spacing gap of `32px` (3xl). Row margin `48px` (4xl) bottom.
- **Cards:** 3 identical container cards with Subtle (Sm) shadow and `radius-lg` (16px) rounding. Background: `color-light-surface` / `color-dark-surface`.
- **Content Cards:**
  1.  **Metric 1:** value "91.4%" (Display font, Warm Dawn Gradient). Label: "Career Placement Rate within 180 Days" (Body Small, text-secondary).
  2.  **Metric 2:** value "14,200+" (Display font, Sunset Peach Gradient). Label: "Custom Roadmaps Generated & Executed" (Body Small, text-secondary).
  3.  **Metric 3:** value "72%" (Display font, Warm Dawn Gradient). Label: "Average ATS Match Score Improvement" (Body Small, text-secondary).

### Section 04: Why Choose LifeGuide AI

- **Aesthetic & Structure:** Section title at top (H2, Outfit, centered): "A Digital Sanctuary for Career Transition". Subtitle: "Why we choose warm, structured guidance over tech-focused career anxiety." (Body Medium, text-secondary, centered). Spacing margin: `48px` (4xl) vertical.
- **Core Differentiators Layout:** 3-column feature block using standard card containers (`radius-xl` / 24px, subtle border, subtle shadow).
- **Columns:**
  1.  **Warmth vs. Anxiety:** (Icon: Compass) "We replace clinical grids and dark matrix patterns with a warm, soft morning workspace designed to reduce cognitive overwhelm."
  2.  **Adaptive Rhythm:** (Icon: Calendar) "Your schedule is not fixed. If you have 5 hours this week and 20 hours next week, your learning path dynamically recalibrates."
  3.  **Actionable Proof:** (Icon: Code) "Don't build cookie-cutter projects. We generate unique, gap-targeted portfolios that prove your capabilities to recruiters."

### Section 05: Features Grid

- **Aesthetic & Structure:** H2 header: "Your Complete Career Preparation Suite" (centered). Layout uses a 3-column grid for the first row and a 2-column grid for the second row on desktop (gap `32px`).
- **Interactive Cards:** Standard card specifications (padding `24px`, radius-xl, hover lift `translateY(-4px)` with Elevated shadow transition).
- **Cards Content:**
  1.  **Interactive Skill Profiler:** "A baseline diagnostic test (5-10 track-specific questions) identifying your strength and gap baseline scores." (Badge: "Diagnostics").
  2.  **AI Roadmap Generator:** "A dynamic learning path mapped around your weekly availability, sourcing the best free educational guides." (Badge: "Roadmap").
  3.  **Personalized Project Briefs:** "Context-driven project challenges designed specifically to strengthen your identified skill gaps." (Badge: "Portfolio").
  4.  **Resume Analyzer & ATS Matcher:** "Upload your PDF resume to compare matching score percentages, missing keywords, and get ATS feedback." (Badge: "Resume").
  5.  **Mock Interview Simulator:** "Practice text-based technical mock loops with AI interviewers and receive competency scorecards." (Badge: "Interview").

### Section 06: How It Works Flow

- **Aesthetic & Structure:** Section title (H2, centered): "The Step-by-Step Pathway to Employment".
- **Flow Visualization:** Horizontal pipeline (1-row list on desktop, vertical on mobile). 5 circular nodes connected by a `3px` dotted vector path (`color-light-support` / `color-dark-support` opacity 0.4).
- **Steps:**
  1.  **Select Track:** Pick Frontend, Backend, or Product Management.
  2.  **Baseline Profile:** Complete diagnostic assessment questions.
  3.  **Learn & Refine:** Study weekly milestones tailored to your study hours.
  4.  **Build Spec:** Generate and build a custom gap-filling portfolio project.
  5.  **Simulate & Apply:** Optimize your resume ATS score and run mock interview simulators.

### Section 07: AI Roadmap Preview

- **Aesthetic & Structure:** High-fidelity interactive UI preview centered in a container. Margins: `48px` (4xl) top/bottom.
- **AI Co-pilot Card Container:** Rounded corners of `radius-xl` (24px). Dual-gradient border using **Warm Dawn Gradient** overlaid on a solid surface card to create a subtle glow. Interior ambient shadow: `box-shadow: inset 0 0 16px rgba(235, 126, 162, 0.04)` (Light) / `rgba(247, 168, 194, 0.08)` (Dark).
- **Content:**
  - Header: Flag "AI ASSESSMENT INSIGHTS" (Secondary Pink, font-weight 600, spacing tracking 0.05em, 10px size).
  - Title: "Dynamic React & Redux Mastery Roadmap" (H3 Outfit).
  - Timeline: 3 horizontal milestones (Week 1, Week 2, Week 3). Dotted connector line showing node 1 as Completed (gradient fill), node 2 as In-Progress (active pulsing outline), node 3 as Locked (muted support color, 0.3 opacity).
  - Action: `[ View Full Roadmap ]` (Secondary button style).

### Section 08: Testimonials

- **Aesthetic & Structure:** Section title H2: "Success Stories from the Sanctuary" (centered). Layout is a 3-column row.
- **Cards:** Surface card backgrounds (`color-light-surface` / `color-dark-surface`), `radius-xl` (24px), subtle shadow.
- **Narrative Profiles:**
  1.  **The Student (Frontend Track):** "LifeGuide AI mapped out my exact gaps. I built a custom analytics dashboard project and landed my junior engineer job in 3 months." (Sarah L., Recent Graduate).
  2.  **The Career Changer (PM Track):** "Coming from sales operations, I had 8 hours a week. The adaptive roadmap scheduled everything perfectly. The mock interview scorer built my confidence." (David K., Transitioned to Product Manager).
  3.  **The Job Seeker (Backend Track):** "My resume was getting rejected immediately. The ATS matcher helped me optimize my formatting and keywords. I got three recruiter calls in 2 weeks." (Elena R., Software Engineer).

### Section 09: Pricing Matrix

- **Aesthetic & Structure:** Section title H2: "Simple, Transparent Options" (centered). 2-column comparative layout centered on the screen (max-width `960px`). Spacing gap: `32px` (3xl).
- **Card 1: Free Tier**
  - Background: `color-light-surface` / `color-dark-surface`, border: `1px solid var(--color-border)`, radius: `radius-xl` (24px).
  - Content: Title "Explorer" (H3), price "$0 / lifetime" (Display, muted text), feature list (5 items with checkmarks in Success semantic green).
  - CTA: `[ Choose Free Explorer ]` (Secondary Button).
- **Card 2: Premium Tier (Pro)**
  - Background: Surface card with dual-gradient border glow using the **Warm Dawn Gradient**.
  - Floating Badge: "Most Popular" (Active/Primary style).
  - Content: Title "Copilot Pro" (H3), price "$19 / month" (Display, text primary), feature list (unlimited roadmaps, customized gap-filling project specs, ATS resume matcher, interactive mock loops with evaluations).
  - CTA: `[ Upgrade to Copilot Pro ]` (Primary Gradient Button).

### Section 10: FAQ Accordion

- **Aesthetic & Structure:** Section title H2: "Frequently Answered Questions" (centered). Max-width container of `800px` centered.
- **Items:** 5 interactive collapsible rows separated by `1px solid var(--color-border)`.
- **Interaction:** Clicking a question row triggers a smooth height expansion (using `transition-normal` / 250ms) to display the answer.
- **Content:**
  1.  _Which career tracks are supported?_ (Frontend Engineering, Backend Engineering, and Product Management).
  2.  _How does the AI analyze my skill gaps?_ (Through a 5-10 diagnostic profiling assessment mapped during onboarding).
  3.  _Can I import job descriptions?_ (Yes, you can paste links or texts from specific job postings to compare them against your profile).
  4.  _How do custom portfolio briefs prevent generic templates?_ (The platform analyzes your unique skill weaknesses and details a specific business/architecture requirement targeting those areas).
  5.  _Is there a student discount?_ (Yes, pricing details for verified student accounts are available).

### Section 11: Final CTA Banner

- **Aesthetic & Structure:** Large layout box container. Height `320px`. Background is **Sunset Peach Gradient** or a soft container border.
- **Content:** Centered title "Ready to Accelerate Your Career?" (H1 Outfit). Subtitle: "Start profiling your skills and generate your custom learning copilot in under 5 minutes." (Body Large, text primary).
- **CTAs:** Row layout: `[ Start Free Assessment ]` (Primary Large Button) and `[ View Pricing Plans ]` (Ghost Button).

### Section 12: Public Footer

- **Aesthetic & Structure:** 4-column column directory layout. Margins: `48px` (4xl) padding top. Top border: `1px solid var(--color-border)`.
- **Columns:**
  1.  **Brand Column:** Logo + "Career & Learning Copilot" text-muted.
  2.  **Supported Tracks:** Frontend, Backend, Product Management links.
  3.  **Platform Resources:** Features, Pricing, System Status links.
  4.  **Legal & Contact:** Privacy Policy, Terms of Service, Email Support.
- **Base Row (Footer Social):**
  - **Copyright Text:** "© 2026 LifeGuide AI. All rights reserved." (Caption typography, `color-light-text-muted` / `color-dark-text-muted` color, left-aligned).
  - **Social Link Elements:** Horizontally stacked social icons aligned to the right edge. Spaced with `16px` (lg) gap. Each icon has a fixed size of `20px` x `20px` using outline vectors with transition timings set to `transition-fast` (150ms).
  - **Social Channels:**
    1.  _GitHub:_ Icon pointing to platform repository profile. Color: `text-secondary`, transitioning to `color-light-primary` / `color-dark-primary` on hover.
    2.  _LinkedIn:_ Icon linking to corporate page updates. Color: `text-secondary`, transitioning to `color-light-primary` / `color-dark-primary` on hover.
    3.  _Twitter/X:_ Icon pointing to official community channel. Color: `text-secondary`, transitioning to `color-light-primary` / `color-dark-primary` on hover.
    4.  _Discord:_ Icon linking to official learning developer server. Color: `text-secondary`, transitioning to `color-light-primary` / `color-dark-primary` on hover.
    5.  _Email Support Link:_ Direct `mailto:support@lifeguide.ai` anchor link (represented by a Mail icon). Hover states animate opacity and scale.

---

# Desktop Layout

The Desktop layout is designed for screens `1024px` to `1440px` and widescreen formats `> 1440px`.

- **Max-Width Container Constraint:** All central layout sections are bounded by a maximum width of `1360px` to prevent visual stretching on widescreen monitors.
- **Grid Framework:** Section content uses a standard **12-column grid system**.
- **Grid Spacing:** Column gap is strictly locked to spacing token **`32px` (3xl)**. Row gap matches spacing token **`24px` (2xl)**.
- **Page Boundaries:** Horizontal padding margins on the canvas sides are **`48px` (4xl)**.
- **Vertical Rhythm:** Distance between distinct page sections (e.g., Hero to Statistics) is strictly configured to **`80px` (6xl)** or **`128px` (7xl)** to provide premium luxury minimalism and visual breathing room.

---

# Tablet Layout

The Tablet layout adapts layout columns and spacing variables for viewport widths between `640px` and `1024px`.

- **Grid Transformation:**
  - 3-column grids (Statistics, Why Choose Us, Features) dynamically wrap or scale down to a **2-column grid**.
  - The 5-step horizontal process walkthrough wraps into a 2-column or 3-column row stack with wrapping connectors.
  - Pricing matrix changes from side-by-side to a vertical stack if the tablet width falls below `768px`.
- **Spacing Adjustments:**
  - Outer page margins scale down to **`24px` (2xl)**.
  - Section vertical gaps scale down to **`48px` (4xl)**.
- **Navigation:** The Sticky Navbar menu links collapse into a simple hamburger selector. Clicking it opens a side overlay drawer (slide animation, `transition-normal`).

---

# Mobile Layout

The Mobile layout structures the experience for screen sizes `< 640px` (typically standard smartphones).

- **Grid Transformation:** All multi-column grids (2-column and 3-column) collapse completely into a **1-column vertical stack**.
- **Alignment:** Headings and text modules shift from centered to left-aligned to improve readability and fit on small narrow screens.
- **Spacing Adjustments:**
  - Outer margins are compressed to **`16px` (lg)**.
  - Row margins inside layouts scale down to **`16px` (lg)**.
  - Section vertical margins are restricted to **`32px` (3xl)** to optimize vertical scroll distance.
- **Navigation:** Navbar options are completely hidden. Access is provided solely via the hamburger menu icon (triggering a fullscreen drawer wrapper utilizing the `glass-container-light` / `glass-container-dark` aesthetic).
- **Buttons:** Action buttons stretch to `width: 100%` (block style) to provide large, thumb-friendly tap targets.

---

# Components Used

The Landing Page utilizes the atomic and structural components defined within the Aurora Blossom Design System:

| Component Type | Component Name        | Styling Rules Applied                                                                            |
| :------------- | :-------------------- | :----------------------------------------------------------------------------------------------- |
| **Atomic**     | `LgButtonPrimary`     | Large `44px` height, using Warm Dawn Gradient base, centered 14px bold text.                     |
| **Atomic**     | `LgButtonSecondary`   | Secondary `36px` outline button, using 1px border strong token.                                  |
| **Atomic**     | `LgButtonGhost`       | Transparent background, text secondary shifting to primary on hover.                             |
| **Atomic**     | `LgBadge`             | Pill badge, `radius-full`, status-specific colored background and text.                          |
| **Atomic**     | `LgInput`             | Input field, `40px` height, standard `radius-md` rounding, subtle border.                        |
| **Layout**     | `LgNavbar`            | `72px` sticky header using glassmorphism backing rules (`glass-container`).                      |
| **Layout**     | `LgFooter`            | Structural grid wrapper with divider boundaries and text-muted columns.                          |
| **Feature**    | `LgCard`              | Main card block container, padding `24px` (lg), rounded corners `radius-xl` (24px), hover lifts. |
| **Feature**    | `LgAssessmentPreview` | Special AI roadmap container, featuring a dual-gradient border, inset glows, and timeline nodes. |

---

# Animations

Animations are calculated to maintain soft, slow transitions to keep user interaction calm, friendly, and trustworthy.

- **Page Entry Transition:**
  - On initial load, elements fade in from opacity `0` to `1` while translating up (`translateY(15px)` to `0`).
  - Duration: `400ms` (`transition-slow`), easing curve: `cubic-bezier(0.16, 1, 0.3, 1)` (Out-Expo).
- **Card Hover Lift Interaction:**
  - On card cursor focus or mouseover: `transform: translateY(-4px)`, shadow shifts from Subtle (Sm) to Elevated (Md).
  - Duration: `250ms` (`transition-normal`), easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Button Hover & Active Press:**
  - _Hover state:_ button scales slightly to `1.01`. Opacity is reduced to `0.9`.
  - _Active / Click state:_ button scale shrinks to `0.98` to give physical compression feedback.
  - Duration: `150ms` (`transition-fast`), curve: `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Roadmap Node Pulse:**
  - The active roadmap preview node pulses slowly to guide visual interest.
  - Opacity cycles smoothly from `0.4` to `0.8` using an infinite `ease-in-out` curve over `1.8s`.
- **Scroll Reveal Animation:**
  - Sections reveal smoothly as they enter the viewport.
  - Transition: opacity fades from `0` to `1` over `400ms`.

---

# Accessibility

LifeGuide AI is built for WCAG 2.1 Level AA accessibility compliance across all components.

- **Contrast Ratios:**
  - Text styles pass the `4.5:1` ratio for regular text and `3:1` ratio for display/large headings.
  - Text primary token (`rgba(30, 27, 46, 1)` in Light Theme, `rgba(245, 244, 247, 1)` in Dark Theme) ensures excellent contrast against main canvases.
- **Keyboard Navigation & Focus States:**
  - All interactive elements (buttons, links, inputs, accordion rows) are fully reachable via the `Tab` key.
  - Keyboard focus indicators are mandatory. When focused, elements must display the system focus ring:
    ```css
    outline: 2px solid rgba(99, 74, 186, 1); /* color-light-primary */
    outline-offset: 2px;
    ```
- **ARIA Attributes:**
  - All buttons and anchor items have descriptive `aria-label` tags (e.g., `aria-label="Start Free Assessment Assessment Onboarding"`).
  - FAQ Accordion handles use `aria-expanded="true/false"` and map to content panels using `aria-controls`.
  - Main navigation elements reside in a `<nav>` semantic wrapper.

---

# Design Rules

This landing page must strictly follow the Aurora Blossom Design System v1.0.0. Under no circumstances should frontend developers or visual designers use custom parameters:

1.  **No Custom Colors:** Only use the RGBA values defined in the Light/Dark palettes.
2.  **No Custom Spacing:** Only use spacing tokens (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`).
3.  **No Custom Shadows:** Only apply Subtle (Sm), Elevated (Md), or Floating (Lg) tokens.
4.  **No Custom Typography:** Headlines must use Outfit, body text must use Inter, matching the designated size and line-height scale.
5.  **No Custom Buttons:** Always reuse the defined button matrix components (Primary, Secondary, Ghost, Danger).

---

# SEO Specifications

To ensure maximum organic search discovery and compliance with search engine guidelines, the Landing Page must implement the following SEO specifications:

## Metadata

- **Page Title:** "LifeGuide AI – Career & Learning Copilot | Baseline Diagnostic & Personalized Roadmaps" (Outfit typography intent, maximum 60 characters).
- **Meta Description:** "Bridge the gap between education and employment. Complete a free baseline diagnostic assessment, identify career skill gaps, and generate customized roadmaps for Frontend, Backend, and Product Management." (Maximum 155 characters).
- **Canonical URL:** `https://lifeguide.ai/`

## Open Graph (OG) Protocol

- `og:type`: `website`
- `og:url`: `https://lifeguide.ai/`
- `og:title`: "LifeGuide AI – Career & Learning Copilot"
- `og:description`: "Assess your skill gaps, generate custom weekly learning roadmaps, and build gap-focused portfolio projects with AI guidance."
- `og:image`: `https://lifeguide.ai/assets/og-aurora-blossom.png` (Dimensions: 1200 x 630 pixels. Styled using the Aurora Blossom visual direction: abstract glowing gradients, soft shapes, and product interface mockups).
- `og:site_name`: "LifeGuide AI"

## Twitter Cards

- `twitter:card`: `summary_large_image`
- `twitter:site`: `@LifeGuideAI`
- `twitter:title`: "LifeGuide AI – Career & Learning Copilot"
- `twitter:description`: "Your adaptive schedule for transitioning careers. Find your baseline and generate your roadmap for free."
- `twitter:image`: `https://lifeguide.ai/assets/og-aurora-blossom.png`

## Structured Data (JSON-LD Schema)

To be injected into the `<head>` of the landing page:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LifeGuide AI",
  "url": "https://lifeguide.ai/",
  "applicationCategory": "EducationalApplication, BusinessApplication",
  "genre": "Career Development, AI Tutoring, Skills Assessment",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "description": "An AI-powered career and learning copilot that generates personalized roadmaps, custom portfolio projects, and mock interview practice modules based on diagnostic skill gaps.",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD",
    "category": "Free Plan Available"
  },
  "creator": {
    "@type": "Organization",
    "name": "LifeGuide AI",
    "url": "https://lifeguide.ai"
  }
}
```

---

# Phase 08.2 — Authentication UI Design

This specification defines the visual rules, layout guidelines, form structures, component behaviors, accessibility parameters, and responsive logic for the **LifeGuide AI Authentication Portal (`/auth`)**. All identity access interfaces must strictly follow these rules.

---

# Purpose

The Authentication Portal manages entrance security boundaries for the LifeGuide AI platform. It must:

1. **Provide a secure, trustworthy portal:** Keep the design clean, calm, and visually reassuring to establish a sense of safety when entering credentials.
2. **Minimize login friction:** Present Single Sign-On (SSO) options prominently to accelerate user boarding.
3. **Validate input fields transparently:** Give clear, helpful semantic feedback on validation errors without disrupting the visual harmony of the Aurora Blossom theme.
4. **Onboard new registrations:** Funnel users smoothly from registration into the Onboarding Wizard (`/onboarding`).

---

# User Goal

Users visiting the authentication portal should be able to:

- Sign in with existing credentials or create a new account via email or Google SSO.
- Request credential recovery links via a secure forgot-password portal.
- Validate their email address using an OTP (One-Time Password) code screen.
- Proceed to the protected onboarding space without registration delays or visual lag.

---

# Layout Structure

All authentication states are rendered inside a centered card interface layout floating over the canvas background.

```
+-------------------------------------------------------------+
| Canvas Background (color-light-canvas / color-dark-canvas)  |
| Top-Right Ambient Glow (Ambient Glow radial gradient)        |
|                                                             |
|              +-------------------------------+              |
|              | Auth Card Wrapper (radius-xl) |              |
|              |                               |              |
|              |  [ Logo & Title Branding ]    |              |
|              |                               |              |
|              |  [ Screen-Specific Area ]     |              |
|              |  (Form inputs, SSO, Buttons)  |              |
|              |                               |              |
|              |  [ Help/Navigation Links ]    |              |
|              +-------------------------------+              |
|                                                             |
+-------------------------------------------------------------+
```

---

# Authentication Screens Specification

### 1. Welcome Screen

- **Purpose:** Act as the initial, low-friction gateway selection screen for all incoming visitors arriving at `/auth`.
- **User Goal:** Instantly select the preferred authentication channel (Google SSO vs Email registration/login).
- **Layout:** Centered single-card frame container (`440px` width on desktop, padding `32px` [3xl]). No initial form fields to reduce visual weight.
- **Components:**
  - Logo Branding (emblem and title centered inside the card).
  - Divider Component: 1px strong border line splitting the card horizontally, featuring "or continue with" text centered (Caption, text-muted).
- **Form Fields:** None.
- **Validation Rules:** None.
- **Buttons:**
  - `[ Continue with Google ]`: Primary action option (SSO button, secondary outline button style, height `44px`).
  - `[ Continue with Email ]`: Secondary action option (Secondary outline button style with Mail icon, height `44px`).
- **Responsive Behaviour:** Mobile viewports (`< 640px`) scale card width to 100% of screen. Card border and outer box shadow are disabled on mobile to present a clean full-screen layout canvas background. Outer container padding scales down to `16px` (lg).
- **Animations:** Slide-in from bottom on page entry (`translateY(20px)` to `0`, opacity `0` to `1` over `400ms` using `transition-slow`). Buttons scale to `1.01` on hover.
- **Accessibility:** Buttons include explicit `aria-label` tags. Interactive blocks support keyboard tab indices.
- **Edge Cases:** SSO provider failure handles: display a system-level warning notification overlay if Google returns an OAuth initialization failure.

### 2. Sign In Screen

- **Purpose:** Authenticate returning accounts via secure username/password input.
- **User Goal:** Enter credentials, execute authentication check, and navigate to target application route.
- **Layout:** Vertical form stack inside the centered card container. Form fields are separated by `20px` (xl) margins.
- **Components:** Form labels (`Body Small`, text-primary), text input controls (`LgInput`, height `40px`), password eye icon toggle.
- **Form Fields:**
  - _Email Input Field:_ type: `email`, autocomplete: `username`, placeholder: "name@example.com".
  - _Password Input Field:_ type: `password`, autocomplete: `current-password`, placeholder: "••••••••".
- **Validation Rules:**
  - Email must match valid email address structures: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - Password must not be empty.
  - Failing elements trigger input border changes to semantic Danger red. A small validation feedback string (Caption size, Danger color) is injected exactly `8px` below the affected input field.
- **Buttons:**
  - `[ Sign In ]`: Primary large button (Warm Dawn Gradient, height `44px`, `width: 100%`).
  - `[ Forgot Password? ]`: Ghost text button, aligned inline to the right edge of the Password input label.
  - `[ Create an Account ]`: Centered Ghost text button in card footer link row.
- **Responsive Behaviour:** Mobile shifts buttons to block styles. Input fields scale to match layout widths.
- **Animations:** Active button presses trigger `scale: 0.98` transition over `150ms`. Input borders transition borders using `transition-fast` (150ms) on focus.
- **Accessibility:** Focus outline ring matches `color-light-primary` / `color-dark-primary` values. Active validation errors are flagged to screen readers via `aria-invalid="true"` attributes.
- **Edge Cases:** Caps-Lock detection: show a small warning indicator graphic inside the password field if typing with Caps-Lock active.

### 3. Sign Up Screen

- **Purpose:** Register new visitor accounts on the platform.
- **User Goal:** Input email address, select a secure password, agree to terms, and trigger account creation.
- **Layout:** Single-column vertical form grid inside the centered card container.
- **Components:** Label and input grids, password strength guide lines, consent checkbox container.
- **Form Fields:**
  - _Email Input Field:_ type: `email`, placeholder: "name@example.com".
  - _Password Input Field:_ type: `password`, placeholder: "Create a secure password".
  - _Terms Agreement Checkbox:_ type: `checkbox`, label text: "I agree to the Terms of Service and Privacy Policy."
- **Validation Rules:**
  - Email: Match valid email structures. Check unique availability in background database.
  - Password: Minimum length of `8` characters, containing at least 1 uppercase letter, 1 number, and 1 special symbol.
  - Terms Checkbox: Mandatory check validation required to activate the primary signup trigger.
- **Password Strength Indicator:** Horizontal bar divided into 3 equal segments directly below the password input:
  - _Red (Weak):_ Only fits one criteria.
  - _Amber (Medium):_ Fits two criteria.
  - _Success Green (Strong):_ Fits all security criteria.
- **Password Requirement Helper UI:** A checklist panel located directly beneath the Password Strength Indicator to guide users in meeting complexity standards.
  - _Visual Structure:_ A simple vertical stack of 4 text rules with a spacing gap of `4px` (xs).
  - _Rules Checked:_
    1. At least 8 characters.
    2. At least 1 uppercase letter.
    3. At least 1 number.
    4. At least 1 special character (e.g., @, #, $, %).
  - _Rule States & Semantics:_
    - _Unsatisfied state:_ Displays a bullet point using a hollow circle outline (`2px` stroke, `color-light-text-muted` / `color-dark-text-muted`) and `Caption` typography in muted color.
    - _Satisfied state:_ Bullet turns into a checkmark icon using Success semantic green (`rgba(34, 139, 99, 1)` / `rgba(52, 211, 153, 1)`) and text transitions to `color-light-text-primary` / `color-dark-text-primary`.
    - _Transitions:_ Changing states applies a scaling bounce effect (scale cycles to `1.08` back to `1.0` over `150ms`, `transition-fast`) and color transitions over `150ms`.
- **Buttons:**
  - `[ Create Account ]`: Primary Large Button (Warm Dawn Gradient, height `44px`, `width: 100%`).
  - `[ Already have an account? Sign In ]`: Centered Ghost text footer link.
- **Responsive Behaviour:** Standard block-scaling adaptations for mobile dimensions.
- **Animations:** Password strength meter bar segments fill horizontally using `transition-normal` (250ms) as criteria are satisfied.
- **Accessibility:** Checkbox element has explicit label mapping. Keyboard spacebar triggers the checkbox input.
- **Edge Cases:** Multiple sequential click attempts on submit button are blocked (button shifts immediately to Loading State during processing).

### 4. Continue with Google Screen (SSO Flow)

- **Purpose:** Offer zero-friction oauth registration and login.
- **User Goal:** Single-click authentication without entering password forms.
- **Layout:** Placed directly at the top of the welcome and sign-up card flows.
- **Components:** Google brand button block.
- **Form Fields:** None.
- **Validation Rules:** Authenticates via external Google OAuth handshake flow.
- **Buttons:**
  - `[ Continue with Google ]`: Structured using white canvas surface (`color-light-surface` / `color-dark-surface`), 1px strong border (`color-light-border-strong` / `color-dark-border-strong`), standard Google multi-color G icon on the left, font Inter 14px semibold, text secondary color.
- **Responsive Behaviour:** Conforms to parent container card width.
- **Animations:** Scale transitions down to `0.98` on click.
- **Accessibility:** Screen reader label: `aria-label="Continue using your Google account"`.
- **Edge Cases:** Login process cancelled: If the user closes the Google authentication popup overlay, catch the redirect block error, close the overlay, and show a warning toast notification.
- **Future OAuth Provider Scalability:** The authentication layout, controller logic, and backend configurations are structured to scale horizontally for subsequent OAuth providers (GitHub, LinkedIn, and Apple SSO).
  - _Layout Structure:_ The SSO button area utilizes an auto-layout flex vertical stack. Adding new providers automatically shifts the container list.
  - _Visual Thresholds:_ If the number of configured active SSO providers exceeds 2, the button stack dynamically switches from vertical block bars to a horizontal row grid of icon-only circle buttons (`44px` diameter, `radius-full`, outline border styling), utilizing standard tooltip micro-guides for label readouts.
  - _Component Adaptability:_ The underlying button component (`LgButtonSecondary`) takes a dynamic `provider` prop (e.g., `github`, `linkedin`) mapping standard brand assets (vectors, brand colors, labels) while maintaining identical design system margins and heights.

### 5. Forgot Password Screen

- **Purpose:** Provide password recovery links via email message links.
- **User Goal:** Send reset request instructions to verified account emails.
- **Layout:** Centered card wrapper. Header area features a recovery illustration key symbol (Support Lavender background backing at `0.1` opacity, `radius-full` circular wrapper).
- **Components:** Descriptive guidance paragraph (Body Small), single email input, footer navigation link.
- **Form Fields:**
  - _Email Input Field:_ type: `email`, placeholder: "name@example.com".
- **Validation Rules:** Mandatory email format compliance.
- **Buttons:**
  - `[ Send Reset Link ]`: Primary Large Button (Warm Dawn Gradient, height `44px`).
  - `[ Back to Sign In ]`: Ghost Text link at base of form card.
- **Responsive Behaviour:** Adapts container padding and block buttons.
- **Animations:** On successful submit, form inputs slide left out of view, and a success confirmation text block slides in from the right edge.
- **Accessibility:** Screen readers receive active live feedback once recovery email triggers.
- **Edge Cases:** Address harvesting prevention: Always display recovery success feedback screen even if the submitted email does not exist in our active database (prevents validation scanning by malicious actors).

### 6. Reset Password Screen

- **Purpose:** Save replacement password after entering via a valid email link key.
- **User Goal:** Create a new password and immediately log into the platform dashboard.
- **Layout:** Centered card with form column stack.
- **Components:** Label and input frames, password requirements checklist tags.
- **Form Fields:**
  - _New Password Input Field:_ type: `password`, placeholder: "Enter new password".
  - _Confirm Password Input Field:_ type: `password`, placeholder: "Confirm new password".
- **Validation Rules:**
  - New Password: Min 8 chars, 1 uppercase, 1 number, 1 special character.
  - Confirm Password: Must match New Password exactly.
- **Buttons:**
  - `[ Reset Password & Login ]`: Primary Large Button (Warm Dawn Gradient, height `44px`).
- **Responsive Behaviour:** Sizing blocks adapt to screen limits.
- **Animations:** Validation warning displays shake input frames on submit error.
- **Accessibility:** Focus flows logically from top input to final submit trigger.
- **Edge Cases:** Expired or compromised token link: if the token is invalid, replace the form content with a full-screen Empty State visual warning detailing that the link has expired, with a primary CTA button redirecting back to the recovery request page.

### 7. Email Verification Screen

- **Purpose:** Collect OTP codes sent to emails during registration to confirm ownership.
- **User Goal:** Input the 6-digit numeric security token and activate profile.
- **Layout:** Centered card wrapper. Form contains a horizontal grid of 6 separate single-digit entry code slots.
- **Components:** Individual input blocks, verification countdown message tracker, resend actions.
- **Form Fields:**
  - _Digit Inputs (1 to 6):_ 6 separate text fields, width `48px`, height `56px`, centered alignment, font: Outfit H2 (Medium weight). Sizing scales down to `36px` width on mobile to avoid overlap.
- **Validation Rules:**
  - Inputs accept numbers only (`[0-9]`).
  - Entering a number automatically forwards focus to the next adjacent input.
  - Pressing Backspace deletes current input and automatically shifts focus to the previous input.
  - Form auto-submits once the final 6th digit is populated.
- **Buttons:**
  - `[ Resend Code ]`: Ghost Text link, disabled and styled with `text-muted` color while the 60-second countdown timer is active.
- **Responsive Behaviour:** Mobile scales horizontal spacing gaps between inputs to `6px` to maintain a single row.
- **Animations:** Focused inputs scale slightly to `1.05` with a strong primary border highlight transition.
- **Accessibility:**
  - Each grid input has a distinct label helper mapping (`aria-label="Digit 1 of 6"`, etc.).
  - Input grid container grouped inside `<fieldset>` elements with screen-reader directions.
- **Edge Cases:** Copy-Paste handler: Intercept clipboard paste events. If the user copies a 6-digit string, parse the numbers, auto-populate all 6 input blocks, and trigger instant form validation submit.

### 8. Success State

- **Purpose:** Confirm successful completion of security actions (registration, password resets).
- **User Goal:** Proceed to the main product workspace (Onboarding Wizard or Dashboard).
- **Layout:** Centered card interface overlay, perfectly centered content alignment.
- **Components:** Animated Success Circle, positive feedback headings (H2 Outfit), automated redirect message link.
- **Form Fields:** None.
- **Validation Rules:** None.
- **Buttons:**
  - `[ Continue to Onboarding ]` or `[ Go to Dashboard ]`: Primary Large Button (Warm Dawn Gradient, height `44px`).
- **Responsive Behaviour:** Adapts to card container padding boundaries.
- **Animations:** Success checkmark paths draw dynamically using an elastic Bezier curve over `400ms` (`transition-slow`).
- **Accessibility:** Card container receives `role="status"` tag properties. Keyboard focus lands on the action button on mount.
- **Edge Cases:** Auto-redirect fail: If the automated redirect timer fails, allow the user to click the CTA manually to clear the state.

### 9. Error States

- **Purpose:** Provide warning alerts for authorization failures (invalid password, system errors, database conflicts).
- **User Goal:** Diagnose why the operation failed and retry.
- **Layout:** Injected alert block container positioned at the top of the active auth card, or inline below invalid inputs.
- **Components:** Alert container card (Background Danger semantic red, subtle borders, body text).
- **Form Fields:** Targeted inputs transition borders instantly to Danger semantic red.
- **Validation Rules:** Active during submit checks.
- **Buttons:** Small close cross icon button (Ghost style) inside error banner.
- **Responsive Behaviour:** Spacing adapts inside the card layout constraints.
- **Animations:** Error boxes translate down from top border of card using Out-Expo Bezier curves. Error submit triggers an immediate horizontal shake animation on the card container (`10px` offset, 4 cycles over `250ms`).
- **Accessibility:** Error tags are explicitly linked to target input IDs via `aria-describedby` mappings.
- **Edge Cases:** Offline state: Detect network connection drops, displaying a localized warning notification alert reading: "Network disconnected. Please check your internet connection and try again."

### 10. Loading States

- **Purpose:** Indicate active background network handshakes and processing.
- **User Goal:** Prevent double submissions or visual interface freezing during data transmissions.
- **Layout:** Card overlay mask, or inline text button overrides.
- **Components:** Shimmer skeletons, circular spinner SVG icons.
- **Form Fields:** All input controls are locked and programmatically disabled (`disabled="true"`).
- **Validation Rules:** Suspended during processing checks.
- **Buttons:** Active primary CTAs display an inline loading spinner icon (`20px` diameter, infinite rotation animation), button labels are hidden, and press scales are locked.
- **Responsive Behaviour:** Loader dimensions match target elements.
- **Animations:** Circular loading spinner rotates infinitely. Form elements fade slightly to `0.7` opacity to represent passive background states.
- **Accessibility:** Forms receive `aria-busy="true"` tags. Screen readers read an active status alert: "Processing authentication request, please wait..."
- **Edge Cases:** API timeout: After `10s` of backend unresponsiveness, automatically terminate loading states, unlock inputs, and trigger a system alert reading: "Connection timeout. Please try again."

---

# Authentication Flow

Authentication follows two distinct pathways depending on the registration channel chosen:

### Path A: Standard Email Authentication Flow

```
Landing Page (Start Free Assessment / Get Started)
        ↓
Welcome Screen (auth gateway `/auth`)
        ↓
Select "Continue with Email" (Sign Up or Sign In toggle)
        ↓
Fill credentials forms (Email / Password)
        ↓
Email Verification OTP screen (6-digit code check)
        ↓
Onboarding Wizard (`/onboarding` - Select Track)
```

### Path B: Google Single Sign-On (SSO) Flow

```
Landing Page (Start Free Assessment / Get Started)
        ↓
Welcome Screen (auth gateway `/auth`)
        ↓
Select "Continue with Google" (External Provider Handshake popup)
        ↓
Onboarding Wizard (`/onboarding` - Select Track)
```

---

# Session Behaviour

To ensure a seamless, high-retention experience, the platform enforces standardized user session behaviors.

### Remember Me

- **Aesthetic & Element:** A checkbox component in the Sign In form using `LgCheckbox` structure, aligned underneath the password field input.
- **Behavior:**
  - _Checked:_ Persists a secure token in local storage for `30 days`. When returning, the user bypasses authentication steps and is auto-routed straight to `/dashboard`.
  - _Unchecked:_ Persists session token in transient cookies (`Session` lifetime) that clear automatically when the browser window closes.

### Auto Login

- **Check Sequence:** On page load at `/` or `/auth`, the client checks for a valid session token (local storage or active cookie).
- **Visual Handler:** If valid token is present, instead of displaying form renders, show a clean fullscreen center loader utilizing the circular spinner and ambient glow canvas over a `400ms` fade-out span while completing auto-login.

### Session Expiration

- **Lifespan Limits:**
  - Standard session token: `24 hours` of inactivity timeout.
  - Remember-Me session token: `30 days` sliding window.
- **Timeout Warn Alert:** 5 minutes prior to session expiry, display a subtle Toast notification popup overlay (Floating shadow, top-right alignment).
  - _Content:_ "Your session is about to expire."
  - _Action:_ `[ Keep Session Active ]` (Primary mini button) and cross close button.
- **Expiry Redirect:** Upon expiration, invalidate client cache and redirect user to `/auth` with the URL query parameters `?expired=true`. Trigger an inline Error State alert banner: "Session expired. Please sign in again."

### Logout Behaviour

- **Trigger Action:** User selects "Log Out" inside dashboard header menu dropdown.
- **Sequence:**
  1. Triggers asynchronous delete call to clear token validation keys on the authentication backend.
  2. Instantly purges local storage, browser cookie values, and user context memory states.
  3. Fades screen overlay to black or navy canvas color over `250ms` (`transition-normal`).
  4. Redirects to public Landing Page (`/`).
  5. Displays a success notification toast: "Successfully signed out. Have a peaceful day."

### Protected Route Redirect

- **Guard Execution:** Secure route middleware checks all paths starting with `/dashboard` and `/onboarding`.
- **Unauthenticated Access Attempt:** Intercept request, block navigation, cache target URL pathname (e.g. `/dashboard/profiler`) in sessionStorage as query parameters: `?redirect=/dashboard/profiler`.
- **Redirect Sequence:** Force redirect visitor to `/auth` welcome screen. After completion of a successful login or SSO check, verify sessionStorage parameters and redirect the user back to the cached path instead of default dashboard locations.

---

# Design Rules

This authentication interface must strictly follow the Aurora Blossom Design System v1.0.0:

1.  **Strict Color Palette:** Only use canvas background colors (`color-light-canvas` / `color-dark-canvas`), surface colors (`color-light-surface` / `color-dark-surface`), and primary/secondary colors for interactives. No custom warning colors are allowed.
2.  **Strict Spacing Blocks:** Layout blocks must follow the base-4 system. Inner card padding is locked to `32px` (3xl), and form item margins must follow `20px` (xl) or `12px` (md).
3.  **Strict Typography Rules:** Headers use Outfit (H2, H3, H4 size standards). Body paragraphs and input fields use Inter (Body Small/Medium, Caption). Size scales must not deviate from design tokens.
4.  **Strict Component Consistency:** Form fields must follow standard input heights of `40px` and buttons must follow standard large heights of `44px`.

---

# Phase 08.3 — Onboarding UI Design

This specification defines the user experience framework, layout screens, visual styles, dynamic behaviors, validation criteria, accessibility parameters, and responsive rules for the **LifeGuide AI Onboarding Wizard (`/onboarding`)**. All onboarding templates must strictly follow this blueprint.

---

# Purpose

The Onboarding Wizard gathers critical academic and skill profiles to configure the user's initial state. It must:

1. **Minimize onboarding fatigue:** Break down diagnostic profiling into a highly visual, clean, step-by-step wizard.
2. **Collect personalization factors:** Capture career tracks, baseline skills, available hours, and learning preferences to feed the AI competency compiler.
3. **Transition to assessments:** Invite the user to complete their first track-specific diagnostic baseline questionnaire before landing on the dashboard.
4. **Build platform confidence:** Use calming visual aesthetics (Aurora Blossom) and fast dynamic rendering to establish value prior to dashboard entry.

---

# User Goal

New registrants completing the onboarding wizard should be able to:

- Define their target career track and self-assessed baseline depth.
- Log weekly study hour availabilities to structure the roadmap timeline.
- Upload their resume PDF to parse baseline competencies.
- Configure custom learning variables (e.g., preferred technology modules).
- Initiate diagnostic assessments or skip directly to their initial generated roadmaps.

---

# Layout Structure

All onboarding states reside in a centered card interface layout styled with the standard dimensions:

- **Card Container Wrapper:** Width locked to `640px` (standard onboarding layout constraint). Padding is configured to `32px` (3xl) on all sides.
- **Aesthetic styling:** Default canvas surface (`color-light-surface` / `color-dark-surface`), `radius-xl` (24px) rounding, Subtle border (`color-light-border` / `color-dark-border`), Elevated (Md) shadow.
- **Backdrop canvas:** Renders `color-light-canvas` / `color-dark-canvas` with top-right `Ambient Glow` radial gradient overlays.

```
+-------------------------------------------------------------+
| Canvas Background (color-light-canvas / color-dark-canvas)  |
| Top-Right Ambient Glow (Ambient Glow radial gradient)        |
|                                                             |
|            +-----------------------------------+            |
|            | Onboarding Card Wrapper (640px)   |            |
|            |                                   |            |
|            |  [ Progress Indicator Component ] |            |
|            |                                   |            |
|            |  [ Screen Title & Description ]   |            |
|            |                                   |            |
|            |  [ Step Interactive Content ]     |            |
|            |                                   |            |
|            |  [ Actions Bar (Back / Next) ]    |            |
|            +-----------------------------------+            |
|                                                             |
+-------------------------------------------------------------+
```

---

# Progress Indicator

The Progress Indicator sits anchored inside the top boundary of the onboarding card container to provide persistent completion feedback.

- **Visual Track:** A horizontal bar spanning the card width, height: `6px`, background: `color-light-border` / `color-dark-border`.
- **Active Progress Bar:** Fills the track from the left edge. Styled using the **Warm Dawn Gradient**. Width changes dynamically based on active step status.
- **Typography:** Anchored `12px` (Caption) text-muted label positioned directly above the progress track. Text reads: `"Step X of 8"`.
- **Step Marks:** Subtle vertical nodes positioned along the track showing section boundaries (e.g., Profile Selection -> Study Parameters -> Assessment Options).
- **Responsive Behaviour:** Progress bar track scales width dynamically down to mobile breakpoints. Label text drops text prefixes on mobile (reads `"X/8"`).

---

# Onboarding Screens Specification

### 1. Welcome Screen

- **Purpose:** Welcomes the new user and introduces the goals of the onboarding experience.
- **User Goal:** Understand the steps ahead and launch the wizard interface.
- **Layout:** Centered single-column layout within the `640px` card.
- **Components:**
  - _Welcome Illustration:_ Abstract glowing gradient circles and vector guides (180px height, centered).
  - _Typography:_ H2 Outfit main header ("Welcome to your Digital Career Sanctuary"), Body Medium description text.
- **Form Fields:** None.
- **Validation Rules:** None.
- **Buttons:**
  - `[ Let's Get Started ]`: Primary Large Button (Warm Dawn Gradient, height `44px`).
- **Responsive Behaviour:** Illustration collapses on mobile screens `< 640px` to optimize vertical focus. Spacing shifts to `20px` card padding.
- **Animations:** Illustration elements slow-pulse on entrance (`transition-slow` / 400ms).
- **Accessibility:** Screen reader greeting matches visual text. Clear keyboard focus target on start button.
- **Edge Cases:** Re-boarding users: if context shows the user completed onboarding previously, automatically bypass welcome and redirect straight to `/dashboard`.

### 2. Career Track Selection Screen

- **Purpose:** Establish the user's primary career discipline target.
- **User Goal:** Choose one of three primary career tracks.
- **Layout:** Grid of 3 columns, spacing gap `16px` (lg).
- **Components:**
  - _Selection Cards:_ Three interactive surface containers. Height `180px`, width `170px`, `radius-lg` (16px), default border. Contains track icon, H3 Title, and sub-labels list.
- **Form Fields:** Dynamic selection grid mapping:
  1.  _Frontend Engineering_ (Icon: Code, details: HTML, CSS, React, Redux).
  2.  _Backend Engineering_ (Icon: Database, details: Node.js, SQL, Express, APIs).
  3.  _Product Management_ (Icon: Briefcase, details: Strategy, UX, Product Metrics).
- **Validation Rules:** Must select exactly 1 track to activate the navigation button.
- **Selected Card Styling:** Background transitions to elevated surface color with a strong border highlight token. Accent glow overlays are rendered.
- **Buttons:**
  - `[ Next Step ]`: Primary Large Button (Warm Dawn Gradient, height `44px`). Disabled until selection is populated.
  - `[ Back ]`: Ghost text button, aligned left in action bar.
- **Responsive Behaviour:** 3-column grid collapses to a single-column vertical stack on mobile viewports. Card heights compress to `80px` layout bars with horizontal icon-title alignments.
- **Animations:** Hovering cards lifts them `translateY(-3px)` using Out-Expo Bezier curves. Selection triggers an active scale drop (`0.98`) to confirm click.
- **Accessibility:** Implements keyboard grid navigation. Elements mapped inside `role="radiogroup"`, selected card states pass `aria-checked="true"`.
- **Edge Cases:** Changing selection back and forth: layout permits free adjustments, only locking active choice when clicking `Next Step`.

### 3. Skill Level Screen

- **Purpose:** Gather the user's self-assessed baseline skill level.
- **User Goal:** Select a descriptive competency baseline matching their current comfort level.
- **Layout:** Vertical selection list column, spacing gap `12px` (md).
- **Components:** Interactive selection row blocks (`radius-md` / 12px, subtle shadow).
- **Form Fields:** Three select items:
  1.  _Novice (Beginner):_ "I am starting from scratch. I need core fundamentals and basic walkthroughs." (Icon: Sprout).
  2.  _Intermediate (Practitioner):_ "I understand syntax and concepts, but struggle to build complex architectures." (Icon: Leaf).
  3.  _Advanced (Expert):_ "I build complete applications. I want to optimize performance and fill advanced gaps." (Icon: Tree).
- **Validation Rules:** Selecting exactly 1 option is required.
- **Buttons:**
  - `[ Next Step ]` (Primary Large), `[ Back ]` (Ghost).
- **Responsive Behaviour:** Row padding drops from `20px` to `12px` on mobile screens to preserve text alignment space.
- **Animations:** Selected row applies an ambient shadow transition over `250ms` (`transition-normal`).
- **Accessibility:** Supports keyboard arrow navigation. Selected rows read their value and active index position to screen readers.
- **Edge Cases:** None.

### 4. Experience Screen

- **Purpose:** Log the user's career background and upload resume metadata.
- **User Goal:** Choose baseline background types and upload their PDF resume.
- **Layout:** Form fields stack accompanied by a file upload dropzone.
- **Components:** Dropdown select input, custom file uploader container.
- **Form Fields:**
  - _Background Select:_ Dropdown dropdown (options: Self-Taught, Bootcamp Graduate, University Student, Working Professional).
  - _Resume Uploader:_ Drag-and-drop file wrapper featuring a dotted strong border path, support lavender background backing (opacity `0.05`), text prompt ("Drag & drop your PDF resume here, or browse files").
- **Validation Rules:**
  - Background select is required.
  - Resume upload is optional. Accepts PDF format only, maximum file size bounded to `5MB`. File type/size violations trigger red semantic danger states.
- **Buttons:**
  - `[ Next Step ]` (Primary Large), `[ Back ]` (Ghost).
- **Responsive Behaviour:** Dropzone area compresses on mobile, showing a simple button trigger: `[ Tap to Upload Resume (PDF) ]`.
- **Animations:** Drag-over states change the dropzone border color to primary purple using rapid transitions (`transition-fast` / 150ms).
- **Accessibility:** Uploader supports keyboard space/enter execution to open files. Explicit description parameters are announced.
- **Edge Cases:** Corrupted file selection: validation flags file parse errors on load, showing an inline Alert box reading: "Unable to read file metadata. Please upload a valid PDF."

### 5. Weekly Availability Screen

- **Purpose:** Define available learning bandwidth to calculate weekly roadmap milestone density.
- **User Goal:** Input available study hours per week.
- **Layout:** Single-card vertical stack. The core control is a prominent custom slider bar.
- **Components:** Slider element, display metric indicator.
- **Form Fields:**
  - _Study Hour Slider:_ Range `1` to `40` hours/week. Default slider positioning set to `10` hours/week.
- **Validation Rules:** Must return an integer value between `1` and `40`.
- **Buttons:**
  - `[ Next Step ]` (Primary Large), `[ Back ]` (Ghost).
- **Responsive Behaviour:** Slider track line is widened on mobile to ensure thumb is easy to grab with touch gestures.
- **Animations:** The numeric hours text (H1 Outfit) scales dynamically (`scale: 1.1` to `1.0` bounce) upon slider adjustment ticks.
- **Accessibility:** Slider track utilizes semantic attributes (`role="slider"`, `aria-valuemin="1"`, `aria-valuemax="40"`, `aria-valuenow`). Keyboard left/right arrow adjustments modify value by steps of `1`.
- **Edge Cases:** Lower limits alert: selecting `< 5` hours displays a warning warning tag reading: "With less than 5 hours a week, completing this roadmap path may take several months."

### 6. Career Goal Screen

- **Purpose:** Identify target employment outcomes and aspirations.
- **User Goal:** Choose standard objective chips and write a brief description of goals.
- **Layout:** Multi-select chips grid at the top, followed by a free-text input area.
- **Components:** Chips (32px height, radius-sm), text area input.
- **Form Fields:**
  - _Goal Chips:_ Selectable matrix (options: Land first job, Prep for interviews, Build portfolio, Learn new tech, Get promoted).
  - _Free-Text Description:_ `LgInput` Textarea, placeholder: "Describe your dream job or specific company target...".
- **Validation Rules:**
  - Must select at least 1 goal chip or write a goal description (minimum `10` characters).
  - Textarea characters are restricted to a maximum of `300` characters.
- **Buttons:**
  - `[ Next Step ]` (Primary Large), `[ Back ]` (Ghost).
- **Responsive Behaviour:** Goal chips wrap horizontally onto multiple lines. Textarea height scales down on mobile viewports.
- **Animations:** Chips transition background and border states instantly upon selection toggles.
- **Accessibility:** Textarea links to helper description ID. Chips utilize checkbox states.
- **Edge Cases:** Textarea character limit: characters entered past `300` are blocked, and character counters turn semantic danger red.

### 7. Learning Preferences Screen

- **Purpose:** Configure default format types for curated resources in roadmaps.
- **User Goal:** Choose preferred learning content styles (videos vs text).
- **Layout:** Vertical selection list columns.
- **Components:** Option card tags, checkbox toggles.
- **Form Fields:** Multi-select list cards:
  1.  _Video Tutorials:_ YouTube, Egghead, video guides (Icon: Play).
  2.  _Written Documentation:_ Official guides, text blocks, blog posts (Icon: Book-Open).
  3.  _Interactive Coding Sandboxes:_ CodePen, StackBlitz, interactive terminals (Icon: Terminal).
- **Validation Rules:** Must select at least 1 learning resource format.
- **Buttons:**
  - `[ Next Step ]` (Primary Large), `[ Back ]` (Ghost).
- **Responsive Behaviour:** Standard stack adapts fluidly.
- **Animations:** Selection displays background transitions.
- **Accessibility:** Standard multi-select aria labels. Checkboxes are keyboard targetable.
- **Edge Cases:** None.

### 8. Technology Selection Screen (Dynamic)

- **Purpose:** Refine specific tool focus sets depending on the Career Track chosen in Step 2.
- **User Goal:** Filter technologies they are interested in.
- **Layout:** Search input bar at the top, followed by a dynamic grid of selectable chips.
- **Components:** Search textbox, dynamic chips lists, search empty-state banner.
- **Form Fields:**
  - _Filter Text Field:_ type: `text`, placeholder: "Search technologies...".
  - _Dynamic Tech Chips Grid:_ Multi-select chips container. Options render dynamically:
    - _Frontend Track:_ React, Redux, Tailwind, TypeScript, Next.js, HTML5, CSS Grid, Jest.
    - _Backend Track:_ Node.js, SQL, Express, Postgres, MongoDB, Docker, GraphQL, Redis.
    - _Product Management Track:_ Strategy, Agile, UX/UI basics, Product Metrics, Jira, Mixpanel, User Research.
- **Validation Rules:** User must select at least `2` technologies to proceed.
- **Buttons:**
  - `[ Next Step ]` (Primary Large), `[ Back ]` (Ghost).
- **Responsive Behaviour:** Chips scale to fit viewport constraints. Search text bar expands to fill width.
- **Animations:** Chips fade in and filter dynamically as the user types search filters.
- **Accessibility:** Search input field uses `aria-controls` referencing the dynamic chips grid.
- **Edge Cases:** Search returns no matches: hide chips list and display a mini Empty State reading: "No matching technologies found."

### 9. Assessment Overview Screen

- **Purpose:** Prompt users to begin the baseline skill diagnostic assessment.
- **User Goal:** Choose to initiate diagnostic questions or skip directly to the dashboard.
- **Layout:** Centered content layout inside the onboarding card.
- **Components:**
  - _Feature Details Box:_ Summary details of the baseline assessment (5-10 multiple-choice questions, estimates 5 minutes, evaluates baseline competency tiers).
- **Form Fields:** None.
- **Validation Rules:** None.
- **Buttons:**
  - `[ Start Diagnostic Test ]`: Primary Large Button (Warm Dawn Gradient, height `44px`).
  - `[ Skip & Generate Roadmap ]`: Ghost Text link below action block (allows skipping directly to dashboard).
- **Responsive Behaviour:** Layout scales vertical spacing block margins down for mobile viewports.
- **Animations:** Primary button has a slow pulse highlight glow on active borders.
- **Accessibility:** Focused link triggers clear indicators.
- **Edge Cases:** Offline state: disable the start assessment button and display a notification alert if network dropouts occur.

### 10. AI Processing Screen

- **Purpose:** Processing loader screen displaying feedback while the AI compiles personalization data.
- **User Goal:** Wait for completion of personalized roadmap and portfolio generator checks.
- **Layout:** Full-screen card loading overlay, layout centers all loader nodes.
- **Components:** Animated AI Co-pilot loader icon (outer glowing circles pulsing), progress percentage ticker, text updates bar.
- **Form Fields:** None.
- **Validation Rules:** All navigations are disabled.
- **Buttons:** None. Action triggers are completely hidden.
- **Responsive Behaviour:** Loader node is perfectly centered on all viewport sizes.
- **Animations:** Glowing radial circles pulse infinitely (scale `1.0` to `1.15`, opacity `0.3` to `0.8`, period `2.0s`). Status text cycler updates text strings sequentially over `3s` intervals.
- **Accessibility:** Card container is flagged with `aria-busy="true"` and `aria-live="polite"`. Text readouts state active progress to screen readers.
- **Edge Cases:** Backend generation timeouts: If LLM processing takes longer than `15s`, display a fallback modal panel offering to finish processing in the background and redirect the user directly to the dashboard page.

### 11. AI Summary Screen

- **Purpose:** Present a high-level summary of the compiled profile and roadmap baseline metrics.
- **User Goal:** Verify stats and click to proceed to the platform workspace.
- **Layout:** Dual-column layout:
  - _Left Column:_ Skill profile overview (target track, self-assessed level, weekly schedule allocations).
  - _Right Column:_ Preview of generated roadmap milestone stages.
- **Components:** Metric grids, progress bar preview nodes, milestone preview badges.
- **Form Fields:** None.
- **Validation Rules:** None.
- **Buttons:**
  - `[ Enter Career Sanctuary ]`: Primary Large Button (Warm Dawn Gradient, height `44px`).
- **Responsive Behaviour:** Dual-column layout collapses to a vertical single-column stack on mobile screens.
- **Animations:** Celebratory ambient particle explosion on mount: soft peach, lavender, and pink circles (matching design tokens) scale and fade outward from the card center over `800ms`.
- **Accessibility:** Focus moves immediately to the primary CTA button. Metric numbers are structured with accessibility descriptions.
- **Edge Cases:** None.

---

# Dynamic Screen Behaviour & Conditional Rendering Rules

To ensure a personalized wizard experience, the Onboarding container implements dynamic rendering logic:

1.  **Technology Selection Filtering (Screen 8):**
    - The list of technologies displayed on Screen 8 must match the target track selected in Screen 2.
    - _Frontend selected:_ Renders Web technologies.
    - _Backend selected:_ Renders database and server tooling.
    - _Product Management selected:_ Renders agile and strategic framework options.
2.  **Diagnostics Skipping Logic (Screen 9):**
    - If the user clicks `Start Diagnostic Test`, route them into the Questionnaire Modal path (`/dashboard/profiler?onboarding=true`).
    - If the user clicks `Skip & Generate Roadmap`, route them directly to `/onboarding?step=10` (AI Processing) to construct default roadmap variables, then redirect to the primary `/dashboard`.

---

# AI Personalization Preview

The details gathered during onboarding map directly to System Prompts passed to **Gemini Pro** to compile personalized learning elements:

```json
{
  "target_track": "career_track_selection",
  "self_assessed_level": "skill_level_selection",
  "academic_background": "experience_background_select",
  "study_hours_limit": "weekly_availability_hours",
  "curation_preferences": "learning_preferences_array",
  "focus_tools": "dynamic_tech_selection_array"
}
```

This configuration object allows the LLM compiler to construct customized roadmap segments, target resource lengths, and specify portfolio briefs that map directly to identified skill gaps.

---

# Onboarding Global State Components

### Empty States

- _Occurrence:_ Search filter on Screen 8 returns zero matching items.
- _Design:_ Content centered, micro outline search icon (`40px` size, text-muted), helper text: "No matching technologies found. Try searching for a different tool.", input bar clears on Esc key.

### Error States

- _Occurrence:_ PDF uploader file exceeds limits, database write failure.
- _Design:_ Renders an Alert banner inline using Danger semantic red, rounded corners `radius-md` (12px), subtle border outline. Form submit attempts trigger input shakes.

### Loading States

- _Occurrence:_ Asynchronous file parsing, processing AI data structures.
- _Design:_ Skeleton placeholder containers utilizing warm sweeps, action button text is replaced with rotating loader spinners, click options are programmatically disabled.

---

# Design Rules

This onboarding wizard must strictly follow the Aurora Blossom Design System v1.0.0:

1.  **Color Palettes:** Renders only standard theme tokens. Backdrops use canvas white (`rgba(253, 251, 247, 1)`) or deep navy (`rgba(12, 13, 29, 1)`). Selection highlights utilize standard primary purple transparent opacities.
2.  **Layout Spacing:** Spacings must use defined tokens (`xs` to `7xl`). Card padding is locked to `32px` (3xl), and step layouts utilize spacing margins of `20px` (xl).
3.  **Typography Scales:** Titles use Outfit (Display / H1 / H2). Forms and body paragraphs use Inter.
4.  **Buttons:** Only default design button styles are allowed. Primary button height is locked to `44px`.

---

---

# Onboarding Advanced Behaviours

## 1. Save Progress & Continue Later

To support high registration-to-completion rates, the onboarding process allows users to pause and resume their progress.

### Auto-Save Mechanics

- **Trigger:** Automatically triggers whenever the user completes validation on a step and clicks the `[ Next Step ]` action button.
- **Visual Indicator:** A small status label "Draft saved" (Caption typography, `color-light-text-muted` / `color-dark-text-muted`) fades in quietly inside the top-right card header, next to the step counter. Displays for `1.5s` before fading out smoothly.
- **Storage Path:** Data is written to the client state store and synced asynchronously with the database user profile draft schemas.

### Save & Exit Button

- **Placement:** Located in the top-right corner of the Card wrapper, inline with the Step Indicator.
- **Styling:** Ghost button (`LgButtonGhost`, 36px height) with text label "Save & Exit".
- **Behavior:** Saves current form entries, pops up a success confirmation Toast: "Onboarding progress saved. You can continue anytime.", and redirects user to the Landing Page (`/`).

### Restore Progress

- **Auth Hook:** Upon successful login at `/auth`, if the user state returns `onboarding_completed: false` and a cached step index is detected (e.g., `current_step: 4`), redirect the user automatically to `/onboarding?restore=true`.
- **Welcome Back Dialog Modal:**
  - _Visuals:_ Standard modal wrapper (`radius-xl`, Floating shadow, backdrop blur `8px`).
  - _Content:_ Title "Welcome Back!" (H2 Outfit). Subtitle "Would you like to restore your onboarding progress or start over from the beginning?" (Body Small).
  - _Actions:_
    - `[ Restore Progress ]`: Primary Large Button (Warm Dawn Gradient). Returns user to their cached step with previous answers pre-populated.
    - `[ Start Over ]`: Secondary Outline Button. Purges cached data and returns user to Step 1.

---

## 2. Unsaved Changes Protection

To prevent accidental data loss, route protection guards are applied to all `/onboarding` steps containing input forms.

### Interception Scenarios

1.  **Browser Refresh & Closing Tab:** Listens to browser `beforeunload` events, prompting the native browser warning dialogue if any form fields on the current step are dirty (unsaved).
2.  **Browser Back Button & Navigation Links:** Reacts to router history updates, blocking immediate route change and launching a custom system modal.

### Leave Onboarding Confirmation Modal

- **Structure:** Max-width `540px` (standard dialog layout), centered, `radius-xl` rounding, backdrop blur `8px` overlay.
- **Content:**
  - _Header Title:_ "Unsaved Onboarding Progress" (H3 Outfit).
  - _Body Copy:_ "You have unsaved changes on this step. If you navigate away or refresh now, your inputs for this step will be discarded." (Body Small, text-secondary).
- **Actions Stack:** Flex row alignment (spacing gap `12px` [md], aligned right):
  1.  `[ Save Progress ]`: Primary Large Button (Warm Dawn Gradient). Performs an auto-save sync and proceeds with the navigation target route.
  2.  `[ Stay ]`: Secondary Outline Button. Closes the modal and retains user focus on the active form.
  3.  `[ Leave ]`: Ghost Button. Discards current step changes and forces navigation to the target route.

---

## 3. Progress Navigation Rules

Navigation controls enforce linear progression while permitting editing of previously validated choices.

### Navigation Rules Matrix

- **Previous Completed Steps Editable:** The progress timeline nodes (representing steps lower than `current_step`) are clickable links. Hovering over a past node transforms the cursor to a pointer, and clicking routes the user back to that step.
- **Future Steps Locked:** Timeline nodes representing steps greater than `current_step` are strictly disabled. Renders at `0.3` opacity, ignore all mouse pointer events, and return no focus rings.
- **Progress Indicator Fill Behavior:**
  - The Active Progress Bar width is calculated: `width: ((current_step - 1) / total_steps) * 100%`.
  - _Edit Back Loop:_ If a user on Step 5 clicks back to Step 2, the progress bar shrinks to Step 2 width. However, once Step 2 is updated, clicking `Next Step` forwards the user directly back to their furthest validated step (Step 5) instead of forcing them to re-step through Steps 3 and 4, unless intermediate changes invalidate subsequent rules.
- **Forward Validation Gate:** The `Next Step` button is rendered in disabled styling by default. It only transitions to active state once all required inputs on the active screen satisfy input validation criteria (e.g. at least 2 technologies selected on Screen 8).

---

## 4. Enhanced AI Summary Screen

The final AI Summary Screen (Screen 11) is expanded into a preview dashboard layout displaying the compiled career profile data:

```
+---------------------------------------------------------------------------------+
| AI SUMMARY PREVIEW                                                              |
|                                                                                 |
|  +---------------------------+  +---------------------------+  +-------------+  |
|  | Track: Frontend           |  | Level: Intermediate       |  | Duration:   |  |
|  | [Icon] Outfit H4          |  | [Icon] Outfit H4          |  | 12 Weeks    |  |
|  +---------------------------+  +---------------------------+  +-------------+  |
|                                                                                 |
|  +---------------------------+  +---------------------------+  +-------------+  |
|  | Experience: Self-Taught   |  | Hours: 15 hrs/week        |  | Projects:   |  |
|  | [PDF Attachment Icon]     |  | [Slider Graphic Icon]     |  | 3 briefs    |  |
|  +---------------------------+  +---------------------------+  +-------------+  |
|                                                                                 |
|  +----------------------------------------------------------+  +-------------+  |
|  | Technologies: React, Tailwind, Next.js, Jest             |  | Diagnostics: |  |
|  | [Chips Grid]                                             |  | Completed   |  |
|  +----------------------------------------------------------+  +-------------+  |
+---------------------------------------------------------------------------------+
```

### Preview Cards Grid Layout

Uses a responsive grid (12-column desktop grid with a column gap of `24px` [2xl] and row gap of `16px` [lg]). Backgrounds use `color-light-surface` / `color-dark-surface`, rounded corners: `radius-lg` (16px), subtle border, subtle shadow.

1.  **Selected Career Track Card:** Displays chosen track (Frontend, Backend, PM) accompanied by its duotone icon (`24px` size, primary color) and track badge.
2.  **Skill Level Card:** Displays baseline (Novice, Intermediate, Advanced) and a vector leaf indicator mapping competency depth.
3.  **Experience Card:** Summarizes target background type (e.g., "Bootcamp Graduate") and shows a file clip icon if a PDF resume was parsed.
4.  **Weekly Hours Card:** Displays set weekly commitments (e.g., "20 hours/week") alongside a miniature slider gauge icon.
5.  **Learning Preferences Card:** Displays resource filters (Videos, Written, Sandboxes) as horizontally inline pill tags.
6.  **Selected Technologies Card:** Displays the chosen tools list as a matrix of dynamic chips.
7.  **Estimated Roadmap Duration Card:** Displays calculated roadmap completion timeframe (e.g., "16 Weeks") using Outfit Display font styled with the **Warm Dawn Gradient**.
8.  **Estimated Projects Card:** Shows count of customized portfolio specifications generated (e.g., "4 custom briefs") designed to fill identified skill gaps.
9.  **Assessment Status Card:** Displays a semantic badge indicating diagnostic completion status (Success green "Completed" or Warning orange "Skipped").

---

## 5. Resume Parsing State

Following PDF uploads on Screen 4, the uploader container transforms into an active processing card layout to prevent user exit.

### Parsing Screen Elements

- **Visual Feedback Ring:** A centered circular progress SVG graphic (`72px` diameter, 4px stroke width). The stroke animates using the **Sunset Peach Gradient** sweeps, housing a text percentage counter (`0%` to `100%`) in the center.
- **Step Checklist Panel:** A vertical stack of status strings (Caption size, spacing `8px` [sm]) displaying checkmarks sequentially as background execution resolves:
  1.  `Parsing Resume...` (Extracts text content characters from PDF).
  2.  `Extracting Skills...` (Identifies academic and employment entities).
  3.  `Detecting Technologies...` (Maps code libraries and tools).
  4.  `Analyzing ATS Keywords...` (Correlates matching taxonomy tags).
- **Estimated Completion Label:** "Estimated completion: 3 seconds." (Caption size, text-muted, centered at base).

### State Specifications

| State       | Styling & Behaviours                                                                                                         | Animation Rules                                                                                                              |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Loading** | Uploader background transforms to elevated surface. Active percentage count increases. Input fields are locked.              | Infinite rotation spin on progress ring. Status text sweeps opacity shimmer cycles.                                          |
| **Success** | Ring turns to Success green checkmark. Checklist items show green bullet checkmarks. Alert box flashes Success parameters.   | Checkmark stroke draws dynamically over `400ms`. Automatically routes to Step 5 after `1.2s` transition delay.               |
| **Failure** | Progress ring is replaced by Danger red error icon. Displays message: "Resume parse failed. Unsupported PDF scans detected." | Error icon shakes horizontally. Buttons fade in: `[ Try Again ]` (Secondary)# Phase 08.4 — Dashboard UI Design Specification |

This specification defines the visual architecture, layout blocks, component details, interactive behaviors, responsive thresholds, accessibility parameters, and motion guidelines for the **LifeGuide AI Career Dashboard (`/dashboard`)**. All implementation must strictly follow these rules.

---

## 1. Dashboard Layout

- **General Architecture:** A 2-column structural layout partitioning navigation controls from active workspace content.
- **Canvas Backing:** Main canvas utilizes the `color-light-canvas` / `color-dark-canvas` tokens.
- **Dimensions & Constraints:** The main content wrapper is restricted to a maximum container width of `1360px` to prevent stretching on widescreen monitors. Page margins are configured to `32px` (3xl).
- **Dividers:** Separation between columns uses `1px solid var(--color-border)`.

## 2. Sidebar Navigation

- **Dimensions:** Width of `260px` expanded, collapsing down to a mini-bar of `80px` on tablet viewports. Height spans the complete viewport (`100vh`).
- **Aesthetic backing:** Semi-opaque surface (`rgba(255, 255, 255, 0.8)` in Light Theme, `rgba(20, 19, 41, 0.8)` in Dark Theme), with right border configured to `1px solid var(--color-border)`.
- **Logo Header:** Centered logo emblem (outline compass rose + book icon) and brand title "LifeGuide AI" (Outfit H4, weight 600) with a horizontal gap of `8px` (sm) and top padding of `24px` (2xl).
- **Nav Link Stack:** Vertical menu items list separated by `12px` (md) vertical margins.
- **Link Toggles:** Overview, Learning Roadmap, Project Briefs, Resume Matcher, Mock Interviews, Settings.
- **Active vs Hover States:**
  - _Hover state:_ Background turns to elevated surface color (`color-light-surface-elevated` / `color-dark-surface-elevated`), text color transitions to primary text.
  - _Active state:_ Background overlay transitions to primary purple at `0.08` opacity. A solid vertical indicator bar `3px` wide is displayed along the left edge using the primary purple token (`color-light-primary` / `color-dark-primary`). Text weight shifts to `semibold`.
- **Footer Actions:** Inline theme toggle selector pill segment (`radius-full`) and Ghost logout button.

## 3. Top Navigation

- **Dimensions:** Fixed height `72px` sticky container anchored at the top of the content canvas.
- **Aesthetic:** Glassmorphism overlay wrapper (`glass-container-light` / `glass-container-dark` with blur `16px`), bottom border configured to `1px solid var(--color-border)`. Horizontal padding: `32px` (3xl).
- **Left Section:** Active route label text (e.g. "Overview Dashboard", Outfit H3, weight 600, color text primary).
- **Right Section:** Horizontally aligned badge and control triggers:
  - _Streak Badge:_ Milestone Complete style capsule showing active study streak: `"🔥 5 Days"`.
  - _Notification Bell:_ Outline circle button (`36px` diameter) with top-right notification indicator overlay (info blue). Clicking triggers the Notifications dropdown panel.
  - _Profile Selector:_ User avatar graphic (`32px` diameter, `radius-full` border ring) inline with name label (Body Small, weight 500) and chevron. Clicking launches action menu dropdown.

## 4. Dashboard Home

- **Layout Grid System:** Content is organized using a 12-column responsive layout framework.
- **Row Orchestrations:**
  - _Row 1:_ Welcome Header (full-width spans).
  - _Row 2:_ AI Insight Cards (3-column layout grid).
  - _Row 3:_ 8-column Left Column for the Learning Roadmap Widget, paired with a 4-column Right Column housing the Weekly Progress Widget and Quick Actions.
  - _Row 4:_ 6-column Left Column for the Calendar Widget, paired with a 6-column Right Column housing the Resume ATS Widget and Recent Activity.
- **Vertical Rhythm:** Margins between rows are locked to `24px` (2xl).

## 5. Welcome Header

- **Purpose:** Greet the authenticated user in a warm, personalized, and motivating manner on portal entry.
- **Layout:** Left-aligned text group, spanning the full content width, positioned below the top navigation and above the metrics row. Padding bottom: `24px` (2xl).
- **Content Elements:**
  - _Greeting:_ "Good morning, [User Name]" (Outfit H2, weight: 600, color: `color-light-text-primary` / `color-dark-text-primary`).
  - _Status Subtitle:_ "Your career copilot is ready. Today you have 3 milestones due on your Frontend Roadmap." (Body Medium, color: `color-light-text-secondary` / `color-dark-text-secondary`).
- **Visual Highlights:** A miniature active circular status dot (semantic Info blue) sits inline next to the greeting text, signifying system readiness.

## 6. AI Insight Cards

- **Aesthetic:** Row grid of 3 identical card containers. Padding: `20px` (xl), `radius-lg` (16px), subtle border, subtle shadow.
- **Card Insights:**
  1.  _Active Track Insight:_ "Target Career: Frontend Engineer" (H3 Outfit). Linear progress bar (Warm Dawn Gradient) showing "45% Completed".
  2.  _Commitment Insight:_ "Study Time: 15 / 20 Hours Completed" (H3 Outfit). Small success green badge reading "75% Target Met".
  3.  _Skill Gap Insight:_ "Verified Skill Gaps: 8 Resolved" (H3 Outfit). Sub-label text "3 active gaps remaining" (System/Default badge style).

## 7. Learning Roadmap Widget

- **Purpose:** Summarize active learning milestones and prompt active due studies.
- **Container:** Standard Feature Card (`radius-xl` / 24px, subtle shadow, default surface, padding 24px).
- **Visual TIMELINE:** Vertical timeline showing:
  - _Milestone 1 (Complete):_ "HTML5 & CSS Grid Layouts". Checked circle node (Success green), text color styled text-muted.
  - _Milestone 2 (Active/Current):_ "React State Management & Redux". Circle outline in primary purple gradient with an active pulse animation loop. Shows details: "Due in 2 days" and action button `[ Continue Study ]` (Primary Mini Button, height `36px`).
  - _Milestone 3 (Locked):_ "API Integrations & Next.js". Node circle is grayed out at `0.3` opacity (support lavender token).
- **Dotted Trail:** Dotted vector path stroke (`3px` width) linking the milestone circles.

## 8. Weekly Progress Widget

- **Purpose:** Display weekly study hour accomplishments against targets.
- **Layout:** Dashboard metric card block, centered content layout alignment, right 4-column column allocation.
- **Visual Ring:** Centered circular progress ring (`120px` outer diameter, 8px stroke weight). The progress track fills using the **Sunset Peach Gradient** to match metric completion rates (e.g., "75%"). Inside ring center displays large text: `"75%"`.
- **Supporting Copy:** Centered caption "15 of 20 hours finished. 5 hours remaining." (Body Small, text-secondary).

## 9. Calendar Widget

- **Purpose:** Logs daily study streaks and schedules milestones.
- **Layout:** Horizontal panel layout, displaying 7 weekday boxes (Mon-Sun) inline, spacing gap `8px` (sm).
- **Day Box States:**
  - _Completed Day:_ Background `rgba(99, 74, 186, 0.08)` (Light) / `rgba(147, 122, 234, 0.15)` (Dark), border configured to primary purple strong border, center checkmark icon.
  - _Active Day:_ Border outline styled using the Sunset Peach Gradient, text font-weight set to semibold.
  - _Muted Day:_ Default background surface, text styled using `color-light-text-muted` / `color-dark-text-muted`.

## 10. Recent Activity

- **Purpose:** Log recent actions performed by the user.
- **Structure:** Simple vertical list stacked inside card container. Rows are separated by spacing md (`12px`).
- **Rows:**
  - _Log 1:_ "Passed diagnostic assessment: HTML Basics" (Success check badge, timestamp "3 hrs ago").
  - _Log 2:_ "Generated customized project brief: React Portfolio" (Badge file-plus, timestamp "Yesterday").
  - _Log 3:_ "Uploaded profile resume PDF" (Badge file-up, timestamp "2 days ago").

## 11. Resume ATS Widget

- **Purpose:** Summarize scanned resume evaluations.
- **Content:**
  - _Overall Match Score:_ Value "ATS Score: 78%" (Outfit H3). Progress slider filled with the Warm Dawn Gradient.
  - _Actions:_ `[ Optimize Resume ]` (Secondary Outline button, height `36px`) and missing keyword alerts count.

## 12. AI Recommendation Panel

- **Purpose:** Highlight next-best-actions compiled by the AI engine.
- **Aesthetic:** AI Co-Pilot Container styling rules (Warm Dawn Gradient border, interior ambient shadow: `inset 0 0 16px rgba(235, 126, 162, 0.04)` for light, `rgba(247, 168, 194, 0.08)` for dark).
- **Content:**
  - _Heading Flag:_ "AI COPILOT RECOMMENDATION" (Secondary Pink, tracking `0.05em`, size 10px).
  - _Description:_ "Based on your assessment, we recommend focusing on SQL Joins this week to fill backend gaps." (Body Medium).
  - _Actions:_ `[ Add to Roadmap ]` (Primary Mini Button) and `[ Dismiss ]` (Ghost Text link).

## 13. Quick Actions

- **Purpose:** Provide one-click access paths to platform actions.
- **Layout:** 2x2 grid layout block, spacing gap `12px` (md).
- **Buttons:** 4 button blocks styled as secondary outline widgets (`LgButtonSecondary` outline borders, height `40px`):
  - "Take Diagnostic" (Icon: Activity)
  - "Generate Project Brief" (Icon: FilePlus)
  - "Upload New Resume" (Icon: FileUp)
  - "Practice Interview" (Icon: Video)

## 14. Notifications

- **Aesthetic:** Floating panel component (`radius-lg` / 16px, Floating shadow, `rgba(255, 255, 255, 0.98)` / `rgba(20, 19, 41, 0.98)`). Bottom border configured to `1px solid var(--color-border)`.
- **Content Row:** Vertical stack of 3 notification rows:
  1.  _System update:_ "Your custom React project brief is ready." (Milestone complete icon badge, status unread).
  2.  _Streak alert:_ "Keep your WAU streak alive! Log study hours today." (Warning badge status).
  3.  _Feedback update:_ "ATS Optimizer scan finalized." (Info badge status).
- **User Action:** `[ Mark All Read ]` ghost button, and close triggers.

## 15. Empty States

- **Trigger:** No active learning paths selected or skipped onboarding.
- **Visual Layout:** Centered content layout block, height `360px`, perfectly aligned vertically/horizontally.
- **Components:**
  - _Illustration:_ Abstract outlined compass vector (180px height, text-muted).
  - _Typography:_ H3 Outfit title ("No Active Roadmap Path"), Body Small description.
  - _Action:_ `[ Start Onboarding ]` (Primary Large Button, height `44px`).

## 16. Error States

- **Visual Logic:** Show semantic Danger alert banners at the top of the canvas during data handshake failures.
- **Components:** Alert container block (semantic Danger red background, border outline, body text), Close button (Ghost style).
- **Widget Failures:** Targeted cards block interaction and overlay: "Unable to load widget data. Click to retry."

## 17. Loading States

- **Visual Logic:** Render skeleton cards during active API sync checks.
- **Component Structure:** Input blocks and text indicators are replaced with grayed out blocks featuring infinite shimmer gradient sweeps:
  - _Light Theme Shimmer:_ `linear-gradient(90deg, rgba(238, 235, 245, 0.8) 0%, rgba(247, 244, 252, 0.8) 50%, rgba(238, 235, 245, 0.8) 100%)`.
  - _Dark Theme Shimmer:_ `linear-gradient(90deg, rgba(28, 24, 51, 0.8) 0%, rgba(38, 35, 68, 0.8) 50%, rgba(28, 24, 51, 0.8) 100%)`.
- **Circular Progress Loading:** Ring charts show a slow pulse opacity shift cycling from `0.4` to `0.8` over `1.8s` cycles.

## 18. Responsive Behaviour

- **Desktop Layout (>= 1024px):** 12-column grid. Column gap: `32px` (3xl). Row gap: `24px` (2xl). Page margins: `32px` (3xl). Maximum container width bounded to `1360px` to prevent stretching.
- **Tablet Layout (640px to 1024px):**
  - Sidebar collapses to a mini icons bar (`80px` wide). Menu text label strings are hidden.
  - Overview widgets and columns wrap from horizontal side-by-sides to vertical blocks (e.g. 12-columns grid columns fold into single column rows).
  - Page margins compress to `20px` (xl).
- **Mobile Layout (< 640px):**
  - Sidebar is hidden. Navigation is handled via a hamburger overlay drawer menu or bottom sticky navigation row.
  - All layouts collapse completely to 1-column stacks.
  - Page margins compress to `16px` (lg).
  - Buttons expand to full width block layouts to provide touch-friendly targets.

## 19. Accessibility

- **Screen Reader Semantics:** Navigation elements in `<nav>` wrappers. Buttons and links have explicit `aria-label` tags. Grid cards have readable headings.
- **Focus Rings:** Ring outline indicator matches:
  ```css
  outline: 2px solid rgba(99, 74, 186, 1); /* color-light-primary */
  outline-offset: 2px;
  ```
- **Contrast Check:** All typography colors pass WCAG AA (4.5:1 ratio for regular text, 3:1 for large text).
- **ARIA Live Regions:** Dynamic widget updates notify assistive devices using `aria-live="polite"` tags.

## 20. Animations

- **Dashboard Entry Page Fade-in:** Elements fade in and translate up over `250ms` (`transition-normal` Out-Expo Bezier curves).
- **Roadmap Active Node Pulse:** Opacity cycles from `0.4` to `0.8` using infinite `ease-in-out` curves over `1.8s` cycles.
- **Card Hover lifts:** Transformation: `translateY(-4px)` over `250ms` Out-Expo, shadow transitions from Subtle to Elevated.
- **Button Press Click Response:** Scales down button container to `0.98` over `150ms` (`transition-fast`).

## 21. Component List

- **Atomic:** `LgButtonPrimary`, `LgButtonSecondary`, `LgButtonGhost`, `LgBadge`, `LgInput`.
- **Layout:** `LgSidebar`, `LgTopNav`, `LgFooter`.
- **Feature:** `LgMetricCard`, `LgRoadmapTimeline`, `LgProgressRing`, `LgRecommendationBox`, `LgNotificationPanel`.

## 22. Design Rules

This dashboard must strictly follow the Aurora Blossom Design System v1.0.0. No custom overrides:

1.  **No Custom Colors:** Renders only standard theme tokens.
2.  **No Custom Spacing:** Spacings must use defined tokens (`xs` to `7xl`).
3.  **No Custom Typography:** Headlines must use Outfit. Body text must use Inter.
4.  **No Custom Buttons:** Always reuse the defined button matrix components (Primary, Secondary, Ghost, Danger).

---

## 23. Document Status

**Document:** 08.4 Dashboard UI Design

**Version:** 1.0.0

**Status:** Frozen

---

# Phase 08.5 — Assessment UI Design Specification

This specification defines the visual templates, questionnaire interfaces, coding displays, timers, feedback modules, layouts, responsive thresholds, accessibility parameters, and motion guidelines for the **LifeGuide AI Skill Profiler Assessment (`/dashboard/profiler`)**. All diagnostic interface implementations must strictly follow this blueprint.

---

## 1. Assessment Overview

- **Purpose:** Introduce the assessment context, duration, and baseline criteria prior to starting the diagnostic test.
- **User Goal:** Review baseline rules and constraints and initialize the diagnostic loop.
- **Layout:** Centered card interface container (`640px` width constraint, padding `32px` [3xl]) floating over the canvas background with a top-right `Ambient Glow` radial gradient wash.
- **Components:**
  - _Typography:_ H2 Outfit title ("Track Skill Baseline Diagnostics"), Body Medium description.
  - _Overview Stats Grid:_ A 3-column stats panel styled with standard border outlines (`radius-lg` / 16px):
    1.  _Questions:_ "10 Questions" (Icon: HelpCircle).
    2.  _Duration:_ "15 Minutes Limit" (Icon: Clock).
    3.  _Focus Area:_ "Dynamic Core Topics" (Icon: Compass).
- **Form Fields:** None.
- **Validation Rules:** None.
- **Buttons:**
  - `[ Begin Diagnostic Assessment ]`: Primary Large Button (Warm Dawn Gradient, height `44px`, `width: 100%`).
- **Responsive Behaviour:** Mobile viewport scales the stats grid columns to a 1-column stack and collapses margins.
- **Animations:** Slide-in from bottom on page entry (`translateY(20px)` to `0`, opacity `0` to `1` over `400ms` using `transition-slow`).
- **Accessibility:** Alt descriptions on stats grid icons. Target focus starts immediately on the begin button.
- **Edge Cases:** Diagnostics retake: If user has a saved baseline, display a Warning alert banner stating that completing this retake overrides current roadmap milestones.

## 2. Assessment Instructions

- **Purpose:** Detail diagnostic rules (closed book, time bounds, skipping logic) to prepare the user.
- **User Goal:** Understand questionnaire scoring behaviors and navigation rules.
- **Layout:** Vertical bulleted text stack positioned inside the Assessment Overview card directly above the start trigger. Spacing vertical gap is `12px` (md).
- **Components:**
  - _Instruction Items List:_ Clean typography bullet nodes (Body Small, color text secondary).
  - _Tab Closure Alert Banner:_ A Warning semantic info panel reading: "Closing this tab or navigating away resets active assessment data."
- **Form Fields:** None.
- **Validation Rules:** None.
- **Buttons:** None.
- **Responsive Behaviour:** Banner scaling collapses boundaries to fit mobile card widths.
- **Animations:** Instructions list expands vertically using slide disclosure sweeps (`transition-normal` / 250ms).
- **Accessibility:** Instructions are parsed sequentially inside reader layouts, utilizing visible paragraph separators.
- **Edge Cases:** None.

## 3. Question Layout

- **Purpose:** Display the active diagnostic question text prompt and response inputs.
- **User Goal:** Focus and choose the correct answer to save step state.
- **Layout:** Single centered card container (`640px` width) housing a top index, center prompt text box, vertical response stack, and bottom actions dock.
- **Components:**
  - _Header Bar:_ Displays active index ("Question X of 10", Caption text-secondary) inline with Timer badge.
  - _Active Question Card:_ Surface background, padding `24px` (lg), rounded corners `radius-xl` (24px), subtle border outline. Title uses Outfit H3 (Medium weight).
- **Form Fields:** Dynamic input components based on question types (Multiple Choice vs. Coding snippets).
- **Validation Rules:** Input is checked; the user must select or type a response to activate the validation Next step.
- **Buttons:** Action bar dock at card base:
  - `[ Next Question ]`: Primary Button, disabled state if active input validation is unmet.
  - `[ Previous Question ]`: Secondary Outline Button (allows backing up, disabled on question 1).
- **Responsive Behaviour:** Input layouts adapt width to fit screens. Button group wraps vertically on mobile viewports.
- **Animations:** Moving steps applies a slide page swipe transition (`250ms` duration, Out-Expo Bezier curves).
- **Accessibility:** Keyboard tab order moves from header indices -> question text -> inputs grid -> action buttons.
- **Edge Cases:** Long text prompts: Card auto-wraps and enables a subtle scroll layout to prevent layout overflow bounds.

## 4. Multiple Choice Questions

- **Purpose:** Render single-select conceptual question options.
- **User Goal:** Review choices and select exactly one response option.
- **Layout:** Vertical column stack of selector panels, gap `12px` (md) margins.
- **Components:**
  - _Choice Option Selectors:_ Interactive card boxes (`radius-md` / 12px, subtle border, subtle shadow). Left edge features radio circular vectors.
- **Form Fields:** Single-select radio list buttons.
- **Validation Rules:** Selected value counts must equal exactly 1.
- **Selected Option Styling:** Background transitions to elevated surface color, border changes to strong primary purple (`color-light-primary` / `color-dark-primary`), and check indicators populate.
- **Buttons:** Inline radio card blocks.
- **Responsive Behaviour:** Mobile centers text and enlarges item paddings to provide touch-safe clickable blocks.
- **Animations:** Click states scale slightly down (`0.98` scale) for tactile press confirmation.
- **Accessibility:** Mapped inside `role="radiogroup"` containers. Selector elements pass `aria-checked="true/false"`.
- **Edge Cases:** Click adjustments: layout permits switching selections freely until the step is submitted.

## 5. Coding Challenge Questions

- **Purpose:** Present visual code syntax debugging or output predictions.
- **User Goal:** Predicatively check code syntax and select matching compiler outputs.
- **Layout:** Split vertical stack inside the question card:
  - _Top Section:_ Monospace Code Block panel displaying mock script snippets.
  - _Bottom Section:_ Multiple-choice vertical list options stack.
- **Components:** monospaced code display container (`LgCodeView`, using Courier New font family, `13px` sizing, `1.5` line-height). Backing uses support lavender opacity `0.05` backdrop wash, with a strong border block. Monospace keywords are syntax-highlighted using the Warm Dawn Gradient.
- **Form Fields:** Standard Multiple-Choice selector option cards.
- **Validation Rules:** User must select exactly 1 output choice.
- **Buttons:** Option selector cards.
- **Responsive Behaviour:** Code block lines wrap dynamically on small mobile devices to prevent horizontal overflows.
- **Animations:** Snippet loads with standard entry fade-in (`transition-fast` / 150ms).
- **Accessibility:** Monospace code blocks are wrapped in semantic tags (`<code>`) with descriptive fallback tags read out to screen readers.
- **Edge Cases:** Script snippet requires scroll boundaries: container allows vertical scroll and overlays indicator arrows.

## 6. Progress Indicator

- **Purpose:** Inform the user of diagnostic completion rates.
- **Layout:** Anchored at the top card boundary, spanning the card header width.
- **Components:**
  - _Track Bar:_ Horizontal track, height `6px`, background: `color-light-border` / `color-dark-border`.
  - _Fill Bar:_ Active fill line styled with the **Warm Dawn Gradient**. Width increases dynamically: `width: (current_question_index / total_questions) * 100%`.
- **Responsive Behaviour:** Fill track adapts size dynamically. Label text is compressed on mobile viewports.

## 7. Timer

- **Purpose:** Display time limits on diagnostics.
- **Layout:** Centered in the top-right corner of the Question card, floating inline with the index counter.
- **Components:** Pill shape badge (`radius-full`), Clock outline icon, text countdown: `MM:SS`.
- **Visual Logic Rules:**
  - _Standard:_ System default badge styling.
  - _Warning State:_ Once remaining time drops below `60s`, background transitions to semantic Danger red background and text turns white.
- **Animations:** Active countdown pulses slowly once the warning boundary triggers.

## 8. Navigation (Previous / Next)

- **Purpose:** Navigate forwards and backwards through the active diagnostic timeline.
- **Layout:** Horizontal footer actions bar, aligned inline at the bottom of the Question card.
- **Buttons:**
  - `[ Previous ]`: Ghost style button (`LgButtonGhost`, 36px height). Disabled on Question 1.
  - `[ Next ]`: Primary Large Button (Warm Dawn Gradient, 44px height). Disabled until a response is selected.
- **Responsive Behaviour:** Buttons scale width to 100% block stack on mobile.
- **Animations:** Active triggers transition states using fast timing (`transition-fast` / 150ms).
- **Accessibility:** Elements support keyboard tab order. Explicit skip navigations details.

## 9. Skip Rules

- **Purpose:** Prevent users from locking or guessing, avoiding inaccurate career roadmaps.
- **User Goal:** Skip questions when uncertain.
- **Layout:** A small text link anchored at the bottom actions bar inline, styled with `color-light-text-muted` / `color-dark-text-muted`.
- **Rules:**
  - Clicking `[ Skip Question ]` bypasses answer validation.
  - Skipped questions are logged as "Unanswered" (Novice baseline) to feed the AI gap analyzer.
  - Skip does not penalize overall diagnostics limits.

## 10. Submit Flow

- **Purpose:** Complete diagnostics check and process profile analytics.
- **User Goal:** Submit answers and compile results.
- **Layout:** Popup overlay modal window.
- **Components:** Modal panel wrapper (`540px` max-width), backdrop blur filter (`8px`).
  - _Content:_ "Submit Diagnostic Answers?" title (H3 Outfit), overview count of answers completed vs skipped.
- **Buttons:**
  - `[ Confirm & Submit ]`: Primary Large Button (Warm Dawn Gradient). Triggers data compilation.
  - `[ Review Answers ]`: Secondary Outline Button. Closes modal.
- **Responsive Behaviour:** Standard modal scale down on mobile viewports.
- **Animations:** Modal entry uses elastic spring animations (`transition-slow` / 400ms).

## 11. Assessment Result Screen

- **Purpose:** Present the user's calculated skill baseline.
- **User Goal:** Check overall score indices and navigate to the dashboard.
- **Layout:** 12-column responsive layout grid canvas.
  - _Left Column (6-columns):_ Dial progress chart displaying overall baseline diagnostic scores.
  - _Right Column (6-columns):_ Skill topic check grids and recommended path links.
- **Components:** Radial progress chart widget, skill outline tables, primary navigation button.
- **Buttons:**
  - `[ View Recommended Roadmap ]`: Primary Large Button (Warm Dawn Gradient, height `44px`).
  - `[ Return to Dashboard Overview ]`: Ghost Text link button.
- **Responsive Behaviour:** Left/Right columns wrap vertically to a 1-column stack on mobile viewports.
- **Animations:** Celebratory radial circle charts sweep values from 0 to target metrics over `800ms`.

## 12. Skill Breakdown

- **Purpose:** Detail computed competency levels across key sub-skills.
- **Layout:** Grid panel inside the results screen container, vertical spacing gap `16px` (lg).
- **Components:** Skill row card containers (`radius-lg` / 16px).
  - _Layout:_ Skill label text (Outfit H4) and horizontal fill track showing score levels (Novice, Intermediate, Advanced) styled using the **Sunset Peach Gradient** fill tracks.

## 13. Strength & Weakness Analysis

- **Purpose:** Provide categorization of correct vs incorrect answers to help the user identify focus areas.
- **Layout:** 2-column comparative row panels:
  - _Strengths Card (Left):_ Background `color-light-surface` / `color-dark-surface`, green outline check headers. Lists topics mastered.
  - _Weaknesses Card (Right):_ Background `color-light-surface` / `color-dark-surface`, orange outline warning headers. Lists identified skill gaps.
- **Components:** standard Card layouts (`radius-xl` / 24px, subtle border).

## 14. AI Feedback

- **Purpose:** Display generated narrative evaluations from the AI engine based on diagnostic results.
- **Aesthetic:** AI Co-Pilot Container styling rules (Warm Dawn Gradient border, interior ambient shadow: `inset 0 0 16px rgba(235, 126, 162, 0.04)` for light, `rgba(247, 168, 194, 0.08)` for dark).
- **Content:**
  - _Heading Flag:_ "AI CO-PILOT DIAGNOSTIC REPORT" (Secondary Pink, tracking `0.05em`, size 10px).
  - _Body text:_ "You demonstrated excellent React knowledge but showed gaps in Redux actions. We recommend starting with SQL Joins." (Body Medium).
- **Animations:** Shimmer loading sweep clears smoothly on active load completion.

## 15. Recommended Learning Path

- **Purpose:** Provide an entry point to the learning modules generated to resolve identified gaps.
- **Layout:** Highlight widget card inside results screen base.
- **Components:** Mini milestone roadmapTimeline panel showing target focuses: "Recommended Focus: Weeks 1-4 State Management & Redux". Action trigger: `[ View Roadmap ]` (Primary Mini Button, height `36px`).

## 16. Empty States

- **Trigger:** Profiler database has no records of diagnostic evaluations.
- **Visual Layout:** Centered layout panel inside main content, perfect vertical/horizontal alignment.
- **Components:** Compass outline graphic placeholder (180px height), Title "No Diagnostics logs", subtitle description: "You have not completed diagnostic assessments yet.", action: `[ Start Diagnostic Test ]` (Primary Large Button).

## 17. Error States

- **Trigger:** Network timeout, code check failures.
- **Layout:** Inline Alert banner frames styled in semantic Danger red. Input validation failure shakes choice selector blocks.

## 18. Loading States

- **Trigger:** Assessment answer submission, AI feedback compilation.
- **Layout:** Skeleton progress tracks, greyed out button overlays, circular loading spinner SVGs.

## 19. Responsive Behaviour

- **Desktop Layout (>= 1024px):** 12-column grid. Column gap: `32px` (3xl). Row gap: `24px` (2xl). Page margins: `32px` (3xl). Maximum container width bounded to `1360px` to prevent stretching.
- **Tablet Layout (640px to 1024px):**
  - Widgets and columns wrap from horizontal side-by-sides to vertical blocks (e.g. 12-columns grid columns fold into single column rows).
  - Page margins compress to `20px` (xl).
- **Mobile Layout (< 640px):**
  - All layouts collapse completely to 1-column stacks.
  - Page margins compress to `16px` (lg).
  - Buttons expand to full width block layouts to provide touch-friendly targets.
  - Code monospace block text wraps lines.

## 20. Accessibility

- **Screen Reader Semantics:** Navigation elements in `<nav>` wrappers. Buttons and links have explicit `aria-label` tags. Grid cards have readable headings.
- **Focus Rings:** Ring outline indicator matches:
  ```css
  outline: 2px solid rgba(99, 74, 186, 1); /* color-light-primary */
  outline-offset: 2px;
  ```
- **Contrast Check:** All typography colors pass WCAG AA (4.5:1 ratio for regular text, 3:1 for large text).
- **ARIA Live Regions:** Dynamic timer count updates announce warning status changes to screen readers.

## 21. Animations

- **Dashboard Entry Page Fade-in:** Elements fade in and translate up over `250ms` (`transition-normal` Out-Expo Bezier curves).
- **Active Node Pulse:** Opacity cycles from `0.4` to `0.8` using infinite `ease-in-out` curves over `1.8s` cycles.
- **Card Hover lifts:** Transformation: `translateY(-4px)` over `250ms` Out-Expo, shadow transitions from Subtle to Elevated.
- **Button Press Click Response:** Scales down button container to `0.98` over `150ms` (`transition-fast`).

## 22. Component List

- **Atomic:** `LgButtonPrimary`, `LgButtonSecondary`, `LgButtonGhost`, `LgBadge`, `LgInput`.
- **Layout:** `LgSidebar`, `LgTopNav`, `LgFooter`.
- **Feature:** `LgQuestionCard`, `LgCodeView`, `LgProgressTracker`, `LgSkillBreakdownGrid`.

## 23. Design Rules

This profiler must strictly follow the Aurora Blossom Design System v1.0.0. No custom overrides:

1.  **No Custom Colors:** Renders only standard theme tokens.
2.  **No Custom Spacing:** Spacings must use defined tokens (`xs` to `7xl`).
3.  **No Custom Typography:** Headlines must use Outfit. Body text must use Inter.
4.  **No Custom Buttons:** Always reuse the defined button matrix components (Primary, Secondary, Ghost, Danger).

---

# Phase 08.6 — Learning Roadmap UI Design Specification

This specification defines the visual templates, interactive layouts, timeline controls, calendar modules, gamification components, search filters, responsive behaviors, accessibility parameters, and animation guidelines for the **LifeGuide AI Career Learning Roadmap (`/dashboard/roadmap`)**. All roadmap interfaces must strictly follow this document.

---

# Purpose

The Learning Roadmap maps out a user's customized step-by-step career training modules. It must:

1. **Render complex paths clearly:** Breakdown extensive tracks (Frontend, Backend, PM) into sequential milestones.
2. **Support adaptive study schedules:** Adjust learning density and timeline lengths dynamically based on logged weekly availabilities.
3. **Curate free educational resources:** Integrate external documentation, code sandbox playgrounds, and video resource frames cleanly.
4. **Drive engagement via gamification:** Maintain study motivation through XP levels, streaks, calendar completions, and milestones badge rewards.

---

# User Goal

Users visiting the Learning Roadmap portal should be able to:

- Review their overall track progress percentage and milestone achievements.
- Access active weekly plans, daily tasks list checklists, and specific lessons.
- Interact with video players, documentation panels, and custom quiz frames.
- Configure weekly goal allocations, save study notes, and bookmark favorite resources.
- Retain progress offline and resume learning from their furthest checked milestone.

---

# Roadmap Architecture

## 1. Roadmap Dashboard

- **Layout:** A 12-column responsive layout grid canvas inside the scrollable content canvas. Left 8 columns are allocated to the Learning Timeline and Topic detail panels. Right 4 columns house progress metrics, streak badges, achievements progress, and calendar widgets.
- **Margins:** Horizontal page margin padding is `32px` (3xl). Row gap is `24px` (2xl).
- **Canvas Backing:** Main canvas utilizes the `color-light-canvas` / `color-dark-canvas` tokens.

## 2. Learning Timeline

- **Visual Structure:** A vertical navigation line running down the Left Column of the dashboard.
- **Stroke parameters:** A solid vector path `3px` wide. Completed segments (under completed milestones) are filled with the **Warm Dawn Gradient**. In-progress segments are styled with solid primary purple (`color-light-primary` / `color-dark-primary`). Locked segments are rendered using `color-light-support` / `color-dark-support` at `0.3` opacity.
- **Timeline Nodes:** Circular milestone badges positioned along the vertical line. Completed nodes display checkmarks; active nodes display outline pulsing rings; locked nodes display padlock vectors.

## 3. Weekly Learning Plan

- **Purpose:** Display the active week block and schedule parameters.
- **Layout:** Horizontal panel widget positioned at the top of the timeline layout area (`radius-xl` / 24px, subtle border, subtle shadow).
- **Content:** Title "Week 3 of 12: Advanced React State" (Outfit H3). Subtitle "Estimated study time: 12 hours • 5 core topics to resolve" (Body Small, text-secondary). Displays a linear progress bar reflecting tasks completion within the active week.

## 4. Daily Learning Tasks

- **Purpose:** Checkbox list detailing specific tasks mapped for the current day.
- **Layout:** Standard card container (`radius-lg` / 16px, padding `16px`).
- **List Items:** Flex row checkboxes stacked vertically, gap `8px` (sm). Renders a custom checkable circular box (`radius-full`, 20px size) inline with the task text (Body Small). Completed tasks apply strikethrough styling and transition text to muted colors.

## 5. Learning Milestones

- **Aesthetic:** Large decorative timeline node badges (`48px` diameter circles).
- **Tiers:**
  - _Completed Milestone:_ Background styled with the Warm Dawn Gradient, white checkmark vector in center.
  - _Active Milestone:_ Transparent background, outline ring styled with Sunset Peach Gradient. Center displays active category icon.
  - _Locked Milestone:_ Background surface, outlined in strong border token. Center displays locked pad icon (0.3 opacity).

## 6. Topic Cards

- **Purpose:** Act as the core container for individual lesson content.
- **Visual Structure:** Standard card layout (`radius-xl` / 24px, subtle border, subtle shadow, padding 24px).
- **Header:** Topic title (Outfit H4) and tag badge indicating core competency checked (e.g. "State Management").
- **Workspace Area:** Dropdown disclosure arrow in header triggers card expansion to reveal internal Resource Cards, practice quizzes, and notes panels.

## 7. Learning Resource Cards

- **Purpose:** Sub-cards inside Topic Cards containing specific external learning items.
- **Aesthetic:** Card layout, padding `16px`, `radius-md` (12px), background: elevated surface token, outline light border.
- **Layout:** Left-aligned link icon, center title (Body Small, weight 500) inline with duration badge (e.g., "15 Min Read", "20 Min Video"). Right edge shows bookmark indicators.

## 8. Video Resource UI

- **Aesthetic:** An embedded overlay player component centered on the screen, or nested inside the resource area.
- **Ratio:** standard `16:9` video wrapper. Corners rounded to `radius-lg` (16px).
- **Controls Overlay:** Bottom controls dock (play/pause triggers, progress timeline bar, volume settings, caption toggles). Play button is a circle styled with the **Sunset Peach Gradient** hovering centered over the inactive canvas thumbnail.

## 9. Documentation Resource UI

- **Purpose:** Renders clean written text resources.
- **Layout:** Split-screen reading modal or slider drawer. Maximum reading content area width constraint of `720px` to prevent visual fatigue.
- **Typography:** Typography uses Inter (Body Medium, `16px`, line-height `1.6`, tracking `0em`). Color matches text-primary. Headings use Outfit (H3/H4 size standards).

## 10. Practice Exercise Cards

- **Aesthetic:** Quiz modules nested inside the Topic Card.
- **Structure:** Question prompt at top (H4 Outfit), followed by multiple-choice selector cards stack.
- **Verification:** Clicking `[ Check Answer ]` (Secondary button) triggers instant semantic feedback: border transforms to success green (correct) or danger red (incorrect) with inline text reasons.

## 11. Assignment Cards

- **Purpose:** Prompt users to execute hands-on challenges or code submissions.
- **Components:** Description prompt box, input file upload area (dashed border outline for code sheets submission), and submit actions triggers.

## 12. Project Milestones

- **Visuals:** Highlighted custom timeline badges featuring a Star vector icon. Styled with the Sunset Peach Gradient border glowing outlines.
- **Behavior:** Sits at the end of key learning stages (e.g., Week 4). Replaces standard lessons list with a prominent callout: "Milestone: Generate Custom Portfolio Project Brief" with primary action button routing straight to the Project Spec Generator.

## 13. Progress Tracking

- **Layout:** Anchored at the top boundary of the Dashboard, inline with track headers.
- **Components:** Horizontal tracking track (`6px` height) and progress fill styled with the **Warm Dawn Gradient** reflecting current completion percentage.

## 14. Completion Percentage

- **Aesthetic:** Large display text badge centered in the overview area.
- **Typography:** Outfit Display font (44px size, weight 600, letters tracking -0.02em). Colored using the **Warm Dawn Gradient** text clip.

## 15. XP / Level System

- **Purpose:** Gamified engagement reward metrics.
- **Behavior:** Completing milestones, finishing tasks, or uploading verified code prompts grants XP points (e.g., "+100 XP").
- **User Level Badge:** Displays active badge style (Active/Primary variant) in dashboard top header: "Level 4 - Apprentice Developer" inline with XP count status: `"4,200 / 5,000 XP"`.

## 16. Achievement Badges

- **Layout:** Horizontal gallery grid stacked inside the right column metric container.
- **Badges:** Small circular capsules (`36px` diameter) with duotone achievement icons (e.g., "7-Day Streak Master", "CSS Wizard", "First Project Submitted"). Active achievements colorize; locked achievements render greyed out with tooltips.

## 17. Study Streak Widget

- **Aesthetic:** Capsule badge container (`radius-full`, default surface, subtle shadow) placed in the top navigation stack.
- **Visuals:** Flame icon inline with WAU streak count: `"🔥 7 Days Active"`. Shows a progress ring detailing streak freeze safety margins.

## 18. Calendar Integration

- **Purpose:** Map learning tasks directly to specific dates.
- **Layout:** Dashboard calendar grid, 7 columns representing weekdays Mon-Sun, 4 rows representing active weeks. Completed study days display checklist icons in success semantic background colors.

## 19. Estimated Study Time

- **Aesthetic:** Sizing badge capsule styled with default/system badge rules.
- **Content:** Text reading: `"Est. Time Left: 14h"` (Caption typography, text-muted, left-aligned icon).

## 20. AI Recommendations

- **Aesthetic:** AI Co-Pilot Container styling rules (Warm Dawn Gradient border, interior ambient shadow: `inset 0 0 16px rgba(235, 126, 162, 0.04)` / `rgba(247, 168, 194, 0.08)`).
- **Content:** Uppercase tag "AI STUDY OPTIMIZATION" (Secondary Pink, size 10px). Displays: "You have completed CSS grids ahead of schedule. We recommend skipping basic responsive tags and proceeding directly to Flexbox." Action: `[ Recalibrate Path ]` (Primary Mini Button).

## 21. Learning Notes

- **Aesthetic:** Notepad panel nested inside Topic Cards.
- **Components:** monospaced text editor area (`LgInput` textarea, monospace font, default border). Auto-saves text draft inputs. Includes action `[ Export Notes ]` (Ghost button).

## 22. Bookmark Resources

- **Aesthetic:** Duotone outline bookmark vector icon button (`20px` size) floating in the top right corner of all Resource Cards.
- **Behavior:** Clicking toggles fill color to primary purple, adds the resource link to the "Bookmarked Resources" dashboard filter category, and pops up a confirmation toast.

## 23. Continue Learning CTA

- **Purpose:** Provide a single-click action to resume studies.
- **Placement:** Prominently floating in the bottom-right corner of the viewport, or anchored at the top of the Roadmap Home dashboard.
- **Aesthetic:** Pill button (`radius-full`), height `44px`, styled with the **Warm Dawn Gradient**, featuring text: `"Resume: React Hooks (Week 3)"`.

## 24. Completed Topics

- **Visuals:** Card container opacity fades slightly to `0.75` opacity. Titles are struck through, check badge (Success green) is visible in the header area, and resource lists compress.

## 25. Locked Topics

- **Visuals:** Card opacity is restricted to `0.3` opacity (support lavender token). A small padlock vector is centered. Mouse cursor changes to forbidden, pointer-events are disabled, and elements are removed from tab focus.

## 26. Revision Mode

- **Purpose:** Allows users to review completed topics for quizzes without affecting roadmap milestones.
- **Visuals:** Card toggle switch in the dashboard filters bar: "Revision Mode: Active/Inactive" (Active/Primary Badge style). When active, timeline nodes allow clicking previously completed topic cards to open revision practice sheets.

## 27. Roadmap Filters

- **Aesthetic:** Segmented filter chips bar (`height: 32px`, gap `8px` sm) positioned above the timeline view.
- **Chips:** Show All, Current Week, Bookmarked, Completed, Revision. Selected chip matches primary purple token background.

## 28. Search

- **Aesthetic:** Text search field input container (`LgInput` structure, height `36px`).
- **Icon:** Search outline vector (left-aligned), close/clear indicator (right-aligned).
- **Behavior:** Filters topic timeline nodes matching title keywords dynamically as the user types.

## 29. Empty States

- **Trigger:** Filters search returns zero results, or no custom tracks generated.
- **Visuals:** Centered layout, outline map vector (height `180px`), title "No Roadmap Items", CTA trigger `[ Generate Roadmap ]` (Primary Large).

## 30. Error States

- **Visuals:** Alert banner containers styled in semantic Danger red. Inline widget failures show: "Failed sync roadmap timelines. Click to reload."

## 31. Loading States

- **Visuals:** Shimmer skeleton timeline pipes and circle nodes sweep light gradient opacities infinitely.

## 32. Edge Cases

- **Course Updates:** If the curriculum team updates a roadmap topic, push notifications to the user. Retain all user completed nodes and insert the updated topic inline without shifting active milestone indices.

## 33. Accessibility

- **Details:** Timeline nodes use standard `<nav>` semantic wrapper tags. Checklist items use aria-checkbox tags. Interactive timeline path lines pass screen reader skip anchors. Keyboard arrow keys navigate timeline step elements logically.

## 34. Responsive Behaviour

- **Desktop Layout (>= 1024px):** 12-column grid. Column gap: `32px` (3xl). Row gap: `24px` (2xl). Page margins: `32px` (3xl). Maximum container width bounded to `1360px` to prevent stretching.
- **Tablet Layout (640px to 1024px):**
  - Left/Right columns wrap vertically to a single-column stack.
  - Weekly plan and dashboard filters compress horizontally and allow swipe scroll.
  - Page margins compress to `20px` (xl).
- **Mobile Layout (< 640px):**
  - Timeline vertical line is hidden; milestones display as a simplified vertical stack of lesson cards.
  - All layouts collapse completely to 1-column stacks.
  - Page margins compress to `16px` (lg).
  - Buttons expand to full width block layouts to provide touch-friendly targets.

## 35. Motion & Animations

- **Milestone Unlock Celebration:** Particle circles in peach, lavender, and pink gradient tones drift outward from node centers over `600ms` when a milestone completes.
- **Page entry:** Step topic cards fade-in and slide up with Out-Expo curves over `400ms` (`transition-slow`).
- **Node Active Pulse:** Active milestone rings pulse scale `1.0` to `1.08` over `1.8s` cycles.

## 36. Components Used

- **Atomic:** `LgButtonPrimary`, `LgButtonSecondary`, `LgButtonGhost`, `LgBadge`, `LgInput`.
- **Layout:** `LgSidebar`, `LgTopNav`, `LgFooter`.
- **Feature:** `LgRoadmapTimeline`, `LgTopicCard`, `LgResourceRow`, `LgVideoEmbed`, `LgNotepadPanel`.

## 37. Design Rules

This roadmap must strictly follow the Aurora Blossom Design System v1.0.0. No custom overrides:

1.  **No Custom Colors:** Renders only standard theme tokens.
2.  **No Custom Spacing:** Spacings must use defined tokens (`xs` to `7xl`).
3.  **No Custom Typography:** Headlines must use Outfit. Body text must use Inter.
4.  **No Custom Shadows:** Only apply Subtle (Sm), Elevated (Md), or Floating (Lg) tokens.

---

# Advanced Roadmap Logics

### Adaptive Roadmap Logic

- **Hour adjustments:** Changing available hours (e.g. from 10 hrs/week to 20 hrs/week) dynamically compresses the timeline duration length (e.g., from a 12-week roadmap down to 6 weeks).
- **Density Recalibration:** Distributes milestones and resource cards across fewer weeks, increasing daily task counts automatically without deleting user completed nodes state history.

### AI Weekly Planner

- **Distribution:** Automatically splits required weekly resources across 7 weekday calendar blocks based on user availability parameters and preferred learning times.
- **Reschedule Rule:** If a user misses task checkboxes on Tuesday, the planner automatically shifts outstanding items to Wednesday's checklist on the next daily load.

### Dynamic Milestone Generation

- **Personalization:** The AI competency engine analyzes baseline diagnostics gaps and automatically generates target milestone checkpoints targeting those specific gaps (e.g., adding an extra Redux master node for users who failed state management questions).

### Progress Persistence

- **Sync Routine:** User checklist completions and notes updates are written instantly to LocalStorage. Periodic background API requests (`sync-interval: 30s` or on step complete) push validation updates to the database backend.

### Resume Learning

- **Entry Routing:** On portal load at `/dashboard/roadmap`, route navigation checks the furthest incomplete step node index and automatically launches the page scrolled to the active Topic Card container.

### Offline Sync Behaviour

- **Cache Queue:** If connection drops, allow users to check checkboxes and type notes. Actions are queued inside IndexDB.
- **Resolution:** Once connection status restores, flush the queue, execute background database write transactions, and display a sync success badge.

### Learning Reminder UI

- **Components:** Interactive settings module allowing users to toggle push reminders, select target reminder times, and edit calendar scheduling alerts.

### Weekly Goal Tracker

- **Aesthetic:** Centered radial hour counter badge in the right dashboard column. Displays progress metric: "12 / 15 hrs completed" with outline progress bars.

---

# Phase 08.7 — Project Generator UI Design Specification

This specification defines the visual templates, interactive layout models, task workflows, integration states, feedback dashboards, responsive thresholds, accessibility parameters, and motion guidelines for the **LifeGuide AI Portfolio Project Generator (`/dashboard/projects`)**. All project generator portals must strictly follow these rules.

---

# Purpose

The Project Generator solves the "portfolio gap" for aspiring career transitioners. It must:

1. **Analyze individual skill gaps:** Parse baseline diagnostics results and recommend projects that force users to practice areas of struggle.
2. **Translate theory to production:** Generate complete production-ready project briefs containing functional specifications, API parameters, database schemas, folder preview templates, and mock UI drafts.
3. **Automate feedback loops:** Integrate with GitHub and Live Demoing platforms to read submitted code scripts and provide immediate, automated AI code reviews.
4. **Evaluate portfolio readiness:** Quantify the production value of codebases, matching project complexity metrics directly against active target ATS guidelines.

---

# User Goal

Users visiting the Project Generator portal should be able to:

- Browse personalized AI-recommended portfolio projects filtered by target tracks.
- Review functional requirements, technical stacks, directory previews, and API specifications.
- Access an AI Mentor panel chatbot to debug implementation blockers.
- Connect their personal GitHub profile repositories and submit live deployment links.
- Review parsed automated AI feedback reports, skill gaps resolutions, and portfolio readiness percentages.

---

# Project Generator Flow

The portfolio generator flow follows the structured navigation progression outlined below:

```
[ Projects Dashboard ]  --> [ AI Recommendations Card ] --> [ Project Brief Screen ]
                                                                     |
[ AI mentor debug panel ] <-- [ GitHub integration Repo ] <-- [ Development Tasks list ]
                                         |
[ Project Review results ] <-- [ Submit Live Deployment ] <-- [ Code submission validation ]
```

## 1. Project Dashboard

- **Layout:** A 12-column responsive layout grid canvas inside the main content viewport.
- **Row Orchestrations:**
  - _Row 1:_ Highlighted AI Project Recommendation Hero Card (spans 12 columns).
  - _Row 2:_ Filters and search query bar (spans 12 columns).
  - _Row 3:_ Grid of Active and Suggested project cards (3-column layout grid).
- **Page Margins:** Page margin padding is `32px` (3xl). Row gap is `24px` (2xl).

## 2. AI Project Recommendation

- **Aesthetic:** Large dashboard hero container styled with the AI Co-Pilot Container tokens (Warm Dawn Gradient border outline, interior ambient shadow: `inset 0 0 24px rgba(235, 126, 162, 0.06)` / `rgba(247, 168, 194, 0.12)`).
- **Content Layout:** Left side displays Match Rating badge: `"🔥 98% Match"`, H2 Outfit Title ("Gap-Targeted: React Shopping Cart App"), and custom descriptions mapping state management gaps. Right side features a visual graphic of floating wireframe cards.
- **Actions:** `[ Generate Brief ]` (Primary Large button, height `44px`).

## 3. Project Difficulty Levels

- **Aesthetic:** Standard capsule badges (`LgBadge` / `radius-full`).
- **Levels:**
  - _Entry-Level:_ Border outline, text styled in primary purple. Represented as "Junior Tier • 8 hrs" (Icon: Seedling).
  - _Mid-Tier:_ Border outline, text styled with the Sunset Peach Gradient. Represented as "Intermediate • 16 hrs" (Icon: Compass).
  - _Advanced:_ Border outline, text styled with semantic Warning orange. Represented as "Production Ready • 32 hrs" (Icon: ShieldAlert).

## 4. Project Categories

- **Layout:** Inline segmented chips row.
- **Categories:** Full-Stack App, Frontend Clone, API Integration, UI/UX Redesign, CLI Tool. Clicking a chip filters the dashboard cards.

## 5. Project Details Screen

- **Purpose:** Serve as the unified workspace for an active project (`/dashboard/projects/[id]`).
- **Layout:** 2-column layout stack. Left 8-columns house project specifications split into tabs. Right 4-columns house the AI Mentor panel chatbot and submission panels.
- **Tab Switches:** Project Brief, Development Tasks, Submit Project.

## 6. Project Requirements

- **Purpose:** Provide high-level objectives and business logic constraints.
- **Layout:** Bulleted lists of clean text sections nested inside the Brief tab.
- **Components:** Title "Project Overview" (H3 Outfit), text copy block (Body Medium Inter).

## 7. Functional Requirements

- **Purpose:** Enumerate strict UI interactions and dynamic logic features.
- **Layout:** Task list showing detailed specifications.
- **Example Items:** "User must be able to add, edit, and remove cart items without reloading the page" (Checkbox styled task lines).

## 8. Technical Requirements

- **Purpose:** Enforce coding best practices, testing scopes, and build configurations.
- **Example Items:** "State must be managed globally using Redux. Must write unit tests verifying store state modifications with Jest. Coverage must exceed 80%."

## 9. Suggested Tech Stack

- **Aesthetic:** Horizontal chip row.
- **Chips:** Styled with elevated background surfaces, light border outlines, displaying core technology badges (e.g. React, Tailwind CSS, Jest, Redux Toolkit).

## 10. Folder Structure Preview

- **Aesthetic:** Code view display block (`LgCodeView`, padding `16px`, rounded `radius-lg` / 16px, background: `color-light-surface-elevated` / `color-dark-surface-elevated`).
- **Content:** Monospaced tree directories (Courier New font family, size `13px`, line-height `1.5`) showing:
  ```
  ├── src/
  │   ├── components/
  │   ├── store/
  │   │   └── index.js
  │   ├── App.jsx
  │   └── main.jsx
  ```

## 11. Database Preview

- **Purpose:** Provide entity-relationship models for database backends.
- **Layout:** Structured table schemas. Columns: Column Name, Data Type, Constraint, Description. Rounded corners and subtle grid borders apply.

## 12. API Preview

- **Purpose:** Outline mock API request/response paths.
- **Layout:** Code sandbox panel displaying endpoint parameters.
- **Content:** Endpoint route header: `"POST /api/v1/cart"`, followed by code blocks rendering request JSON payloads and expected response formats.

## 13. UI Preview Cards

- **Purpose:** Visual references of the completed interface layout.
- **Aesthetic:** Horizontal carousel containing wireframe mocks. Includes control arrows, click overlays to open lightbox preview overlays, and descriptions.

## 14. Feature Checklist

- **Aesthetic:** Grid task items list.
- **Components:** Checkbox list items. Green checks signify completed items (retrieved dynamically from parsed GitHub source files checkups).

## 15. Milestone Breakdown

- **Aesthetic:** Stepper workflow indicator block anchored at the top of the Details canvas.
- **Workflow Steps:**
  1. Setup Repository (Connect GitHub).
  2. Build Components.
  3. Global State Integration.
  4. Code Submission.
  5. AI Code Review.

## 16. Development Timeline

- **Purpose:** Visual estimation of time allocations per step.
- **Components:** Gantt-style horizontal timeline grid. Displays active week indicators and estimated hourly limits.

## 17. AI Mentor Panel

- **Purpose:** Interactive chat helper to debug development blocks.
- **Layout:** Sticky sidebar container (`320px` width) pinned to the right dashboard column.
- **Components:** Vertical scroll chat log, bottom input field (`LgInput`). Preset prompt suggestion buttons at chat base (e.g., "Explain how to structure Redux actions", "How to write Jest tests").
- **Aesthetic:** AI Co-Pilot glow containers styling.

## 18. Resource Recommendations

- **Aesthetic:** Row card list in sidebar base.
- **Content:** Curated links targeting specific tech stacks (e.g., "MDN Docs on Redux Toolkit", "React Testing Library Walkthroughs") with bookmarked tags.

## 19. Project Progress Tracking

- **Aesthetic:** Large scoring circle badge indicator centered in the submission tab details.
- **Content:** Dynamic percentage count "65% Tasks Completed" styled in Warm Dawn Gradient.

## 20. Task Checklist

- **Aesthetic:** List of developers tasks checklist blocks inline.
- **Behavior:** Checking off task items saves workspace progress dynamically.

## 21. Code Submission

- **Purpose:** Entry portal for validating and processing projects.
- **Layout:** Standard submission form panel.
- **Components:** Connect repo buttons, text link input files slots, validate submission CTA triggers.

## 22. GitHub Repository Integration UI

- **Aesthetic:** Connected Account state box (`radius-lg` / 16px, padding `16px`).
- **Disconnected:** Button: `[ Connect GitHub Repository ]` (Primary Outline badge, height `40px`, displaying Git branch vector icon). Launches popup auth confirmation dialog.
- **Connected:** Displays connected repo path string: `"github.com/username/react-cart-app"` with green connected check status indicator, branch select dropdown trigger, and button `[ Sync Now ]` (Secondary mini button).

## 23. Live Demo Submission UI

- **Aesthetic:** Input field layout block.
- **Components:** Text input box (`LgInput`, height `40px`) showing placeholder text "https://your-app.vercel.app". Includes button `[ Validate & Submit Live Demo ]` (Primary Button).

## 24. Project Review Screen

- **Purpose:** Central workspace detailing post-submission AI review audits.
- **Layout:** 2-column layout grid. Left column houses overall scores and code review highlights, right column displays skill gap mappings.
- **Status Badge:** "AI Audit Completed" (Active/Success badge style).

## 25. AI Feedback Report

- **Aesthetic:** AI Co-Pilot Container styling rules.
- **Report Blocks:**
  - _Code Cleanliness:_ Scoring metric block inline with code improvements suggestions text blocks.
  - _Security:_ Analysis highlighting outstanding database script vulnerabilities.
  - _Unit Tests:_ Check logs detailing unit tests code failures.

## 26. Skill Gap Mapping

- **Purpose:** Match completed code tasks directly to baseline gaps resolved.
- **Layout:** Grid panel displaying sub-skills tags. Completed components change tags status from "Outstanding Skill Gap" (orange warn badge) to "Competency Resolved" (Success green badge).

## 27. Portfolio Readiness Score

- **Aesthetic:** Giant radial circle progress meter displaying overall code score.
- **Percentage Value:** Outfit display font: `"Readiness: 88%"`. Filled with the Warm Dawn Gradient.
- **Copy:** Description sub-text: "High score matches mid-level Frontend requirements. Suitable for Resume inclusion."

## 28. Regenerate Project Flow

- **Purpose:** Allow users to request alternative projects if they dislike the generated brief.
- **Trigger:** Button: `[ Regenerate Project ]` (Ghost text style) located in header.
- **Logic:** Pops up modal prompt alerting user that regeneration resets current active workspace briefs. AI generates new matching scopes.

## 29. Save Project

- **Aesthetic:** Small bookmark icon button in header.
- **Behavior:** Saves active brief templates to "Saved Projects" dashboard sections.

## 30. Archive Project

- **Purpose:** Remove inactive or abandoned project briefs from active views.
- **Trigger:** Option link inside dropdown: `[ Archive Project ]` (Ghost Danger text style). Moves items to archivist dashboards.

## 31. Search & Filter

- **Aesthetic:** Combined chips segmented filter bar and input search bar.
- **Filters:** Search titles, filter stack tracks, sorting score limits.

## 32. Empty States

- **Trigger:** No active projects generated.
- **Aesthetic:** Centered graphic illustration of code files structure overlay (180px height), title "Zero Active Projects", button `[ Generate Gap-Targeted Project ]` (Primary Large).

## 33. Error States

- **Visuals:** semantic Danger red banner flags at top of canvas during Git sync or API compiler failures.

## 34. Loading States

- **Visuals:** Loading shimmers cover database and tree directories frames. Circular rotating animations run on submissions compiler validation checks.

## 35. Edge Cases

- **Git Sync Timeouts:** In the event of Git server delays, cache local verification requests and auto-retry sync cycles in background. Show badge status: `"Sync Pending"`.

## 36. Accessibility

- **Details:** Code folder structures support standard arrow screen navigation. Submit URL inputs use matching label semantic elements. Modals lock focus ranges. All actions support `Tab` navigation.

## 37. Responsive Behaviour

- **Desktop Layout (>= 1024px):** 12-column grid. Column gap: `32px` (3xl). Row gap: `24px` (2xl). Page margins: `32px` (3xl). Maximum container width bounded to `1360px` to prevent stretching.
- **Tablet Layout (640px to 1024px):**
  - Detail layouts (spec tabs) and AI chat sidebar wrap to vertical blocks layout.
  - Code file preview maps expand width.
  - Page margins compress to `20px` (xl).
- **Mobile Layout (< 640px):**
  - All layouts collapse completely to 1-column stacks.
  - Gantt charts compress and allow horizontal swiping.
  - Buttons expand to full width block layouts to provide touch-friendly targets.
  - Code structures scale fonts to `12px` to prevent overflows.

## 38. Motion & Animations

- **Entry animations:** Brief specifications fade-in and slide up over `350ms` (transition normal Out-Expo).
- **Submit loader:** Submission processing scales rings in infinite rotating configurations.
- **AI chat transition:** Mentor chat response bubbles fade in and translate left horizontally over `200ms`.

## 39. Components Used

- **Atomic:** `LgButtonPrimary`, `LgButtonSecondary`, `LgButtonGhost`, `LgBadge`, `LgInput`.
- **Layout:** `LgSidebar`, `LgTopNav`, `LgFooter`.
- **Feature:** `LgCodeView`, `LgProjectBrief`, `LgProgressTracker`, `LgMentorChat`.

## 40. Design Rules

This generator must strictly follow the Aurora Blossom Design System v1.0.0. No custom overrides:

1.  **No Custom Colors:** Renders only standard theme tokens.
2.  **No Custom Spacing:** Spacings must use defined tokens (`xs` to `7xl`).
3.  **No Custom Typography:** Headlines must use Outfit. Body text must use Inter.
4.  **No Custom Buttons:** Always reuse the defined button matrix components (Primary, Secondary, Ghost, Danger).

---

# Advanced Generator Logics

### AI Project Generation Logic

- **Parsing Input:** LLM parses active diagnostic metrics. Identifies core gaps (e.g. CSS Grid layout failures) and queries database templates to select optimal gaps exercises.
- **Brief Compilation:** Automatically generates requirements, APIs, folder structures, database tables, and checklist specs matching target difficulty parameters.

### Project Personalization Rules

- **User Preferences:** Adjusts project topics (e.g. E-Commerce, FinTech, SaaS) to match interest settings captured during onboarding.
- **Hour adjustments:** Density rules adjust complexity (e.g., shorter scopes with fewer functional items for users with lower weekly hourly availability).

### Dynamic Difficulty Scaling

- **Scaling:** As users complete projects and resolve skills gaps, new suggestions scale difficulty levels automatically (e.g. from Junior frontend cloning tasks to advanced production-ready integrations).

### Resume Compatibility

- **ATS keywords:** Projects incorporate target keywords identified in job descriptions matching candidate profiles. AI feedback reports suggest specific ATS phrases to write into resumes detailing this project.

### Portfolio Scoring Logic

- **Scoring Algorithms:** Code cleanliness metrics, directory compliance checks, unit tests pass ratios, and security assessments map to a single value score (0-100%). Scores exceeding 80% mark briefs as "ATS Ready".

### GitHub Sync Behaviour

- **Automatic Webhooks:** Syncing repository triggers build-verifiers on commit. Sync actions parse directory lists to match files templates, checks code syntax parameters, and checks unit tests reports automatically.

### Offline Behaviour

- **Log Storage:** Offline draft code notes and task checkboxes logs are written inside LocalStorage structures and IndexDB grids. Updates push on internet reconnection sweeps.

### Auto Save

- **Draft saving:** AI chat dialogs, note contents, and check tasks logs auto-save draft context immediately on form element defocus.

### Progress Persistence

- **Cloud Synchronizers:** Background sync routines (`sync-interval: 30s`) serialize state metadata models and push payloads to API servers, displaying a "Progress Synced" badge in footer rows.

---

# Phase 08.8 — ATS Resume UI Design Specification

This specification defines the visual templates, interactive upload zones, parsing indicators, editing panels, keyword density badges, AI rewrite helpers, responsive thresholds, accessibility parameters, and motion guidelines for the **LifeGuide AI ATS Resume Parser & Optimizer (`/dashboard/resume`)**. All resume workspace pages must strictly follow these rules.

---

# Purpose

The ATS Resume module helps career transitioners bypass automated tracking filters. It must:

1. **Automate resume parsing:** Read uploaded PDF and DOCX files, extract structural sections, and highlight missing blocks.
2. **Deconstruct ATS scores:** Quantify document quality, checking formatting schemas, parsing structures, and keyword density.
3. **Optimize against job targets:** Map candidates' resumes directly against specific job listings, detailing match percentages, keyword coverages, and optimization checklists.
4. **Co-pilot rewriting:** Integrate localized AI bullet point generators and rewrite helpers to replace weak phrases with metrics-driven action lines.

---

# User Goal

Users visiting the Resume Optimizer portal should be able to:

- Upload resumes via drag-and-drop file containers.
- Review parsed sections (Experience, Skills, Projects) and verify input entries.
- Examine scoring metrics, missing keyword lists, and structural warnings.
- Paste target job descriptions and analyze specific matching rates.
- Generate AI-enhanced bullet points containing action verbs and impact metrics.
- Export updated resumes in PDF, DOCX, or JSON formats, and manage version history.

---

# Resume Module Flow

The resume optimization process follows the chronological user navigation mapping below:

```
[ Resume Dashboard ] --> [ Drag & Drop PDF upload ] --> [ Parser Processing Loader ]
                                                                 |
[ AI rewrite panel ] <-- [ Resume vs Job Match ]  <-- [ Parsed Editor Preview ]
        |
[ PDF/DOCX Export ]  --> [ Version History Panel ] --> [ Public Share Toggle ]
```

## 1. Resume Dashboard

- **Layout:** A 12-column responsive layout grid canvas inside the main content canvas.
- **Row Orchestrations:**
  - _Row 1:_ Current Resume Profile Summary Card (6-columns left) paired with Job Description Upload Card (6-columns right).
  - _Row 2:_ ATS Score Dashboard & Keyword Analysis (12-column grid).
  - _Row 3:_ Parsed Resume Section Editor (spans 12 columns).
- **Margins:** Horizontal page margin padding is `32px` (3xl). Row gap is `24px` (2xl).

## 2. Resume Upload Screen

- **Aesthetic:** Centered card interface modal (`540px` width constraint, padding `24px`), backdrop blur filter (`8px`).
- **Typography:** H3 Outfit Title ("Upload Your Resume"), Body Small description.
- **Close Control:** Hover-active ghost button (X vector icon) in top right corner.

## 3. Drag & Drop Upload

- **Visual Structure:** A large rectangular file drag area container nested inside the upload screen (`height: 220px`, rounded `radius-xl` / 24px, default surface backing).
- **Dashed Border Outline:** Strong border configured as a dashed pattern outline. Hovering files over the drop area transitions the border to a solid fill styled with the Warm Dawn Gradient.
- **Internal Graphic:** Centered duotone file upload SVG vector (`48px` size), followed by text: "Drag and drop your resume PDF here, or select browse files" (Body Small, weight 500) and capsule size constraint badge: "PDF or DOCX under 5MB" (Default Badge style).

## 4. Resume Parser Processing

- **Aesthetic:** Overlay progress card modal overlay during active text extraction.
- **Components:**
  - _Progress Ring:_ Centered circular percentage ring (`100px` outer diameter, 6px stroke) showing dynamic load states (0-100%). Inside ring text displays current loading steps.
  - _Checklist Status Loader:_ Vertical text stack showing processing benchmarks:
    1. Reading file stream... (Check success).
    2. Extracting text blocks... (Check success).
    3. Identifying section structures... (Active loading shimmer).
    4. Compiling keyword analyses... (Locked greyed out).

## 5. Parsed Resume Preview

- **Layout:** Split workspace. Left side displays a vertical scrollable formatted text template representation of the resume layout. Right side displays the floating ATS Score sidebar panel.
- **Section anchors:** Clicking outline items in the sidebar highlights and scrolls the preview canvas to the corresponding section form card instantly.

## 6. Resume Sections

- **Aesthetic:** A series of vertically stacked Accordion panels (`radius-lg` / 16px, subtle border, subtle shadow, gap `12px` md).
- **Behavior:** Clicking accordion headers (Outfit H4, weight 600) expands card details displaying editable input text fields.

## 7. Personal Information

- **Form Fields:** Input grids (`LgInput`, height `40px`). Fields: Full Name, Professional Title, Email, Phone Number, Portfolio URL, GitHub Link, LinkedIn Link.
- **Validation Rules:** Standard format checks on email strings and absolute web URLs.

## 8. Experience Section

- **Layout:** Chronological entries cards stack.
- **Fields:** Company Name, Role Title, Start Date, End Date, Location, and bullet text areas.
- **UI Details:** Bullet rows feature an inline `[ Rewrite with AI ]` ghost button hover action widget at their right edge.

## 9. Education Section

- **Fields:** School/University Name, Degree Type, Field of Study, Graduation Year, GPA (optional).

## 10. Skills Section

- **Layout:** Inline chips row stack.
- **Interactive Toggles:** Input field allows typing text tags and pressing Enter to add custom skill chips. Each chip displays a small close action button (`x` vector) to delete keywords.

## 11. Projects Section

- **Fields:** Project Title, Role, Core Tech Stack tags, Live Link, GitHub Repo Link, Description bullet areas.

## 12. Certifications Section

- **Fields:** Certification Name, Issuing Organization, Date, Verification ID URL.

## 13. Missing Sections Detection

- **Visual Warning Banner:** An alert banner styled with Warning semantic colors injected at the top of the editor: "Warning: Education section undetected. Adding education details raises score compatibility by +10%." Includes a button: `[ Add Education Section ]`.

## 14. ATS Score Dashboard

- **Layout:** Circular gauge indicator container styled inside the metric row card (`radius-xl` / 24px, subtle shadow).
- **Visual Score:** Radial dial indicator (`140px` diameter, Sunset Peach Gradient fill track) displaying numerical index `"78/100"`.
- **Summary Copy:** "ATS Grade: Good. 3 critical issues detected." (Body Medium).

## 15. ATS Score Breakdown

- **Components:** 3 horizontal bar tracks detailed underneath the radial dial:
  1.  _Formatting:_ "85% Score" (Success green track).
  2.  _Structural Integrity:_ "90% Score" (Success green track).
  3.  _Keyword Density:_ "60% Score" (Warning orange track).

## 16. Keyword Analysis

- **Aesthetic:** Side-by-side keyword metrics chip grids inside the analyzer card.
- **Found Keywords:** Chips styled with default/system backing, displaying green checkmark icons (e.g. "React", "CSS Grid", "REST API").

## 17. Missing Keywords

- **Aesthetic:** Chips styled with Warning orange borders and background washes (e.g. "TypeScript", "Next.js", "Unit Testing", "Jest").
- **Hover Actions:** Hovering over a missing keyword chip pops up a tooltip detailing how and where to insert the keyword inside experience bullets.

## 18. Resume Improvement Suggestions

- **Layout:** Vertical bullet list of alert rows separated by md borders.
- **Items:**
  - "Action Verb Failure: Bullet 1 in React Role uses 'worked on'. Replace with 'spearheaded'."
  - "Metrics Deficiency: Project 1 description lacks numerical achievements metrics. Add data metrics (e.g., 'speed boosted by 20%')."

## 19. AI Resume Rewrite Panel

- **Layout:** Drawer widget slide panel (`360px` width) positioned on the right edge of the workspace canvas.
- **Components:**
  - _Input Field:_ Original sentence textarea box.
  - _Presets:_ Select boxes targeting specific tone goals (e.g. "Add metrics metrics", "Make active verb strong").
  - _Output Box:_ AI generated results textarea text box, with action button `[ Replace in Resume ]` (Primary Mini).

## 20. AI Bullet Point Generator

- **Purpose:** Localized generator to write metrics-driven experience lines.
- **Components:** Input text box asking: "What did you build?" (e.g., "I made a search bar"). AI returns: `"Engineered an optimized search bar query module, reducing database response times by 30%."` click `[ Apply bullet ]` updates the textarea directly.

## 21. Job Description Upload

- **Aesthetic:** Dash-border copy container cards.
- **Components:** Textarea input slot (`LgInput` structure, height `160px`) asking user to paste the target job description. Clicking `[ Run ATS Comparison ]` (Primary Large Button) initiates matching analytics.

## 22. Resume vs Job Match

- **Layout:** Horizontal results grid widget placed at the top of the comparison canvas.
- **Aesthetic:** Standard card container (`radius-xl` / 24px, subtle shadow).

## 23. ATS Match Percentage

- **Aesthetic:** Large gauge indicator dial inside the Match card displays percentage metrics: `"84% Match Rating"` styled using the **Warm Dawn Gradient** text clip.

## 24. Keyword Coverage

- **Aesthetic:** Progress slider bar styled with Sunset Peach Gradient fill, representing match ratios (e.g., "12 of 18 keywords matched").

## 25. Resume Optimization Checklist

- **Aesthetic:** Task list showing detailed modifications needed to hit 95%+ match ratings (e.g., "Add TypeScript chip to skills", "Include Jest coverage metrics in Project 1").

## 26. Download Resume

- **Aesthetic:** Action button pill styled with primary color.
- **Buttons:** `[ Download Resume ]` (Primary Large Button, height `44px`).

## 27. Version History

- **Layout:** Sticky side panel tracking historical resume updates.
- **Timeline Nodes:**
  - _v1.2 (Active):_ "Frontend Resume - React Targeted" (Date timestamp, status active).
  - _v1.1:_ "General Fullstack Resume" (Date timestamp, click actions: Restore, Export, Delete).

## 28. Resume Templates

- **Layout:** Horizontal template card list overlay.
- **Templates:** Simple Clean, Modern Tech, Executive. Users click template thumbnails to switch visual designs.

## 29. Export Formats

- **Layout:** Segmented pill toggles grid selection: `[ PDF ]`, `[ DOCX ]`, `[ JSON ]`. Selected export target applies primary purple highlight backings.

## 30. Resume Sharing

- **Aesthetic:** Integrated link copy widget panel.
- **Components:** Disabled input field text box showing public link address, inline button `[ Copy Link ]` (Secondary mini style), and toggle button switch ("Public Access: Enabled/Disabled").

## 31. Empty States

- **Trigger:** No resume uploaded to the account yet.
- **Visual Layout:** Centered graphic illustration of file uploads outline vectors (180px height), H3 title "No Resume Uploaded", descriptive sub-text: "Upload your resume PDF to analyze ATS scores and map skill gaps.", action button: `[ Upload Resume ]` (Primary Large).

## 32. Error States

- **Trigger:** Upload formatting mismatch (e.g. uploading image file instead of PDF), network parse timeouts.
- **Aesthetic:** Alert banners styled in Danger red. File upload card borders transition to semantic red outlines.

## 33. Loading States

- **Visuals:** Loading shimmers run on resume preview blocks. Parser loader modal displays.

## 34. Edge Cases

- **Encrypted PDFs:** If PDF is password protected, parsing fails. Popup validation alert asks user to upload decrypted resumes.

## 35. Accessibility

- **Details:** Input forms use matched semantic `<label>` elements. Upload drop areas are accessible via standard keyboard triggers. Focus rings outline elements. Screen readers announce parser load percentages polite alerts.

## 36. Responsive Behaviour

- **Desktop Layout (>= 1024px):** 12-column grid. Column gap: `32px` (3xl). Row gap: `24px` (2xl). Page margins: `32px` (3xl). Maximum container width bounded to `1360px` to prevent stretching.
- **Tablet Layout (640px to 1024px):**
  - Left preview canvas and right ATS metrics sidebar wrap to vertical blocks layout.
  - Accordion panels expand to fit width.
  - Page margins compress to `20px` (xl).
- **Mobile Layout (< 640px):**
  - All layouts collapse completely to 1-column stacks.
  - Toolbar and version panels compress to bottom sheet menus.
  - Page margins compress to `16px` (lg).
  - Buttons expand to full width block layouts to provide touch-friendly targets.

## 37. Motion & Animations

- **Upload drop hover glow:** Dashed borders animate stroke-dashoffset transitions over `400ms` infinite cycle during active file hovers.
- **Rewrite drawer slide:** Rewrite panel drawer translates horizontally from the right over `250ms` Out-Expo.
- **Metric gauge fill:** Dial value circles sweep values dynamically on first results load.

## 38. Components Used

- **Atomic:** `LgButtonPrimary`, `LgButtonSecondary`, `LgButtonGhost`, `LgBadge`, `LgInput`.
- **Layout:** `LgSidebar`, `LgTopNav`, `LgFooter`.
- **Feature:** `LgResumeUploadDropzone`, `LgParsedResumeEditor`, `LgAtsScoreWidget`, `LgAtsKeywordAnalysis`, `LgAtsRewritePanel`.

## 39. Design Rules

This optimizer must strictly follow the Aurora Blossom Design System v1.0.0. No custom overrides:

1.  **No Custom Colors:** Renders only standard theme tokens.
2.  **No Custom Spacing:** Spacings must use defined tokens (`xs` to `7xl`).
3.  **No Custom Typography:** Headlines must use Outfit. Body text must use Inter.
4.  **No Custom Buttons:** Always reuse the defined button matrix components (Primary, Secondary, Ghost, Danger).

---

# Advanced Resume Logics

### Resume Parsing Logic

- **Parsing Steps:** Backend text extractors read PDF structural streams, parse semantic tags (headers, lists), identify sections matching headers tags keywords (e.g. "Work Experience", "Professional History"), and dump parsed categories into JSON records.

### ATS Scoring Logic

- **Algorithms:** Overall score is calculated as a weighted average: Formatting Validation (20%), Section Completeness (30%), Keyword Density (50%). Formatting checks flags nested multi-column layouts, graphics, tables, or unreadable fonts that block standard ATS readers.

### Keyword Matching Logic

- **Matching Rules:** Compares words found inside resume text blocks against target lists extracted from job descriptions. Scoring is computed as matching ratios: `matched_keywords / total_required_keywords * 100%`. Mismatches account for pluralizations and structural synonyms.

### AI Rewrite Logic

- **Generation Rules:** Contextual LLM prompts inject weak bullet statements and return bullet points rewritten with strong action verbs (e.g., Spearheaded, Engineered, Optimized) and placeholder metric variables (e.g., "[X]% improvement").

### Resume Versioning

- **Persistence Rules:** Saving modifications creates incremental document versions in DB records. Restoring a version updates resume preview states, resets forms data fields, and triggers recalculation of ATS grades.

### Resume Privacy

- **Access Rules:** Resumes are private by default. Activating public share links generates signed access keys. Revoking share links deletes the key and routes visitor requests to 404 views.

### Auto Save

- **Save Triggers:** Inputs data, text modifications, and checkbox toggles auto-save draft states to DB records immediately on focus defocus triggers (`blur` event handler listeners).

### Cloud Sync

- **Sync Routine:** Sync queries send serialized JSON records to API backends, displaying status checks badges: `"All Changes Synced"`.

### Offline Behaviour

- **Persistence:** Text modifications are cached locally inside IndexDB buffers if connection drops. Sync queues execute automatically once connectivity returns.

---

# Phase 08.9 — Interview UI Design Specification

This specification defines the visual templates, interactive pre-flight checks, whiteboard tools, code compiler editors, score progress dials, evaluation dashboards, responsive thresholds, accessibility parameters, and motion guidelines for the **LifeGuide AI Mock Interview Simulator (`/dashboard/interviews`)**. All simulation modules must strictly follow these rules.

---

# Purpose

The Mock Interview Simulator prepares candidates for rigorous technical and cultural evaluations. It must:

1. **Model realistic interviews:** Simulate distinct modes (Coding challenges, System Design whiteboards, Technical, Behavioral, and HR loops).
2. **Automate coding audits:** Embed functional web compilers executing code scripts and validating testing suites.
3. **Capture multi-dimensional performance:** Evaluate user inputs, scoring syntax, communication clarity, problem-solving, and confidence.
4. **Deliver structured feedback:** Provide granular report diagnostics, highlighting improvement templates and localized growth roadmaps.

---

# User Goal

Users visiting the Mock Interview portal should be able to:

- Schedule mock interview slots and configure track parameters.
- Run pre-flight checks (microphone, camera, console configurations).
- Complete coding challenges and whiteboard design drafts.
- Answer STAR-based behavioral questions and technical prompts.
- Review parsed score breakdowns, AI suggestions, and tailored improvement plans.
- Retake interviews and track evaluation history logs.

---

# Interview Module Flow

The interview process follows the chronological user navigation mapping below:

```
[ Dashboard Scheduling ] --> [ Type & Track Config ] --> [ Pre-flight Prep Screen ]
                                                                 |
[ AI feedback report ]   <-- [ AI Processing Loader ] <-- [ Simulator Workspace ]
        |
[ Review history logs ]  --> [ Improvement roadmap ]  --> [ Retake Simulation ]
```

## 1. Interview Dashboard

- **Layout:** A 12-column responsive grid canvas inside the main content canvas viewport.
- **Row Orchestrations:**
  - _Row 1:_ Highlighted Interview Scheduler and active mock slots (spans 12 columns).
  - _Row 2:_ Gallery grid of AI Interview Type Selection Cards (2-column layout grid).
  - _Row 3:_ Dynamic Evaluation History logs table (spans 12 columns).
- **Page Margins:** Page margin padding is `32px` (3xl). Row gap is `24px` (2xl).

## 2. Interview Types

- **Aesthetic:** Card layout row display (`radius-xl` / 24px, subtle border).
- **Selections:** Technical, Behavioral, HR, System Design, Coding challenges. Each type displays target timeframes (e.g. "30 Min Limit") and active track filters.

## 3. AI Interview Selection

- **Aesthetic:** Highlighted hero card styled with the AI Co-Pilot Container tokens (Warm Dawn Gradient border, interior ambient shadow: `inset 0 0 24px rgba(235, 126, 162, 0.06)` / `rgba(247, 168, 194, 0.12)`).
- **Content:** Dynamic selection based on career tracks: "AI Recommended: React Hooks & State Management Simulator". Includes action: `[ Start Prep ]` (Primary Large).

## 4. Technical Interview

- **Purpose:** Evaluate target engineering concepts.
- **Layout:** Centered card interface, displaying question prompt at top (H3 Outfit) and input textarea for structural answers. Includes microphone push-to-talk toggle controls.

## 5. Behavioral Interview

- **Purpose:** Screen situational experiences matching STAR frameworks (Situation, Task, Action, Result).
- **Layout:** Prompt-based questionnaire. Displays timer countdown alongside situational queries.

## 6. HR Interview

- **Purpose:** Measure cultural fits and career goal consistency.
- **Layout:** Simple clean questionnaire canvas. Spacings use defined tokens.

## 7. System Design Interview

- **Purpose:** Measure software architectural planning competencies.
- **Layout:** 2-column workspace split: Left 8-columns house the Whiteboard tool board canvas. Right 4-columns house system requirements specs and user notes editor.

## 8. Coding Interview

- **Purpose:** Evaluate active coding capabilities.
- **Layout:** 2-column workspace split: Left 6-columns house the Code Editor input framework. Right 6-columns display question definitions, testing checks logs, and compiler run triggers.

## 9. Interview Instructions

- **Purpose:** Outline rules prior to launch (browser locking rules, mic configurations).
- **Components:** Scrollable bullet list, and tab change warning alert banner.

## 10. Preparation Screen

- **Purpose:** Interactive pre-flight diagnostic workspace.
- **Components:**
  - _Camera preview box:_ Sizing `320px` width container (`radius-lg` / 16px, background: `color-light-canvas` / `color-dark-canvas`). Displays green indicator if webcam feed is read.
  - _Mic test slider:_ Sound volume level meter styled with the Sunset Peach Gradient filling horizontal tracks on active audio test.
  - _Trigger:_ `[ Enter Simulator ]` (Primary Large Button, height `44px`).

## 11. Question Screen

- **Aesthetic:** Distraction-free full-screen workspace overlay (`z-index: 99`).
- **Header:** Displays current step index ("Question 2 of 5"), timer capsule badge, and button `[ Exit Simulator ]` (Danger outline mini).

## 12. Question Categories

- **Layout:** Label badges displaying topic categorization: e.g. "React Lifecycle", "Database Normalization", "System Scaling".

## 13. Code Editor UI

- **Aesthetic:** Monospaced compiler editor panel (`LgCodeView`, Courier New, size `13px`, background: `color-dark-surface` for both modes). Left margin displays line numbers in muted gray.
- **Terminal Output Console:** Nested collapsible console block at compiler base. Clicking `[ Run Code ]` outputs syntax tests evaluations inside console log.

## 14. Whiteboard UI

- **Aesthetic:** Vector grid board canvas (`background: #ffffff`, subtle grey dot patterns).
- **Tools Bar:** Floating vertical action deck anchored along the left whiteboard edge (Select cursor, Pen drawing tool, shapes library, text nodes, clear board).

## 15. Timer Behaviour

- **Aesthetic:** Pill capsule badge in header.
- **Rules:** Time decrement occurs every second. Drops under `2 Min` trigger the warning outline (semantic Danger red background and white text). If timer hits zero, auto-saves active question draft data and routes to the next page.

## 16. Skip Question Flow

- **Trigger:** Link button: `[ Skip Question ]` (Ghost text) at base action bar.
- **Rules:** Prompts warning modal alerting user that skipping logs this question as "0 Score" in problem-solving categories.

## 17. Answer Submission

- **Trigger:** Button: `[ Submit Answer ]` (Primary Large, Warm Dawn Gradient). Updates step logs and triggers next slide loads.

## 18. AI Processing Screen

- **Aesthetic:** Processing loader modal page overlay.
- **Components:** Rotating circular indicators, text loading changes: "Analyzing answer scripts...", "Generating communication grades...", "Compiling copilot optimization report...".

## 19. Interview Feedback Dashboard

- **Purpose:** Summarize mock simulation outcomes (`/dashboard/interviews/[id]/results`).
- **Layout:** 12-column responsive layout grid. Left column houses score dials, right column details category reports.

## 20. Overall Interview Score

- **Aesthetic:** Large circular gauge indicator dial filled with the Sunset Peach Gradient track.
- **Score:** Large Outfit display: `"Grade: 82% (Excellent)"`.

## 21. Communication Score

- **Aesthetic:** Horizontal metrics track bar charts, mapping articulation, tone, and pacing (e.g. "Communication Grade: 85%").

## 22. Technical Score

- **Aesthetic:** Metric progress tracks mapping syntax correctness and framework selections (e.g. "Technical Grade: 80%").

## 23. Problem Solving Score

- **Aesthetic:** Metric progress tracks measuring algorithm efficiency and logical approaches (e.g. "Problem Solving Grade: 84%").

## 24. Confidence Score

- **Aesthetic:** Progress tracks measuring pacing steadiness, eye contact cues, and pause gaps (e.g. "Confidence Grade: 78%").

## 25. AI Suggestions

- **Aesthetic:** AI Co-Pilot Container styling rules.
- **Content:** Diagnostic alerts log detailing specific changes: "Your React coding was optimal, but your behavioral responses lacked STAR metrics. Include quantitative KPIs (e.g., 'boosting efficiency by 15%')."

## 26. Improvement Plan

- **Purpose:** Curate specific study topics mapping to simulation gap results.
- **Layout:** Milestone checklist card leading user back to specific roadmap lesson cards.

## 27. Interview History

- **Layout:** Data Table list mapping past evaluations logs: Date, Simulation Type, Score, Status, Actions (`[ Review ]`).

## 28. Retake Interview

- **Aesthetic:** Header action button.
- **Behavior:** Button: `[ Retake Simulation ]` (Secondary Outline) launches fresh simulator instance resetting answer buffers.

## 29. Mock Interview Schedule

- **Aesthetic:** Horizontal calendar scheduling cards stack.
- **Components:** Date/Time picker inputs slot, track focus select dropdown lists, and button: `[ Schedule Simulation Slot ]`.

## 30. Interview Reports

- **Aesthetic:** PDF export links.
- **Components:** Button: `[ Export Evaluation PDF ]` (Primary mini).

## 31. Empty States

- **Aesthetic:** Center illustration of mic/cam vectors (180px height), title "No Simulations Logged", action button: `[ Schedule First Mock Interview ]` (Primary Large).

## 32. Error States

- **Visuals:** Injected Danger red alert banners on mic/cam diagnostic failures.

## 33. Loading States

- **Visuals:** Skeletons run on code preview and whiteboard panes during simulator loads.

## 34. Edge Cases

- **Cam/Mic permissions blocked:** If browser alerts report permissions blocked, simulator locks workspace launch, displays warning guidance overlays, and links browser troubleshoot settings.

## 35. Accessibility

- **Details:** Compiler and whiteboard components support keyboard escape exits. Input textareas use semantic labels. Timers announce state changes.

## 36. Responsive Behaviour

- **Desktop Layout (>= 1024px):** 12-column grid. Column gap: `32px` (3xl). Row gap: `24px` (2xl). Page margins: `32px` (3xl). Maximum container width bounded to `1360px` to prevent stretching.
- **Tablet Layout (640px to 1024px):**
  - Split-screen workspaces (Code, Whiteboard) shift from side-by-side splits to full-width vertically stacked sections.
  - Pre-flight camera boxes shrink.
  - Page margins compress to `20px` (xl).
- **Mobile Layout (< 640px):**
  - All layouts collapse completely to 1-column stacks.
  - Coding editor hides side tests panels and links compilation triggers to overlay tab buttons.
  - Page margins compress to `16px` (lg).
  - Buttons expand to full width block layouts to provide touch-friendly targets.

## 37. Motion & Animations

- **Timer warnings pulse:** Opacity shifts from `0.3` to `1.0` dynamically once warnings trigger.
- **Slider level meters:** Mic audio input levels animate smooth spring translations on sound spikes.
- **Processing loader:** AI analysis icons rotate continuously during processing stages.

## 38. Components Used

- **Atomic:** `LgButtonPrimary`, `LgButtonSecondary`, `LgButtonGhost`, `LgBadge`, `LgInput`.
- **Layout:** `LgSidebar`, `LgTopNav`, `LgFooter`.
- **Feature:** `LgInterviewPrep`, `LgCodeEditorWorkspace`, `LgWhiteboardCanvas`, `LgInterviewScoreDashboard`.

## 39. Design Rules

This simulator must strictly follow the Aurora Blossom Design System v1.0.0. No custom overrides:

1.  **No Custom Colors:** Renders only standard theme tokens.
2.  **No Custom Spacing:** Spacings must use defined tokens (`xs` to `7xl`).
3.  **No Custom Typography:** Headlines must use Outfit. Body text must use Inter.
4.  **No Custom Shadows:** Only apply Subtle (Sm), Elevated (Md), or Floating (Lg) tokens.

---

# Advanced Simulator Logics

### AI Interview Engine

- **Generation Rules:** Contextual LLM engines parse active track details and diagnostic histories. Automatically selects 5 tailored technical and behavioral prompts targeting unresolved competencies.

### Adaptive Question Difficulty

- **Scaling Logic:** Answering technical questions correctly scales difficulty upward dynamically (e.g. moving from simple CSS inheritance questions to complex reactivity closures logic). Answering incorrectly scales prompt complexities back.

### Real-Time Feedback Rules

- **Tracking Logs:** Analyzes keystrokes cadence, writing speeds, and speech pausing frequencies. Feedback summaries compilation starts immediately on question transition logs.

### Scoring Logic

- **Weighted Computations:** Score totals computed dynamically: Technical accuracy (40%), Communication clarity (30%), Problem Solving approach (20%), Confidence metrics (10%).

### Interview Persistence

- **Data Saving:** Active answer draft text and whiteboard graphics sync to LocalStorage arrays instantly on input modifications triggers.

### Session Recovery

- **Handshake Checks:** If connection drops or browser crashes mid-simulator, checking navigation rules loads outstanding steps state data from LocalStorage buffers and restores simulator states.

### Auto Save

- **Save Triggers:** Whiteboard drawing lines and text changes auto-save draft states to cache databases automatically on input defocus.

### Offline Behaviour

- **Data Persistence:** If simulator works offline, answers are cached in IndexDB. Pushes outstanding queries to cloud servers once internet connection returns.

---

# Document Status

Version: 1.0.0
Status: Ready for Frontend
Next Document: Phase 09 — Database Design Specification
