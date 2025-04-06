import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaEnvelope, FaUser, FaTransgender, FaCalendarAlt } from "react-icons/fa";

function MyProfile() {
  const token = useSelector((state) => state.user.token);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/userData`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading)
    return <div className="mt-10 text-center text-sm text-gray-500">Loading profile...</div>;

  if (!userData)
    return (
      <div className="mt-10 text-center text-sm text-red-500">
        User data not available.
      </div>
    );

  return (
    <div className="max-w-sm mx-auto mt-10 bg-gradient-to-br from-white to-gray-50 p-6 rounded-3xl shadow-xl border border-gray-100 transition-all duration-300">
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28 mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-300 to-purple-300 animate-spin-slow blur-sm"></div>
          <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=user`}
            alt="User avatar"
            className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 tracking-tight mb-1">
          {userData.username}
        </h2>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <FaEnvelope className="text-gray-400" />
          {userData.email}
        </p>
        <p className="text-xs text-blue-600 italic mt-1">Role: {userData.role}</p>

        <div className="mt-5 w-full space-y-3 text-[13px] text-gray-700">
          {userData.bio && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Bio</p>
              <p className="bg-gray-100 p-2 rounded-xl text-[12px] text-gray-700">{userData.bio}</p>
            </div>
          )}
          {userData.gender && (
            <div className="flex items-center gap-2">
              <FaTransgender className="text-gray-500" />
              <span className="text-gray-600">{userData.gender}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <span className="text-gray-600">
              Joined on:{" "}
              {new Date(userData.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
