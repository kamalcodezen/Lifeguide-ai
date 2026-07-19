import { z } from "zod";

export const roadmapResourceSchema = z.object({
  name: z.string().min(1, "Resource name is required."),
  type: z.string().min(1, "Resource type is required."),
  description: z.string().min(1, "Resource description is required."),
});

export const roadmapWeekSchema = z.object({
  weekNumber: z.number().int().positive("Week number must be a positive integer."),
  milestone: z.string().min(1, "Milestone title is required."),
  estimatedHours: z.number().positive("Estimated hours must be positive."),
  topics: z.array(z.string()).min(1, "At least one topic must be specified."),
  description: z.string().min(1, "Week description is required."),
  suggestedResources: z.array(roadmapResourceSchema).min(1, "At least one suggested resource is required."),
});

export const roadmapResponseSchema = z.object({
  title: z.string().min(1, "Roadmap title is required."),
  track: z.string().min(1, "Roadmap track is required."),
  skillLevel: z.string().min(1, "Roadmap skill level is required."),
  durationWeeks: z.number().int().positive("Duration must be at least 1 week."),
  weeks: z.array(roadmapWeekSchema).min(1, "Roadmap must contain at least 1 week."),
});

export type RoadmapResponse = z.infer<typeof roadmapResponseSchema>;
