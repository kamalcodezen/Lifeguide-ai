import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/authMiddleware";
import { createProfileSchema, updateProfileSchema } from "../validation/profileValidation";
import * as profileService from "../services/profileService";

export const getProfileController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const profile = await profileService.getProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Profile not found.",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        targetCareerTrack: profile.targetCareerTrack,
        skillLevel: profile.skillLevel,
        weeklyAvailabilityHours: profile.weeklyAvailabilityHours,
        preferences: Object.fromEntries(profile.preferences.entries()),
      },
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

export const createProfileController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const parsed = createProfileSchema.safeParse(req.body);

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

    const profile = await profileService.createProfile(userId, parsed.data);

    return res.status(201).json({
      success: true,
      data: {
        targetCareerTrack: profile.targetCareerTrack,
        skillLevel: profile.skillLevel,
        weeklyAvailabilityHours: profile.weeklyAvailabilityHours,
        preferences: Object.fromEntries(profile.preferences.entries()),
      },
    });
  } catch (error: any) {
    const status = error.status || 500;
    const code = status === 400 ? "BAD_REQUEST" : "INTERNAL_SERVER_ERROR";
    return res.status(status).json({
      success: false,
      error: {
        code,
        message: error.message || "An unexpected error occurred.",
      },
    });
  }
};

export const updateProfileController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const parsed = updateProfileSchema.safeParse(req.body);

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

    const profile = await profileService.updateProfile(userId, parsed.data);

    return res.status(200).json({
      success: true,
      data: {
        targetCareerTrack: profile.targetCareerTrack,
        skillLevel: profile.skillLevel,
        weeklyAvailabilityHours: profile.weeklyAvailabilityHours,
        preferences: Object.fromEntries(profile.preferences.entries()),
      },
    });
  } catch (error: any) {
    const status = error.status || 500;
    const code = status === 404 ? "NOT_FOUND" : "INTERNAL_SERVER_ERROR";
    return res.status(status).json({
      success: false,
      error: {
        code,
        message: error.message || "An unexpected error occurred.",
      },
    });
  }
};

export const deleteProfileController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    await profileService.deleteProfile(userId);

    return res.status(200).json({
      success: true,
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    const status = error.status || 500;
    const code = status === 404 ? "NOT_FOUND" : "INTERNAL_SERVER_ERROR";
    return res.status(status).json({
      success: false,
      error: {
        code,
        message: error.message || "An unexpected error occurred.",
      },
    });
  }
};
