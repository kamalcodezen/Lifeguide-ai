import { Router } from "express";
import { requireAuth } from "../../profile/middleware/authMiddleware";
import {
  getCareerRecommendationsController,
  getProjectSuggestionsController,
} from "../controllers/aiController";

const router = Router();

// Apply requireAuth middleware globally on the AI router
router.use(requireAuth as any);

router.get("/career-recommendations", getCareerRecommendationsController);
router.get("/project-suggestions", getProjectSuggestionsController);

export default router;
