export interface ResumePromptInput {
  resumeText: string;
  targetJobDescription: string;
}

/**
 * Constructs the prompt template for the AI Resume Scorer and ATS Matcher.
 */
export function getResumePrompt(input: ResumePromptInput): string {
  return `You are an elite Applicant Tracking System (ATS) auditor and expert recruiter. Perform a deep, structural analysis comparing the candidate's resume text against the target job description provided.

Candidate Resume:
---
${input.resumeText}
---

Target Job Description:
---
${input.targetJobDescription}
---

Instructions:
1. Calculate a strict ATS compatibility score (0-100%) based on keyword density, formatting, and role match.
2. Identify specific matched keywords, missing keywords, and structural or formatting issues.
3. Provide actionable, step-by-step suggestions on how to improve the resume formatting and bullet points.
4. Output the analysis in a valid JSON schema conforming to the following structure:
{
  "atsScore": 68,
  "summary": "High level evaluation of the resume alignment.",
  "matchedKeywords": [
    "keyword1",
    "keyword2"
  ],
  "missingKeywords": [
    "keyword3",
    "keyword4"
  ],
  "formattingIssues": [
    "Issue 1 (e.g. PDF structure, double columns, graphics)",
    "Issue 2"
  ],
  "improvements": [
    "Improvement pointer 1",
    "Improvement pointer 2"
  ]
}

Ensure the output is clean JSON only. Do not include markdown code block formatting (e.g. \`\`\`json).`;
}
