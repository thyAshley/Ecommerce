import express from "express";

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController";
import { protect } from "../middleware/AuthMiddleware";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
