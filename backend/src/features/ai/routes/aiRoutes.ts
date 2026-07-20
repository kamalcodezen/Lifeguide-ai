import { Router } from "express";
import { requireAuth } from "../../profile/middleware/authMiddleware";
import {
  getCareerRecommendationsController,
  getProjectSuggestionsController,
  conductMockInterviewController,
  analyzeResumeController,
  generateRoadmapController,
} from "../controllers/aiController";

const router = Router();

// Apply requireAuth middleware globally on the AI router
router.use(requireAuth as any);

router.get("/career-recommendations", getCareerRecommendationsController);
router.get("/project-suggestions", getProjectSuggestionsController);
router.post("/interview", conductMockInterviewController);
router.post("/resume", analyzeResumeController);
router.post("/roadmap", generateRoadmapController);

export default router;
