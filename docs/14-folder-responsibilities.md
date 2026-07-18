# Phase 11.4 — Folder Responsibilities

This handbook serves as the architectural enforcement manual for the engineering team. It defines the strict boundaries, single responsibilities, and structural constraints for every primary directory in the **LifeGuide AI** codebase.

---

# 1. Directory Responsibility Matrices

## `src/app`

- **Purpose:** Routing layer coordinator for the Next.js App Router.
- **Responsibilities:** Renders layouts, manages metadata, triggers loading states, handles routing authentication middleware gateways, and displays pages.
- **Allowed Contents:** `page.tsx` files, `layout.tsx` templates, `loading.tsx` loaders, error handlers, and route groups (such as `(dashboard)` or `(auth)`).
- **Not Allowed:** Next.js Server Actions, raw Mongoose db connection executions, custom business rules code calculations, or direct third-party API SDK calls.
- **Best Practices:** Server Components (`RSC`) inside `src/app` must only serve as orchestrators. They fetch data via feature services and pass variables down to client view leaf nodes.

## `src/app/api`

- **Purpose:** Expose RESTful API endpoints using Next.js Route Handlers.
- **Responsibilities:** Receives incoming HTTP requests, parses route query arguments, validates JSON payloads, verifies session cookies via Better Auth, and translates logical exceptions to standardized error formats.
- **Allowed Contents:** `route.ts` handlers, Zod schema validation hooks, route-level rate limiter wrappers, and REST error maps.
- **Not Allowed:** Raw Mongoose model query parsing (must invoke repositories instead), raw HTML views, or React UI component templates.
- **Best Practices:** Route handlers must remain lightweight. They parse, authorize, delegate execution to feature services, and return the standard JSON envelope.

## `src/features`

- **Purpose:** Core encapsulated domain modules of the application.
- **Responsibilities:** Contains the business logic, custom UI views, and transactional rules associated with a specific feature domain (e.g. Resume, Interview, Roadmap).
- **Allowed Contents:** Feature Server Actions, composite components, custom client hooks, domain services, repositories, Zod validation checkers, and colocated tests.
- **Not Allowed:** Centralized Mongoose model declarations, third-party client initializers (such as Gemini configuration loaders), global CSS styles, or other feature domains' raw schemas.
- **Best Practices:** A feature folder must act as an independent package. Any sharing of assets or services between features must be done via explicit repository calls or common utilities.

## `src/database`

- **Purpose:** Centralized data persistence layer.
- **Responsibilities:** Manages MongoDB connections, defines all schema definitions, configures indexing keys, and applies global database plugins.
- **Allowed Contents:** Mongoose schemas, DB connection drivers scripts, index models, and database middleware plugins (e.g., auto soft-delete hooks).
- **Not Allowed:** Next.js Route Handlers, Zod API request payload schemas, UI components, or logic services.
- **Best Practices:** Models must only enforce database integrity rules. Avoid placing high-level business rules or client error strings inside schema validators.

## `src/lib`

- **Purpose:** Configuration wrapper for third-party SDK clients.
- **Responsibilities:** Initializes singleton client instances and exports configuration helpers for external dependencies (Better Auth, MongoDB driver, Cloudinary, Gemini API).
- **Allowed Contents:** Instantiations of third-party clients, environment checks mapping keys, and SDK wrappers.
- **Not Allowed:** Business logic, Zod validation schemas, or database collections schema templates.
- **Best Practices:** Keep libraries stateless. A library file should only initialize a client module and expose it as a singleton export.

## `src/config`

- **Purpose:** Consolidated environment parameters loader.
- **Responsibilities:** Parses and validates environment variables (`.env`), exposes application constants, and configures static configurations.
- **Allowed Contents:** Zod schemas for env validation, configuration loader scripts, and static constants configuration values.
- **Not Allowed:** UI rendering components, React context providers, or database query executions.
- **Best Practices:** Parse environment variables at application startup. Throw a clear error at compile-time if any required key is missing.

## `src/ai`

- **Purpose:** Dedicated AI processing layer.
- **Responsibilities:** Manages system prompts, handles communications with the Gemini API, parses and normalizes AI outputs, and validates AI response structures.
- **Allowed Contents:** Prompt text templates, LLM client execution wrappers, Zod schemas matching expected Gemini returns, output normalization utilities, and AI generators (roadmaps, project briefs).
- **Not Allowed:** React UI components, database model transactions, session cookie parsers, or API route logic.
- **Best Practices:** Keep the AI layer completely decoupled from features. Feature services must invoke AI generators as asynchronous black boxes, passing inputs and receiving validated domain objects back.

## `src/shared`

- **Purpose:** Common utilities, UI elements, and providers shared across the application.
- **Responsibilities:** Hosts elements that have no specific feature domain owner.
- **Allowed Contents:** Sub-folders for components (`ui` and `layout`), shared client hooks, global providers, and pure helpers.
- **Not Allowed:** Business logic calculations, database models, raw Gemini prompt definitions, or route handler parameters.
- **Best Practices:** Only place assets in `src/shared` if they are utilized by three or more independent features.

## `src/shared/components`

- **Purpose:** central UI components store.
- **Responsibilities:** Provides state-free, reusable atomic primitives (buttons, inputs) and layout containers (navbar, sidebar).
- **Allowed Contents:** Pure React components, Tailwind CSS styling classes, and component-specific type definitions (Props interfaces).
- **Not Allowed:** Mongoose models queries, Next.js Server Actions, or direct Gemini API calls.
- **Best Practices:** Shared components must remain presentational. Pass callbacks as properties (`Props`) rather than importing logic hooks directly.

## `src/shared/hooks`

- **Purpose:** Central repository for shared React client hooks.
- **Responsibilities:** Manages generic client-side behaviors (e.g. debouncing inputs, persisting theme choices, checking network status).
- **Allowed Contents:** Custom React hooks utilizing `useState`, `useEffect`, or `useMemo`.
- **Not Allowed:** Database access queries, Server Action calls, or private environment variables access.
- **Best Practices:** Keep hooks generic. Avoid writing hooks that depend on feature-specific data models.

## `src/shared/providers`

- **Purpose:** Global React Context wrapper hooks.
- **Responsibilities:** Distributes configuration states (theme selection, active notifications, sessions context) down the component tree.
- **Allowed Contents:** React Context definitions, provider components, and state management hooks.
- **Not Allowed:** Mongoose collection models or raw database CRUD code.
- **Best Practices:** Keep contexts focused on a single concern. Do not consolidate unrelated states into a single context provider.

## `src/shared/utils`

- **Purpose:** Reusable pure utility functions.
- **Responsibilities:** Performs generic calculations, formats strings, and parses data.
- **Allowed Contents:** Pure utility functions (such as date formatters or number formatting utilities).
- **Not Allowed:** Components, stateful hooks, or database driver operations.
- **Best Practices:** Utilities must be pure. They should accept parameters, return a value, and cause zero side effects.

## `src/styles`

- **Purpose:** Global styling configuration.
- **Responsibilities:** Imports Tailwind CSS v4 design tokens, layout variables, and typography definitions.
- **Allowed Contents:** Global CSS files and Tailwind CSS configuration scripts.
- **Not Allowed:** JavaScript business calculations, React layouts, or route handlers.
- **Best Practices:** Avoid utility creep. Keep styling changes within Tailwind tokens rather than writing custom CSS layout classes.

## `src/types`

- **Purpose:** Global TypeScript type contracts library.
- **Responsibilities:** Defines application-wide type contracts, REST error formats, and standardized JSON envelopes.
- **Allowed Contents:** TypeScript interfaces, type mappings, declarations, and utility types.
- **Not Allowed:** Executable code, variables, constants, or Mongoose models.
- **Best Practices:** Keep types declarative. Use `types/` for system-wide contracts, keeping feature-specific entities isolated in their local folders.

## `public`

- **Purpose:** Serve static assets directly to browser clients.
- **Responsibilities:** Hosts media files that require direct URL mapping (logos, SVGs, background vectors).
- **Allowed Contents:** `.svg` vectors, `.png` graphics, `.ico` icons, and robots config text files.
- **Not Allowed:** TypeScript files, server scripts, or confidential user documents.
- **Best Practices:** Keep public folder structures clean. Use distinct subfolders for images, icons, and fonts.

## `tests`

- **Purpose:** End-to-end integration and system testing.
- **Responsibilities:** Runs browser automation testing, checking user flows from authentication through database updates.
- **Allowed Contents:** Playwright configuration files, E2E test scripts, and test mocks.
- **Not Allowed:** Production application components, database drivers, or private key lists.
- **Best Practices:** Keep integration tests isolated. E2E tests should target clean test environments without mutating production database tables.

## `scripts`

- **Purpose:** Development and operations automation utility scripts.
- **Responsibilities:** Runs database seeding, builds migration files, and performs deployment diagnostics checks.
- **Allowed Contents:** Node.js executable scripts, bash scripts, and seed files.
- **Not Allowed:** Next.js pages, client-side React components, or global CSS sheets.
- **Best Practices:** Ensure all script commands contain safe execution parameters (e.g. verifying `NODE_ENV` is set to `development` before purging database tables).

---

# 2. Strict Boundary Rules

1.  **Zero Presentation Bleed:** The UI components in `src/shared/components` and features modules must never import `src/database/models` or execute server-only database operations.
2.  **Unidirectional Core Imports:** Code in `src/shared` must never import from `src/features` or `src/app`.
3.  **Encapsulated Features:** A feature (e.g. `resume`) must never import components or hooks directly from another feature (e.g. `interview`). All cross-domain actions are routed through standard API endpoints or shared service contracts.

---

Version: 1.0
Status: Phase 11.4 — Folder Responsibilities
