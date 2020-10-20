import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

export const protect: RequestHandler = async (req, res, next) => {
  let token = <string>req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const payload = <any>jwt.verify(token, process.env.JWT_SECRET!);

      if (payload) {
        req.user = await User.findById(payload.id).select("-password");
      }
    } catch (error) {
      res.status(401);
      next(new Error("Not authorized, please log in to proceed"));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error("Not authorized, please log in to proceed"));
  }

  next();
};

export const adminProtect: RequestHandler = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    next(new Error("Not Authorized to handle this action"));
  }
};
