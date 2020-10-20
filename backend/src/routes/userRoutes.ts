import express from "express";

import {
  authUser,
  userProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from "../controllers/userController";
import { protect, adminProtect } from "../middleware/AuthMiddleware";

const router = express.Router();

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .put(protect, updateUserProfile);
router.post("/", registerUser);

//admin routes
router.get("/", protect, adminProtect, getUsers);

export default router;
