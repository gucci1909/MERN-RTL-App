import express from "express";
import dotenv from "dotenv";
import {
  loginController,
  signupController,
} from "../controllers/user.controller.js";
import { validateLogin, validateSignup } from "../helper/user/validations.js";

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

export default userRoutes;
