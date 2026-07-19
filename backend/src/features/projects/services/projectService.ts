import { Project } from "../../../database/models/Project";
import { ProjectProgress } from "../../../database/models/ProjectProgress";

// --- Project CRUD ---
export const createProject = async (data: {
  title: string;
  difficultyRating: "entry" | "mid" | "senior";
  requirements: string[];
  techStack: string[];
  folderTemplate?: Record<string, any>;
}) => {
  return await Project.create({
    title: data.title,
    difficultyRating: data.difficultyRating,
    requirements: data.requirements,
    techStack: data.techStack,
    folderTemplate: data.folderTemplate || {},
  });
};

export const getAllProjects = async () => {
  return await Project.find({ deletedAt: null }).lean();
};

export const getProjectById = async (id: string) => {
  return await Project.findOne({ _id: id, deletedAt: null }).lean();
};

export const updateProject = async (
  id: string,
  updateData: {
    title?: string;
    difficultyRating?: "entry" | "mid" | "senior";
    requirements?: string[];
    techStack?: string[];
    folderTemplate?: Record<string, any>;
  }
) => {
  const project = await Project.findOne({ _id: id, deletedAt: null });
  if (!project) {
    const err = new Error("Project not found.");
    (err as any).status = 404;
    throw err;
  }

  if (updateData.title !== undefined) project.title = updateData.title;
  if (updateData.difficultyRating !== undefined) project.difficultyRating = updateData.difficultyRating;
  if (updateData.requirements !== undefined) project.requirements = updateData.requirements;
  if (updateData.techStack !== undefined) project.techStack = updateData.techStack;
  if (updateData.folderTemplate !== undefined) {
    project.folderTemplate = new Map(Object.entries(updateData.folderTemplate));
  }

  return await project.save();
};

export const deleteProject = async (id: string) => {
  const project = await Project.findOne({ _id: id, deletedAt: null });
  if (!project) {
    const err = new Error("Project not found.");
    (err as any).status = 404;
    throw err;
  }
  project.deletedAt = new Date();
  return await project.save();
};

// --- ProjectProgress Operations ---
export const generateProjectProgress = async (userId: string, projectId: string) => {
  // Check if project exists
  const project = await Project.findOne({ _id: projectId, deletedAt: null });
  if (!project) {
    const err = new Error("Project not found.");
    (err as any).status = 404;
    throw err;
  }

  // Check if project progress already exists for this user and project
  const existingProgress = await ProjectProgress.findOne({ userId, projectId, deletedAt: null });
  if (existingProgress) {
    return existingProgress;
  }

  return await ProjectProgress.create({
    userId,
    projectId,
    status: "not_started",
    completedTasks: [],
  });
};

export const getProjectProgress = async (userId: string, projectId: string) => {
  return await ProjectProgress.findOne({ userId, projectId, deletedAt: null })
    .populate("projectId")
    .populate("userId");
};

export const updateProjectProgress = async (
  userId: string,
  projectId: string,
  updateData: {
    completedTasks?: string[];
    status?: "not_started" | "in_progress" | "review_pending" | "completed";
    githubRepoUrl?: string;
    liveDemoUrl?: string;
  }
) => {
  const progress = await ProjectProgress.findOne({ userId, projectId, deletedAt: null });
  if (!progress) {
    const err = new Error("Project progress tracker not found.");
    (err as any).status = 404;
    throw err;
  }

  if (updateData.completedTasks !== undefined) progress.completedTasks = updateData.completedTasks;
  if (updateData.status !== undefined) progress.status = updateData.status;
  if (updateData.githubRepoUrl !== undefined) progress.githubRepoUrl = updateData.githubRepoUrl;
  if (updateData.liveDemoUrl !== undefined) progress.liveDemoUrl = updateData.liveDemoUrl;

  return await progress.save();
};
