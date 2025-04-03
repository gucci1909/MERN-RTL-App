import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String,
  approved: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

export default mongoose.model("Comment", CommentSchema);
