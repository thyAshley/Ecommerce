import express from "express";

import {
  authUser,
  userProfile,
  registerUser,
} from "../controllers/userController";
import { protect } from "../middleware/AuthMiddleware";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, userProfile);
router.post("/", registerUser);

export default router;
