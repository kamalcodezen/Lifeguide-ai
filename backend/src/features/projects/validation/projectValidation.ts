import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  difficultyRating: z.enum(["entry", "mid", "senior"], {
    message: "Difficulty rating must be entry, mid, or senior.",
  }),
  requirements: z
    .array(z.string().min(1, "Requirement text cannot be empty"))
    .min(1, "Requirements list must contain at least one item"),
  techStack: z
    .array(z.string().min(1, "Tech stack text cannot be empty"))
    .min(1, "Tech stack list must contain at least one item"),
  folderTemplate: z.record(z.string(), z.any()).optional().default({}),
});

export const updateProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),
  difficultyRating: z
    .enum(["entry", "mid", "senior"], {
      message: "Difficulty rating must be entry, mid, or senior.",
    })
    .optional(),
  requirements: z
    .array(z.string().min(1, "Requirement text cannot be empty"))
    .min(1, "Requirements list must contain at least one item")
    .optional(),
  techStack: z
    .array(z.string().min(1, "Tech stack text cannot be empty"))
    .min(1, "Tech stack list must contain at least one item")
    .optional(),
  folderTemplate: z.record(z.string(), z.any()).optional(),
});

export const generateProgressSchema = z.object({
  projectId: z
    .string()
    .length(24, "Project ID must be a 24-character hex string"),
});

export const updateProgressSchema = z.object({
  completedTasks: z.array(z.string()).optional(),
  status: z
    .enum(["not_started", "in_progress", "review_pending", "completed"], {
      message: "Status must be not_started, in_progress, review_pending, or completed",
    })
    .optional(),
  githubRepoUrl: z
    .string()
    .url("Please enter a valid GitHub URL")
    .regex(/^https?:\/\/(www\.)?github\.com\//, "Must be a valid GitHub repository URL")
    .optional()
    .or(z.literal("")),
  liveDemoUrl: z
    .string()
    .url("Please enter a valid Live Demo URL")
    .optional()
    .or(z.literal("")),
});
