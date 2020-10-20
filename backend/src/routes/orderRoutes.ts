import express from "express";

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  findOrderByUser,
} from "../controllers/orderController";
import { protect } from "../middleware/AuthMiddleware";

const router = express.Router();

router.get("/myorders", protect, findOrderByUser);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.post("/", protect, addOrderItems);
export default router;
