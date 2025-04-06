import React, { useState } from "react";
import { Home, MessageSquare, User } from "lucide-react";
import HomeMenu from "../components/home/HomeMenu";

const navItems = [
  { name: "Home", icon: Home },
  { name: "My Comments", icon: MessageSquare },
  { name: "Profile", icon: User },
];

function HomePage() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
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
      <HomeMenu activeTab={activeTab} />
    </div>
  );
}

export default HomePage;
