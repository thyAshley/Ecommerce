import express from "express";
const router = express.Router();
import { getProduct, getProductById } from "../controllers/productController";

router.get("/api/v1/products", getProduct);
router.get("/api/v1/products/:id", getProductById);

export default router;
