# Phase 09 — Database Design Specification (MongoDB & Mongoose)

This specification defines the database architecture, document schema structures, indexing configurations, aggregation methodologies, security guidelines, and sync behaviors for the **LifeGuide AI Backend** built on **MongoDB Atlas** and **Mongoose**.

---

# Purpose

The database layer serves as the single source of truth for all career roadmap tracks, mock assessment diagnostics, ATS resume grades, and portfolio project submissions. It must:

1. **Leverage Document Modeling:** Maximize read performance by embedding related models (e.g. milestones inside roadmaps) to prevent multiple database queries.
2. **Handle Dynamic Content:** Use flexible schemas to store complex AI-generated models (parsed resumes, simulated chat logs, custom specifications grids).
3. **Assert Data Integrity:** Guard document validity using Mongoose schema-level validations, custom regex validation checks, and enum boundaries.
4. **Optimize Read/Write Paths:** Implement indexing profiles (compound keys, TTL, and text matching indices) to ensure sub-100ms API response latency.

---

# Database Architecture

The data tier runs on **MongoDB Atlas** (serverless cluster or replica sets), configured for high availability and low-latency reads.

```
                  +--------------------------------+
                  |  Client Apps (Web, Extension)  |
                  +--------------------------------+
                                  |
                                  v
                  +--------------------------------+
                  |    Next.js 16 Server Actions   |
                  +--------------------------------+
                     /                          \
       (Read / Write) /                            \ (Cache hit / Session)
                   v                              v
    +------------------------------+     +-------------------------------+
    |   MongoDB Atlas Database     |     |  Memory Cache Store (Redis)   |
    |   (Primary & Secondary sets) |     |  - User streaks & sessions    |
    +------------------------------+     +-------------------------------+
```

---

# Why MongoDB

- **Document-Resource Fit:** Hierarchical data models (like a learning curriculum containing weeks, topics, and resource cards) map naturally to JSON documents.
- **Rapid Development Lifecycle:** Schema mutations are managed natively via Mongoose, bypassing complex SQL table migrations.
- **Scaling:** Atlas handles auto-sharding and replication across cloud zones natively.
- **JSON Native:** Eliminates the overhead of JSONB serialization/deserialization.
- **Atlas Search:** Provides native, Lucene-backed full-text search directly on collections without requiring separate Elasticsearch clusters.

---

# Collections

Every collection includes these standard audit fields:

- `createdAt` (Date, required, default: `Date.now`)
- `updatedAt` (Date, required, default: `Date.now`)
- `deletedAt` (Date, optional, default: `null`) - Used for soft delete logs.

---

### 1. Users

- **Purpose:** Store core user account data for authentication (aligned with Better Auth).
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `email` (String, required, unique, lowercase)
  - `name` (String, required)
  - `emailVerified` (Boolean, required, default: false)
  - `image` (String, optional)
- **Validation:** Regex format validation on email.
- **Indexes:** Unique index on `email`.
- **Relationships:** Referenced by `sessions`, `accounts`, `profiles`, `roadmaps`, `resumes`.
- **Embedded Documents:** None.
- **Referenced Documents:** None.
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a21",
  "email": "candidate@example.com",
  "name": "Jane Doe",
  "emailVerified": true,
  "image": "https://storage.lifeguide.ai/avatars/60c72b2f.png",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z",
  "deletedAt": null
}
```

- **Soft Delete Strategy:** Sets `deletedAt` timestamp. Block active logins if `deletedAt` is populated.

### 2. Sessions (Better Auth)

- **Purpose:** Maintain active login sessions (session table aligned with Better Auth).
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `token` (String, required, unique)
  - `expiresAt` (Date, required)
  - `ipAddress` (String, optional)
  - `userAgent` (String, optional)
- **Validation:** Verify `userId` is a valid ObjectId.
- **Indexes:** Unique index on `token`. TTL index on `expiresAt` for automatic pruning.
- **Relationships:** References `Users`.
- **Embedded Documents:** None.
- **Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a22",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "token": "sess_9a2f3893c834a...",
  "expiresAt": "2026-07-25T14:48:00Z",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Physical deletion on logout.

### 3. Accounts

- **Purpose:** Store user OAuth credential linkages (Better Auth compatible).
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `providerId` (String, required) - _e.g., 'google', 'credential'_.
  - `accountId` (String, required)
  - `accessToken` (String, optional)
  - `refreshToken` (String, optional)
  - `expiresAt` (Date, optional)
  - `password` (String, optional) - _Bcrypt/Argon2 hash_.
- **Validation:** Either password or provider tokens must be populated.
- **Indexes:** Compound unique index on `providerId` and `accountId`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a23",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "providerId": "google",
  "accountId": "google-user-12345",
  "accessToken": "ya29.a0AfH6...",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Cascades from user deletions.

### 4. Verifications

- **Purpose:** Store email verification and password reset validation tokens.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `identifier` (String, required) - _e.g., user email_.
  - `value` (String, required) - _OTP/Reset token hash_.
  - `expiresAt` (Date, required)
- **Validation:** String formatting validations.
- **Indexes:** TTL index on `expiresAt` for automatic cleanup.
- **Relationships:** None.
- **Embedded/Referenced Documents:** None.
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a24",
  "identifier": "candidate@example.com",
  "value": "token_abc123...",
  "expiresAt": "2026-07-18T15:48:00Z",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Physical deletion post-consumption.

### 5. Profiles

- **Purpose:** House core candidate career parameters and onboarded settings.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, unique, ref: 'Users')
  - `targetCareerTrack` (String, required)
  - `skillLevel` (String, required, enum: ['novice', 'intermediate', 'advanced'])
  - `weeklyAvailabilityHours` (Number, required, min: 1, max: 168)
  - `preferences` (Map, of String, default: {})
- **Validation:** Skill level enum check constraint.
- **Indexes:** Unique index on `userId`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a25",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "targetCareerTrack": "Frontend Engineer",
  "skillLevel": "novice",
  "weeklyAvailabilityHours": 15,
  "preferences": {
    "preferredStyles": "video",
    "trackFocus": "React"
  },
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 6. Assessments

- **Purpose:** Define baseline evaluation metadata and question list schemas.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `title` (String, required)
  - `trackCategory` (String, required) - _e.g., frontend, backend_.
  - `difficultyTier` (String, required, enum: ['entry', 'mid', 'senior'])
  - `estimatedMinutes` (Number, required, min: 1)
- **Validation:** Title size validation constraints.
- **Indexes:** Index on `trackCategory`.
- **Relationships:** Referenced by `assessment_results`. One-to-Many with `assessment_questions` (as referenced documents).
- **Embedded/Referenced Documents:** None.
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a26",
  "title": "React Architecture Diagnostic",
  "trackCategory": "frontend",
  "difficultyTier": "mid",
  "estimatedMinutes": 15,
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 7. Assessment Results

- **Purpose:** Store user diagnostic output scores and computed skill profiles.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `assessmentId` (ObjectId, required, ref: 'Assessments')
  - `overallScore` (Number, required, min: 0, max: 100)
  - `skippedCount` (Number, required, default: 0)
  - `skillsBreakdown` (Map, of Number) - _e.g., React: 85, CSS: 40_.
- **Validation:** Score ranges validator schema checking.
- **Indexes:** Compound index on `userId` and `assessmentId`.
- **Relationships:** References `Users` and `Assessments`.
- **Embedded/Referenced Documents:** `userId` (Users), `assessmentId` (Assessments).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a27",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "assessmentId": "60c72b2f9b1d8a23a41d8a26",
  "overallScore": 82.5,
  "skippedCount": 1,
  "skillsBreakdown": {
    "React State": 90,
    "CSS Grid": 40
  },
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 8. Roadmaps

- **Purpose:** Map user customized study timelines. Represents the core document embedding milestones and resource modules directly.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, unique, ref: 'Users')
  - `trackName` (String, required)
  - `progressPercentage` (Number, required, default: 0, min: 0, max: 100)
  - `totalHoursRequired` (Number, required)
  - `milestones` [Subdocument, Array] - _Embedded array of Milestone documents_.
- **Validation:** Array length validation constraints.
- **Indexes:** Index on `userId`.
- **Relationships:** References `Users`.
- **Embedded Documents:** `milestones` (Milestones), which contain embedded `resources` arrays (Resources).
- **Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a28",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "trackName": "Frontend Engineer",
  "progressPercentage": 45.0,
  "totalHoursRequired": 120,
  "milestones": [
    {
      "milestoneId": "60c72b2f9b1d8a23a41d8a29",
      "title": "HTML5 & CSS Grid Layouts",
      "sequenceNumber": 1,
      "status": "completed",
      "resources": [
        {
          "resourceId": "60c72b2f9b1d8a23a41d8a30",
          "title": "Responsive Layouts Masterclass",
          "resourceType": "video",
          "url": "https://resources.lifeguide.ai/v1",
          "durationMinutes": 45,
          "isCompleted": true
        }
      ]
    }
  ],
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 9. Milestones

- **Purpose:** Structuring roadmap blocks (Design represented as an **Embedded Subdocument** inside Roadmaps, not a standalone collection, to avoid queries latency).
- **Fields:**
  - `milestoneId` (ObjectId, required, default: new ObjectId())
  - `title` (String, required)
  - `sequenceNumber` (Number, required)
  - `status` (String, required, enum: ['locked', 'active', 'completed'], default: 'locked')
  - `resources` [Subdocument, Array] - _Embedded list of Learning Resources_.
- **Validation:** Unique sequence number inside parent document.
- **Indexes:** Handled by parent Roadmaps indexes patterns.
- **Embedded Documents:** `resources` (Resources).
- **Referenced Documents:** None.
- **Soft Delete Strategy:** Removed from parent arrays.

### 10. Resources

- **Purpose:** Represent individual study modules (Design represented as an **Embedded Subdocument** inside Milestones array for atomic updates).
- **Fields:**
  - `resourceId` (ObjectId, required, default: new ObjectId())
  - `title` (String, required)
  - `resourceType` (String, required, enum: ['video', 'documentation', 'practice_exercise', 'assignment'])
  - `url` (String, required)
  - `durationMinutes` (Number, required, default: 0)
  - `isCompleted` (Boolean, required, default: false)
- **Validation:** URL structure check constraints.
- **Soft Delete Strategy:** Removed from parent list array.

### 11. Projects

- **Purpose:** Store metadata templates for portfolio briefs recommended by AI.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `title` (String, required)
  - `difficultyRating` (String, required, enum: ['entry', 'mid', 'senior'])
  - `requirements` (Array of Strings, required)
  - `techStack` (Array of Strings, required)
  - `folderTemplate` (Map, default: {}) - _Mockup directories_.
- **Validation:** Lists cannot be empty.
- **Indexes:** Index on `difficultyRating`.
- **Relationships:** Referenced by `project_progress`.
- **Embedded/Referenced Documents:** None.
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a31",
  "title": "React Shopping Cart App",
  "difficultyRating": "mid",
  "requirements": ["Verify state updates globally", "Configure cart calculations validations"],
  "techStack": ["React", "Redux", "Jest"],
  "folderTemplate": {
    "src": {
      "components": {}
    }
  },
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 12. Project Progress

- **Purpose:** House active user projects, Git URLs connection, and automated reviews linkage.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `projectId` (ObjectId, required, ref: 'Projects')
  - `status` (String, required, enum: ['not_started', 'in_progress', 'review_pending', 'completed'], default: 'not_started')
  - `githubRepoUrl` (String, optional)
  - `liveDemoUrl` (String, optional)
  - `completedTasks` (Array of Strings, default: [])
- **Validation:** URL checks if populated.
- **Indexes:** Unique compound index on `userId` and `projectId`.
- **Relationships:** References `Users` and `Projects`. One-to-Many with `project_reviews` (as referenced documents).
- **Embedded/Referenced Documents:** `userId` (Users), `projectId` (Projects).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a32",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "projectId": "60c72b2f9b1d8a23a41d8a31",
  "status": "in_progress",
  "githubRepoUrl": "https://github.com/user/react-cart",
  "completedTasks": ["task-1"],
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 13. Resume

- **Purpose:** Root metadata document for user resumes.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `title` (String, required, default: 'My Resume')
  - `isActive` (Boolean, required, default: true)
  - `publicShareToken` (String, unique, optional)
- **Validation:** Unique token indexes checkers.
- **Indexes:** Unique index on `publicShareToken`.
- **Relationships:** References `Users`. Referenced by `resume_versions`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a33",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "title": "Jane's Frontend Resume",
  "isActive": true,
  "publicShareToken": "pub_sh_9a2f3893c834a...",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 14. Resume Versions

- **Purpose:** House parsed JSON data structures and PDF URLs copy records.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `resumeId` (ObjectId, required, ref: 'Resume')
  - `versionNumber` (Number, required, min: 1)
  - `parsedContent` (Map, required) - _Parsed sections: experiences, skills, education_.
  - `fileUrl` (String, required)
- **Validation:** Valid file path constraints check.
- **Indexes:** Compound unique index on `resumeId` and `versionNumber`.
- **Relationships:** References `Resume`. Referenced by `ats_reports`.
- **Embedded/Referenced Documents:** `resumeId` (Resume).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a34",
  "resumeId": "60c72b2f9b1d8a23a41d8a33",
  "versionNumber": 1,
  "parsedContent": {
    "experience": "5 years developing React applications...",
    "skills": ["JavaScript", "TypeScript", "React"]
  },
  "fileUrl": "https://storage.lifeguide.ai/resumes/jane_v1.pdf",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Cascades.

### 15. ATS Reports

- **Purpose:** Manage match ratings, missing items, and improvement plans.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `resumeVersionId` (ObjectId, required, ref: 'ResumeVersions')
  - `matchPercentage` (Number, required, min: 0, max: 100)
  - `missingKeywords` (Array of Strings, default: [])
  - `suggestions` (Array of Strings, default: [])
- **Validation:** Math percentage validators.
- **Indexes:** Index on `resumeVersionId`.
- **Relationships:** References `ResumeVersions`.
- **Embedded/Referenced Documents:** `resumeVersionId` (ResumeVersions).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a35",
  "resumeVersionId": "60c72b2f9b1d8a23a41d8a34",
  "matchPercentage": 78.0,
  "missingKeywords": ["Next.js", "Jest"],
  "suggestions": [
    "Add Next.js keywords to experience bullets",
    "Detail unit testing coverage scores"
  ],
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Cascades.

### 16. Interview Sessions

- **Purpose:** Track active mock interview parameters and logs.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `interviewType` (String, required, enum: ['coding', 'system_design', 'behavioral', 'hr'])
  - `status` (String, required, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress')
  - `currentQuestionIndex` (Number, required, default: 0)
  - `answersState` (Map, of String, default: {})
- **Validation:** Index constraints.
- **Indexes:** Index on `userId`.
- **Relationships:** References `Users`. Referenced by `interview_results`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a36",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "interviewType": "coding",
  "status": "in_progress",
  "currentQuestionIndex": 1,
  "answersState": {
    "q-1": "function check() { return true; }"
  },
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 17. Interview Results

- **Purpose:** House mock interview evaluations summaries and scoring modules.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `interviewSessionId` (ObjectId, required, unique, ref: 'InterviewSessions')
  - `overallScore` (Number, required, min: 0, max: 100)
  - `communicationScore` (Number, required, min: 0, max: 100)
  - `technicalScore` (Number, required, min: 0, max: 100)
  - `problemSolvingScore` (Number, required, min: 0, max: 100)
  - `confidenceScore` (Number, required, min: 0, max: 100)
  - `aiSuggestions` (Array of Strings, default: [])
- **Validation:** Scores limits schema validation checkers.
- **Indexes:** Unique index on `interviewSessionId`.
- **Relationships:** References `InterviewSessions`.
- **Embedded/Referenced Documents:** `interviewSessionId` (InterviewSessions).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a37",
  "interviewSessionId": "60c72b2f9b1d8a23a41d8a36",
  "overallScore": 82.0,
  "communicationScore": 85.0,
  "technicalScore": 80.0,
  "problemSolvingScore": 84.0,
  "confidenceScore": 78.0,
  "aiSuggestions": ["Improve response formatting templates using STAR metrics."],
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Cascades.

### 18. Notes

- **Purpose:** Persist user-written notes inside topic guides.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `learningResourceId` (ObjectId, required) - _Maps link to resources sub-items_.
  - `noteText` (String, required)
- **Validation:** Note text non-empty validators.
- **Indexes:** Compound index on `userId` and `learningResourceId`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a38",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "learningResourceId": "60c72b2f9b1d8a23a41d8a30",
  "noteText": "CSS Flexbox requires parent containers to trigger flex-wrap options.",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 19. Bookmarks

- **Purpose:** Store user saved/bookmarked resource linkages.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `learningResourceId` (ObjectId, required) - _Maps link to resources sub-items_.
- **Validation:** Verify valid ObjectIds references.
- **Indexes:** Unique compound index on `userId` and `learningResourceId`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a39",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "learningResourceId": "60c72b2f9b1d8a23a41d8a30",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Physical deletion on un-bookmark toggle commands.

### 20. Notifications

- **Purpose:** Alert queue for user task streaks and notifications.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `title` (String, required)
  - `content` (String, required)
  - `isRead` (Boolean, required, default: false)
- **Validation:** Title size limits validation checks.
- **Indexes:** Index on `userId` and `isRead`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a40",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "title": "Assessment Submitted",
  "content": "Your diagnostic results are processed.",
  "isRead": false,
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Physical delete or sets `deletedAt`.

### 21. Achievements

- **Purpose:** Record unlocked gamified milestone badges.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `achievementType` (String, required) - _e.g., CSS_WIZARD, SEVEN_DAY_STREAK_.
  - `unlockedAt` (Date, required, default: Date.now)
- **Validation:** String enum checks.
- **Indexes:** Compound unique index on `userId` and `achievementType`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a41",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "achievementType": "CSS_WIZARD",
  "unlockedAt": "2026-07-18T14:48:00Z",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** None (Achievements are persistent).

### 22. XP History

- **Purpose:** Log level points gains history.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `xpAmount` (Number, required, min: 1)
  - `earnedAction` (String, required) - _e.g., TASK_COMPLETED_.
- **Validation:** Amount minimum bounds limits.
- **Indexes:** Index on `userId`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a42",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "xpAmount": 100,
  "earnedAction": "TASK_COMPLETED",
  "createdAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** None (XP logs are persistent).

### 23. Feedback

- **Purpose:** Store user NPS ratings and text comments feedback.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, optional, ref: 'Users')
  - `npsRating` (Number, required, min: 0, max: 10)
  - `textComment` (String, optional)
- **Validation:** Rating checks validation bounds.
- **Indexes:** Index on `npsRating`.
- **Relationships:** References `Users` (optional).
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a43",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "npsRating": 9,
  "textComment": "Outstanding UI animations and styling!",
  "createdAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** None.

### 24. Settings

- **Purpose:** Maintain preferences configuration variables.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, unique, ref: 'Users')
  - `themeSelection` (String, required, default: 'aurora_blossom_light')
  - `emailReminders` (Boolean, required, default: true)
  - `dailyNotificationTime` (String, required, default: '09:00') - _Format: HH:MM_.
- **Validation:** Check regex on notification times.
- **Indexes:** Unique index on `userId`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a44",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "themeSelection": "aurora_blossom_light",
  "emailReminders": true,
  "dailyNotificationTime": "09:00",
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Cascades.

### 25. Uploads

- **Purpose:** House metadata links for blob assets (resumes PDFs, avatars images).
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `userId` (ObjectId, required, ref: 'Users')
  - `fileName` (String, required)
  - `fileUrl` (String, required)
  - `mimeType` (String, required)
  - `fileSizeBytes` (Number, required, min: 1)
- **Validation:** File size validator bounds.
- **Indexes:** Index on `userId`.
- **Relationships:** References `Users`.
- **Embedded/Referenced Documents:** `userId` (Users).
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a45",
  "userId": "60c72b2f9b1d8a23a41d8a21",
  "fileName": "resume.pdf",
  "fileUrl": "https://storage.lifeguide.ai/resumes/60c72b2f.pdf",
  "mimeType": "application/pdf",
  "fileSizeBytes": 1048576,
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt` (Triggers asynchronous cleanup of the actual cloud file).

### 26. Admin

- **Purpose:** Credentials storage for dashboard operators.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `email` (String, required, unique, lowercase)
  - `passwordHash` (String, required)
  - `role` (String, required, enum: ['superadmin', 'support', 'editor'], default: 'editor')
  - `isActive` (Boolean, required, default: true)
- **Validation:** Regex format validation on email.
- **Indexes:** Unique index on `email`.
- **Relationships:** None.
- **Embedded/Referenced Documents:** None.
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a46",
  "email": "admin@lifeguide.ai",
  "passwordHash": "$2b$12$eXJm...",
  "role": "superadmin",
  "isActive": true,
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Sets `deletedAt`.

### 27. Feature Flags

- **Purpose:** House platform dynamic flag switch variables.
- **Fields:**
  - `_id` (ObjectId, auto-generated)
  - `flagKey` (String, required, unique)
  - `description` (String, optional)
  - `isEnabled` (Boolean, required, default: false)
- **Validation:** Flag keys formatting validation (must match snake_case key syntax).
- **Indexes:** Unique index on `flagKey`.
- **Relationships:** None.
- **Embedded/Referenced Documents:** None.
- **Example Document:**

```json
{
  "_id": "60c72b2f9b1d8a23a41d8a47",
  "flagKey": "enable_beta_ai",
  "description": "Exposes simulated whiteboard tools inside Next.js pages.",
  "isEnabled": true,
  "createdAt": "2026-07-18T14:48:00Z",
  "updatedAt": "2026-07-18T14:48:00Z"
}
```

- **Soft Delete Strategy:** Physical deletion.

---

# Collection Relationships

```
  [ Users ] <=========================== (1-to-1) =======> [ Profiles ]
     ||                                                   [ Settings ]
     || (1-to-Many references)
     ||=====> [ Sessions ]
     ||=====> [ Accounts ]
     ||=====> [ Resume ] =======> [ Resume Versions ] =======> [ ATS Reports ]
     ||=====> [ Roadmaps ] (Embeds: Milestones -> Resources)
     ||=====> [ Project Progress ]
     ||=====> [ Interview Sessions ] =======> [ Interview Results ]
     ||=====> [ Notes ]
     ||=====> [ Bookmarks ]
     ||=====> [ Achievements ]
     ||=====> [ XP History ]
     ||=====> [ Notifications ]
     ||=====> [ Uploads ]
```

- **1-to-1 References:** Checked via matching singular unique ObjectId references on `Profiles` and `Settings` fields pointing to their parent `Users` document.
- **Embedded Subdocuments (Atomic Nesting):** Used for learning path components: `Roadmaps` embeds an array of `Milestones`, which recursively embeds array lists of `Resources`. Reading or updating the curriculum requires exactly 1 database fetch.
- **1-to-Many References:** User progress trackers, resume folders, and mock evaluations reference their parent `Users` via standard `ref` ObjectId paths.

---

# Index Strategy

To maintain API latencies under 50ms, indexes are configured inside Mongoose schemas:

1.  **Single Field Indexing:**
    - `users.email` (Unique)
    - `sessions.token` (Unique)
    - `feature_flags.flagKey` (Unique)
    - `profiles.userId` (Unique)
2.  **Compound Indexing:** Used for filters optimization:
    - `assessment_results`: `{ userId: 1, assessmentId: 1 }` (Unique)
    - `project_progress`: `{ userId: 1, projectId: 1 }` (Unique)
    - `resume_versions`: `{ resumeId: 1, versionNumber: 1 }` (Unique)
    - `bookmarks`: `{ userId: 1, learningResourceId: 1 }` (Unique)
    - `notes`: `{ userId: 1, learningResourceId: 1 }`
3.  **TTL Indexes:** Auto-prunes expired verification tokens and active sessions:
    - `sessions`: `{ expiresAt: 1 }` with `expireAfterSeconds: 0`.
    - `verifications`: `{ expiresAt: 1 }` with `expireAfterSeconds: 0`.
4.  **Text Indexing (Fallback Search):**
    - `projects`: `title` and `requirements` text indices matching standard search requests:
      ```javascript
      ProjectSchema.index({ title: "text", requirements: "text" });
      ```

---

# Search Strategy

- **Atlas Search integration:** Production search workloads use **MongoDB Atlas Search** (backed by Apache Lucene).
- **Index Definitions:**
  - Define Lucene search indexing on `projects` and `resources` templates inside the Atlas UI console:
    ```json
    {
      "mappings": {
        "dynamic": true,
        "fields": {
          "title": { "type": "string", "analyzer": "lucene.english" }
        }
      }
    }
    ```
- **Mongoose Aggregations:** Node routes execute search filters utilizing `$search` stages inside Mongoose aggregations pipeline calls, enabling rapid fuzzy matching, autocomplete suggestions, and relevance scoring.

---

# Aggregation Pipeline Strategy

Dynamic calculations (e.g. compiling skill gap metrics, streaking logs, and leaderboard ranges) execute via MongoDB Aggregation Pipelines:

### Example: Skills Gaps Compilation Pipeline

Calculates total skill gaps filled vs remaining across user assessments:

```javascript
AssessmentResult.aggregate([
  { $match: { userId: mongoose.Types.ObjectId(userId) } },
  { $sort: { createdAt: -1 } },
  {
    $group: {
      _id: "$assessmentId",
      latestScore: { $first: "$overallScore" },
      latestBreakdown: { $first: "$skillsBreakdown" },
    },
  },
  {
    $project: {
      assessmentId: "$_id",
      overallScore: "$latestScore",
      gaps: {
        $objectToArray: "$latestBreakdown",
      },
    },
  },
]);
```

---

# Pagination Strategy

- **Cursor-Based Pagination (Keyset):**
  - Preferred for continuous scrolling feeds (e.g. notifications panels, recent activity logs).
  - _Implementation:_ Request query parameters accept `limit` and `nextCursor` (which is the String representation of the last document's `_id` ObjectId).
  - _Mongoose code:_
    ```javascript
    const query = nextCursor ? { _id: { $lt: mongoose.Types.ObjectId(nextCursor) } } : {};
    const logs = await ActivityLog.find(query).sort({ _id: -1 }).limit(limit);
    ```

---

# Security

1.  **Transport Protection:** Next.js Server Actions execute queries within MongoDB VPC Peering tunnels. Direct external client connection is blocked.
2.  **IP Access Whitelisting:** Atlas Cluster enables strict IP Access Lists, permitting requests only from whitelisted App Server clusters IP addresses.
3.  **Field-Level Encryption (CSFLE):** Personal information identifiers (e.g. user emails, OAuth integration keys) encrypt locally on the app server using KMS decrypt keys before landing in the database.
4.  **Database Roles:** Connect using distinct database user roles configured via Least Privilege permissions policies (e.g. Web portal client has `readWrite` capabilities restricted to target databases).

---

# Performance

- **Lean Queries:** Read operations that do not modify documents utilize `.lean()` queries to bypass Mongoose hydration overhead and return raw Javascript objects.
- **Connection Pooling:** Pool size is managed via Mongoose connect flags:
  ```javascript
  mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 50,
    minPoolSize: 10,
  });
  ```
- **Avoid Large Embeds:** Limits embedding sizes. Roadmap nested resource arrays are strictly bounded to prevent document sizes from exceeding MongoDB's 16MB limit.

---

# Backup Strategy

- **Continuous Cloud Backups:** Configured on MongoDB Atlas with point-in-time recovery (PITR) enabled.
- **Backup Retentions:**
  - Hourly snapshots kept for 2 days.
  - Daily snapshots kept for 30 days.
  - Weekly snapshots kept for 12 weeks.
  - Monthly snapshots kept for 1 year.
- **RPO / RTO targets:**
  - _Recovery Point Objective (RPO):_ Under 10 minutes.
  - _Recovery Time Objective (RTO):_ Under 30 minutes.

---

# Scaling Strategy

- **Sharding Plan:** If concurrent users scale past 1,000,000, Collections will shard horizontally across MongoDB Atlas nodes.
- **Shard Key Selection:**
  - Target collections (`Roadmaps`, `Resumes`, `ProjectProgress`) shard using `userId` as the shard key, grouping all data corresponding to a single user on a single shard node to prevent cross-shard query performance drops.

---

# Future Expansion

- **Mongoose Schema Versioning:** Schemas include version keys (`__v` enabled). Minor migrations use Mongoose pre-save hooks to patch missing legacy keys on document retrieval, preventing write outages.
- **GraphQL Schema Translation:** Subdocument shapes translate directly to GraphQL type structures, enabling future API migrations.

---

Version: 1.0
Status: Ready for MongoDB Backend
Next: Phase 10 API Design Specification
