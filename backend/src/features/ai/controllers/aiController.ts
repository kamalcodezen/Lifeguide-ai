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

export const conductMockInterviewController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { chatHistory, currentTurn, maxTurns } = req.body;
    
    if (!Array.isArray(chatHistory)) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_INPUT", message: "chatHistory must be an array." }
      });
    }

    const response = await aiService.conductMockInterview(userId, chatHistory, currentTurn || 1, maxTurns || 5);

    return res.status(200).json({
      success: true,
      data: response,
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
        message: error.message || "An unexpected error occurred during mock interview generation.",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }
};

export const analyzeResumeController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { resumeText, targetJobDescription } = req.body;
    
    if (!resumeText || !targetJobDescription) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_INPUT", message: "resumeText and targetJobDescription are required." }
      });
    }

    const response = await aiService.analyzeResume(userId, resumeText, targetJobDescription);

    return res.status(200).json({
      success: true,
      data: response,
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
        message: error.message || "An unexpected error occurred during resume analysis.",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }
};

export const generateRoadmapController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { identifiedGaps = [] } = req.body;
    
    const response = await aiService.generateRoadmap(userId, identifiedGaps);

    return res.status(200).json({
      success: true,
      data: response,
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
        message: error.message || "An unexpected error occurred during learning roadmap generation.",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }
};
