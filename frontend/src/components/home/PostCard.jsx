import React, { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

const PostCard = ({ title, content, image }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative mb-6 w-full max-w-2xl rounded-3xl border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-lg transition hover:shadow-blue-200">
      <div className="mb-2 text-xl font-bold text-blue-700">{title}</div>
      <p className="mb-4 text-gray-800">{content}</p>

      {image && (
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src={image}
            alt="Post visual"
            className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="mt-4 flex items-center space-x-6 text-gray-600">
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-2 text-sm transition hover:text-blue-600"
        >
          <Heart
            size={18}
            className={`transition ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
          {liked ? "Liked" : "Like"}
        </button>
        <button className="flex items-center gap-2 text-sm transition hover:text-blue-600">
          <MessageCircle size={18} />
          Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;
