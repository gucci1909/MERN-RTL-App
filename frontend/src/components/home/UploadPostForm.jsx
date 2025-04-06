import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp, Upload } from "lucide-react";

const UploadPostForm = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const token = useSelector((state) => state.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("All fields are required!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      setUploading(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpload();
      setTitle("");
      setContent("");
      setImage(null);
      setShowForm(false);
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err.response?.data?.message || "Post upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto mb-8 w-full max-w-xl rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg transition hover:shadow-xl">
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-t-xl bg-blue-500 px-6 py-4 text-white hover:bg-blue-600"
      >
        <span className="text-lg font-semibold">Create a Post</span>
        {showForm ? <ChevronUp /> : <ChevronDown />}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-6 py-6 transition-all duration-300"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows="4"
          />

          {/* Custom File Upload */}
          <div className="relative flex items-center">
            <label className="flex cursor-pointer items-center justify-center rounded-lg bg-blue-100 px-4 py-2 text-blue-600 hover:bg-blue-200 hover:text-blue-800">
              <Upload className="mr-2 h-4 w-4" />
              {image ? image.name : "Choose Image"}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {uploading ? "Uploading..." : "Upload Post"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadPostForm;
