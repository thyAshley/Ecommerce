import express from "express";
const router = express.Router();
import { getProduct, getProductById } from "../controllers/productController";

router.get("/products", getProduct);
router.get("/products/:id", getProductById);

export default router;
