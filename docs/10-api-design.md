# Phase 10 — API Design Specification (Next.js 16, Mongoose, & Better Auth)

This specification defines the Next.js Route Handlers APIs, session verification protocols, request/response schemas, error handling, validation constraints, and endpoint contracts for Version 1 of the **LifeGuide AI Backend**.

---

# 1. API Overview

The API layer is exposed via Next.js 16 Route Handlers, written in TypeScript and integrated with Mongoose and Better Auth.

- **Protocol:** HTTPS-only RESTful API.
- **Format:** JSON payloads, camelCase keys, lowercase snake_case routes.
- **Authentication:** Session-based authentication using HTTP-only cookies managed via **Better Auth**.

---

# 2. API Architecture

Next.js 16 App Router Route Handlers serve requests directly, utilizing Mongoose middleware to query MongoDB Atlas.

```
       +---------------------------------------------+
       |         Client Applications (Web / Ext)     |
       +---------------------------------------------+
                              | (HTTPS Session Cookies)
                              v
       +---------------------------------------------+
       |         Next.js 16 Route Handlers           |
       |     - Session Verification Middleware       |
       |     - Zod Request Validations               |
       +---------------------------------------------+
           /                  |                  \
          v                   v                   v
   +---------------+  +---------------+  +---------------+
   | MongoDB Atlas |  |  Cloudinary   |  |  Gemini 2.5   |
   |  (via Mongoose)  |  (Direct SDK) |  |   Flash API   |
   +---------------+  +---------------+  +---------------+
```

---

# 3. Authentication Flow (Better Auth)

Better Auth manages credentials validation and session issuance.

1.  **Client Post:** Candidate submits credentials to `/api/v1/auth/signin`.
2.  **Session Creation:** Better Auth validates passwords, creates a session document in the database, and sets an encrypted HTTP-only session cookie.
3.  **Authentication Header:** None. Browser automatically attaches the cookie to subsequent requests.

---

# 4. Session Flow

- **Cookie Key:** `better-auth.session_token`
- **Attributes:** `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict`), `Path=/`.
- **Lifecycle:** Expires matching session duration configurations (default: 7 days).
- **CSRF Checks:** Better Auth validates incoming headers to prevent cross-site request forgery.

---

# 5. Standard Request & Response Format

### Header Defaults

```http
Content-Type: application/json
Accept: application/json
```

### Standard Response Envelope

```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2026-07-18T14:48:00Z"
  }
}
```

---

# 6. Error Response Format

Failed validations, missing items, or authentication errors return standard HTTP status codes wrapped in a uniform envelope:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "One or more input values are invalid.",
    "details": [
      {
        "path": "email",
        "message": "Invalid email address format."
      }
    ]
  },
  "meta": {
    "timestamp": "2026-07-18T14:48:00Z"
  }
}
```

### Standard Error Codes

- `UNAUTHENTICATED`: Missing or expired session cookie.
- `UNAUTHORIZED`: Session user role lacks RBAC permissions.
- `NOT_FOUND`: Resource UUID does not exist.
- `VALIDATION_FAILED`: Request body parameters failed Zod schemas checking.
- `AI_SERVICE_ERROR`: Gemini API query timeouts.

---

# 7. Validation Strategy

- **Engine:** **Zod** schema parser middleware.
- **Process:** Route handlers parse `req.json()` payloads against Zod validation models prior to executing database write operations. Invalid inputs throw `VALIDATION_FAILED` errors immediately.

---

# 8. Authentication & Authorization

- **Middleware:** Route handlers verify active session instances using Better Auth's server context helper (`auth.api.getSession({ headers })`).
- **Access Checks:** User roles are parsed from the session context (e.g. `role: 'candidate'` or `'superadmin'`) to enforce RBAC rules.

---

# 9. Rate Limiting Strategy

- **Mechanism:** Rate limiting will be implemented using middleware or deployment platform capabilities (such as Vercel). Future versions may use Redis for distributed rate limiting.
- **Authenticated Candidate:** 120 requests/minute.
- **Anonymous Authentication:** 10 requests/minute per IP.
- **AI Integrations:** 5 requests/minute per user account.

---

# 10. Pagination, Filtering, Sorting & Search

- **Pagination:** Keyset model pagination. Query accepts `limit` (max 100) and `cursor` (ObjectId string).
- **Filtering:** `?status=completed` format parameters.
- **Sorting:** `?sort=-createdAt` (descending chronological) or `?sort=createdAt` (ascending chronological).
- **Search:** `?q=react` fuzzy search terms matching MongoDB Atlas Search profiles.

---

# 11. File Upload Strategy (Cloudinary)

1.  **Request Signature:** Candidate requests signature credentials from Next.js server `/api/v1/resumes/upload`.
2.  **Direct Upload:** Client uploads PDF files directly to **Cloudinary** using the signature and API keys.
3.  **Metadata Post:** Client posts the returned Cloudinary URL and file properties metadata to the API backend to update database profile states.

---

# 12. AI Integration (Gemini)

- **Model:** **Gemini 2.5 Flash** (via `@google/generative-ai` SDK).
- **Execution:** Next.js Route Handlers securely communicate with the Gemini 2.5 Flash API using server-side environment variables. System prompts enforce strict JSON structured output requirements.

---

# 13. API Versioning

- **URL Path Prefixing:** Prefixed path routing structure: `/api/v1`.
- _Example Route:_ `/api/v1/profile`

---

# 14. Security Best Practices

- **HSTS Headers:** Enforce secure HTTPS redirection rules.
- **CSRF Protection:** Managed natively via Better Auth cookie controls.
- **No SQL/NoSQL Injections:** Zod validations reject malicious operators (e.g. `$ne` or `$gt` filters queries inside parameters).
- **XSS Protection:** Outputs sanitize markdown blocks before client page rendering.

---

# 15. API Endpoints (Version 1)

---

## Authentication APIs

### Sign Up

- **Method:** `POST`
- **Route:** `/api/v1/auth/signup`
- **Purpose:** Register a new candidate account.
- **Authentication Required:** No.
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "John Doe"
}
```

- **Validation Rules:** Valid email format. Password size minimum: 8 characters, requiring number, capital, and special characters. Name must be non-empty.
- **Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "userId": "60c72b2f9b1d8a23a41d8a21",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

- **Error Responses:** `400 Bad Request` (Email already registered, validation failed).

### Sign In

- **Method:** `POST`
- **Route:** `/api/v1/auth/signin`
- **Purpose:** Authenticate credentials and set session cookie.
- **Authentication Required:** No.
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

- **Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60c72b2f9b1d8a23a41d8a21",
      "email": "user@example.com"
    }
  }
}
```

- **Set-Cookie Header:** `better-auth.session_token=...; HttpOnly; Secure; SameSite=Lax; Path=/`
- **Error Responses:** `401 Unauthorized` (Invalid credentials).

### Sign Out

- **Method:** `POST`
- **Route:** `/api/v1/auth/signout`
- **Purpose:** Clear current session tokens.
- **Authentication Required:** Yes.
- **Response (200 OK):** Clears cookie.

### Get Current User

- **Method:** `GET`
- **Route:** `/api/v1/auth/me`
- **Purpose:** Retrieve session details.
- **Authentication Required:** Yes.
- **Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "60c72b2f9b1d8a23a41d8a21",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

## Profile APIs

### Get Profile

- **Method:** `GET`
- **Route:** `/api/v1/profile`
- **Purpose:** Fetch onboarding profile parameters.
- **Authentication Required:** Yes.
- **Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "targetCareerTrack": "Frontend Engineer",
    "skillLevel": "novice",
    "weeklyAvailabilityHours": 15,
    "preferences": {
      "focus": "React"
    }
  }
}
```

### Update Profile

- **Method:** `PATCH`
- **Route:** `/api/v1/profile`
- **Purpose:** Modify profile target variables.
- **Authentication Required:** Yes.
- **Request Body:**

```json
{
  "weeklyAvailabilityHours": 20
}
```

- **Response (200 OK):** Returns updated profile parameters.

---

## Assessment APIs

### Start Assessment

- **Method:** `POST`
- **Route:** `/api/v1/assessments/start`
- **Purpose:** Initialize diagnostic questionnaire and return session ID tracker.
- **Authentication Required:** Yes.
- **Request Body:** `{ "assessmentId": "60c72b2f9b1d8a23a41d8a26" }`
- **Response (200 OK):** Returns dynamic diagnostic tracking ID: `{ "resultId": "60c72b2f9b1d8a23a41d8a27" }`.

### Submit Assessment

- **Method:** `POST`
- **Route:** `/api/v1/assessments/submit`
- **Purpose:** Submit answers and compile results via Gemini.
- **Authentication Required:** Yes.
- **Request Body:**

```json
{
  "resultId": "60c72b2f9b1d8a23a41d8a27",
  "answers": [{ "questionId": "q-1", "selectedOption": "A" }]
}
```

- **Response (200 OK):** Returns overall score results details.

### Get Assessment Result

- **Method:** `GET`
- **Route:** `/api/v1/assessments/result/:id`
- **Purpose:** Fetch diagnostics score results and gaps.
- **Authentication Required:** Yes.
- **Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "overallScore": 85.0,
    "skippedCount": 0,
    "skillsBreakdown": { "React": 90 }
  }
}
```

---

## Learning Roadmap APIs

### Generate Roadmap

- **Method:** `POST`
- **Route:** `/api/v1/roadmaps/generate`
- **Purpose:** AI generation of customized learning roadmaps based on diagnostic results.
- **Authentication Required:** Yes.
- **Response (201 Created):** Returns generated curriculum timeline layout.

### Get Roadmap

- **Method:** `GET`
- **Route:** `/api/v1/roadmaps`
- **Purpose:** Fetch active user roadmap timeline.
- **Authentication Required:** Yes.
- **Response (200 OK):** Returns milestones array, lessons list, and progress indicators.

### Update Progress

- **Method:** `PATCH`
- **Route:** `/api/v1/roadmaps/progress`
- **Purpose:** Check off specific timeline resource cards.
- **Authentication Required:** Yes.
- **Request Body:**

```json
{
  "milestoneId": "60c72b2f9b1d8a23a41d8a29",
  "resourceId": "60c72b2f9b1d8a23a41d8a30",
  "isCompleted": true
}
```

- **Response (200 OK):** Progress updated.

---

## Project Generator APIs

### Generate Project

- **Method:** `POST`
- **Route:** `/api/v1/projects/generate`
- **Purpose:** AI compilation of a customized portfolio project brief targeting skill gaps.
- **Authentication Required:** Yes.
- **Response (201 Created):** Returns project brief template data.

### Get Project

- **Method:** `GET`
- **Route:** `/api/v1/projects/:id`
- **Purpose:** Retrieve project brief details.
- **Authentication Required:** Yes.
- **Response (200 OK):** Returns project brief details.

### Update Project Progress

- **Method:** `PATCH`
- **Route:** `/api/v1/projects/progress/:id`
- **Purpose:** Toggle specific project feature tasks as completed.
- **Authentication Required:** Yes.
- **Request Body:** `{ "completedTasks": ["task-1", "task-2"] }`
- **Response (200 OK):** Progress saved.

---

## Resume APIs

### Upload Resume

- **Method:** `POST`
- **Route:** `/api/v1/resumes/upload`
- **Purpose:** Generate a Cloudinary signature payload for direct uploads.
- **Authentication Required:** Yes.
- **Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "signature": "cloud-sig-string...",
    "timestamp": 1721314140,
    "apiKey": "cloudinary-api-key"
  }
}
```

### ATS Analysis

- **Method:** `POST`
- **Route:** `/api/v1/resumes/analyze`
- **Purpose:** Parse Cloudinary resume URL against target job descriptions using Gemini.
- **Authentication Required:** Yes.
- **Request Body:**

```json
{
  "cloudinaryUrl": "https://res.cloudinary.com/...",
  "jobDescription": "Pasted job parameters..."
}
```

- **Response (200 OK):** Returns matching score breakdown and missing keywords.

### Improve Resume

- **Method:** `POST`
- **Route:** `/api/v1/resumes/improve`
- **Purpose:** AI optimization suggestions for resume experiences.
- **Authentication Required:** Yes.
- **Request Body:** `{ "bulletText": "I built a web page." }`
- **Response (200 OK):** Returns improved suggestions formats options.

---

## Interview APIs

### Start Interview

- **Method:** `POST`
- **Route:** `/api/v1/interviews/start`
- **Purpose:** Launch mock interview loops simulator.
- **Authentication Required:** Yes.
- **Request Body:** `{ "interviewType": "coding" }`
- **Response (200 OK):** Returns simulator `sessionId`.

### Submit Answer

- **Method:** `POST`
- **Route:** `/api/v1/interviews/answer`
- **Purpose:** Save submitted mock answer values.
- **Authentication Required:** Yes.
- **Request Body:**

```json
{
  "sessionId": "session-uuid",
  "questionId": "q-1",
  "answerText": "My response text..."
}
```

- **Response (200 OK):** Answer saved.

### Finish Interview

- **Method:** `POST`
- **Route:** `/api/v1/interviews/finish`
- **Purpose:** Finalize mock interview simulator loops.
- **Authentication Required:** Yes.
- **Request Body:** `{ "sessionId": "session-uuid" }`
- **Response (200 OK):** Evaluates sessions inputs via Gemini.

### Get Interview Result

- **Method:** `GET`
- **Route:** `/api/v1/interviews/result/:id`
- **Purpose:** Retrieve detailed scores breakdown metrics.
- **Authentication Required:** Yes.
- **Response (200 OK):** Returns results metrics payload.

---

## Notes APIs

### Create Note

- **Method:** `POST`
- **Route:** `/api/v1/notes`
- **Purpose:** Save study note.
- **Authentication Required:** Yes.
- **Request Body:**

```json
{
  "learningResourceId": "60c72b2f9b1d8a23a41d8a30",
  "noteText": "CSS layout notes..."
}
```

- **Response (201 Created):** Note saved.

### Get Notes

- **Method:** `GET`
- **Route:** `/api/v1/notes`
- **Purpose:** List user saved notes.
- **Authentication Required:** Yes.
- **Query Parameters:** `?cursor=last-id&limit=20`
- **Response (200 OK):** Returns paginated notes array.

### Update Note

- **Method:** `PUT`
- **Route:** `/api/v1/notes/:id`
- **Purpose:** Overwrite note content.
- **Authentication Required:** Yes.
- **Request Body:** `{ "noteText": "Updated note..." }`
- **Response (200 OK):** Note updated.

### Delete Note

- **Method:** `DELETE`
- **Route:** `/api/v1/notes/:id`
- **Purpose:** Delete specific note.
- **Authentication Required:** Yes.
- **Response (204 No Content):** Returns empty.

---

## Bookmarks APIs

### Create Bookmark

- **Method:** `POST`
- **Route:** `/api/v1/bookmarks`
- **Purpose:** Bookmark target roadmap resource.
- **Authentication Required:** Yes.
- **Request Body:** `{ "learningResourceId": "60c72b2f9b1d8a23a41d8a30" }`
- **Response (201 Created):** Resource bookmarked.

### Get Bookmarks

- **Method:** `GET`
- **Route:** `/api/v1/bookmarks`
- **Purpose:** List user bookmarks collections.
- **Authentication Required:** Yes.
- **Response (200 OK):** Returns bookmarks list array.

### Delete Bookmark

- **Method:** `DELETE`
- **Route:** `/api/v1/bookmarks/:id`
- **Purpose:** Delete specific bookmark.
- **Authentication Required:** Yes.
- **Response (204 No Content):** Bookmark removed.

---

## Notifications APIs

### Get Notifications

- **Method:** `GET`
- **Route:** `/api/v1/notifications`
- **Purpose:** Fetch unread notifications.
- **Authentication Required:** Yes.
- **Response (200 OK):** Returns notifications list.

### Mark As Read

- **Method:** `PATCH`
- **Route:** `/api/v1/notifications/:id/read`
- **Purpose:** Mark specific alert as read.
- **Authentication Required:** Yes.
- **Response (200 OK):** Status updated.

---

## Admin APIs

### Get Dashboard Stats

- **Method:** `GET`
- **Route:** `/api/v1/admin/stats`
- **Purpose:** Fetch overall candidate NPS and registration statistics metrics.
- **Authentication Required:** Yes.
- **Roles Allowed:** `superadmin`, `support`
- **Response (200 OK):** Returns statistics metrics.

### Manage Feature Flags

- **Method:** `POST`
- **Route:** `/api/v1/admin/flags`
- **Purpose:** Configure flag toggles dynamically.
- **Authentication Required:** Yes.
- **Roles Allowed:** `superadmin`
- **Request Body:** `{ "flagKey": "enable_beta_ai", "isEnabled": true }`
- **Response (200 OK):** Flag status saved.

---

# Design Standards & Strategies

### API Naming Convention

- **Path Rules:** Plural nouns (e.g. `/api/v1/roadmaps`, `/api/v1/bookmarks`).
- **Custom Toggles:** Custom verbs for actions (e.g. `/api/v1/auth/signin`).

### REST Standards

- API returns standard envelopes wrapping `data` keys. Empty relations resolve to `[]` arrays.

### Idempotency Rules

POST transactions (such as launching assessments, generating AI roadmaps, creating AI projects, or starting mock interviews) support the `Idempotency-Key` request header to prevent duplicate submissions caused by retries or network failures.

For Version 1, idempotency is handled at the application level.

Future versions may use Redis or another distributed cache for advanced idempotency support.

### Webhook Strategy (Future)

- Integrations webhooks verify SHA256 security signatures keys.

### API Performance Strategy

- **Mongoose Leans:** Queries implement `.lean()` when writes updates are omitted.
- **Optimized Queries:** Zod parameters validation limits prevents database search overhead.

### API Security Checklist

- [ ] Verify active session tokens on all endpoints.
- [ ] Require HTTPS and HSTS headers.
- [ ] Restrict CORS access to trusted domains.
- [ ] Validate parameter strings structure with Zod.
- [ ] Limit payload body size cap to 5MB.

### Logging Strategy

- Outputs structured JSON variables logs. Strip password hashes and candidate profile emails before printing.

### Monitoring Strategy

- OpenTelemetry integrates trace analysis reporting metrics to APM.

### API Documentation Strategy

- OpenAPI 3.0 specification is planned for future versions. Swagger documentation is optional for Version 1 and may be added after the initial release.

### Future GraphQL Readiness

- Next.js Route Handlers map data operations via repositories, allowing GraphQL resolvers linkage directly.

### Future Microservice Readiness

- Module directories are segregated by routes (Auth, Roadmaps, Projects, Resumes), enabling future extraction to discrete microservices.

---

Version: 1.0
Status: Ready for Backend Development
Next Phase: Phase 11 – Folder Structure
