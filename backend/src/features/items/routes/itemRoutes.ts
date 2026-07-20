import { Router } from "express";
import { requireAuth } from "../../profile/middleware/authMiddleware";
import { createItemController } from "../controllers/itemController";

const router = Router();

router.use(requireAuth as any);
router.post("/", createItemController);

export default router;
