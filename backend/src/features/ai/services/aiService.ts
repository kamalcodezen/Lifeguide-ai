import { getGeminiClient } from "../../../lib/gemini/client";
import { getCareerPrompt } from "../../../ai/prompts/careerPrompt";
import { careerResponseSchema } from "../../../ai/schemas/careerSchema";
import { getProjectPrompt } from "../../../ai/prompts/projectPrompt";
import { projectSuggestionsResponseSchema } from "../../../ai/schemas/projectSchema";
import { Profile } from "../../../database/models/Profile";
import { AssessmentResult } from "../../../database/models/AssessmentResult";
import { cleanJsonString } from "../../../utils/cleanJson";

export const getCareerRecommendations = async (userId: string) => {
  const profile = await Profile.findOne({ userId, deletedAt: null }).lean();
  if (!profile) {
    const err = new Error("Skill profile not found. Please complete the Skill Profiler onboarding first.");
    (err as any).status = 404;
    throw err;
  }

  // Get assessment results to extract score breakdowns
  const results = await AssessmentResult.find({ userId, deletedAt: null }).lean();
  
  // Compile list of skills and gaps based on assessments
  const skills: string[] = [];
  const gaps: string[] = [];
  
  if (profile.targetCareerTrack) {
    skills.push(profile.targetCareerTrack);
  }
  
  // Extract custom preferences focus
  const focus = profile.preferences ? (profile.preferences as any).focus || (profile.preferences as Map<string, string>).get?.("focus") : null;
  if (focus) {
    skills.push(focus);
  }

  results.forEach((res) => {
    if (res.skillsBreakdown) {
      const breakdown = res.skillsBreakdown instanceof Map ? Object.fromEntries(res.skillsBreakdown) : res.skillsBreakdown;
      Object.entries(breakdown).forEach(([skill, score]) => {
        if (typeof score === "number") {
          if (score >= 80) {
            skills.push(skill);
          } else {
            gaps.push(skill);
          }
        }
      });
    }
  });

  // Extract other metadata parameters from preferences map
  const getPrefVal = (key: string): string => {
    if (!profile.preferences) return "";
    if (profile.preferences instanceof Map) {
      return profile.preferences.get(key) || "";
    }
    return (profile.preferences as any)[key] || "";
  };

  const interestsStr = getPrefVal("interests") || getPrefVal("focus") || profile.targetCareerTrack;
  const interests = interestsStr.split(",").map((i: string) => i.trim()).filter(Boolean);
  if (interests.length === 0) {
    interests.push("Software Engineering");
  }

  const expStr = getPrefVal("experienceYears");
  let experienceYears = expStr ? parseInt(expStr, 10) : 0;
  if (isNaN(experienceYears)) {
    experienceYears = profile.skillLevel === "advanced" ? 5 : profile.skillLevel === "intermediate" ? 2 : 0;
  }

  const education = getPrefVal("education") || getPrefVal("degree") || "Self-taught / Degree program";

  const prompt = getCareerPrompt({
    skills: skills.length > 0 ? Array.from(new Set(skills)) : [profile.targetCareerTrack],
    interests,
    experienceYears,
    education,
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
    const err = new Error("Failed to generate career recommendations from Gemini.");
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

  // Validate utilizing our Zod schema
  const validated = careerResponseSchema.safeParse(parsedJson);
  if (!validated.success) {
    const err = new Error("AI response failed validation against database schemas.");
    (err as any).status = 502;
    throw err;
  }

  return validated.data;
};

export const getProjectSuggestions = async (userId: string) => {
  const profile = await Profile.findOne({ userId, deletedAt: null }).lean();
  if (!profile) {
    const err = new Error("Skill profile not found. Please complete the Skill Profiler onboarding first.");
    (err as any).status = 404;
    throw err;
  }

  // Get assessment results to extract skill gaps
  const results = await AssessmentResult.find({ userId, deletedAt: null }).lean();
  const identifiedGaps: string[] = [];
  const techStack: string[] = [];

  // Default gaps and stacks if assessments/preferences are empty
  if (profile.targetCareerTrack.toLowerCase().includes("frontend")) {
    techStack.push("React", "TypeScript", "Tailwind CSS", "Next.js");
    identifiedGaps.push("Responsive Design", "State Management", "Performance Optimization");
  } else if (profile.targetCareerTrack.toLowerCase().includes("backend")) {
    techStack.push("Node.js", "Express", "MongoDB", "TypeScript");
    identifiedGaps.push("API Security", "Database Indexing", "Caching strategies");
  } else {
    techStack.push("Product Backlog", "Agile Roadmap", "Metrics / Analytics");
    identifiedGaps.push("Market Research", "Feature Prioritization", "A/B Testing");
  }

  // Extract from preferences focus
  const focus = profile.preferences ? (profile.preferences as any).focus || (profile.preferences as Map<string, string>).get?.("focus") : null;
  if (focus) {
    techStack.push(focus);
  }

  results.forEach((res) => {
    if (res.skillsBreakdown) {
      const breakdown = res.skillsBreakdown instanceof Map ? Object.fromEntries(res.skillsBreakdown) : res.skillsBreakdown;
      Object.entries(breakdown).forEach(([skill, score]) => {
        if (typeof score === "number") {
          if (score < 80) {
            identifiedGaps.push(skill);
          } else {
            techStack.push(skill);
          }
        }
      });
    }
  });

  const prompt = getProjectPrompt({
    track: profile.targetCareerTrack,
    skillLevel: profile.skillLevel,
    identifiedGaps: Array.from(new Set(identifiedGaps)),
    techStack: Array.from(new Set(techStack)),
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
    const err = new Error("Failed to generate project suggestions from Gemini.");
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

  const validated = projectSuggestionsResponseSchema.safeParse(parsedJson);
  if (!validated.success) {
    const err = new Error("AI response failed validation against project suggestions schemas.");
    (err as any).status = 502;
    throw err;
  }

  return validated.data;
};

export const conductMockInterview = async (userId: string, chatHistory: any[], currentTurn: number, maxTurns: number = 5) => {
  const profile = await Profile.findOne({ userId, deletedAt: null }).lean();
  if (!profile) {
    const err = new Error("Skill profile not found. Please complete the Skill Profiler onboarding first.");
    (err as any).status = 404;
    throw err;
  }

  const { getInterviewPrompt } = await import("../../../ai/prompts/interviewPrompt");
  const { interviewResponseSchema } = await import("../../../ai/schemas/interviewSchema");

  const prompt = getInterviewPrompt({
    targetRole: profile.targetCareerTrack || "Software Engineer",
    chatHistory,
    currentTurn,
    maxTurns,
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
    const err = new Error("Failed to generate mock interview response from Gemini.");
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

  const validated = interviewResponseSchema.safeParse(parsedJson);
  if (!validated.success) {
    const err = new Error("AI response failed validation against interview schema.");
    (err as any).status = 502;
    throw err;
  }

  return validated.data;
};
