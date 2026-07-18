# Phase 11.3 — Enterprise Folder Structure

This document defines the production-grade directory layout for the **LifeGuide AI Career & Learning Copilot** codebase.

---

# 1. Directory Tree Representation

```
lifeguide-ai/
├── .github/                       # CI/CD configurations, pull request templates, and GitHub action workflows.
│   └── workflows/                 # Automated test runner and build pipeline scripts.
├── public/                        # Static public assets served directly by the Next.js web application.
│   ├── images/                    # General illustration SVGs and background imagery.
│   └── vectors/                   # Soft-purple ambient glow graphics and system-wide badges icons.
├── scripts/                       # Maintenance and migration automation scripts.
│   └── db/                        # Seed data packages and collection migration scripts.
├── tests/                         # Root directory for end-to-end integration testing.
│   └── e2e/                       # Playwright browser automation test scripts.
├── src/                           # Primary source code directory for application logic.
│   ├── ai/                        # Centralized AI layer encapsulating prompts, providers, and parsing.
│   │   ├── prompts/               # System and template prompts definitions for LLM calls.
│   │   ├── providers/             # LLM API communication setups (Gemini integrations).
│   │   ├── parsers/               # Response normalization functions translating LLM returns.
│   │   ├── schemas/               # Zod validation models matching AI-expected payloads.
│   │   └── generators/            # Generation orchestrators compiling custom roadmap and project briefs.
│   ├── app/                       # App Router routing directories, layouts, and page entry endpoints.
│   │   ├── (auth)/                # Route Group isolating authentication screens.
│   │   │   ├── login/             # Login page entry.
│   │   │   └── signup/            # Sign up page entry.
│   │   ├── (dashboard)/           # Route Group isolating secure candidate workspaces.
│   │   │   ├── home/              # Dashboard home page entry.
│   │   │   ├── assessment/        # Diagnostic evaluation landing page.
│   │   │   ├── roadmap/           # Curriculum timeline interactive track.
│   │   │   ├── projects/          # Portfolio builder workspace.
│   │   │   ├── resume/            # ATS analyzer and rewrite view.
│   │   │   └── interview/         # Live simulator cockpit view.
│   │   ├── api/                   # Root directory for server REST API endpoints.
│   │   │   └── v1/                # Route Handlers for Version 1 API routes.
│   │   │       ├── auth/          # Authentication routing endpoints.
│   │   │       ├── profile/       # User profile details controller endpoints.
│   │   │       ├── assessments/   # Diagnostic assessment submission endpoints.
│   │   │       ├── roadmaps/      # Learning roadmap tracker endpoints.
│   │   │       ├── projects/      # Portfolio project generator endpoints.
│   │   │       ├── resumes/       # Resume upload and parse routes.
│   │   │       ├── interviews/    # Interview mock session actions.
│   │   │       ├── notes/         # Notes CRUD endpoints.
│   │   │       ├── bookmarks/     # Bookmarks CRUD endpoints.
│   │   │       ├── notifications/ # Notification alerts management endpoints.
│   │   │       └── admin/         # Admin configurations and system statistics logs.
│   │   ├── layout.tsx             # Root template wrapper injecting global styles.
│   │   └── page.tsx               # Public landing page template.
│   ├── config/                    # Centralized system configurations and environments validators.
│   │   ├── env/                   # Zod env checker schema and parser scripts.
│   │   ├── app/                   # Centralized application behavior configurations parameters.
│   │   └── constants/             # Constants config representing global validation boundaries.
│   ├── database/                  # Centralized database persistence layer.
│   │   ├── connection/            # MongoDB driver connections controllers.
│   │   ├── models/                # Consolidated Mongoose schema definitions.
│   │   ├── plugins/               # Custom database plugins (auto soft-deletes filters).
│   │   └── indexes/               # Centralized text search and index compilation setups.
│   ├── features/                  # Domain feature modules encapsulating business logic.
│   │   ├── auth/                  # Authentication domain logic.
│   │   ├── profile/               # User profile domain logic.
│   │   ├── assessment/            # Diagnostics assessment domain logic.
│   │   ├── roadmap/               # Learning roadmap domain logic.
│   │   ├── projects/              # Project generator domain logic.
│   │   ├── resume/                # Resume parsing and matching domain logic.
│   │   ├── interview/             # Mock interview simulator domain logic.
│   │   ├── notes/                 # User study notes domain logic.
│   │   ├── bookmarks/             # Bookmarks domain logic.
│   │   ├── notifications/         # Notification systems domain logic.
│   │   └── admin/                 # Administrator system controls domain logic.
│   │       # Standard Feature Architecture (no models/):
│   │       ├── actions/           # Next.js Server Actions for secure form operations.
│   │       ├── components/        # Feature-specific composite React components.
│   │       ├── hooks/             # Custom client hooks specific to the domain.
│   │       ├── services/          # Business logic services executing specific domain checks.
│   │       ├── repositories/      # Database repository queries wrapping Mongoose model methods.
│   │       ├── validation/        # Zod request-body validation patterns.
│   │       ├── types/             # Domain-specific TypeScript type contracts.
│   │       └── __tests__/         # Colocated unit and integration test specs.
│   ├── lib/                       # Centralized initializers for third-party integrations.
│   │   ├── auth/                  # Better Auth SDK configuration and adapters setup.
│   │   ├── mongo/                 # MongoDB database driver singleton initializers.
│   │   ├── cloudinary/            # Cloudinary asset storage clients connectors.
│   │   ├── gemini/                # Gemini SDK client initializers.
│   │   └── integrations/          # Outer APIs connection scripts.
│   ├── shared/                    # Shared components and client utilities.
│   │   ├── components/            # Shared React UI components.
│   │   │   ├── ui/                # UI Library: State-free design system atomic primitives.
│   │   │   └── layout/            # Common application layout containers (sidebar, top navbar).
│   │   ├── hooks/                 # General-purpose reusable client hooks (useLocalStorage, useDebounce).
│   │   ├── providers/             # Global React Context providers (theme toggle, alert controls).
│   │   └── utils/                 # Pure helper functions (date formats, numeric calculators).
│   ├── styles/                    # Tailwind CSS v4 design tokens and layouts.
│   │   └── globals.css            # Global CSS styling injecting color variables.
│   ├── types/                     # Application-wide global type declarations.
│   │   └── index.d.ts             # Global API response templates.
│   └── middleware.ts              # Edge routing session validation interceptor.
├── .env.example                   # Empty placeholder template defining required environment variables.
├── next.config.ts                 # Next.js application parameters and build configurations.
├── package.json                   # Project packages, dependencies, and execution scripts.
├── tailwind.config.ts             # Tailwind CSS custom themes configurations.
├── tsconfig.json                  # Compiler variables for TypeScript.
└── vitest.config.ts               # Unit test execution setups for Vitest.
```

---

# 2. Directory Descriptions

- **`public/`**: Stores static assets like logo files, SVGs, and pre-compiled media.
- **`scripts/`**: Houses utility scripts for system maintenance, seeding databases, and deployment diagnostics.
- **`tests/e2e/`**: Isolates E2E playwright browser automation scripts, keeping them separate from source folders.
- **`src/ai/`**: Dedicated AI layer separating LLM templates and adapters from features.
- **`src/ai/prompts/`**: Houses Gemini system instruction files and prompt templates.
- **`src/ai/providers/`**: Holds SDK adapters linking server endpoints to Gemini API channels.
- **`src/ai/parsers/`**: Houses output formatting utilities translating raw LLM responses.
- **`src/ai/schemas/`**: Defines Zod validator structures matching AI output templates.
- **`src/ai/generators/`**: Houses AI roadmap and project workflow builder generators.
- **`src/app/`**: Implements the App Router routing structure (layouts, loading state modules, template views).
- **`src/app/(auth)/`**: Route Group grouping login and signup views under isolated middleware scopes.
- **`src/app/(dashboard)/`**: Route Group grouping secure workspace layout templates.
- **`src/app/api/v1/`**: Implements Version 1 REST Next.js Route Handlers endpoints.
- **`src/config/`**: Centralizes application configurations, settings variables, and env parser setups.
- **`src/database/`**: Centralized database persistence layer.
- **`src/database/connection/`**: Handles active database driver connections.
- **`src/database/models/`**: Houses consolidated database Mongoose schemas.
- **`src/database/plugins/`**: Custom Mongoose plugins (e.g. global soft delete filters).
- **`src/database/indexes/`**: Custom database search indexes configurations.
- **`src/features/`**: Core directory encapsulating business domains into self-contained modules.
- **`src/features/<feature>/actions/`**: Houses Server Actions modules for handling secure form actions.
- **`src/features/<feature>/components/`**: Houses domain-specific layout widgets (e.g. Resume ATS score dials).
- **`src/features/<feature>/hooks/`**: Houses custom React hooks specific to feature interactions.
- **`src/features/<feature>/services/`**: Implements domain business engines (e.g. custom XP allocation formulas).
- **`src/features/<feature>/repositories/`**: Encapsulates Mongoose CRUD queries, isolating database details from route layers.
- **`src/features/<feature>/validation/`**: Defines Zod validation schemas for payload checks.
- **`src/features/<feature>/types/`**: Houses interface types mapping to specific feature entities.
- **`src/features/<feature>/__tests__/`**: Colocates Vitest unit test files next to source files.
- **`src/lib/`**: Centralized initializers for third-party integrations and SDK clients.
- **`src/lib/auth/`**: Sets up Better Auth SDK adapters configuration.
- **`src/lib/mongo/`**: MongoDB connection singleton controller.
- **`src/lib/cloudinary/`**: Cloudinary SDK client connectors setup.
- **`src/lib/gemini/`**: Gemini API SDK connectors setup.
- **`src/shared/components/ui/`**: Houses atomic, unstyled tailwind component primitives (buttons, inputs).
- **`src/shared/components/layout/`**: Houses layout headers, sidebars, and alerts.
- **`src/shared/hooks/`**: Houses common client-side hooks like state persistors or debounce timers.
- **`src/shared/providers/`**: Houses React Context instances for state distribution (theme configurations, session alerts).
- **`src/shared/utils/`**: Houses pure helper utilities like Cloudinary link builders and date parses.
- **`src/styles/`**: Centralizes Tailwind CSS v4 styling rules and typography sheets.
- **`src/types/`**: Application-wide global type declarations and standard API interfaces.
- **`src/middleware.ts`**: Edge routing middleware intercepts session validation, enforcing security checks.

---

Version: 1.1
Status: Phase 11.3 — Enterprise Folder Structure (Revised)
