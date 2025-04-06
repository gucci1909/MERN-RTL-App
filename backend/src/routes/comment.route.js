import express from "express";
import dotenv from "dotenv";
import authMiddleware from "../middlewares/authenticate.js";
import apiLimiter from "../middlewares/rateLimiter.js";
import adminMiddleware from "../middlewares/authorise.js";
import {
  validateAddComment,
  validateApproveComment,
} from "../helper/comment/validations.js";
import { addCommentController, approveCommentController, showPendingComments } from "../controllers/comment.controller.js";

dotenv.config();

const commentRoutes = express.Router();

commentRoutes.use(apiLimiter, authMiddleware);

/**
 * @route Post /api/comments/pending
 * @desc Show all the pending comments
 * @access Protected (Requires auth)
 */
commentRoutes.get("/pending",  adminMiddleware, showPendingComments);

/**
 * @route Post /api/comments/:post_id
 * @desc Add a comment to a specific post, will go in pending state
 * @access Protected (Requires authentication)
 */
commentRoutes.post("/:post_id", validateAddComment, addCommentController);

/**
 * @route POST /api/comments/admin/approve/:post_id
 * @desc Approve a comment for a specific post (Admin only)
 * @access Protected (Requires authentication, Admin role required)
 */
commentRoutes.post(
  "/admin/approve/:post_id",
  adminMiddleware,
  validateApproveComment,
  approveCommentController
);

export default commentRoutes;
