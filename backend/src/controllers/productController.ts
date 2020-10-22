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

// @desc Create Products
// @route Post /api/v1/products
// @access Private/Admin
export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = new Product({
      name: "Sample",
      price: 0,
      user: req.user._id,
      image: "",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample desc",
    });
    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    res.status(404);
    next(new Error("Issue creating product"));
  }
};

// @desc Update Products
// @route Put /api/v1/products/:id
// @access Private/Admin
export const updateProduct: RequestHandler = async (req, res, next) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      return res.status(200).json(updatedProduct);
    }
    res.status(404);
    next(new Error("Product not found"));
  } catch (error) {
    res.status(404);
    next(new Error("Issue creating product"));
  }
};
