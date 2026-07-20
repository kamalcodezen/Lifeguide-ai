import { z } from "zod";

export const createAssessmentSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  trackCategory: z.string().min(1, "Track category is required"),
  difficultyTier: z.enum(["entry", "mid", "senior"], {
    message: "Difficulty tier must be entry, mid, or senior",
  }),
  estimatedMinutes: z
    .number()
    .min(1, "Estimated minutes must be at least 1"),
});

export const updateAssessmentSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),
  trackCategory: z.string().min(1, "Track category is required").optional(),
  difficultyTier: z
    .enum(["entry", "mid", "senior"], {
      message: "Difficulty tier must be entry, mid, or senior",
    })
    .optional(),
  estimatedMinutes: z
    .number()
    .min(1, "Estimated minutes must be at least 1")
    .optional(),
});

export const startAssessmentSchema = z.object({
  assessmentId: z
    .string()
    .length(24, "Assessment ID must be a 24-character hex string"),
});

export const submitAssessmentSchema = z.object({
  resultId: z
    .string()
    .length(24, "Result ID must be a 24-character hex string"),
  answers: z
    .array(
      z.object({
        questionText: z.string().min(1),
        selectedOption: z.string().min(1),
      })
    )
    .min(1, "At least one answer must be submitted"),
});
