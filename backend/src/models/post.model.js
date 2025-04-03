import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
    image_url: { type: String, default: "" },
    deletedAt: { type: Date, default: null }, // Soft delete field
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Post", PostSchema);
