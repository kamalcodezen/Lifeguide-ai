import { z } from "zod";

export const assessmentQuestionSchema = z.object({
  id: z.string().min(1),
  questionText: z.string().min(1),
  options: z.array(z.string()).length(4),
});

export const assessmentGenerationResponseSchema = z.object({
  title: z.string(),
  questions: z.array(assessmentQuestionSchema).min(3).max(10),
});

export const assessmentEvaluationResponseSchema = z.object({
  overallScore: z.number().min(0).max(100),
  skillsBreakdown: z.record(z.string(), z.number().min(0).max(100)),
  strengths: z.array(z.string()).min(1),
  weaknesses: z.array(z.string()).min(1),
  recommendations: z.array(z.string()).min(1),
  summaryEvaluation: z.string().min(1),
});

export type AssessmentGenerationResponse = z.infer<typeof assessmentGenerationResponseSchema>;
export type AssessmentEvaluationResponse = z.infer<typeof assessmentEvaluationResponseSchema>;
