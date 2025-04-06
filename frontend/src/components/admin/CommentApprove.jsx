import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

function CommentApprove() {
  const { token } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/comment/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (postId, comment_id, status, userId) => {
    setActionLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/comment/admin/approve/${postId}`,
        {
          comment_id,
          user_id: userId,
          approved: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchComments();
    } catch (err) {
      console.error("Failed to update comment", err);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white p-4">
      <h2 className="mb-6 text-center text-2xl font-semibold text-blue-600">
        Comments Awaiting Approval
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-gray-400">No pending comments.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col justify-between rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="space-y-2 text-left text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-600">Comment:</span>{" "}
                  {comment.comment}
                </p>
                <p>
                  <span className="font-medium text-gray-600">User:</span>{" "}
                  {comment?.user_details?.username || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {comment?.user_details?.email || "N/A"}
                </p>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() =>
                    handleApproval(comment.post_id, comment._id, true, comment.user_id)
                  }
                  disabled={actionLoading}
                  className="flex items-center gap-1 cursor-pointer rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-200 disabled:opacity-50"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </button>
                {/* <button
                  onClick={() =>
                    handleApproval(comment.post_id, comment._id, false)
                  }
                  disabled={actionLoading}
                  className="flex items-center gap-1 cursor-pointer rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-200 disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentApprove;
