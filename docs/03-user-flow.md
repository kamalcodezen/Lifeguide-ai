# User Flows: LifeGuide AI (MVP)

This document maps out the simple, practical, and MVP-focused user flows for LifeGuide AI – Career & Learning Copilot.

---

## 1. Visitor Flow

Landing Page (View Value Prop & MVP Tracks)
↓
Click "Get Started"
↓
Authentication Page

---

## 2. Authentication Flow

Authentication Page
↓
Select OAuth Provider (Google / GitHub)
↓
SSO Authorization Redirect
↓
Authenticate & Return
↓
Check User Profile Status
├── New User → New User Onboarding Flow
└── Returning User → Dashboard Flow

---

## 3. New User Onboarding Flow

Welcome Screen
↓
Select Target Track (Frontend / Backend / Product Management)
↓
Input Weekly Availability (Hours/Week)
↓
Provide Background (Upload PDF Resume OR Input Goals)
↓
Save Skill Profile
↓
Prompt to Start Diagnostic
↓
Skill Assessment Flow

---

## 4. Dashboard Flow

Dashboard Home
↓
View Current Progress, Active Track, Next Milestone, & Streak
↓
Select Core Feature Action:
├── Start/Retake assessment → Skill Assessment Flow
├── View active milestones & resources → AI Roadmap Flow
├── Generate/View custom project brief → Project Recommendation Flow
└── Click Profile Menu → Logout Flow

---

## 5. Skill Assessment Flow

Dashboard / Onboarding Trigger
↓
Diagnostic Test Selection
↓
Start Test (5-10 track-specific questions)
↓
Submit Answers
↓
AI Analyzes Responses
↓
Update Skill Profile (Novice / Intermediate / Advanced per skill)
↓
Generate Custom Learning Roadmap

---

## 6. AI Roadmap Flow

View Learning Roadmap Screen
↓
Browse Weekly Milestones
↓
Click Curated Study Resource Link (External)
↓
Mark Milestone as Complete
↓
Progress Tracking Flow
↓
[Optional] Click "Adjust Schedule"
↓
Input New Weekly Hours
↓
Recalibrate Roadmap (Length & Milestone distribution)

---

## 7. Project Recommendation Flow

Dashboard
↓
Request Custom Portfolio Project Spec
↓
AI Generates Brief (Title, Target Skill Gaps, Functional Reqs, Tech Stack, Milestones)
↓
View Project Brief
↓
Develop Project Code locally
↓
Mark Project Complete
↓
Progress Tracking Flow

---

## 8. Progress Tracking Flow

Action (Milestone Marked Complete / Project Marked Complete)
↓
Calculate Track Progress Percentage
↓
Increment Streak Count
↓
Save to User Profile
↓
Update Dashboard Metrics (Progress Bar, Streak Counter)

---

## 9. Logout Flow

Dashboard / Header Menu
↓
Click Profile Menu
↓
Click "Log Out"
↓
Clear Session & Auth Tokens
↓
Redirect to Landing Page
