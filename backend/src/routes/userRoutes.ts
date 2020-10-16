import express from "express";

import {
  authUser,
  userProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController";
import { protect } from "../middleware/AuthMiddleware";

const router = express.Router();

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .put(protect, updateUserProfile);
router.post("/", registerUser);

export default router;
