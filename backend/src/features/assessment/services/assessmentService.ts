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

  // Create or return a fresh assessment result tracking ID
  return await AssessmentResult.create({
    userId,
    assessmentId,
    overallScore: 0,
    skippedCount: 0,
    skillsBreakdown: new Map<string, number>(),
  });
};

export const submitAssessment = async (
  resultId: string,
  answers: Array<{ questionId: string; selectedOption: string }>
) => {
  const result = await AssessmentResult.findOne({ _id: resultId, deletedAt: null });
  if (!result) {
    const err = new Error("Assessment tracking session not found");
    (err as any).status = 404;
    throw err;
  }

  // Retrieve the assessment to determine the track details
  const assessment = await Assessment.findOne({ _id: result.assessmentId });
  const track = assessment ? assessment.trackCategory : "General";

  // Simulate evaluation of diagnostic score details
  const totalQuestions = answers.length;
  let correctCount = 0;
  answers.forEach((ans) => {
    // Arbitrary mock validation: options 'A' or 'C' are treated as correct
    if (ans.selectedOption === "A" || ans.selectedOption === "C") {
      correctCount += 1;
    }
  });

  const overallScore = totalQuestions > 0 ? Math.min(100, Math.round((correctCount / totalQuestions) * 100)) : 0;
  const skippedCount = totalQuestions - answers.filter((a) => a.selectedOption !== "").length;

  const breakdown = new Map<string, number>();
  breakdown.set(track, overallScore);
  if (track === "Frontend Engineering") {
    breakdown.set("React", Math.max(0, overallScore - 5));
    breakdown.set("CSS/HTML", Math.max(0, overallScore + 5));
  } else if (track === "Backend Engineering") {
    breakdown.set("Node.js", Math.max(0, overallScore - 5));
    breakdown.set("Databases", Math.max(0, overallScore + 5));
  }

  result.overallScore = overallScore;
  result.skippedCount = skippedCount;
  result.skillsBreakdown = breakdown;

  return await result.save();
};

export const getAssessmentResultById = async (id: string) => {
  return await AssessmentResult.findOne({ _id: id, deletedAt: null })
    .populate("assessmentId")
    .populate("userId");
};
