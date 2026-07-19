// ─── Project Domain Types ────────────────────────────────────────────────────

export type DifficultyRating = "entry" | "mid" | "senior";

export type ProjectStatus =
  | "not_started"
  | "in_progress"
  | "review_pending"
  | "completed";

export interface Project {
  _id: string;
  title: string;
  difficultyRating: DifficultyRating;
  requirements: string[];
  techStack: string[];
  folderTemplate?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectProgress {
  _id: string;
  projectId: string | Project;
  userId: string;
  status: ProjectStatus;
  completedTasks: string[];
  githubRepoUrl?: string;
  liveDemoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectPayload {
  title: string;
  difficultyRating: DifficultyRating;
  requirements: string[];
  techStack: string[];
}

export interface UpdateProjectPayload {
  title?: string;
  difficultyRating?: DifficultyRating;
  requirements?: string[];
  techStack?: string[];
}

export interface UpdateProgressPayload {
  completedTasks?: string[];
  status?: ProjectStatus;
  githubRepoUrl?: string;
  liveDemoUrl?: string;
}

export interface GenerateProgressPayload {
  projectId: string;
}
