import { RequestHandler } from "express";

import Product from "../models/productModel";

// @desc Fetch all Products
// @route /api/v1/products
// @access Public
export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "Success",
      result: products,
    });
  } catch (error) {
    res.status(404);
    next(new Error("Error fetching products"));
  }
};

// @desc Fetch Products by id
// @route /api/v1/products/:id
// @access Public
export const getProductById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({
      status: "Success",
      result: product,
    });
  } catch (error) {
    res.status(404);
    next(new Error("Product cannot be found"));
  }
};

// @desc Delete Products by id
// @route /api/v1/products/:id
// @access Private/Admin
export const deleteProductById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      await product.remove();
      return res.status(204).json({
        status: "Product removed",
      });
    }
  } catch (error) {
    res.status(404);
    next(new Error("Product cannot be found"));
  }
};
