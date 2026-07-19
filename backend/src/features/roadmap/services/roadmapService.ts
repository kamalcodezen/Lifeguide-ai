import mongoose from "mongoose";
import { Roadmap } from "../../../database/models/Roadmap";
import { Profile } from "../../../database/models/Profile";
import { AssessmentResult } from "../../../database/models/AssessmentResult";
import { getGeminiClient } from "../../../lib/gemini/client";
import { getRoadmapPrompt } from "../../../ai/prompts/roadmapPrompt";
import { roadmapResponseSchema } from "../../../ai/schemas/roadmapSchema";

/**
 * Utility to strip markdown code fences from JSON response if present.
 */
function cleanJsonString(str: string): string {
  let cleaned = str.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*/, "").replace(/```$/, "");
  }
  return cleaned.trim();
}

export const getRoadmapByUserId = async (userId: string) => {
  return await Roadmap.findOne({ userId, deletedAt: null });
};

export const generateMockRoadmap = async (userId: string) => {
  // Check if roadmap already exists
  const existingRoadmap = await Roadmap.findOne({ userId, deletedAt: null });
  if (existingRoadmap) {
    return existingRoadmap;
  }

  // Try to find user profile to get target career track
  const profile = await Profile.findOne({ userId, deletedAt: null }).lean();
  if (!profile) {
    const err = new Error("Skill profile not found. Please complete the Skill Profiler onboarding first.");
    (err as any).status = 404;
    throw err;
  }

  // Get assessment results to compile identified gaps
  const results = await AssessmentResult.find({ userId, deletedAt: null }).lean();
  const identifiedGaps: string[] = [];

  results.forEach((res) => {
    if (res.skillsBreakdown) {
      const breakdown = res.skillsBreakdown instanceof Map ? Object.fromEntries(res.skillsBreakdown) : res.skillsBreakdown;
      Object.entries(breakdown).forEach(([skill, score]) => {
        if (typeof score === "number" && score < 80) {
          identifiedGaps.push(skill);
        }
      });
    }
  });

  // Fallback to default gaps if no assessment has been done yet
  if (identifiedGaps.length === 0) {
    if (profile.targetCareerTrack.toLowerCase().includes("frontend")) {
      identifiedGaps.push("Advanced CSS layouts", "Next.js routing", "State management solutions");
    } else if (profile.targetCareerTrack.toLowerCase().includes("backend")) {
      identifiedGaps.push("Database query indexing", "REST API security best practices", "Caching & session stores");
    } else {
      identifiedGaps.push("Market analysis frameworks", "Agile feature prioritization", "Product metrics parsing");
    }
  }

  const prompt = getRoadmapPrompt({
    track: profile.targetCareerTrack,
    hoursPerWeek: profile.weeklyAvailabilityHours,
    skillLevel: profile.skillLevel,
    identifiedGaps: Array.from(new Set(identifiedGaps)),
  });

  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  if (!response || !response.text) {
    const err = new Error("Failed to generate learning roadmap from Gemini.");
    (err as any).status = 502;
    throw err;
  }

  const rawJson = cleanJsonString(response.text);
  let parsedJson;
  try {
    parsedJson = JSON.parse(rawJson);
  } catch (parseErr) {
    const err = new Error("AI response structure is not valid JSON.");
    (err as any).status = 502;
    throw err;
  }

  // Validate the AI output structure utilizing Zod schemas
  const validated = roadmapResponseSchema.safeParse(parsedJson);
  if (!validated.success) {
    const err = new Error("AI response failed validation against roadmap database schemas.");
    (err as any).status = 502;
    throw err;
  }

  const roadmapData = validated.data;
  let totalHoursRequired = 0;

  // Map the validated roadmap JSON to Mongoose database model schemas structure
  const milestones = roadmapData.weeks.map((week) => {
    totalHoursRequired += week.estimatedHours;
    
    // Distribute hours into duration minutes for each resource
    const totalMinutes = week.estimatedHours * 60;
    const numResources = week.suggestedResources.length;
    const durationPerResource = Math.max(15, Math.round(totalMinutes / (numResources || 1)));

    return {
      milestoneId: new mongoose.Types.ObjectId(),
      title: `Week ${week.weekNumber}: ${week.milestone}`,
      sequenceNumber: week.weekNumber,
      status: week.weekNumber === 1 ? "active" : "locked" as const,
      resources: week.suggestedResources.map((res) => {
        // Map suggested resource type strings to allowed db enum values
        let mappedType: "video" | "documentation" | "practice_exercise" | "assignment" = "documentation";
        const typeLower = res.type.toLowerCase();
        if (typeLower.includes("video") || typeLower.includes("youtube")) {
          mappedType = "video";
        } else if (typeLower.includes("exercise") || typeLower.includes("practice") || typeLower.includes("code") || typeLower.includes("lab")) {
          mappedType = "practice_exercise";
        } else if (typeLower.includes("assignment") || typeLower.includes("task") || typeLower.includes("test")) {
          mappedType = "assignment";
        }

        return {
          resourceId: new mongoose.Types.ObjectId(),
          title: `${res.name}: ${res.description}`,
          resourceType: mappedType,
          url: `https://www.google.com/search?q=${encodeURIComponent(res.name)}`,
          durationMinutes: durationPerResource,
          isCompleted: false,
        };
      }),
    };
  });

  const newRoadmap = await Roadmap.create({
    userId,
    trackName: roadmapData.track,
    progressPercentage: 0,
    totalHoursRequired,
    milestones,
  });

  return newRoadmap;
};

export const updateResourceProgress = async (
  userId: string,
  milestoneId: string,
  resourceId: string,
  isCompleted: boolean
) => {
  const roadmap = await Roadmap.findOne({ userId, deletedAt: null });
  if (!roadmap) {
    const err = new Error("Roadmap not found.");
    (err as any).status = 404;
    throw err;
  }

  let resourceFound = false;

  // Search and update the target resource
  for (const milestone of roadmap.milestones) {
    if (milestone.milestoneId.toString() === milestoneId) {
      for (const resource of milestone.resources) {
        if (resource.resourceId.toString() === resourceId) {
          resource.isCompleted = isCompleted;
          resourceFound = true;
          break;
        }
      }
    }
  }

  if (!resourceFound) {
    const err = new Error("Resource or Milestone not found on this roadmap.");
    (err as any).status = 400;
    throw err;
  }

  // Calculate progress percentage
  let totalResourcesCount = 0;
  let completedResourcesCount = 0;

  for (const milestone of roadmap.milestones) {
    for (const resource of milestone.resources) {
      totalResourcesCount++;
      if (resource.isCompleted) {
        completedResourcesCount++;
      }
    }
  }

  roadmap.progressPercentage =
    totalResourcesCount > 0
      ? Math.round((completedResourcesCount / totalResourcesCount) * 100)
      : 0;

  return await roadmap.save();
};
