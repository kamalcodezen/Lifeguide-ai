import { Router } from "express";
import { requireAuth } from "../../profile/middleware/authMiddleware";
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
  generateProgressController,
  getProjectProgressController,
  updateProjectProgressController,
} from "../controllers/projectController";

const router = Router();

// Apply requireAuth middleware globally on the projects router
router.use(requireAuth as any);

// Project CRUD
router.get("/", getAllProjectsController);
router.post("/", createProjectController);
router.get("/:id", getProjectByIdController);
router.patch("/:id", updateProjectController);
router.delete("/:id", deleteProjectController);

// ProjectProgress tracking
router.post("/generate", generateProgressController);
router.get("/progress/:projectId", getProjectProgressController);
router.patch("/progress/:projectId", updateProjectProgressController);

export default router;
