import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    like: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Like", LikeSchema);
