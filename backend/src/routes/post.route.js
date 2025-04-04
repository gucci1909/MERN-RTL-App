import express from "express";
import dotenv from "dotenv";
import authMiddleware from "../middlewares/authenticate.js";
import apiLimiter from "../middlewares/rateLimiter.js";
import { validatePost } from "../helper/post/validations.js";
import { allPostController, createPostController } from "../controllers/post.controller.js";
import upload from "../middlewares/uploadPhoto.js";

dotenv.config();

const postRoutes = express.Router();

postRoutes.use(apiLimiter, authMiddleware);

/**
 * @route GET /api/posts
 * @desc Able to see all post here
 * @access Protected (Requires authentication)
*/
postRoutes.get("/", allPostController);

/**
 * @route POST /api/posts
 * @desc creating post here using message queue, workers to upload data to third parties(cloudinary for photo upload)
 * @access Protected (Requires authentication)
*/
postRoutes.post("/", upload.single("image"), validatePost, createPostController);

export default postRoutes;
