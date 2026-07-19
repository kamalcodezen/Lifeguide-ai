"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Project, ProjectProgress, ProjectStatus } from "../types";
import * as projectsService from "../services/projectsService";

interface UseProjectsReturn {
  projects: Project[];
  progressMap: Record<string, ProjectProgress>;
  loading: boolean;
  error: string | null;
  successMsg: string | null;
  setError: (msg: string | null) => void;
  setSuccessMsg: (msg: string | null) => void;
  refetch: () => Promise<void>;
  createProject: (
    title: string,
    difficultyRating: "entry" | "mid" | "senior",
    requirements: string[],
    techStack: string[]
  ) => Promise<void>;
  updateProject: (
    id: string,
    title: string,
    difficultyRating: "entry" | "mid" | "senior",
    requirements: string[],
    techStack: string[]
  ) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProgress: (
    projectId: string,
    patch: {
      completedTasks?: string[];
      status?: ProjectStatus;
      githubRepoUrl?: string;
      liveDemoUrl?: string;
    }
  ) => Promise<ProjectProgress | null>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, ProjectProgress>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await projectsService.getAllProjects();
      setProjects(list);

      const map: Record<string, ProjectProgress> = {};
      await Promise.all(
        list.map(async (p) => {
          try {
            let prog = await projectsService.getProjectProgress(p._id);
            if (!prog) {
              prog = await projectsService.generateProjectProgress({ projectId: p._id });
            }
            if (prog) map[p._id] = prog;
          } catch {
            // tolerate individual failures
          }
        })
      );
      setProgressMap(map);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to connect to the backend server."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Run once on mount using a ref guard — avoids setState-in-effect lint issue
  // by using the ref to gate execution rather than putting state updates
  // directly in the effect body.
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      void fetchAll();
    }
  }, [fetchAll]);

  const createProject = useCallback(
    async (
      title: string,
      difficultyRating: "entry" | "mid" | "senior",
      requirements: string[],
      techStack: string[]
    ) => {
      setError(null);
      setSuccessMsg(null);
      const project = await projectsService.createProject({
        title,
        difficultyRating,
        requirements,
        techStack,
      });
      try {
        const prog = await projectsService.generateProjectProgress({ projectId: project._id });
        if (prog) setProgressMap((prev) => ({ ...prev, [project._id]: prog }));
      } catch {
        // non-fatal
      }
      setSuccessMsg("New project created successfully!");
      await fetchAll();
    },
    [fetchAll]
  );

  const updateProject = useCallback(
    async (
      id: string,
      title: string,
      difficultyRating: "entry" | "mid" | "senior",
      requirements: string[],
      techStack: string[]
    ) => {
      setError(null);
      setSuccessMsg(null);
      await projectsService.updateProject(id, { title, difficultyRating, requirements, techStack });
      setSuccessMsg("Project updated successfully!");
      await fetchAll();
    },
    [fetchAll]
  );

  const deleteProject = useCallback(
    async (id: string) => {
      setError(null);
      setSuccessMsg(null);
      await projectsService.deleteProject(id);
      setProgressMap((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setSuccessMsg("Project deleted successfully.");
      await fetchAll();
    },
    [fetchAll]
  );

  const updateProgress = useCallback(
    async (
      projectId: string,
      patch: {
        completedTasks?: string[];
        status?: ProjectStatus;
        githubRepoUrl?: string;
        liveDemoUrl?: string;
      }
    ): Promise<ProjectProgress | null> => {
      setError(null);
      setSuccessMsg(null);
      try {
        const updated = await projectsService.updateProjectProgress(projectId, patch);
        setProgressMap((prev) => ({ ...prev, [projectId]: updated }));
        setSuccessMsg("Progress updated.");
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update progress.");
        return null;
      }
    },
    []
  );

  return {
    projects,
    progressMap,
    loading,
    error,
    successMsg,
    setError,
    setSuccessMsg,
    refetch: fetchAll,
    createProject,
    updateProject,
    deleteProject,
    updateProgress,
  };
}
