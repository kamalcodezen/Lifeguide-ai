import { Router } from "express";
import { requireAuth } from "../../profile/middleware/authMiddleware";
import {
  getRoadmapController,
  generateRoadmapController,
  updateProgressController,
} from "../controllers/roadmapController";

const router = Router();

// Apply requireAuth middleware globally on the roadmap router
router.use(requireAuth as any);

router.get("/", getRoadmapController);
router.post("/generate", generateRoadmapController);
router.patch("/progress", updateProgressController);

export default router;
