import { RequestHandler } from "express";
import products from "../data/products";

export const getProduct: RequestHandler = (req, res) => {
  res.status(200).json({
    status: "success",
    result: products,
  });
};

export const getProductById: RequestHandler<{ id: string }> = (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product._id === id);
  res.status(200).json({
    status: "success",
    result: product,
  });
};
