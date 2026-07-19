import { Router } from "express";
import { requireAuth } from "../../profile/middleware/authMiddleware";
import {
  createAssessmentController,
  getAllAssessmentsController,
  getAssessmentByIdController,
  updateAssessmentController,
  deleteAssessmentController,
  startAssessmentController,
  submitAssessmentController,
  getAssessmentResultController,
} from "../controllers/assessmentController";

const router = Router();

// Apply requireAuth middleware globally on the assessments router
router.use(requireAuth as any);

// Assessment CRUD
router.get("/", getAllAssessmentsController);
router.post("/", createAssessmentController);
router.get("/:id", getAssessmentByIdController);
router.patch("/:id", updateAssessmentController);
router.delete("/:id", deleteAssessmentController);

// Assessment session endpoints
router.post("/start", startAssessmentController);
router.post("/submit", submitAssessmentController);
router.get("/result/:id", getAssessmentResultController);

export default router;
