import e, { RequestHandler } from "express";

import generateToken from "../utils/generateToken";
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
        const token = generateToken(user._id);
        return res.status(201).json({
          status: "success",
          result: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
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

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const userProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  } catch (error) {
    res.status(404);
    next(new Error("User not found"));
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      return res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      next(new Error("User not found, please re-login"));
    }
  } catch (error) {
    console.log(error);
    next(new Error("Unexpected Error occur"));
  }
};

// @desc    Register a new user
// @route   GET /api/v1/users
// @access  public
export const registerUser: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      next(new Error("User already exists"));
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400);
    if (error.name === "ValidationError") {
      next(new Error("Invalid Inputs"));
    }
    next(new Error(error));
  }
};
