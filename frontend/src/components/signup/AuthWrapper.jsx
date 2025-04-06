import React from "react";

const AuthWrapper = ({ children }) => (
  <section className="flex min-h-screen w-full">
    <div className="flex w-full items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12 md:w-2/5">
      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/60 px-8 py-12 text-gray-800 shadow-2xl backdrop-blur-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-blue-700">Connectify</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create your account and join the cloud ☁️
          </p>
        </div>
        {children}
      </div>
    </div>

    <div className="relative hidden w-3/5 items-center justify-center bg-gradient-to-br from-sky-200 via-blue-100 to-sky-300 md:flex">
      <div className="max-w-lg p-10">
        <img
          src="/Online Review-rafiki.png"
          alt="Illustration"
          className="w-full object-contain"
        />
      </div>
      <div className="absolute right-10 bottom-10 text-2xl font-extrabold tracking-wider text-blue-700 opacity-30 select-none">
        Create. Explore. Connect.
      </div>
    </div>
  </section>
);

export default AuthWrapper;
