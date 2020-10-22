import express from "express";
const router = express.Router();
import {
  getProduct,
  getProductById,
  deleteProductById,
} from "../controllers/productController";
import { adminProtect, protect } from "../middleware/AuthMiddleware";

router.get("/", getProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminProtect, deleteProductById);

export default router;
