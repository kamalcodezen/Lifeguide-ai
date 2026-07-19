import type { Response } from "express";
import type { AuthenticatedRequest } from "../../profile/middleware/authMiddleware";
import { updateProgressSchema } from "../validation/roadmapValidation";
import * as roadmapService from "../services/roadmapService";

export const getRoadmapController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const roadmap = await roadmapService.getRoadmapByUserId(userId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Roadmap not found. Generate one first.",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "An unexpected error occurred.",
      },
    });
  }
};

export const generateRoadmapController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const roadmap = await roadmapService.generateMockRoadmap(userId);

    return res.status(201).json({
      success: true,
      data: roadmap,
    });
  } catch (error: any) {
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "An unexpected error occurred during roadmap generation.",
      },
    });
  }
};

export const updateProgressController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const parsed = updateProgressSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "One or more input values are invalid.",
          details: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
      });
    }

    const { milestoneId, resourceId, isCompleted } = parsed.data;
    const roadmap = await roadmapService.updateResourceProgress(
      userId,
      milestoneId,
      resourceId,
      isCompleted
    );

    return res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (error: any) {
    const status = error.status || 500;
    const code = status === 404 ? "NOT_FOUND" : "BAD_REQUEST";
    return res.status(status).json({
      success: false,
      error: {
        code,
        message: error.message || "An unexpected error occurred.",
      },
    });
  }
};
