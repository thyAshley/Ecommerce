import { RequestHandler } from "express";

import User from "../models/userModel";

// @desc    Auth user and get Token
// @route   POST /api/v1/users/login
// @access  Public

export const authUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const result = await user.comparePassword(password);
      console.log(result);
    }
    res.status(200).json({
      status: "success",
      result: {
        email,
        password,
      },
    });
  } catch (error) {
    console.log("fail");
  }
};
