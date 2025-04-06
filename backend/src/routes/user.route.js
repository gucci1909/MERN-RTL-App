import express from "express";
import dotenv from "dotenv";
import {
  getProfileController,
  loginController,
  signupController,
} from "../controllers/user.controller.js";
import { validateLogin, validateSignup } from "../helper/user/validations.js";
import authMiddleware from "../middlewares/authenticate.js";

dotenv.config();

const userRoutes = express.Router();


/**
 * @route POST /api/auth/signup
 * @desc User registration
 */
userRoutes.post("/signup", validateSignup, signupController);

/**
 * @route POST /api/auth/login
 * @desc User login
 */
userRoutes.post("/login", validateLogin, loginController);

/**
 * @route GET /api/auth/userData
 * @desc User Data
 */
userRoutes.get("/userData", authMiddleware, getProfileController);

export default userRoutes;
