import cloudinary from "../config/cloudinary.js";
import getPostsWithDetails from "../helper/post/aggregations.js";
import { validateRequest } from "../helper/user/aggregations.js";
import postModel from "../models/post.model.js";

const allPostController = async (req, res) => {
  if (validateRequest(req, res)) return;

  try {
    const posts = await postModel.aggregate(getPostsWithDetails());
    res.status(200).json({ message: "Posts retrieved successfully", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const createPostController = async (req, res) => {
  if (validateRequest(req, res)) return;
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    let image_url = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "post_images",
      });

      image_url = uploadResult.secure_url;
    }

    const newPost = new postModel({
      title,
      content,
      user: userId,
      image_url,
    });

    const savedPost = await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export { allPostController, createPostController };
