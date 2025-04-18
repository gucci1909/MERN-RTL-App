import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { useSelector } from "react-redux";
import UploadPostForm from "./UploadPostForm";
import MyProfile from "./MyProfile";
import CommentApprove from "../admin/CommentApprove";

function HomeMenu({ activeTab }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token, profile } = useSelector((state) => state.user);
  const currentUserRole = profile.role;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPosts(res.data.posts);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch posts");
      console.error("Post fetching error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "Home") {
      setPosts([]);
      fetchPosts();
    }
  }, [activeTab, token]);

  return (
    <main className="p-8 text-center text-xl text-gray-700">
      {activeTab === "Home" && (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12">
          <UploadPostForm
            onUpload={() => activeTab === "Home" && fetchPosts()}
          />
          {loading && (
            <div className="flex animate-pulse items-center space-x-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
              <span className="text-base text-blue-500">Loading posts...</span>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && posts.length === 0 && <p>No posts found.</p>}
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      )}
      {activeTab === "Review Comments" && currentUserRole === "admin" && <CommentApprove/>}
      {activeTab === "Profile" && <MyProfile />}
    </main>
  );
}

export default HomeMenu;
