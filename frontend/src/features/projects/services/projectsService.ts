import type {
  Project,
  ProjectProgress,
  CreateProjectPayload,
  UpdateProjectPayload,
  UpdateProgressPayload,
  GenerateProgressPayload,
} from "../types";

const BASE_URL = "http://localhost:5000/api/v1";

const defaultOptions: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

// ─── Project CRUD ─────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects`, {
    ...defaultOptions,
    method: "GET",
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body?.error?.message || "Failed to fetch projects.");
  }
  return body.data as Project[];
}

export async function getProjectById(id: string): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    ...defaultOptions,
    method: "GET",
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body?.error?.message || "Failed to fetch project.");
  }
  return body.data as Project;
}

export async function createProject(
  payload: CreateProjectPayload
): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects`, {
    ...defaultOptions,
    method: "POST",
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body?.error?.message || "Failed to create project.");
  }
  return body.data as Project;
}

export async function updateProject(
  id: string,
  payload: UpdateProjectPayload
): Promise<Project> {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    ...defaultOptions,
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body?.error?.message || "Failed to update project.");
  }
  return body.data as Project;
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    ...defaultOptions,
    method: "DELETE",
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body?.error?.message || "Failed to delete project.");
  }
}

// ─── ProjectProgress ──────────────────────────────────────────────────────────

export async function getProjectProgress(
  projectId: string
): Promise<ProjectProgress | null> {
  const res = await fetch(`${BASE_URL}/projects/progress/${projectId}`, {
    ...defaultOptions,
    method: "GET",
  });
  if (res.status === 404) return null;
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body?.error?.message || "Failed to fetch project progress.");
  }
  return body.data as ProjectProgress;
}

export async function generateProjectProgress(
  payload: GenerateProgressPayload
): Promise<ProjectProgress> {
  const res = await fetch(`${BASE_URL}/projects/generate`, {
    ...defaultOptions,
    method: "POST",
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body?.error?.message || "Failed to generate project progress.");
  }
  return body.data as ProjectProgress;
}

export async function updateProjectProgress(
  projectId: string,
  payload: UpdateProgressPayload
): Promise<ProjectProgress> {
  const res = await fetch(`${BASE_URL}/projects/progress/${projectId}`, {
    ...defaultOptions,
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body?.error?.message || "Failed to update project progress.");
  }
  return body.data as ProjectProgress;
}
