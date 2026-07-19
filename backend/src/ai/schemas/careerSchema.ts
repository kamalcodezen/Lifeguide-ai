import { z } from "zod";

export const careerRecommendationItemSchema = z.object({
  role: z.string().min(1, "Role is required."),
  matchScore: z.number().int().min(0).max(100, "Match score must be between 0 and 100."),
  summary: z.string().min(1, "Fit summary is required."),
  reasons: z.array(z.string()).min(1, "At least one reasoning is required."),
  existingStrengths: z.array(z.string()),
  requiredUpskilling: z.array(z.string()),
});

export const careerResponseSchema = z.object({
  recommendations: z.array(careerRecommendationItemSchema).min(1, "At least one career recommendation must be provided."),
});

export type CareerResponse = z.infer<typeof careerResponseSchema>;
