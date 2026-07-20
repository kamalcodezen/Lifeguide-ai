import { Router } from "express";
import { requireAuth } from "../../profile/middleware/authMiddleware";
import { 
  createItemController,
  getItemsController,
  getItemByIdController,
  deleteItemController
} from "../controllers/itemController";

const router = Router();

router.use(requireAuth as any);
router.post("/", createItemController);
router.get("/", getItemsController);
router.get("/:id", getItemByIdController);
router.delete("/:id", deleteItemController);

export default router;
