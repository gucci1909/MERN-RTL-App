import React, { useState } from "react";
import { Home, MessageSquare, User, LogOut } from "lucide-react";
import HomeMenu from "../components/home/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";

const navItemsBase = [
  { name: "Home", icon: Home },
  { name: "Review Comments", icon: MessageSquare, role: "admin" },
  { name: "Profile", icon: User },
];

function HomePage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [language, setLanguage] = useState("EN");
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);
  const currentUserRole = profile.role;

  const navItems = navItemsBase.filter(
    (item) => !item.role || item.role === currentUserRole,
  );

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm md:grid md:grid-cols-3 md:items-center">
        {/* Left - Language Toggle (Desktop) */}
        <div className="hidden justify-start md:flex">
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={language === "AR"}
              onChange={handleLanguageToggle}
            />
            <div className="relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800" />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {language}
            </span>
          </label>
        </div>

        {/* Center - Nav Items */}
        <ul className="hidden justify-center space-x-10 md:flex">
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

        {/* Right - Logout (Desktop) */}
        <div className="hidden justify-end md:flex">
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
          >
            <LogOut className="mr-1 h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="flex w-full items-center justify-between gap-3 md:hidden">
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={language === "AR"}
              onChange={handleLanguageToggle}
            />
            <div className="relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800" />
          </label>

          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
          >
            <LogOut className="mr-1 h-4 w-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="pb-16 md:pb-0">
        <HomeMenu activeTab={activeTab} />
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 z-10 w-full border-t bg-white py-2 shadow-md md:hidden">
        <ul className="flex justify-around">
          {navItems.map(({ name, icon: Icon }) => {
            const isActive = activeTab === name;
            return (
              <li
                key={name}
                className="flex cursor-pointer flex-col items-center"
                onClick={() => setActiveTab(name)}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-blue-600" : "text-gray-400"}
                />
                <span
                  className={`text-xs ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
