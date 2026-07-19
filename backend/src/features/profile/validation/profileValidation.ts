import { z } from "zod";

export const createProfileSchema = z.object({
  targetCareerTrack: z.string().min(1, "Target career track is required."),
  skillLevel: z.enum(["novice", "intermediate", "advanced"], {
    message: "Skill level must be novice, intermediate, or advanced.",
  }),
  weeklyAvailabilityHours: z
    .number()
    .int()
    .min(1, "Weekly availability hours must be at least 1.")
    .max(168, "Weekly availability hours cannot exceed 168."),
  preferences: z.record(z.string(), z.string()).optional().default({}),
});

export const updateProfileSchema = z.object({
  targetCareerTrack: z.string().min(1, "Target career track is required.").optional(),
  skillLevel: z
    .enum(["novice", "intermediate", "advanced"], {
      message: "Skill level must be novice, intermediate, or advanced.",
    })
    .optional(),
  weeklyAvailabilityHours: z
    .number()
    .int()
    .min(1, "Weekly availability hours must be at least 1.")
    .max(168, "Weekly availability hours cannot exceed 168.")
    .optional(),
  preferences: z.record(z.string(), z.string()).optional(),
});
