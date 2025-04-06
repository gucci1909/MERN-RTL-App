import React, { useState } from "react";
import { Home, MessageSquare, User } from "lucide-react";
import PostCard from "../components/home/PostCard";

const navItems = [
  { name: "Home", icon: Home },
  { name: "My Comments", icon: MessageSquare },
  { name: "Profile", icon: User },
];

const samplePosts = [
  {
    title: "Just Chilling 🌤️",
    content: "What a beautiful day to write some clean code!",
    image:
      "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
  },
  {
    title: "My Thoughts on React",
    content:
      "React lets you build UIs in a declarative way. Totally love the component system!",
  },
];

function HomePage() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="flex justify-center border-b bg-white shadow-sm">
        <ul className="flex space-x-12 px-4 py-4">
          {navItems.map(({ name, icon: Icon }) => {
            const isActive = activeTab === name;
            return (
              <li
                key={name}
                className="flex cursor-pointer flex-col items-center justify-center"
                onClick={() => setActiveTab(name)}
              >
                <Icon
                  size={20}
                  className={`mb-1 ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {name}
                </span>
                {isActive && (
                  <div className="mt-1 h-[2px] w-6 rounded-full bg-blue-600" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Page Content */}
      <main className="p-8 text-center text-xl text-gray-700">
        {activeTab === "Home" && (
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12">
            {samplePosts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        )}
        {activeTab === "My Comments" && <p>💬 Here are your comments.</p>}
        {activeTab === "Profile" && <p>👤 This is your profile.</p>}
      </main>
    </div>
  );
}

export default HomePage;
