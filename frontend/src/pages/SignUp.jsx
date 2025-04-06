import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <section className="flex min-h-screen w-full">
      {/* Left Side - Form */}
      <div className="flex w-full items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12 md:w-2/5">
        <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/60 px-8 py-12 text-gray-800 shadow-2xl backdrop-blur-lg">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Connectify</h1>
            <p className="mt-1 text-sm text-gray-600">
              Create your account and join the cloud ☁️
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="john_doe"
                className="w-full rounded-lg bg-white px-4 py-2 text-gray-900 shadow focus:ring-2 focus:ring-sky-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@social.com"
                className="w-full rounded-lg bg-white px-4 py-2 text-gray-900 shadow focus:ring-2 focus:ring-sky-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full rounded-lg bg-white px-4 py-2 text-gray-900 shadow focus:ring-2 focus:ring-sky-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="mb-1 block text-sm font-semibold">
                Gender
              </label>
              <select
                id="gender"
                className="w-full rounded-lg bg-white px-4 py-2 text-gray-900 shadow focus:ring-2 focus:ring-sky-400 focus:outline-none"
              >
                <option value="">Select gender (optional)</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="bio" className="mb-1 block text-sm font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                rows="3"
                placeholder="Tell us a little about yourself (optional)..."
                className="w-full resize-none rounded-lg bg-white px-4 py-2 text-gray-900 shadow focus:ring-2 focus:ring-sky-400 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-sky-500 py-2.5 font-semibold text-white transition hover:bg-sky-600"
            >
              Sign Up
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="relative font-bold text-sky-600 transition-all duration-300 ease-in-out before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:-translate-y-0.5 hover:text-sky-700 hover:before:w-full"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="relative hidden w-3/5 items-center justify-center bg-gradient-to-br from-sky-200 via-blue-100 to-sky-300 md:flex">
        <div className="max-w-lg p-10">
          <img
            src="/Online Review-rafiki.png"
            alt="Illustration"
            className="w-full object-contain"
          />
        </div>
        <div className="absolute bottom-10 right-10 text-2xl font-extrabold tracking-wider text-blue-700 opacity-30 select-none">
          Create. Explore. Connect.
        </div>
      </div>
    </section>
  );
}

export default SignUp;
