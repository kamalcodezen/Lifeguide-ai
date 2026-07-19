import type { Response } from "express";
import type { AuthenticatedRequest } from "../../profile/middleware/authMiddleware";
import * as aiService from "../services/aiService";

export const getCareerRecommendationsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const recommendations = await aiService.getCareerRecommendations(userId);

    return res.status(200).json({
      success: true,
      data: recommendations,
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    const status = error.status || 500;
    const code = status === 404 ? "NOT_FOUND" : "AI_SERVICE_ERROR";
    return res.status(status).json({
      success: false,
      error: {
        code,
        message: error.message || "An unexpected error occurred during recommendations compilation.",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }
};

export const getProjectSuggestionsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const suggestions = await aiService.getProjectSuggestions(userId);

    return res.status(200).json({
      success: true,
      data: suggestions,
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    const status = error.status || 500;
    const code = status === 404 ? "NOT_FOUND" : "AI_SERVICE_ERROR";
    return res.status(status).json({
      success: false,
      error: {
        code,
        message: error.message || "An unexpected error occurred during project suggestion generation.",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }
};
