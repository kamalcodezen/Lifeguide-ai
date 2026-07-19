import type { Response } from "express";
import type { AuthenticatedRequest } from "../../profile/middleware/authMiddleware";
import {
  createAssessmentSchema,
  updateAssessmentSchema,
  startAssessmentSchema,
  submitAssessmentSchema,
} from "../validation/assessmentValidation";
import * as assessmentService from "../services/assessmentService";

// --- Assessment CRUD ---
export const createAssessmentController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsed = createAssessmentSchema.safeParse(req.body);
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

    const assessment = await assessmentService.createAssessment(parsed.data);

    return res.status(201).json({
      success: true,
      data: assessment,
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

export const getAllAssessmentsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const assessments = await assessmentService.getAllAssessments();
    return res.status(200).json({
      success: true,
      data: assessments,
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

export const getAssessmentByIdController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const assessment = await assessmentService.getAssessmentById(req.params.id);
    if (!assessment) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Assessment not found.",
        },
      });
    }
    return res.status(200).json({
      success: true,
      data: assessment,
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

export const updateAssessmentController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsed = updateAssessmentSchema.safeParse(req.body);
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

    const assessment = await assessmentService.updateAssessment(req.params.id, parsed.data);

    return res.status(200).json({
      success: true,
      data: assessment,
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

export const deleteAssessmentController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await assessmentService.deleteAssessment(req.params.id);
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

// --- Assessment Session Actions ---
export const startAssessmentController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const parsed = startAssessmentSchema.safeParse(req.body);
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

    const result = await assessmentService.startAssessment(userId, parsed.data.assessmentId);

    return res.status(200).json({
      success: true,
      data: {
        resultId: result._id,
      },
    });
  } catch (error: any) {
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "An unexpected error occurred.",
      },
    });
  }
};

export const submitAssessmentController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsed = submitAssessmentSchema.safeParse(req.body);
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

    const result = await assessmentService.submitAssessment(
      parsed.data.resultId,
      parsed.data.answers
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "An unexpected error occurred.",
      },
    });
  }
};

export const getAssessmentResultController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await assessmentService.getAssessmentResultById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Assessment result not found.",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
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
