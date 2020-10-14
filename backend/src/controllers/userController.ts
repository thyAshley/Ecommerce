import { RequestHandler } from "express";

import User from "../models/userModel";

// @desc    Auth user and get Token
// @route   POST /api/v1/users/login
// @access  Public

export const authUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const result = await user.comparePassword(password);
      if (result) {
        res.status(200).json({
          status: "success",
          result: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null,
          },
        });
      }
    }
    res.status(401);
    next(
      new Error("Unable to log in, please check your username and password")
    );
  } catch (error) {
    next(error);
  }
};
