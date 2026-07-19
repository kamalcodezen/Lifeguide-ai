import type { Response } from "express";
import type { AuthenticatedRequest } from "../../profile/middleware/authMiddleware";
import {
  createProjectSchema,
  updateProjectSchema,
  generateProgressSchema,
  updateProgressSchema,
} from "../validation/projectValidation";
import * as projectService from "../services/projectService";

// --- Project CRUD ---
export const createProjectController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsed = createProjectSchema.safeParse(req.body);
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

    const project = await projectService.createProject(parsed.data);

    return res.status(201).json({
      success: true,
      data: project,
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

export const getAllProjectsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();
    return res.status(200).json({
      success: true,
      data: projects,
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

export const getProjectByIdController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Project not found.",
        },
      });
    }
    return res.status(200).json({
      success: true,
      data: project,
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

export const updateProjectController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsed = updateProjectSchema.safeParse(req.body);
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

    const project = await projectService.updateProject(req.params.id, parsed.data);

    return res.status(200).json({
      success: true,
      data: project,
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

export const deleteProjectController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await projectService.deleteProject(req.params.id);
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

// --- ProjectProgress Operations ---
export const generateProgressController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const parsed = generateProgressSchema.safeParse(req.body);
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

    const progress = await projectService.generateProjectProgress(userId, parsed.data.projectId);

    return res.status(201).json({
      success: true,
      data: progress,
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

export const getProjectProgressController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const progress = await projectService.getProjectProgress(userId, req.params.projectId);
    if (!progress) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Project progress tracker not found.",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: progress,
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

export const updateProjectProgressController = async (req: AuthenticatedRequest, res: Response) => {
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

    const progress = await projectService.updateProjectProgress(
      userId,
      req.params.projectId,
      parsed.data
    );

    return res.status(200).json({
      success: true,
      data: progress,
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
