import express from "express";

import {
  authUser,
  userProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
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
router
  .route("/:id")
  .delete(protect, adminProtect, deleteUser)
  .get(protect, adminProtect, getUserById)
  .put(protect, adminProtect, updateUserById);
router.get("/", protect, adminProtect, getUsers);

export default router;
