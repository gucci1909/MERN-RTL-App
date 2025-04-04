import mongoose from "mongoose";
import likeModel from "../models/like.model.js";
import postModel from "../models/post.model.js";
import { validateRequest } from "../helper/user/aggregations.js";

const viewLikeController = async (req, res) => {
  res.send(ok);
};

const addLikeController = async (req, res) => {
  if (validateRequest(req, res)) return;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { like } = req.body;
    const { post_id } = req.params;
    
    const user_id = req.user.id;
    const post = await postModel.findById(post_id);

    if (!post) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Post not found" });
    }

    const existingLike = await likeModel.findOne({
      post: post_id,
      user: user_id,
    });

    if (existingLike) {
      if (existingLike.like !== like) {
        existingLike.like = like;
        await existingLike.save({ session });

        const likesChange = like ? 1 : -1;
        await postModel.findByIdAndUpdate(post_id, {
          $inc: { likes: likesChange },
        });

        await session.commitTransaction();

        return res.status(200).json({ message: "Like updated successfully" });
      } else {
        await session.abortTransaction();
        return res.status(200).json({ message: "No change in like status" });
      }
    } else {
      const newLike = new likeModel({ user: user_id, post: post_id, like });
      await newLike.save({ session });

      if (like) {
        await postModel.findByIdAndUpdate(post_id, { $inc: { likes: 1 } });
      }

      await session.commitTransaction();

      return res.status(201).json({ message: "Like added successfully" });
    }
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in addLikeController:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  } finally {
    session.endSession();
  }
};

export { addLikeController, viewLikeController };
