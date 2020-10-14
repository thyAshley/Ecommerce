import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

interface RequestWithUser extends Request {
  user?: any;
}

export const protect = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token = <string>req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const payload = <any>jwt.verify(token, process.env.JWT_SECRET!);
      if (payload) {
        console.log(payload);
        req.user = await User.findById(payload.id).select("-password");
      }
    } catch (error) {
      console.log(error);
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
