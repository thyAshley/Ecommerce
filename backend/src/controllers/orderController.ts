import e, { RequestHandler } from "express";
import Order from "../models/orderModel";

// @desc Create New Order
// @route POST /api/v1/products
// @access Private
export const addOrderItems: RequestHandler = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    next(new Error("No order item"));
  } else {
    try {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createdOrder = await order.save();

      res.status(200).json({
        createdOrder,
      });
    } catch (error) {
      res.status(404);
      next(new Error("Error fetching products"));
    }
  }
};
