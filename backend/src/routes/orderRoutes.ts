import express from "express";

import { addOrderItems, getOrderById } from "../controllers/orderController";
import { protect } from "../middleware/AuthMiddleware";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);

export default router;
