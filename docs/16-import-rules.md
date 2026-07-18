# Phase 11.6 — Import Rules

This handbook defines the strict dependency direction and import rules for the **LifeGuide AI** project, ensuring architectural integrity and preventing circular dependencies.

---

# 1. Import Direction

The codebase enforces a strict **Unidirectional Inwards Dependency Flow**. High-level modules may import from low-level layers, but low-level layers are prohibited from importing from high-level layers.

```
       +-----------------------------------------------+
       |             src/app (Routing Pages)           |
       +-----------------------------------------------+
                               |
                               v
       +-----------------------------------------------+
       |        src/features (Encapsulated Modules)    |
       +-----------------------------------------------+
             /                 |                 \
            v                  v                  v
    +---------------+  +---------------+  +---------------+
    |    src/ai     |  | src/database  |  |    src/lib    |
    |  (AI Layer)   |  | (Data Models) |  | (SDK Clients) |
    +---------------+  +---------------+  +---------------+
            \                  |                  /
             v                 v                 v
       +-----------------------------------------------+
       |         src/shared (Common Space Atoms)       |
       +-----------------------------------------------+
```

- **Shared Independence:** `src/shared` is the bottom-most layer and must never import files from any features, routes, databases, or AI engines.

---

# 2. Layer Dependency Rules

## `app` (Routing)

- **Allowed Imports:** Feature components, feature Server Actions, feature services, shared layout containers (`src/shared/components/layout`), global providers, and `src/config`.
- **Forbidden Imports:** Centralized database connections, raw Mongoose models, private Gemini SDK variables, or feature-specific repository helper files.
- **Reason:** Routing pages coordinate layouts and pass variables. They must remain independent of data drivers or AI engines.

## `app/api` (Route Handlers)

- **Allowed Imports:** Feature services, feature repositories, Zod validation schemas, REST types, and `src/config`.
- **Forbidden Imports:** React components (e.g. `Button`), client-side context hooks, or raw Mongoose database models directly.
- **Reason:** Route Handlers are stateless REST endpoints. Importing React layout modules or frontend hooks causes server execution errors.

## `features` (Business Domains)

- **Allowed Imports:** AI generators, AI schemas, database repositories, `src/lib` (Better Auth helper APIs), `src/config`, `src/shared` primitives, and `src/types`.
- **Forbidden Imports:** Routing page templates from `src/app`, other feature folders' raw repositories, or private Gemini credentials variables.
- **Reason:** Features must remain self-contained. Depending on route pages or another feature's internal repository logic breaks domain isolation.

## `database` (Mongoose Persistence)

- **Allowed Imports:** Database connection packages, custom schema plugins, and Mongoose indexing helpers.
- **Forbidden Imports:** React components, Next.js Server Actions, Zod validation schemas, or AI prompts.
- **Reason:** The database layer handles persistence rules. It must not depend on UI rendering engines or validation logic.

## `ai` (Gemini Layer)

- **Allowed Imports:** Zod AI schemas, Gemini SDK client initializers, and prompt text templates.
- **Forbidden Imports:** React components, database models, feature-specific repository helpers, or Route Handlers.
- **Reason:** The AI layer operates as a isolated processing block. Depending on features or UI views prevents it from running independently.

## `lib` (SDK Clients)

- **Allowed Imports:** Raw SDK modules, `src/config` environment parameters, and MongoDB driver configurations.
- **Forbidden Imports:** Next.js Route Handlers, features business logic, or React components.
- **Reason:** Client initializers must remain stateless singleton modules.

## `config` (Environment Variables)

- **Allowed Imports:** Zod schemas.
- **Forbidden Imports:** Any other directory inside `src/`.
- **Reason:** Configuration files must parse first, independently of any database connections or UI components.

## `shared` (Primitives)

- **Allowed Imports:** General utility helpers, Tailwind CSS v4 styling classes, and shared providers context parameters.
- **Forbidden Imports:** Any feature directory (`src/features/*`), database schemas, or AI prompts.
- **Reason:** Shared atoms are reused across the application and must not depend on specific business features.

## `types` (Global Types)

- **Allowed Imports:** None.
- **Forbidden Imports:** Executable JavaScript files, service singletons, or UI component templates.
- **Reason:** Global types must consist of static TypeScript interfaces only.

## `styles` (CSS Layouts)

- **Allowed Imports:** None.
- **Forbidden Imports:** Any JavaScript or TypeScript code files.
- **Reason:** Styling layers are compiled as pure CSS.

---

# 3. Feature Boundary Rules

- **Rule:** Feature A must never import from Feature B directly.
- _Shared Access Exception:_ Shared assets reside in `src/shared` (e.g. shared button).
- _Repository Access Exception:_ If Feature A (Roadmaps) requires data from Feature B (Assessments), it must query the database repository layer (`src/features/assessment/repositories`) rather than importing Feature B's services directly.
- _AI Access Exception:_ Features call the AI layer (`src/ai`) via generators. The AI layer is not allowed to import back from features.

### Example: Roadmap Feature calling Assessment

```typescript
// ❌ FORBIDDEN: Direct coupling to another feature's service logic
import { evaluateDiagnosticScore } from "@/features/assessment/services/assessmentService";

//  ALLOWED: Query the database repository contract for assessment results
import { getLatestAssessmentResult } from "@/features/assessment/repositories/assessmentRepository";
```

---

# 4. Alias Rules

The project uses absolute import aliases to simplify refactoring:

- **Alias Prefix:** `@/` maps directly to the `src/` directory.

### Example:

```typescript
// ❌ FORBIDDEN: Relative parent directory backtracking
import Button from "../../../shared/components/ui/Button";

//  ALLOWED: Absolute path alias mapping
import Button from "@/shared/components/ui/Button";
```

- **Relative Path Exception:** Relative path imports are permitted only when referencing sibling files within the same directory (e.g. `import styles from "./styles.module.css"`).

---

# 5. Client vs. Server Imports

We enforce a strict boundary between client-side files and server-side components:

- **Client Boundary:** Components using `'use client'` must not import server-only libraries or utilities (e.g. database connections, Gemini API).
- **Server Boundary:** Server-only functions (like API Route Handlers or Server Actions) are flagged with the `server-only` directive.

### Forbidden Examples:

```typescript
// ❌ FORBIDDEN: Client component importing the database
import { AssessmentModel } from "@/database/models/Assessment";

// ❌ FORBIDDEN: Client component importing the Gemini client SDK
import { geminiClient } from "@/lib/gemini/client";

// ❌ FORBIDDEN: Client component importing Better Auth server-side verification hooks
import { auth } from "@/lib/auth/server";
```

---

# 6. Database Import Rules

- **Rule:** No direct database model imports inside UI components.
- **Encapsulation Flow:** Presentation Layer -> Feature Repositories -> Centralized Database Models.

```typescript
// ❌ FORBIDDEN: React view calling Mongoose model directly
export default function AssessmentView() {
  const data = await AssessmentModel.find({}); // Direct DB fetch in view
}

//  ALLOWED: Route handler or server component invoking repository query helper
import { fetchActiveAssessments } from "@/features/assessment/repositories/assessmentRepository";
export default async function Page() {
  const data = await fetchActiveAssessments();
}
```

---

# 7. AI Layer Import Rules

- **Unidirectional AI Flow:** Features import generators from the AI layer (`src/ai/generators`). The AI layer must remain blind to feature code and UI layouts.
- **Directives:**
  - AI prompt configurations are static text assets.
  - AI code must never import React components.
  - AI normalizers must not import Route Handlers.

---

# 8. Shared Module Rules

- **Rule:** Primitives inside `src/shared` must not hold state or business logic.
- _Components:_ UI components are pure presentational blocks.
- _Hooks:_ Custom hooks manage UI behaviors only (e.g., debounce) and must remain independent of data schemas.
- _Utils:_ Utilities are pure functions without side effects.
- _Providers:_ Context providers distribute states (e.g., theme toggle) and must not execute database queries.

---

# 9. Circular Dependency Prevention

Circular dependencies occur when File A imports File B, which directly or indirectly imports File A.

- **Common Cause:** Barrel files (`index.ts`) importing and exporting sibling modules in the same directory.
- **Prevention:**
  - Ensure all imports follow the unidirectional dependency flow.
  - Avoid using global barrel files at root levels.
  - Use ESLint rules (`no-cycle`) to detect circular dependencies during building.

### Circular Dependency Example:

```
// ❌ CIRCULAR LOOP:
// AssessmentService imports RoadmapService (to update study roadmaps based on scores)
// RoadmapService imports AssessmentService (to query diagnostic results templates)
```

- _Resolution:_ Decouple the services. Route Handlers call `AssessmentService.evaluate()`, retrieve the result, and pass it to `RoadmapService.generate()`.

---

# 10. Barrel Files (`index.ts`)

- **Allowed Use:** Barrel files are permitted only within shared primitive folders (e.g., `src/shared/components/ui/index.ts`) to simplify importing common components.
- **Prohibited Use:** Do not use barrel files at the feature module level (`src/features/resume/index.ts`), as this can lead to circular dependencies.

---

# 11. Dynamic Imports

Use dynamic imports (`next/dynamic` and `React.lazy`) to reduce initial bundle size:

- _Implementation:_ Load interactive or heavy UI components dynamically to ensure fast initial page load.

---

# 12. Lazy Loading Strategy

The following heavy assets must be loaded using dynamic, lazy loading:

1.  **Mock Interview Cockpit:** Code execution terminals and visual recorders.
2.  **Resume ATS Dial:** SVG dashboards and chart visualizers.
3.  **Prompt Workspace:** Prompt preview interfaces and custom markdown editors.

---

# 13. Third-party Imports

Enforce a strict import ordering standard to ensure readability:

1.  **React Core:** `import React, { useState } from "react";`
2.  **Next.js Core Modules:** `import Link from "next/link";`
3.  **Third-Party Libraries:** `import mongoose from "mongoose";`
4.  **Absolute Aliased Modules:** `import Button from "@/shared/components/ui/Button";`
5.  **Relative Sibling Modules:** `import styles from "./layout.module.css";`

### Example Import Block:

```typescript
import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";

import Button from "@/shared/components/ui/Button";
import { getLatestAssessmentResult } from "@/features/assessment/repositories/assessmentRepository";

import styles from "./AssessmentCard.module.css";
```

---

# 14. ESLint Import Rules

The project configuration enforces the following ESLint rules:

- `no-cycle`: Blocks build execution if circular dependencies are detected.
- `import/order`: Enforces the correct ordering sequence for imports.
- `no-duplicates`: Merges duplicate import declarations from the same file.
- `consistent-type-imports`: Enforces the use of `import type` when only types are imported, improving build times.

---

# 15. Common Import Mistakes

- **Component Imports Database:** A client-side view component directly importing a Mongoose schema model.
- **Shared Imports Feature:** A shared button component importing configuration parameters from the `auth` feature.
- **AI Imports UI:** The AI roadmap generator importing a React layout wrapper.
- **Feature Imports Feature:** The mock interview module directly importing a service class from the resume feature.

---

# 16. Import Review Checklist

- [ ] Imports follow the unidirectional dependency flow.
- [ ] No client-side component (using `'use client'`) imports server-only utilities.
- [ ] UI components do not import Mongoose database models directly.
- [ ] No feature imports code directly from another feature's folder.
- [ ] Import blocks follow the standard ordering sequence.
- [ ] No circular dependencies are detected by the build tools.

---

Version: 1.0
Status: Phase 11.6 — Import Rules
