import express from "express";

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  findOrderByUser,
  getOrders,
} from "../controllers/orderController";
import { protect, adminProtect } from "../middleware/AuthMiddleware";

const router = express.Router();

router.get("/myorders", protect, findOrderByUser);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, adminProtect, getOrders);
export default router;
