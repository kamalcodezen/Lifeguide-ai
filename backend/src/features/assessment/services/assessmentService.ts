import { Assessment } from "../../../database/models/Assessment";
import { AssessmentResult } from "../../../database/models/AssessmentResult";

export const createAssessment = async (data: {
  title: string;
  trackCategory: string;
  difficultyTier: "entry" | "mid" | "senior";
  estimatedMinutes: number;
}) => {
  return await Assessment.create({
    title: data.title,
    trackCategory: data.trackCategory,
    difficultyTier: data.difficultyTier,
    estimatedMinutes: data.estimatedMinutes,
  });
};

export const getAllAssessments = async () => {
  return await Assessment.find({ deletedAt: null }).lean();
};

export const getAssessmentById = async (id: string) => {
  return await Assessment.findOne({ _id: id, deletedAt: null }).lean();
};

export const updateAssessment = async (
  id: string,
  data: {
    title?: string;
    trackCategory?: string;
    difficultyTier?: "entry" | "mid" | "senior";
    estimatedMinutes?: number;
  }
) => {
  const assessment = await Assessment.findOne({ _id: id, deletedAt: null });
  if (!assessment) {
    const err = new Error("Assessment not found");
    (err as any).status = 404;
    throw err;
  }

  if (data.title !== undefined) assessment.title = data.title;
  if (data.trackCategory !== undefined) assessment.trackCategory = data.trackCategory;
  if (data.difficultyTier !== undefined) assessment.difficultyTier = data.difficultyTier;
  if (data.estimatedMinutes !== undefined) assessment.estimatedMinutes = data.estimatedMinutes;

  return await assessment.save();
};

export const deleteAssessment = async (id: string) => {
  const assessment = await Assessment.findOne({ _id: id, deletedAt: null });
  if (!assessment) {
    const err = new Error("Assessment not found");
    (err as any).status = 404;
    throw err;
  }
  assessment.deletedAt = new Date();
  return await assessment.save();
};

export const startAssessment = async (userId: string, assessmentId: string) => {
  const assessment = await Assessment.findOne({ _id: assessmentId, deletedAt: null });
  if (!assessment) {
    const err = new Error("Assessment not found");
    (err as any).status = 404;
    throw err;
  }

  const result = await AssessmentResult.create({
    userId,
    assessmentId,
    overallScore: 0,
    skippedCount: 0,
    skillsBreakdown: new Map<string, number>(),
  });

  const { getGeminiClient } = await import("../../../lib/gemini/client");
  const { cleanJsonString } = await import("../../../utils/cleanJson");
  const { getAssessmentGenerationPrompt } = await import("../../../ai/prompts/assessmentPrompt");
  const { assessmentGenerationResponseSchema } = await import("../../../ai/schemas/assessmentSchema");

  const prompt = getAssessmentGenerationPrompt({
    trackCategory: assessment.trackCategory,
    difficultyTier: assessment.difficultyTier,
  });

  const ai = getGeminiClient();
  const aiResponse = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });

  if (!aiResponse || !aiResponse.text) {
    throw new Error("Failed to generate assessment questions from Gemini.");
  }

  const rawJson = cleanJsonString(aiResponse.text);
  const parsedJson = JSON.parse(rawJson);
  const validated = assessmentGenerationResponseSchema.parse(parsedJson);

  return {
    resultId: result._id,
    assessmentData: validated
  };
};

export const submitAssessment = async (
  resultId: string,
  answers: Array<{ questionText: string; selectedOption: string }>
) => {
  const result = await AssessmentResult.findOne({ _id: resultId, deletedAt: null });
  if (!result) {
    const err = new Error("Assessment tracking session not found");
    (err as any).status = 404;
    throw err;
  }

  const assessment = await Assessment.findOne({ _id: result.assessmentId });
  const track = assessment ? assessment.trackCategory : "General";
  const difficulty = assessment ? assessment.difficultyTier : "mid";

  const { getGeminiClient } = await import("../../../lib/gemini/client");
  const { cleanJsonString } = await import("../../../utils/cleanJson");
  const { getAssessmentEvaluationPrompt } = await import("../../../ai/prompts/assessmentPrompt");
  const { assessmentEvaluationResponseSchema } = await import("../../../ai/schemas/assessmentSchema");

  const prompt = getAssessmentEvaluationPrompt({
    trackCategory: track,
    difficultyTier: difficulty,
    qaPairs: answers,
  });

  const ai = getGeminiClient();
  const aiResponse = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });

  if (!aiResponse || !aiResponse.text) {
    throw new Error("Failed to generate evaluation from Gemini.");
  }

  const rawJson = cleanJsonString(aiResponse.text);
  const parsedJson = JSON.parse(rawJson);
  const validated = assessmentEvaluationResponseSchema.parse(parsedJson);

  // Convert object to Map for Mongoose
  const breakdownMap = new Map<string, number>();
  Object.entries(validated.skillsBreakdown).forEach(([key, val]) => {
    breakdownMap.set(key, val as number);
  });

  result.overallScore = validated.overallScore;
  result.skippedCount = answers.filter((a) => !a.selectedOption).length;
  result.skillsBreakdown = breakdownMap;
  
  // optionally save strengths, weaknesses, recommendations to result if added to schema
  // (Assuming schema doesn't have them yet, we'll just return them so the controller can send them)

  await result.save();
  
  return {
    result,
    evaluation: validated
  };
};

export const getAssessmentResultById = async (id: string) => {
  return await AssessmentResult.findOne({ _id: id, deletedAt: null })
    .populate("assessmentId")
    .populate("userId");
};
