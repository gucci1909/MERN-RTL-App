import express from "express";
import dotenv from "dotenv";
import authMiddleware from "../middlewares/authenticate.js";
import apiLimiter from "../middlewares/rateLimiter.js";
import { validateLikeAction } from "../helper/like/validations.js";
import { addLikeController, viewLikeController } from "../controllers/like.controller.js";

dotenv.config({ path: ".env.local" });

const likeRoutes = express.Router();

likeRoutes.use(authMiddleware, apiLimiter);

/**
 * @route GET /api/likes/:post_id
 * @desc View likes to a specific post
 * @access Protected (Requires authentication)
 */
likeRoutes.get("/:post_id", viewLikeController);

/**
 * @route POST /api/likes/:post_id
 * @desc Add a like to a specific post
 * @access Protected (Requires authentication)
 */
likeRoutes.post("/:post_id", validateLikeAction, addLikeController);

export default likeRoutes;
