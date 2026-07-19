import { z } from "zod";

export const resumeResponseSchema = z.object({
  atsScore: z.number().int().min(0).max(100, "ATS score must be between 0 and 100."),
  summary: z.string().min(1, "Resume summary is required."),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  formattingIssues: z.array(z.string()),
  improvements: z.array(z.string()).min(1, "At least one improvement suggestion is required."),
});

export type ResumeResponse = z.infer<typeof resumeResponseSchema>;
