import { Router } from "express";
import {
  signUpController,
  signInController,
  signOutController,
  getMeController,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.post("/signout", signOutController);
router.get("/me", getMeController);

export default router;
