import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import {
  getProfileController,
  createProfileController,
  updateProfileController,
  deleteProfileController,
} from "../controllers/profileController";

const router = Router();

// Apply requireAuth middleware globally on the profile router
router.use(requireAuth as any);

router.get("/", getProfileController);
router.post("/", createProfileController);
router.patch("/", updateProfileController);
router.delete("/", deleteProfileController);

export default router;
