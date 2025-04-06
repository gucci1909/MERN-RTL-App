import React, { useState } from "react";
import { Heart, MessageCircle, SendHorizonal } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const PostCard = ({
  _id,
  title,
  content,
  likes = 0,
  likes_user_id = [],
  image_url,
  comments = [],
  onCommentAdd,
}) => {
  const { token, profile } = useSelector((state) => state.user);
  const currentUserId = profile.userId;
  const [liked, setLiked] = useState(likes_user_id.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(
    comments.filter((c) => c.approved),
  );
  const [pendingComments, setPendingComments] = useState([]);

  const handleLike = async (like) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/like/${_id}`,
        { like },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (liked) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }
      setLiked((prev) => !prev);
    } catch (err) {
      console.error("Failed to like the post", err);
      alert("Failed to like the post");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/comment/${_id}`,
        {
          comment: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const newPendingComment = {
        ...res.data.comment,
        user: { username: "You" },
        approved: false,
      };

      setPendingComments((prev) => [...prev, newPendingComment]);
      setNewComment("");
      onCommentAdd?.();
    } catch (err) {
      console.error("Failed to add comment", err);
      alert("Failed to post comment");
    }
  };

  return (
    <div className="relative mb-6 w-full max-w-2xl rounded-3xl border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-lg transition hover:shadow-blue-200">
      <div className="mb-2 text-xl font-bold text-blue-700">{title}</div>
      <p className="mb-4 text-gray-800">{content}</p>

      {image_url && (
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src={image_url}
            alt="Post visual"
            className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="mt-4 flex items-center space-x-6 text-gray-600">
        <button
          onClick={() => handleLike(!liked)}
          className="flex cursor-pointer items-center gap-2 text-sm transition hover:text-blue-600"
        >
          <Heart
            size={18}
            className={`transition ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
          {liked ? "Liked" : "Like"} · {likeCount}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="flex cursor-pointer items-center gap-2 text-sm transition hover:text-blue-600"
        >
          <MessageCircle size={18} />
          {localComments.length} Comment{localComments.length !== 1 ? "s" : ""}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 rounded-xl border border-gray-300 bg-white/70 p-4 shadow-inner">
          <div className="mb-3 text-sm font-semibold text-gray-700">
            Comments
          </div>

          <div className="max-h-48 space-y-3 overflow-y-auto pr-2 text-sm">
            {localComments.length === 0 && pendingComments.length === 0 && (
              <div className="text-gray-500">
                No comments yet. Be the first!
              </div>
            )}

            {[...localComments, ...pendingComments].map((comment, idx) => (
              <div
                key={comment._id || idx}
                className="flex items-start gap-3 rounded-md bg-gray-100 px-3 py-2 text-gray-800 shadow-sm"
              >
                <img
                  src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${comment.user?.username || "user"}`}
                  alt="User avatar"
                  className="h-8 w-8 flex-shrink-0 rounded-full border border-gray-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-600">
                      {comment.user?.username || "Anonymous"}
                    </span>
                    {!comment.approved && (
                      <span className="text-xs text-yellow-600">
                        (Pending Approval)
                      </span>
                    )}
                  </div>
                  <p className="text-left text-sm text-gray-700">
                    {comment?.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-lg border px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={handleAddComment}
              className="cursor-pointer rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
              title="Post comment"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
