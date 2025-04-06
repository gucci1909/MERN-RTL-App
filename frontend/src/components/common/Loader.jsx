import React from "react";

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="animate-bounce text-4xl font-extrabold text-blue-700">
          <span className="animate-pulse">Connectify</span>
        </h1>

        {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" /> */}

        <p className="animate-pulse font-medium text-blue-700">
          Loading your cloud space...
        </p>
      </div>
    </div>
  );
}

export default Loader;
