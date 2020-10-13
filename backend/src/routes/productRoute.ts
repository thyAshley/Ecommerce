import express from "express";
const router = express.Router();
import { getProduct, getProductById } from "../controllers/productController";

router.get("/", getProduct);
router.get("/:id", getProductById);

export default router;
