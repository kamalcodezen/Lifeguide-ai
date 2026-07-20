import { z } from "zod";

export const interviewEvaluationSchema = z.object({
  score: z.number().int().min(0).max(100, "Score must be between 0 and 100."),
  communicationFeedback: z.string().min(1, "Communication feedback is required."),
  technicalAccuracyFeedback: z.string().min(1, "Technical accuracy feedback is required."),
  problemSolvingFeedback: z.string().min(1, "Problem solving feedback is required."),
  overallFeedback: z.string().min(1, "Overall feedback is required."),
  strengths: z.array(z.string()).min(1, "At least one strength is required."),
  areasForImprovement: z.array(z.string()).min(1, "At least one area for improvement is required."),
});

export const interviewResponseSchema = z.object({
  isCompleted: z.boolean(),
  aiReply: z.string().min(1, "AI reply is required."),
  evaluation: interviewEvaluationSchema.optional().nullable(),
});

export type InterviewResponse = z.infer<typeof interviewResponseSchema>;
