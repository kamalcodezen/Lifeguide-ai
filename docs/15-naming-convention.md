# Phase 11.5 — Naming Convention

This handbook defines the architectural naming standards for the **LifeGuide AI** project. All developers must adhere strictly to these conventions to maintain clean, self-documenting code.

---

# 1. Standard Case Glossary

The codebase uses specific naming casing patterns depending on the context:

- `PascalCase`: First letter of each word capitalized (e.g. `ResumeSelector`). Used for UI components, Types, Interfaces, and Mongoose Models.
- `camelCase`: First letter lowercase, subsequent words capitalized (e.g. `isSessionValid`). Used for variables, functions, hooks, custom methods, and properties.
- `kebab-case`: All lowercase, hyphenated words (e.g. `resume-analyzer`). Used for folders, route paths, files, database collections, and Git branches.
- `SCREAMING_SNAKE_CASE`: All uppercase, words split with underscores (e.g. `GEMINI_API_KEY`). Used for global configurations constants and environment variables.

---

# 2. Category Specifications

## Project

- **Convention:** `kebab-case` only.
- **Rule:** Standardize names using lowercase, alphanumeric words separated by single hyphens.
- **Example:** `lifeguide-ai` (Project Name), `lifeguide-ai-monolith` (Repository Name).
- **Avoid:** `LifeGuide_AI` (snake_case/PascalCase mix) or `lifeguideai` (unseparated).
- **Best Practice:** Keep project identifiers under three words to ensure easy console directory listings.

## Folder Naming

- **Convention:** `kebab-case` (features, shared components) and Next.js App Router conventions.
- **Rule:** Feature folders use `kebab-case`. Route groups use brackets `(group)`. Dynamic routes use square brackets `[slug]`. API routing endpoints use `kebab-case`.
- **Example:** `src/features/resume-matching`, `src/app/(dashboard)/roadmap`, `src/app/api/v1/assessments`.
- **Avoid:** `src/features/resumeMatching` (camelCase) or `src/app/api/v1/Assessments` (PascalCase).
- **Best Practice:** Folders must contain singular or plural nouns. Do not mix pluralization rules within routing groups (e.g., choose either `assessments` or `roadmap` consistently).

## File Naming

- **Convention:** Match naming style to export contents.
- **Rule:** React components use `PascalCase.tsx`. Functions and helper utility scripts use `camelCase.ts`. Next.js layout structures use exact routing naming terms (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`).
- **Example:** `ResumeCard.tsx` (Component), `getCloudinarySignature.ts` (Utility), `page.tsx` (Route page).
- **Avoid:** `resumeCard.tsx` (camelCase component) or `Getcloudinarysignature.ts` (Mixed casing utility).
- **Best Practice:** File names must exactly mirror their main export. If a file exports `function formatCurrency`, the file name must be `formatCurrency.ts`.

## React

- **Convention:** `PascalCase`.
- **Rule:** Components, contexts, and providers use `PascalCase`. Props definitions append `Props` suffix to the component name. Context interfaces append `Context` suffix.
- **Example:** `ResumeViewer` (Component), `ResumeViewerProps` (Props interface), `ThemeContext` (Context), `ThemeProvider` (Provider).
- **Avoid:** `resume_viewer` (snake_case component) or `ViewerProps` (Generic, non-descriptive props name).
- **Best Practice:** React files must contain only one export component per file to ensure single-responsibility boundaries.

## Hooks

- **Convention:** `camelCase` with `use` prefix.
- **Rule:** Custom client-side hooks must prepend the word `use` followed by the target action.
- **Example:** `useLocalStorage` (Shared hook), `useResumeUpload` (Feature-specific upload hook).
- **Avoid:** `getResumeUpload` (Non-hook verb prefix) or `use_local_storage` (snake_case hook).
- **Best Practice:** Keep hook names focused on behaviors. Avoid generic names like `useData` or `useHelper`.

## Server Actions

- **Convention:** `camelCase` with action verb prefix.
- **Rule:** Functions executing server transitions use `camelCase`, beginning with verbs (e.g. `save`, `update`, `delete`, `submit`).
- **Example:** `saveAssessmentAnswers`, `updateCandidateProfile`.
- **Avoid:** `assessmentSubmit` (Noun-first structure) or `run_save_answers` (snake_case wrapper).
- **Best Practice:** Always structure Server Actions to use explicit verbs, identifying the target database mutation cleanly.

## Services

- **Convention:** `camelCase` with `Service` suffix.
- **Rule:** Exported business services or singleton classes must append the term `Service` to their domain name.
- **Example:** `resumeParserService`, `atsScoreService`.
- **Avoid:** `Parser` (Omitted suffix) or `ATS_Scorer_Service` (SCREAMING_SNAKE_CASE).
- **Best Practice:** Services must focus on single domain tasks. Keep them stateless to simplify unit testing.

## Repositories

- **Convention:** `camelCase` with `Repository` suffix.
- **Rule:** Database repository helpers wrapping Mongoose calls must append `Repository` to the domain name.
- **Example:** `userProfileRepository`, `learningRoadmapRepository`.
- **Avoid:** `profileDbAccess` (Non-standard suffix) or `profile_repo` (Abbreviated snake_case).
- **Best Practice:** Never expose raw Mongoose model APIs beyond repositories. The repository name should clearly state the target domain entity.

## Database

- **Convention:** `kebab-case` (Collections), `PascalCase` (Mongoose Models), and `camelCase` (Plugins).
- **Rule:** MongoDB Atlas collections use plural `kebab-case`. Mongoose schema instances use singular `PascalCase`. Mongoose database plugins use `camelCase` with `Plugin` suffix.
- **Example:** `assessment-results` (Collection), `AssessmentResult` (Mongoose model), `softDeletePlugin` (Plugin).
- **Avoid:** `AssessmentResults` (PascalCase collection name) or `soft_delete` (snake_case plugin name).
- **Best Practice:** Mongoose models must match their singular filename mapping (e.g. model `User` defined inside `User.ts` file).

## AI

- **Convention:** `kebab-case` (Prompt files), `camelCase` (Generators, Parsers, Providers).
- **Rule:** Raw prompt template files use `.txt` formats with `kebab-case`. AI generators append `Generator` suffix. AI output parsers append `Parser` suffix. Client SDK connectors append `Provider`.
- **Example:** `react-developer-assessment.txt` (Prompt file), `roadmapGenerator` (Generator), `resumeAiParser` (Parser), `geminiAiProvider` (Provider).
- **Avoid:** `gemini_api_client` (Omitted standard suffix) or `roadMap_Generator` (CamelCase typo).
- **Best Practice:** AI layer entities must explicitly include `Generator`, `Parser`, or `Provider` suffixes.

## Validation

- **Convention:** `camelCase` with `Schema` suffix.
- **Rule:** Zod schema objects must append `Schema` to identify themselves as verification schemas.
- **Example:** `signUpSchema`, `updateProfileSchema`.
- **Avoid:** `validateSignUp` (Verb named schema) or `signUpValidator` (Incorrect suffix).
- **Best Practice:** Export schema validators using descriptive domain names, matching the corresponding API endpoint body.

## Types

- **Convention:** `PascalCase`.
- **Rule:** TypeScript interfaces, types, enums, and generic types must use `PascalCase`. Interfaces do NOT prepend `I`. Type generic parameters use capital `T` prefix or descriptive names.
- **Example:** `UserProfile` (Interface), `SkillRating` (Type), `CareerDifficulty` (Enum), `DataResponse<T>` (Generic).
- **Avoid:** `IUserProfile` (Prepend I pattern) or `user_profile_type` (snake_case).
- **Best Practice:** Always use PascalCase for types. Avoid naming types using abbreviations (e.g., use `AssessmentQuestion` instead of `AssessQ`).

## Utilities

- **Convention:** `camelCase`.
- **Rule:** Pure functions, string formatters, and data parsers use `camelCase` with active verb prefixes.
- **Example:** `formatExecutionDate`, `parseCloudinaryUrl`.
- **Avoid:** `DateFormatter` (PascalCase utility) or `clean_data` (snake_case helper).
- **Best Practice:** Keep helper utility names descriptive. Ensure the name states what is formatted or parsed.

## Constants

- **Convention:** `SCREAMING_SNAKE_CASE`.
- **Rule:** Global static configuration values, enum constants arrays, and default boundary maps use `SCREAMING_SNAKE_CASE`.
- **Example:** `MAX_UPLOAD_SIZE_BYTES`, `AVAILABLE_THEMES`.
- **Avoid:** `maxUploadSize` (camelCase configuration) or `ThemesArray` (PascalCase constant).
- **Best Practice:** Place constants in centralized configurations to prevent hard-coding values inline.

## Environment Variables

- **Convention:** `SCREAMING_SNAKE_CASE`.
- **Rule:** Client-exposed environment variables must start with the prefix `NEXT_PUBLIC_`. Private server variables do not use this prefix.
- **Example:** `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (Client-exposed), `MONGODB_URI` (Private server).
- **Avoid:** `next_public_mongodb_uri` (Lowercase/private key leakage risk) or `GeminiKey` (Non-screaming key).
- **Best Practice:** Double check that no private key (such as `GEMINI_API_KEY`) is ever prefixed with `NEXT_PUBLIC_`.

## API

- **Convention:** `kebab-case` routes and `camelCase` query parameters.
- **Rule:** REST endpoints paths use plural `kebab-case` nouns. URL query string keys use `camelCase`.
- **Example:** `/api/v1/assessment-results`, `/api/v1/users/profile?unreadOnly=true`.
- **Avoid:** `/api/v1/update_user` (Verb snake_case endpoint) or `?unread_only=true` (snake_case parameter).
- **Best Practice:** API paths must represent resources. Custom triggers must append active action paths (e.g. `/api/v1/auth/signout`).

## Git

- **Convention:** `kebab-case` (Branches) and Conventional Commits standards (Commits & PRs).
- **Rule:** Branches use a type prefix followed by a hyphenated description. Commits use standard Conventional Commit prefixes.
- **Example:** `feat/resume-ats-calculator` (Branch), `feat(resume): add keyword density scoring logic` (Commit), `feat(auth): integrate Better Auth credential adapter` (PR Title).
- **Avoid:** `feat/ResumeScorer` (PascalCase branch) or `fixed login bugs` (Non-conventional commit).
- **Best Practice:** Keep branch names and pull request titles descriptive and aligned with target ticket parameters.

## Testing

- **Convention:** Match source file name with target test suffixes.
- **Rule:** Test files append `.test.ts(x)` or `.spec.ts` suffix. Mock files append `Mock` to identify as mock scripts. Fixtures append `Fixture`.
- **Example:** `resumeParserService.test.ts`, `geminiAiProviderMock.ts`, `candidateProfileFixture.json`.
- **Avoid:** `test-resume-parser.ts` (Incorrect prefix naming style) or `resume-parser-tests.ts`.
- **Best Practice:** Colocate test files alongside their target source file to ensure visible coverage.

---

# 3. Common Developer Mistakes

- **Mixed Casing in Components:** Creating components like `assessmentProgress.tsx` instead of `AssessmentProgress.tsx` breaks Next.js build compilation setups on Unix-based hosting servers due to case sensitivity.
- **Prepend I to Interfaces:** Defining `interface IUserProfile` instead of `interface UserProfile` violates standard TypeScript clean-coding guidelines.
- **Leaking Server Variables:** Naming private key fields like `NEXT_PUBLIC_GEMINI_API_KEY` exposes proprietary keys directly to browser clients.
- **API Action Endpoints:** Structuring API paths as `/api/v1/getResumes` instead of `/api/v1/resumes` (with HTTP method `GET`) violates standard RESTful resource design rules.

---

# 4. Coding Checklist

- [ ] React components are in `PascalCase.tsx` format.
- [ ] Database model filenames are singular (e.g. `User.ts`, model name `User`).
- [ ] API routes parameters and JSON payloads use `camelCase` keys.
- [ ] API endpoints routes are plural `kebab-case` nouns (e.g. `/api/v1/notifications`).
- [ ] Environmental credentials variables do NOT prepend `NEXT_PUBLIC_` unless specifically intended for browser exposure.
- [ ] All custom hooks use `use` prefixes (e.g. `useDebounce.ts`).
- [ ] Zod schema names append `Schema` suffix.

---

Version: 1.0
Status: Phase 11.5 — Naming Convention
