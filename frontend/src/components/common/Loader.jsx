// BeautifulLoader.jsx
import React from "react";

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Logo */}
        <h1 className="text-4xl font-extrabold text-blue-700 animate-bounce">
          <span className="animate-pulse">Connectify</span>
        </h1>

        {/* Spinning Loader */}
        {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" /> */}

        {/* Optional: subtle loading text */}
        <p className="text-blue-700 font-medium animate-pulse">Loading your cloud space...</p>
      </div>
    </div>
  );
}

export default Loader;