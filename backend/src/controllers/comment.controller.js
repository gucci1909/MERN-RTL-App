import { getPendingCommentAggregation } from "../helper/comment/aggregations.js";
import { validateRequest } from "../helper/user/aggregations.js";
import commentModel from "../models/comment.model.js";

const addCommentController = async (req, res) => {
  if (validateRequest(req, res)) return;

  const { post_id } = req.params;
  const { comment } = req.body;
  const user_id = req.user.id;

  try {
    if (!comment) {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const newComment = new commentModel({
      post_id,
      user_id,
      comment,
      approved: false,
    });

    await newComment.save();

    res.status(201).json({
      message: "Comment submitted to admin",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const approveCommentController = async (req, res) => {
  if (validateRequest(req, res)) return;

  const { post_id } = req.params;
  const { comment_id, approved, user_id } = req.body;

  try {
    if (typeof approved !== "boolean") {
      return res
        .status(400)
        .json({ error: "Approved field must be true or false" });
    }

    const result = await commentModel.updateOne(
      { _id: comment_id, post_id, user_id },
      { $set: { approved } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "No comments found for this post or already approved" });
    }

    res.status(200).json({
      message: approved
        ? "Comments approved successfully"
        : "Comments disapproved successfully",
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const showPendingComments = async (req, res) => {
  try {
    const result = await commentModel.aggregate(getPendingCommentAggregation());
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching pending comments:", err);
    res.status(500).json({ error: "Failed to fetch pending comments" });
  }
};

export { addCommentController, approveCommentController, showPendingComments };
