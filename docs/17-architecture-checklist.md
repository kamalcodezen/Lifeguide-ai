# Phase 11.7 — Architecture Review Checklist

This checklist defines the technical gates that must be satisfied before merging any code changes into the main branch of the **LifeGuide AI** project.

---

# 1. Architecture Compliance

- [ ] **Clean Architecture Isolation:** Domain calculations do not import directly from the React presentation tier or Mongoose adapter tier.
- [ ] **Single Responsibility Principle (SRP):** Every React component, hook, class, and service has exactly one reason to change.
- [ ] **Open/Closed Principle (OCP):** Interface props and layouts support extensions (e.g. extending options arrays) without modifying core layout functions.
- [ ] **Dependency Inversion Principle (DIP):** Route Handlers depend on Mongoose repository contracts (`profileRepository`) rather than importing direct MongoDB driver clients.
- [ ] **KISS & YAGNI Adherence:** The implementation contains only what is specified for Version 1. No speculative models, features, or integrations are added.
- [ ] **DRY Structural Verification:** No redundant Zod schemas or duplicate validation helper blocks are introduced.

---

# 2. Folder Structure Compliance

- [ ] **Correct Module Placement:** Sibling feature assets (form Actions, domain services, custom hooks, unit tests) are placed inside their target feature directory in `src/features/*`.
- [ ] **Centralized Database Layer:** The Mongoose schemas are located strictly inside `src/database/models/`. No Mongoose schema files are present inside the `src/features` folder.
- [ ] **AI Segregation:** System prompt templates, Gemini client providers, LLM output parsers, and custom roadmap/project generators are isolated within `src/ai/`.
- [ ] **Centralized Lib & Config:** Client singleton wrappers (Better Auth server setups, Cloudinary client initializers, MongoDB drivers) reside in `src/lib/`. App configurations and env checkers reside in `src/config/`.
- [ ] **Shared Boundary Rules:** Primitives in `src/shared` (UI atoms, generic hooks, pure utils) do not import from `src/features/*` or `src/app/*`.

---

# 3. Naming Convention Compliance

- [ ] **Component Casing:** React components use `PascalCase.tsx`. Custom hooks use `camelCase` with the `use` prefix.
- [ ] **Action & Service Suffixes:** Next.js Server Actions use active `camelCase` verbs. Domain services append `Service` (e.g. `atsScoreService.ts`). Database repositories append `Repository` (e.g. `userProfileRepository.ts`).
- [ ] **Mongoose Models & Collections:** Mongoose model names use singular `PascalCase` matching their file name. Collections use plural `kebab-case` (e.g. `assessment-results`).
- [ ] **Zod schemas:** Validation schemas append `Schema` suffix (e.g. `signUpSchema`).
- [ ] **Environment variables:** Private keys do NOT prepend `NEXT_PUBLIC_` unless they are explicitly intended to be exposed to the browser.
- [ ] **Git naming convention:** Branches use `type/ticket-id-description` Conventional formats (e.g. `feat/123-resume-improve`).

---

# 4. Import Rules Compliance

- [ ] **Unidirectional Dependency Flow:** Imports flow strictly inwards (app -> features -> database/ai/lib -> shared). No lower-level layer imports from a higher layer.
- [ ] **Zero Sibling Cross-Feature Imports:** Feature A does not import components, hooks, or service wrappers from Feature B directly. Sibling features interact only via repository data functions or public API routes.
- [ ] **Alias Alias Mapping:** All absolute paths use the `@/` prefix. Sibling files in the same directory are the only files allowed to use relative path imports (e.g. `./Card.module.css`).
- [ ] **No Circular Loops:** Barrel files (`index.ts`) are only used within shared UI primitive folders. Circular import checks have been validated.
- [ ] **Client vs. Server Boundaries:** Client components (marked with `'use client'`) do not import Mongoose models, private Gemini SDK variables, or Better Auth server functions.

---

# 5. Database Checklist

- [ ] **Repository Pattern Enforcement:** Route Handlers call repository query methods. Direct model operations (e.g. `UserModel.find()`) are restricted to the repository layer.
- [ ] **Query Performance (Lean):** Read-only database queries use `.lean()` to return raw JavaScript objects and bypass Mongoose hydration overhead.
- [ ] **Indexes Configuration:** New search filters have matching compound or text indexes configured in the Mongoose schemas.
- [ ] **Soft Delete Support:** Documents support logical deletes via the standard `deletedAt` field. Queries filter out logically deleted records by default.
- [ ] **Connection Reuse:** Database driver initializations reuse the established singleton connection pool, avoiding leaking socket descriptors.

---

# 6. API Checklist

- [ ] **REST Conventions:** Endpoints use plural nouns for paths (e.g. `/api/v1/bookmarks`). Route triggers use lowercase `kebab-case` verbs.
- [ ] **Zod Input Validation:** Next.js Route Handlers validate incoming body and query parameters against a Zod schema before executing any business logic.
- [ ] **Standardized Envelope:** Success payloads match the standard JSON envelope structure (`success`, `data`, `meta`).
- [ ] **Unified Error Payload:** Error payloads return the standard code structures (`VALIDATION_FAILED`, `UNAUTHENTICATED`) alongside descriptive field details.
- [ ] **Idempotency checks:** POST actions (generating roadmaps, starting mock interviews) support client-side tracking using the `Idempotency-Key` header.

---

# 7. Authentication & Security Checklist

- [ ] **Better Auth Session Check:** Private Route Handlers verify active sessions using Better Auth's `getSession()` method.
- [ ] **Role Validation (RBAC):** API endpoints restrict access to authorized user roles.
- [ ] **Secure Cookie Attributes:** Better Auth cookies enforce `HttpOnly`, `Secure`, and `SameSite=Lax` properties.
- [ ] **NoSQL Injection Prevention:** Zod schemas validate parameters, blocking MongoDB query injection operators (like `$gt` or `$ne`).
- [ ] **Upload Security:** Resumes are validated to ensure they match allowed MIME types (`application/pdf`) and are under the 5MB size limit.
- [ ] **Secret Management:** Private credentials (such as Gemini keys, Cloudinary secrets, and DB connection strings) are read securely from server-side environment variables.

---

# 8. AI Integration Checklist

- [ ] **Prompt Template Isolation:** System prompts are stored as static text parameters within `src/ai/prompts/`.
- [ ] **Response Schema Validation:** AI JSON outputs are validated against a Zod schema before the application processes the data.
- [ ] **Timeout & Retry Configurations:** AI SDK client connections configure explicit timeout values and limit retry attempts to prevent blocking threads.
- [ ] **AI Exception Isolation:** AI processing exceptions are handled in dedicated try-catch blocks and return safe, client-friendly error states.
- [ ] **Token Usage Awareness:** Prompts are structured cleanly to avoid unnecessary token consumption.

---

# 9. Performance Checklist

- [ ] **Server Components by Default:** Layout views utilize React Server Components (`RSC`) to fetch data, minimizing client-side Javascript bundles.
- [ ] **Dynamic Loading for Heavy Modules:** Heavy elements (code terminals, SVG ATS dials, whiteboard workspaces) are loaded dynamically using `next/dynamic` or `React.lazy`.
- [ ] **Direct Cloudinary Uploads:** Large assets are uploaded directly from the browser client to Cloudinary, reducing server memory usage.
- [ ] **Image Optimization:** Custom graphics use Next.js `next/image` to optimize layouts and handle automatic image scaling.

---

# 10. Accessibility Checklist

- [ ] **Semantic Markup:** Layouts use HTML5 semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) instead of generic div layouts.
- [ ] **Focus Management:** Elements are keyboard-navigable and show visible focus rings matching the system style rules.
- [ ] **Screen Reader Labels:** Image assets contain descriptive `alt` tags. Non-text buttons include explicit `aria-label` tags.
- [ ] **Contrast Compliance:** Colors comply with Web Content Accessibility Guidelines (WCAG 2.1 AA) contrast ratios.

---

# 11. Testing Checklist

- [ ] **Unit Coverage:** Key helper utilities and pure logic operations have matching Vitest unit tests colocated in their feature directory.
- [ ] **Service & Repository Tests:** AI normalizer parsers and database repository helpers mock external services to verify query outputs.
- [ ] **API Endpoint Tests:** Mock requests verify Zod validation failures and check that authentication middlewares throw correct error codes.
- [ ] **Mocking External Clients:** AI calls mock the Gemini API client to prevent network latency and token usage during tests.

---

# 12. Code Quality Checklist

- [ ] **Compile Safety:** The project builds cleanly without TypeScript compiler flags or warnings.
- [ ] **No Any:** No explicit `any` types are used. Unknown properties use the `unknown` type.
- [ ] **Clean Lint Runs:** The code passes all ESLint rules and formatting configurations.
- [ ] **Dead Code Removal:** Unused imports, variables, and debug console logs are removed.
- [ ] **Error Boundaries:** Feature dashboard containers integrate layout-level React error boundaries.

---

# 13. Deployment Readiness Checklist

- [ ] **Valid env.example:** New environment variables are documented in the root `.env.example` file.
- [ ] **Production Build Check:** The application builds successfully in a local production simulation (`npm run build`).
- [ ] **Security Headers:** The next configurations file enforces strict security header rules.
- [ ] **Clean DB Seed scripts:** Seed scripts execute successfully without causing key collision crashes.

---

# 14. Pull Request Review Checklist

Reviewers must verify the following checks before approving a PR:

- _Verification 1:_ Confirm the feature folder does not contain a `models/` subdirectory.
- _Verification 2:_ Confirm that client components (using `'use client'`) do not import database models.
- _Verification 3:_ Verify that the PR includes new unit tests for any modified services or helper utilities.
- _Verification 4:_ Confirm that Zod schemas validate all new API Route Handler endpoints.
- _Verification 5:_ Confirm that no private keys (such as `GEMINI_API_KEY`) have been committed to the repository.

---

# 15. Final Architecture Approval Matrix

| Category                     | Status                   | Notes                                                                     |
| :--------------------------- | :----------------------- | :------------------------------------------------------------------------ |
| **Architecture Compliance**  | [ ] PENDING / [ ] PASSED | Verification of DDD, SOLID, SRP boundaries.                               |
| **Folder structure**         | [ ] PENDING / [ ] PASSED | Checking centralized database and lib setups.                             |
| **Naming Conventions**       | [ ] PENDING / [ ] PASSED | Verification of PascalCase, camelCase, kebab-case rules.                  |
| **Import Direction**         | [ ] PENDING / [ ] PASSED | Checking unidirectional imports and circular dependencies.                |
| **Database Operations**      | [ ] PENDING / [ ] PASSED | Verification of Repository Pattern, `.lean()` query calls, and indexes.   |
| **API REST standards**       | [ ] PENDING / [ ] PASSED | Check of path layouts, Zod schemas validations, and error codes.          |
| **Auth & Security**          | [ ] PENDING / [ ] PASSED | Verification of Better Auth sessions, secure cookies, and size limits.    |
| **AI Layer Isolation**       | [ ] PENDING / [ ] PASSED | Verification of prompt layouts, AI schemas validations, and AI folders.   |
| **Performance Marks**        | [ ] PENDING / [ ] PASSED | Checking server components by default, dynamic loading, and lean queries. |
| **Accessibility Compliance** | [ ] PENDING / [ ] PASSED | Checking semantic elements, focus indicators, and aria labels.            |
| **Test Suites Coverage**     | [ ] PENDING / [ ] PASSED | Checking unit tests, mock configurations, and Vitest runs.                |
| **Code Quality**             | [ ] PENDING / [ ] PASSED | Verification of type safety, linter runs, and error boundaries.           |
| **Deployment Readiness**     | [ ] PENDING / [ ] PASSED | Verify env config maps, build runs, and security headers.                 |

---

Version: 1.0
Status: Phase 11.7 — Architecture Checklist
