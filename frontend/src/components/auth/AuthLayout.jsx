import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <section className="flex min-h-screen w-full">
      <div className="relative hidden w-3/5 items-center justify-center bg-gradient-to-br from-sky-200 via-blue-100 to-sky-300 md:flex">
        <div className="max-w-lg p-10">
          <img
            src="/Blog post-rafiki.png"
            alt="Illustration"
            className="w-full object-contain"
          />
        </div>
        <div className="absolute bottom-10 left-10 text-2xl font-extrabold tracking-wider text-blue-700 opacity-30 select-none">
          Connect. Share. Repeat.
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12 md:w-2/5">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
