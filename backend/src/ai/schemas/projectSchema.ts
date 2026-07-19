import { z } from "zod";

export const projectSuggestionSchema = z.object({
  title: z.string().min(1, "Project title is required."),
  difficultyRating: z.enum(["entry", "mid", "senior"]),
  summary: z.string().min(1, "Project summary is required."),
  techStack: z.array(z.string()).min(1, "At least one tech stack item is required."),
  requirements: z.array(z.string()).min(1, "At least one requirement is required."),
  businessCase: z.string().min(1, "Business case is required."),
  userStories: z.array(z.string()).min(1, "At least one user story is required."),
});

export const projectSuggestionsResponseSchema = z.object({
  projects: z.array(projectSuggestionSchema).min(1, "At least one project suggestion is required."),
});

export type ProjectSuggestionsResponse = z.infer<typeof projectSuggestionsResponseSchema>;
export type ProjectSuggestion = z.infer<typeof projectSuggestionSchema>;
