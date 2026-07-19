import { z } from "zod";

export const updateProgressSchema = z.object({
  milestoneId: z
    .string()
    .length(24, "Milestone ID must be a 24-character hex string"),
  resourceId: z
    .string()
    .length(24, "Resource ID must be a 24-character hex string"),
  isCompleted: z.boolean(),
});
