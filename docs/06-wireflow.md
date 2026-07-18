# Wireflows: LifeGuide AI (MVP Version 1)

**Project Name:** LifeGuide AI – Career & Learning Copilot  
**Author:** Senior UX Designer & Principal Product Designer  
**Document Status:** Approved (MVP Wireflow Design)  
**File Path:** `docs/06-wireflow.md`

---

This document defines the low-fidelity wireflows for the Minimum Viable Product (MVP - Version 1) of LifeGuide AI. It details the structural layout, content block order, and interactive flows for the nine core user-facing modules.

> [!IMPORTANT]
> **Strict Version 1 Scope Constraints:**
>
> - Excludes all Version 2 features (Resume Matcher, ATS Score, Mock Interview Simulator, Recruiter Dashboard).
> - Contains no visual UI styles, colors, typography, database designs, API schemas, folder structure, or source code.
> - Focuses entirely on low-fidelity screen structure, interface modules, and step-by-step navigation flows.

---

## Global Navigation Systems

For authenticated views, navigation is unified around a persistent **Protected Navbar** and a collapsible **Dashboard Sidebar**.

### 1. Persistent Protected Navbar (Top)

```
+-----------------------------------------------------------------------------------------+
| [=] Menu  |  Dashboard / [Current Page Name]          [ Search... (Ctrl+K) ]  [Q]  [Avatar] |
+-----------------------------------------------------------------------------------------+
```

- **Sidebar Toggle (`[=]`):** Expands or collapses the left-hand navigation sidebar.
- **Breadcrumb Navigation:** Displays user location hierarchy (e.g., `Dashboard / Skill Profiler`).
- **Global Search Scope Input:** Interactive search bar for jumping directly to roadmap topics or milestones.
- **Notifications Menu Icon (`[Q]`):** Trigger for looking at completed diagnostics or new roadmap generations.
- **User Profile Avatar Dropdown:** User context control displaying target career track, link to settings, and log out triggers.

### 2. Collapsible Dashboard Sidebar Navigation (Left)

```
+--------------------------+
|  LifeGuide AI [Logo]     |
+--------------------------+
|  [🏠] Dashboard Home     |
|                          |
|  LEARNING & ASSESSMENTS  |
|  [📊] Skill Profiler     |
|  [🗺️] Learning Roadmap   |
|                          |
|  PRACTICAL VALIDATION    |
|  [🛠️] Custom Projects    |
|                          |
|  ----------------------- |
|  [⚙️] Settings           |
+--------------------------+
```

- **Dashboard Home:** `/dashboard`
- **Skill Profiler:** `/dashboard/profiler`
- **Learning Roadmap:** `/dashboard/roadmap`
- **Custom Projects:** `/dashboard/projects`
- **Settings:** `/dashboard/settings` (aligned to the bottom margin)

---

## Wireflow Index and Flow Topology

```mermaid
stateDiagram-v2
    [*] --> Landing_Page : Visitors land on /
    Landing_Page --> Auth_Portal : Click "Start Free Assessment" / "Sign In"
    Auth_Portal --> Onboarding_Wizard : Google/GitHub SSO Callback (New User)
    Auth_Portal --> Dashboard_Home : Google/GitHub SSO Callback (Returning User)

    Onboarding_Wizard --> Skill_Profiler : Form Completion & Invite Trigger

    state Dashboard_Home {
        [*] --> Overview
        Overview --> Skill_Profiler : Go to Profiler Card
        Overview --> Learning_Roadmap : Next Milestone Card / Go to Roadmap
        Overview --> Project_Specs : Go to Projects Card
        Overview --> Account_Settings : Avatar Menu -> Settings
    }

    state Skill_Profiler {
        [*] --> View_Skill_Matrix
        View_Skill_Matrix --> Diagnostic_Assessment : Click "Start/Retake Assessment"
        Diagnostic_Assessment --> View_Skill_Matrix : Submit & Re-evaluate Skills
        Diagnostic_Assessment --> Learning_Roadmap : Automatic First Generation
    }

    state Learning_Roadmap {
        [*] --> View_Weekly_Timeline
        View_Weekly_Timeline --> Progress_System : Toggle Milestone Checkbox
        View_Weekly_Timeline --> Adjust_Hours_Modal : Click "Adjust Schedule"
        Adjust_Hours_Modal --> View_Weekly_Timeline : Save Hours (Recalibrates Roadmap Length)
    }

    state Project_Specs {
        [*] --> View_Project_Board
        View_Project_Board --> Request_Brief_Generation : Click "Generate Custom Brief"
        Request_Brief_Generation --> View_Project_Board : AI Streams Project Spec
        View_Project_Board --> Progress_System : Click "Mark Project Completed"
    }

    state Progress_System {
        [*] --> Calculate_Metrics
        Calculate_Metrics --> Dashboard_Home : Updates Streak & Track Completion %
    }

    state Account_Settings {
        [*] --> View_Configuration
        View_Configuration --> Onboarding_Wizard : Reset Profile Data
        View_Configuration --> Landing_Page : Delete Account (Permanently)
        View_Configuration --> Dashboard_Home : Save Career Track Prefs
    }

    Account_Settings --> Landing_Page : Logout Action
```

---

## Detailed Wireflow Screens

### 1. Landing Page (`/`)

#### Wireframe Schematic

```
+-----------------------------------------------------------------------------------------+
| [Logo] LifeGuide AI                    [Tracks]  [About]                   [ Sign In ]  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|                        Bridge the Gap Between Learning & Careers                        |
|             Assess your skill gaps, generate custom roadmaps, and build                 |
|                   industry-ready portfolio projects with AI guidance.                    |
|                                                                                         |
|                                [ Start Free Assessment ]                                |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  Select Your Career Track:                                                              |
|  +---------------------------+ +---------------------------+ +------------------------+ |
|  | Frontend Engineering      | | Backend Engineering       | | Product Management     | |
|  | * HTML, CSS, React, Redux | | * Node.js, Databases, APIs| | * Strategy, UX, Metrics| |
|  | [ Select Track & Start ]  | | [ Select Track & Start ]  | | [ Select Track & Start]| |
|  +---------------------------+ +---------------------------+ +------------------------+ |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  How It Works (Feature Preview):                                                        |
|  1. Baseline Profiler        -->  2. Weekly AI Roadmap       -->  3. Custom Projects    |
|  Take a 5-10 question             Get structured goals            Build unique briefs   |
|  track diagnostic test            aligned to target hours         designed for skill gaps|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  Ready to start your journey?                                                           |
|  [ Get Started for Free ]                                                               |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
| LifeGuide AI © 2026                 Privacy Policy                       Terms of Service|
+-----------------------------------------------------------------------------------------+
```

1. **Purpose:** Introduce the platform value proposition, outline the three initial career tracks, and funnel visitors to sign-up.
2. **Sections (Top → Bottom):**
   - **Public Header/Navbar:** Logo, anchors linking to supported tracks and features, and "Sign In" CTA.
   - **Hero Component:** High-impact value proposition statement, brief platform description, and primary CTA.
   - **MVP Track Matrix:** Interactive card-based panel detailing the three launch disciplines (Frontend Engineering, Backend Engineering, Product Management).
   - **Feature Preview Walkthrough:** Horizontal structural steps demonstrating the core user journey (Profiling → Custom Roadmap → Gap-focused Projects).
   - **Re-engagement Sign-Up Banner:** Simple header message with an secondary conversion CTA button.
   - **Public Footer:** Trademark notice and legal links ([Privacy Policy](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/04-information-architecture.md#L67-L70) and [Terms of Service](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/04-information-architecture.md#L67-L70)).
3. **Primary CTA:** `[ Start Free Assessment ]` / `[ Get Started for Free ]` (both redirect to `/auth`).
4. **Secondary Actions:**
   - `[ Sign In ]` in header (redirects to `/auth`).
   - `[ Select Track & Start ]` card button triggers selection state and redirects to `/auth`.
5. **Entry Point:** Direct visitor traffic (external reference or URL entry).
6. **Exit Point:** Redirect to Authentication Portal (`/auth`).

---

### 2. Authentication Portal (`/auth`)

#### Wireframe Schematic

```
+-----------------------------------------------------------------------------------------+
| [Logo] LifeGuide AI                                                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|                                  +-------------------+                                  |
|                                  |   Create Account  |                                  |
|                                  |     or Sign In    |                                  |
|                                  |                   |                                  |
|                                  | [ Continue with G ] |                                |
|                                  | [ Continue with GH] |                                |
|                                  |                   |                                  |
|                                  |  By continuing,   |                                  |
|                                  |  you agree to the |                                  |
|                                  |  Terms & Privacy  |                                  |
|                                  +-------------------+                                  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

1. **Purpose:** Single, unified entry portal providing secure authentication and registration.
2. **Sections (Top → Bottom):**
   - **Simple Branding Header:** Minimal logo block to reduce user distraction.
   - **SSO Control Panel:** High-contrast buttons containing Google OAuth and GitHub OAuth launch triggers.
   - **Compliance/Consent Text:** Inline legal consent statement linking to Privacy Policy and Terms of Service.
3. **Primary CTA:**
   - `[ Continue with G ]` (Initiates Google OAuth sequence).
   - `[ Continue with GH ]` (Initiates GitHub OAuth sequence).
4. **Secondary Actions:**
   - Legal links within the consent notice (opens policy pages in new tab).
5. **Entry Point:**
   - Clicked "Start Free Assessment", "Get Started", or "Sign In" on Landing Page (`/`).
6. **Exit Point:**
   - Redirect to Onboarding Wizard (`/onboarding`) on successful first-time registration.
   - Redirect to Dashboard Overview (`/dashboard`) on successful returning login.
   - Back button redirection to Landing Page (`/`).

---

### 3. Onboarding Wizard (`/onboarding`)

#### Wireframe Schematic

```
+-----------------------------------------------------------------------------------------+
| [Logo] LifeGuide AI                                                      [ Step 1 of 4 ]|
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  Build Your Core Career Profile:                                                        |
|                                                                                         |
|  1. Select Your Target Track (Choose One):                                              |
|     (o) Frontend Engineering                                                            |
|     ( ) Backend Engineering                                                             |
|     ( ) Product Management                                                              |
|                                                                                         |
|  2. Set Your Weekly Commitment:                                                         |
|     [====================o======================================] 15 Hours / Week     |
|     (Slider: 1 to 40 Hours)                                                             |
|                                                                                         |
|  3. Share Your Goals & Background:                                                      |
|     +-----------------------------------------------------------------------------+     |
|     | Target role details, specific focus goals, or text-based work history...     |     |
|     +-----------------------------------------------------------------------------+     |
|                                                                                         |
|  4. Diagnostic Evaluation Invitation:                                                   |
|     You will start with a 5-10 question baseline skill profiling assessment.             |
|                                                                                         |
|                              [ Complete & Start Assessment ]                            |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

1. **Purpose:** Capture target track preferences, study commitment hours, and goals to build the user profile before assessment.
2. **Sections (Top → Bottom):**
   - **Wizard Header:** Brand logo and linear multi-step progress status indicator.
   - **Track Selector Control:** Radio button group showing the three MVP career track choices.
   - **Commitment Configuration:** Range slider interface allowing selection from 1 to 40 hours per week, with live visual feedback of selected numeric value.
   - **Background Data Input:** Text area block enabling entry of target career goals, prior experience, or objective parameters.
   - **Diagnostic CTA Card:** Section detailing what the diagnostic assessment involves, framing expectations.
3. **Primary CTA:** `[ Complete & Start Assessment ]` (Saves onboarding preferences, configures profile, and initiates diagnostic).
4. **Secondary Actions:**
   - Adjust slider value.
   - Toggle track selection radio buttons.
5. **Entry Point:** Successful authentication callback for newly registered users.
6. **Exit Point:** Redirect to the Skill Profiler view (`/dashboard/profiler`) with the diagnostic test active.

---

### 4. Dashboard Overview (`/dashboard`)

#### Wireframe Schematic

```
+-----------------------------------------------------------------------------------------+
| [=] Dashboard / Overview                [ Search roadmap, files... (Ctrl+K) ] [Q] [Avatar]|
+-----------------------------------------------------------------------------------------+
|  (Sidebar) |                                                                            |
|  [🏠] Home  |  Current Track: Frontend Engineering                 Streak: 5 Days 🔥     |
|            |  Track Completion Progress: 35%                                            |
|  [📊] Prof. |  [===============|----------------------------------------------------]   |
|            |                                                                            |
|  [🗺️] Road. |  +---------------------------------------------------------------------+  |
|            |  | NEXT ROADMAP MILESTONE DUE                                          |  |
|  [🛠️] Proj. |  | Week 3: State Management & Redux Toolkit                            |  |
|            |  | Focus: Connect component state to standard global store structures. |  |
|  ----------|  | Resource: [Official Redux Quickstart] (External Link)                |  |
|  [⚙️] Sett. |  |                   [ Go to Roadmap ]      [ Mark Milestone Complete ] |  |
|            |  +---------------------------------------------------------------------+  |
|            |                                                                            |
|            |  Core Features Launchpad:                                                  |
|            |  +------------------------------+ +--------------------------------------+  |
|            |  | [📊] Skill Profiler          | | [🗺️] Learning Roadmap               |  |
|            |  | View baseline matrices &     | | Browse schedule, links, and study    |  |
|            |  | retake diagnostic tests.     | | milestones.                          |  |
|            |  | [ Go to Profiler ]           | | [ Go to Roadmap ]                    |  |
|            |  +------------------------------+ +--------------------------------------+  |
|            |  | [🛠️] Custom Project Specs    | |                                      |  |
|            |  | Generate portfolio projects  | |                                      |  |
|            |  | designed for your gaps.      | |                                      |  |
|            |  | [ Go to Project Board ]      | |                                      |  |
|            |  +------------------------------+ +--------------------------------------+  |
+------------+----------------------------------------------------------------------------+
```

1. **Purpose:** Serve as the core central hub providing immediate status awareness and links to all primary feature components.
2. **Sections (Top → Bottom):**
   - **Protected Header/Navbar:** Global controls, breadcrumbs, search input, and profile dropdown menu.
   - **Dynamic Metrics Row:** Clear stats showing current active track name, learning streak counter, and visual roadmap completion progress bar.
   - **Primary Target Goal Panel:** Actionable card highlighting the user's immediate next milestone, associated external study resources, and quick progress update buttons.
   - **Feature Launch Grid:** Card components providing clean pathways to Skill Profiler, Learning Roadmap, and Custom Projects.
3. **Primary CTA:** `[ Mark Milestone Complete ]` inside the Target Goal card (directly triggers progress increment and updates metrics).
4. **Secondary Actions:**
   - `[ Go to Roadmap ]` on the Next Milestone card.
   - `[ Go to Profiler ]` inside launch grid.
   - `[ Go to Roadmap ]` inside launch grid.
   - `[ Go to Project Board ]` inside launch grid.
   - Sidebar navigation links.
5. **Entry Point:** Authenticated landing redirect, Onboarding bypass, or sidebar menu links.
6. **Exit Point:** Navigating to specific modules, settings, or trigger log out from the user menu.

---

### 5. Skill Assessment (`/dashboard/profiler`)

#### Wireframe Schematic (Default State)

```
+-----------------------------------------------------------------------------------------+
| [=] Dashboard / Skill Profiler            [ Search... ]                       [Q] [Avatar]|
+-----------------------------------------------------------------------------------------+
|  (Sidebar) |                                                                            |
|  [🏠] Home  |  ACTIVE DIAGNOSTIC PREVIEW                                                 |
|            |  Track: Frontend Engineering                                               |
|  [📊] Prof. |  Status: Baseline Established (July 15, 2026)                             |
|            |  [ Retake Diagnostics Assessment ]                                         |
|  [🗺️] Road. |                                                                            |
|            |  ------------------------------------------------------------------------  |
|  [🛠️] Proj. |                                                                            |
|            |  VISUAL SKILL MATRIX                                                       |
|  ----------|  +----------------------------------------------------------------------+  |
|  [⚙️] Sett. |  | Sub-Skill Area                | Competency Rating                   |  |
|            |  +-------------------------------+-------------------------------------+  |
|            |  | State Management (Redux/Flux) | [======|-------] (Intermediate)     |  |
|            |  | Responsive Layouts (CSS Grid)  | [===|---------] (Novice)              |  |
|            |  | SPA Routing & Component Lifecycle| [==========|--] (Advanced)            |  |
|            |  +-------------------------------+-------------------------------------+  |
|            |                                                                            |
+------------+----------------------------------------------------------------------------+
```

#### Wireframe Schematic (Active Assessment Overlay Modal)

```
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|             +-------------------------------------------------------------+             |
|             | QUESTION 3 OF 8                                         [X] |             |
|             |                                                             |             |
|             | In React, what is the primary purpose of the useMemo hook?  |             |
|             |                                                             |             |
|             | ( ) A. To perform side effects after rendering components.  |             |
|             | (o) B. To cache the computed result of an expensive function|             |
|             | ( ) C. To create reference objects that persist over renders|             |
|             | ( ) D. To register context variables in DOM trees.          |             |
|             |                                                             |             |
|             |                                        [ Next Question ]    |             |
|             +-------------------------------------------------------------+             |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

1. **Purpose:** Evaluate the user's specific skill level and display baseline competency mapping.
2. **Sections (Top → Bottom):**
   - **Protected Header/Navbar:** Global search, notifications, and profile controls.
   - **Active Assessment Card:** Displays diagnostic metadata (target track, last completed timestamp) and primary assessment trigger.
   - **Visual Competency Matrix:** Structured list grid showing specific sub-skill areas and progress indicators mapping rating status (Novice, Intermediate, Advanced).
   - **Questionnaire Modal/Overlay:** Renders a 5-10 question track-specific dynamic multiple-choice interface when active.
3. **Primary CTA:**
   - `[ Take Assessment ]` (if first time) / `[ Retake Diagnostics Assessment ]` (opens modal overlay).
   - `[ Next Question ]` / `[ Submit Assessment ]` (within modal context).
4. **Secondary Actions:**
   - `[X]` Close modal button (warns user progress in this attempt is not saved).
   - Navigation links.
5. **Entry Point:**
   - Auto-directed from Onboarding Wizard completion.
   - Navigated via Sidebar link (`[📊] Skill Profiler`).
   - Clicking "Go to Profiler" card on Dashboard Home.
6. **Exit Point:**
   - Redirect to `/dashboard/roadmap` upon successful test completion (to display updated pathway).
   - Manual navigation to other dashboard screens.

---

### 6. AI Career Roadmap (`/dashboard/roadmap`)

#### Wireframe Schematic

```
+-----------------------------------------------------------------------------------------+
| [=] Dashboard / Learning Roadmap          [ Search... ]                       [Q] [Avatar]|
+-----------------------------------------------------------------------------------------+
|  (Sidebar) |                                                                            |
|  [🏠] Home  |  MY LEARNING PATHWAY                                                       |
|            |  Track: Frontend Engineering  |  Weekly Study Hours: 15h                   |
|  [📊] Prof. |  Estimated Path Duration: 6 Weeks                                          |
|            |                                                                            |
|  [🗺️] Road. |  [ Adjust Schedule Hours ]                                                 |
|            |                                                                            |
|  [🛠️] Proj. |  ------------------------------------------------------------------------  |
|            |                                                                            |
|  ----------|  WEEKLY ROADMAP TIMELINE:                                                  |
|  [⚙️] Sett. |  [x] WEEK 1: Single Page Application Basics                   (Completed)  |
|            |  [x] WEEK 2: Advanced React Components & Hooks                 (Completed)  |
|            |  [-] WEEK 3: Global State Management                           (In Progress)|
|            |      [x] Milestone 3.1: Redux Toolkit Principles                            |
|            |          Curated Resource: [Official RTK Guide] (External Link)            |
|            |      [ ] Milestone 3.2: Async API Actions with Thunk middleware            |
|            |          Curated Resource: [Redux Async Patterns] (External Link)           |
|            |  [ ] WEEK 4: Responsive CSS & Styling Architectures            (Locked)     |
|            |  [ ] WEEK 5: Client-Side Testing (Jest & React Library)        (Locked)     |
|            |                                                                            |
+------------+----------------------------------------------------------------------------+
```

1. **Purpose:** Present a weekly, structured schedule of learning milestones mapped to skill gaps, incorporating external resources.
2. **Sections (Top → Bottom):**
   - **Protected Header/Navbar:** Global context header.
   - **Roadmap Configuration Header:** Displays core profile constraints (assigned track, commitment hours, overall duration) and schedule adjustments controls.
   - **Weekly Timeline Accordion Stepper:** Sequential list showing:
     - Collapsible weekly modules.
     - Progress indicators showing Week status (Completed, In Progress, Locked).
     - Milestone checklists containing direct checkboxes to mark tasks completed.
     - Clickable external resource anchors (e.g., official docs, videos).
3. **Primary CTA:** `[ Adjust Schedule Hours ]` (opens schedule update modal).
4. **Secondary Actions:**
   - Checkbox toggling (marking individual milestones as complete).
   - Clicking curated learning links (navigates outward to external source).
   - Expand/collapse toggle for weekly timeline blocks.
5. **Entry Point:**
   - Redirected after completing Skill Assessment.
   - Sidebar navigation link (`[🗺️] Learning Roadmap`).
   - Clicking "Go to Roadmap" on Dashboard Home.
6. **Exit Point:** Navigating to other modules.

---

### 7. AI Project Recommendation (`/dashboard/projects`)

#### Wireframe Schematic (Default State - Generate Brief)

```
+-----------------------------------------------------------------------------------------+
| [=] Dashboard / Project Specs             [ Search... ]                       [Q] [Avatar]|
+-----------------------------------------------------------------------------------------+
|  (Sidebar) |                                                                            |
|  [🏠] Home  |  PERSONALIZED PORTFOLIO PROJECT SPECIFICATIONS                             |
|            |                                                                            |
|  [📊] Prof. |  Generate a custom, non-trivial portfolio project designed specifically    |
|            |  to address your active skill gaps:                                        |
|  [🗺️] Road. |  - State Management & Thunks                                               |
|            |  - API Integration                                                         |
|  [🛠️] Proj. |                                                                            |
|            |  Target Stack: Vite, React, Vitest                                         |
|  ----------|                                                                            |
|  [⚙️] Sett. |                      [ Generate Custom Project Brief ]                     |
|            |                                                                            |
+------------+----------------------------------------------------------------------------+
```

#### Wireframe Schematic (Active Brief State)

```
+-----------------------------------------------------------------------------------------+
| [=] Dashboard / Project Specs             [ Search... ]                       [Q] [Avatar]|
+-----------------------------------------------------------------------------------------+
|  (Sidebar) |                                                                            |
|  [🏠] Home  |  ACTIVE PORTFOLIO PROJECT BRIEF                                            |
|            |                                                                            |
|  [📊] Prof. |  Project: "Real-time State Store Checkout Basket"                          |
|            |  Target Skill Gap: State Management & Client-Side Testing                  |
|  [🗺️] Road. |                                                                            |
|            |  +----------------------------------------------------------------------+  |
|  [🛠️] Proj. |  | 1. BUSINESS CASE & USER SCENARIOS                                    |  |
|            |  |    Customers need immediate reactive shopping cart state updates...     |  |
|  ----------|  | 2. FUNCTIONAL REQUIREMENTS                                           |  |
|  [⚙️] Sett. |  |    - Core global state provider must hold basket arrays.            |  |
|            |  |    - Add, decrement, and delete items securely.                      |  |
|            |  | 3. SUGGESTED ARCHITECTURE                                            |  |
|            |  |    Use React Context / RTK paired with local storage persistence.    |  |
|            |  | 4. IMPLEMENTATION MILESTONES                                         |  |
|            |  |    - Phase A: Setup Vite & basic rendering layout.                   |  |
|            |  |    - Phase B: Connect State structure & write initial Vitest tests.  |  |
|            |  +----------------------------------------------------------------------+  |
|            |                                                                            |
|            |                  [ Mark Project Completed ]                                |
|            |                                                                            |
+------------+----------------------------------------------------------------------------+
```

1. **Purpose:** House custom, gap-focused portfolio specifications generated by AI to resolve identified competency needs.
2. **Sections (Top → Bottom):**
   - **Protected Header/Navbar:** Core search and navigation controls.
   - **Project State Switcher:** Displays active project spec if generated; otherwise shows brief description of target skills and stacks.
   - **Project Generator Panel (Empty State):** High-impact prompt displaying target gaps and recommendations button.
   - **Detailed Brief Document (Active State):** Structured, split layout representing:
     - **Scope Header:** Title, Target Competency Gap, and stack.
     - **Business Case:** Explains real-world user scenario.
     - **Functional Requirements:** Structured lists of specific feature outcomes.
     - **Suggested Architecture:** Baseline structure recommendations.
     - **Implementation Milestones:** Phase-by-phase development goals.
   - **Project Controls Section:** Options to close out project or record completion.
3. **Primary CTA:**
   - `[ Generate Custom Project Brief ]` (Empty State - triggers AI generation sequence).
   - `[ Mark Project Completed ]` (Active State - sets project finished, triggers progress logic).
4. **Secondary Actions:**
   - Copy brief text to clipboard.
5. **Entry Point:**
   - Sidebar navigation link (`[🛠️] Custom Projects`).
   - Clicking "Go to Project Board" on Dashboard Home.
6. **Exit Point:** Navigating away to other views.

---

### 8. Progress Tracking Interface

_Note: Progress Tracking operates as a core background controller and visual reporting module across the platform. While it doesn't function as a standalone menu path in Version 1, its interface states update multiple modules._

#### Wireframe Schematic (Dashboard and Roadmap updates)

```
+-----------------------------------------------------------------------------------------+
|  [===|--------------------] 12 of 30 Milestones Complete (35%)       Streak: 5 Days 🔥   |
+-----------------------------------------------------------------------------------------+
```

#### Wireframe Schematic (Schedule Recalibration Overlay Drawer)

```
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|                         +-------------------------------------+                         |
|                         | ADJUST LEARNING COMMITMENT      [X] |                         |
|                         |                                     |                         |
|                         | Move slider to recalculate schedule |                         |
|                         | weekly milestone density:           |                         |
|                         |                                     |                         |
|                         | [=============o====================] |                         |
|                         | 12 Hours / Week                     |                         |
|                         |                                     |                         |
|                         | Current Path Duration: 8 Weeks      |                         |
|                         | New Path Duration: 5 Weeks          |                         |
|                         |                                     |                         |
|                         |            [ Recalibrate Path ]     |                         |
|                         |                                     |                         |
|                         +-------------------------------------+                         |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

1. **Purpose:** Visualize user progress, increment active streaks, and handle real-time schedule adjustments and recalibrations.
2. **Sections (Top → Bottom):**
   - **Interactive Metrics Panel (Dashboard/Roadmap):** Shows percentage progress, completion ratio numbers, and streak fires.
   - **Weekly Commitments Adjuster (Modal/Drawer):** Provides slider control enabling user to change study hours.
   - **Dynamic Recalibration Estimator:** Text labels displaying expected changes in path length (e.g. shifts timeline weeks length) in response to hours adjustment.
3. **Primary CTA:**
   - `[ Recalibrate Path ]` (Saves adjustment, adjusts weeks density, and redirects to updated Roadmap).
4. **Secondary Actions:**
   - `[X]` Cancel close button.
   - Check / uncheck milestone items.
5. **Entry Point:**
   - Clicked "Adjust Schedule Hours" in Learning Roadmap.
   - Toggling checkbox states on active roadmap weeks.
   - Marking project brief completed.
6. **Exit Point:** Returns user to the updated Learning Roadmap (`/dashboard/roadmap`).

---

### 9. Account Settings Page (`/dashboard/settings`)

#### Wireframe Schematic

```
+-----------------------------------------------------------------------------------------+
| [=] Dashboard / Settings                  [ Search... ]                       [Q] [Avatar]|
+-----------------------------------------------------------------------------------------+
|  (Sidebar) |                                                                            |
|  [🏠] Home  |  ACCOUNT CONFIGURATIONS                                                    |
|            |                                                                            |
|  [📊] Prof. |  1. TRACK PREFERENCES                                                     |
|            |     Target Career Track: [ Frontend Engineering                | V ]       |
|  [🗺️] Road. |     Weekly Commitment: [===============o==================] 15 Hours      |
|            |     [ Save Preferences ]                                                   |
|  [🛠️] Proj. |                                                                            |
|            |  2. CONNECTED SOCIAL LOGINS                                                |
|  ----------|     Google OAuth SSO:  [ Connected ]      [ Disconnect ]                   |
|  [⚙️] Sett. |     GitHub OAuth SSO:  [ Connected ]      [ Disconnect ]                   |
|            |                                                                            |
|            |  3. DANGER ZONE                                                            |
|            |     * Clear Profile & Diagnostics: [ Reset Progress Data ]                 |
|            |     * Delete Account Permanently:  [ Delete Account ]                      |
|            |                                                                            |
+------------+----------------------------------------------------------------------------+
```

1. **Purpose:** Manage user profile configurations, SSO OAuth credentials, and safety controls.
2. **Sections (Top → Bottom):**
   - **Protected Header/Navbar:** Global context bar.
   - **Track Preferences Component:** Dropdown selecting target tracks and range commitment slider, with a specific save block.
   - **Connected Social Logins Panel:** Status indicators detailing active links to Google and GitHub authentication, with disconnect triggers.
   - **Danger Zone Block:** Red-bordered panel holding data reset actions and account deletion controls.
3. **Primary CTA:** `[ Save Preferences ]` (Updates active track and hours constraints).
4. **Secondary Actions:**
   - `[ Disconnect ]` for Google or GitHub OAuth.
   - `[ Reset Progress Data ]` (Restores profile to un-onboarded, clean diagnostic state).
   - `[ Delete Account ]` (Permanently strips account data and redirects user out).
5. **Entry Point:**
   - Sidebar navigation link (`[⚙️] Settings`).
   - Clicking "Settings" inside the User Avatar menu dropdown.
6. **Exit Point:**
   - Redirect to Onboarding Wizard (`/onboarding`) after data reset.
   - Redirect to Landing Page (`/`) after account deletion or logout.
   - Sidebar navigation redirects.

---

## Verification Plan

### Manual Verification

1. **Scope Checking:** Verify that no sections or navigation flows link to Resume Matching, ATS Optimization, or Mock Interviews.
2. **Navigation Parity:** Validate sitemap alignment from [04-information-architecture.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/04-information-architecture.md) against entry and exit coordinates across all nine screens.
3. **Workflow Continuity:** Validate that the onboarding wizard leads directly into the Skill Assessment, which then flows to the Learning Roadmap, which informs the Project Recommendations.

---

## Related Documents

- [00-project-vision.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/00-project-vision.md)
- [01-product-discovery.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/01-product-discovery.md)
- [02-prd.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/02-prd.md)
- [03-user-flow.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/03-user-flow.md)
- [04-information-architecture.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/04-information-architecture.md)
- [05-project-scope.md](file:///c:/Coding-Projects/projects/LifeGuide-AI/docs/05-project-scope.md)
