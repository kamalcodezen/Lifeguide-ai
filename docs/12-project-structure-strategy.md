# Phase 11.2 — Project Structure Strategy

This document defines the structural organization strategy for the **LifeGuide AI Career & Learning Copilot** codebase. It outlines the modular boundaries, routing configurations, logic partitioning, and configuration rules that structure development.

---

# 1. Project Organization Strategy

The codebase is organized around a **Modular Domain Encapsulation** model. Instead of grouping files strictly by type (e.g. putting all React components in one directory and all API files in another), the codebase places all files associated with a single business capability within a unified domain module. This strategy maximizes local coherence and minimizes the cognitive load required to understand, refactor, or test a single system component.

---

# 2. Why Feature-Based Organization Is Used

Feature-based organization solves several scaling issues common in growing Next.js architectures:

- **Reduced Context Switching:** A developer working on the Resume analyzer finds Mongoose schemas, Zod validation logic, API route definitions, and frontend layout modules colocated in one context.
- **Decoupled Refactoring:** Deleting or changing a feature can be done safely by removing or editing that single feature module, preventing unintended side effects in adjacent folders.
- **High Developer Velocity:** Multiple developers can work on distinct business requirements without encountering merge conflicts on centralized files.

---

# 3. Shared Modules Strategy

Cross-cutting concerns that cannot be logically mapped to a single domain module are placed in a centralized **Core Shared Space**:

- _Design System Atoms:_ State-free, primitive UI components (e.g., buttons, inputs, loader indicators) built with Tailwind CSS.
- _Global Configurations:_ Centralized database connections, Better Auth initializers, and Gemini client setups.
- _Type Definitions:_ General API interfaces, envelope parameters, and standard pagination types.
- _Utility Helpers:_ Simple pure functions like currency formatting, date parsers, and Cloudinary signing helpers.

---

# 4. Route Organization Strategy

Next.js 16 App Router pages and Route Handlers are organized using **Route Groups**:

- **Domain Isolation:** Sub-routes group logically inside route wrappers (e.g., `(dashboard)` or `(auth)`) to isolate layout configurations, metadata setups, and security checks.
- **Private Route Handlers:** API endpoints reside in standard route folders nested inside logical domain blocks.
- **Static vs Dynamic Separation:** Pages that require fast initial paint (e.g., landing, login) are grouped separately from dynamic, session-restricted dashboard panels.

---

# 5. Server vs. Client Separation Strategy

We enforce a strict boundary between client-side execution and server-side operations using Next.js directives:

- _Server Components (RSC):_ Default page modules fetch data directly from MongoDB Atlas or query business logic classes on the server. They remain free of interactive event handlers (e.g. `onClick`) and state hooks.
- _Client Components (CSR):_ Flagged explicitly with the `'use client'` directive. These are treated as leaf nodes in the component tree, focusing exclusively on UI state, animations, and handling user inputs.

---

# 6. Business Logic Placement Strategy

Business logic must never bleed into React view templates. It is partitioned into:

- **Route Controller Handlers:** Manage incoming request payloads, verify session cookies, and catch validation dropouts.
- **Domain Services:** Pure TypeScript service classes containing the core calculations (e.g. XP allocation, assessment rating engines, or roadmap progress updates).
- **Pure Functions:** Reusable calculations that do not depend on external APIs or database states, ensuring testability.

---

# 7. Data Access Strategy

Mongoose collections are kept independent of API endpoint code:

- **Repository Pattern:** Access queries (e.g., `.find()`, `.aggregate()`) are encapsulated inside dedicated Data Access files. Route Handlers invoke these functions rather than calling Mongoose models directly.
- **Lean Projections:** Read-only queries default to Mongoose `.lean()` calls to prevent hydration overhead and return raw JavaScript objects.
- **Schema Isolation:** DB schemas focus strictly on mapping MongoDB validation criteria, indexes, and soft-delete properties.

---

# 8. AI Integration Organization

AI workloads using the Gemini 2.5 Flash SDK are decoupled from route handlers:

- **AI Service Wrappers:** Gemini API client instances, connection handlers, and system instructions are isolated in a specialized AI engine service.
- **Structured Prompts:** System prompts are stored as static text files or typed string variables, keeping them separate from execution code.
- **Response Normalization:** The AI service parses Gemini JSON returns, validates them against Zod schemas, and returns normalized domain types to Route Handlers.

---

# 9. Authentication Organization

Authentication is managed via **Better Auth** session cookies:

- **Server Config:** Better Auth configurations, Mongoose adapters, and session controls are initialized in a dedicated authentication core file.
- **Authentication Middleware:** Next.js middleware checks session status at the edge, redirecting unauthenticated users before page-level layouts compile.
- **Context Passing:** Valid sessions enrich the incoming request headers, allowing Route Handlers to identify the caller's ID and role securely.

---

# 10. Validation Organization

Data verification is enforced at the entry boundaries:

- **API Boundary Schema:** Incoming HTTP requests must validate against a defined **Zod schema** before executing any controller logic.
- **Database Boundary Schema:** Database documents validate against Mongoose schema definitions (enforcing data types, default values, and enum sets).
- **Verification Alignment:** Zod validation structures align with Mongoose database constraints to prevent schema conflicts.

---

# 11. Reusable Component Strategy

UI components follow a strict classification system:

- _Primitives (Atoms):_ Highly reusable, state-free building blocks (buttons, badging containers, input templates).
- _Composites (Molecules/Organisms):_ Groups of primitives that form a functional block (e.g., Resume dropzone or diagnostic progress tracker).
- _Layout Wrappers:_ Reusable page containers (dashboards, sidebar navigations, alert layers).

---

# 12. UI Component Organization

- **Colocated Styles:** Primitives utilize Tailwind CSS v4 variables for style definitions. Inline arbitrary styles are prohibited.
- **Component Documentation:** Each primitive UI block is documented in the code with clear TypeScript interfaces defining required and optional props.
- **Theme Integration:** Light and dark visual variables are defined as system-wide Tailwind tokens, ensuring uniform theme switching.

---

# 13. Utility Organization

Utilities are divided by execution dependencies:

- _Pure Utilities:_ Operations that do not depend on server environments or browser contexts (e.g. date formatting libraries).
- _Client Utilities:_ Operations requiring client APIs (e.g., cookies management or local storage access).
- _Server Utilities:_ Operations containing private keys (e.g., Cloudinary API signature builders).

---

# 14. Configuration Organization

System configurations are centralized and read-only:

- **Centralized Configuration Store:** Environment parameters, third-party API configurations, and database connection strings are consolidated in a unified config loader.
- **Compile-Time Parsing:** Configurations parse environment keys at startup to verify all required variables are set, blocking deployments if any are missing.

---

# 15. Environment Variable Strategy

- **Type-Safe Env Schemas:** Environment variables are validated at start using a Zod configuration schema.
- **Client Exposure Control:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to the client. Private tokens (such as Gemini secrets or MongoDB connection strings) are kept strictly server-side.
- **Development Fallbacks:** Provide clear, default sandbox fallback variables for local development setups.

---

# 16. Error Handling Organization

Error processing is standardized across both client and server tiers:

- _Route Level Handlers:_ Capture errors in standard try-catch blocks and map exceptions to unified JSON error payloads with matching HTTP status codes.
- _React Boundaries:_ Use React Error Boundaries at page layout levels to catch client runtime errors and render user-friendly fallback screens.
- _Zod Error Translators:_ Middleware parses Zod validation failures, converting array structures into key-value pairs returned in the error response.

---

# 17. Logging Organization

- **Standardized Formats:** Use structured JSON logs containing timestamp markers, logging levels (INFO, WARN, ERROR), and request IDs.
- **Sensitive Data Masking:** Passwords, emails, and session cookie tokens are automatically scrubbed from logs.
- **Transport Integration:** Log outputs default to `stdout`, allowing APM platforms to parse telemetry records.

---

# 18. Testing Organization

- **Colocated Tests:** Unit and integration test files are placed alongside the code files they test (e.g., `resumeService.ts` and `resumeService.test.ts` reside in the same feature folder).
- **End-to-End Test Isolation:** E2E test suites (e.g. Playwright scripts) are isolated at the project root, keeping them separate from feature source directories.
- **Mock Dependencies:** External services (Gemini, Cloudinary) utilize mock classes for testing to prevent unnecessary network requests.

---

# 19. Future Scalability Strategy

The modular design supports future scale-up options:

- **Monorepo Migration:** Feature modules can easily separate into independent packages within a **Turborepo** monorepo structure.
- **Microservice Decoupling:** Domain folders can be converted into standalone backend microservices if write workloads require separate resources.

---

# 20. Engineering Decision Summary

This project structure strategy establishes a clean development baseline:

1.  **Isolation:** Enforces strict modular boundaries, preventing features from directly accessing another domain's raw files.
2.  **Safety:** Type-safe env validation and Zod checks prevent missing variables or invalid payloads from causing runtime errors.
3.  **Speed:** Feature-based colocation enables teams to scale development without code merge conflicts.

---

Version: 1.0
Status: Phase 11.2 – Project Structure Strategy
