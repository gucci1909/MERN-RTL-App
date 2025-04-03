import express from "express";
import { body } from "express-validator";
import dotenv from "dotenv";
import { loginController, signupController } from "../controllers/user.controller.js";

dotenv.config({ path: ".env.local" });

const userRoutes = express.Router();

/**
 * @route POST /api/auth/signup
 * @desc User registration
 */
userRoutes.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  signupController
);

/**
 * @route POST /api/auth/login
 * @desc User login
 */
userRoutes.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginController
);

export default userRoutes;
