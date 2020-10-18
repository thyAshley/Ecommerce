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

// @desc Get order by ID
// @route Get /api/v1/products/:id
// @access Private
export const getOrderById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id).populate("user", "name email");
    return res.status(200).json({
      order,
    });
  } catch (error) {
    res.status(404);
    next(new Error("Order not found!"));
  }
};

// @desc Update order to paid
// @route Put /api/v1/products/:id/pay
// @access Private
export const updateOrderToPaid: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
    }
    const updatedOrder = await order?.save();
    return res.status(200).json({
      updatedOrder,
    });
  } catch (error) {
    res.status(404);
    next(new Error("Order not found!"));
  }
};
