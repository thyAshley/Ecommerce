import express from "express";
const router = express.Router();
import {
  getProduct,
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
} from "../controllers/productController";
import { adminProtect, protect } from "../middleware/AuthMiddleware";

router.route("/").get(getProduct).post(protect, adminProtect, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminProtect, deleteProductById)
  .put(protect, adminProtect, updateProduct);

export default router;
