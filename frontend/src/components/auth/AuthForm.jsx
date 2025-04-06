import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../common/InputField";

const InitialState = {
  email: "",
  password: "",
  remember: false,
};

const AuthForm = ({ onSubmit, loading, setError, error }) => {
  const [form, setForm] = useState(InitialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (error) {
      setError("");
    }

    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(form);
    },
    [form, onSubmit],
  );

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/60 px-8 py-12 text-gray-800 shadow-2xl backdrop-blur-lg">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-blue-700">Connectify</h1>
        <p className="mt-1 text-sm text-gray-600">
          Your social hub in the cloud ☁️
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          id="email"
          label="Email"
          type="email"
          name="email"
          placeholder="you@social.com"
          value={form.email}
          onChange={handleChange}
        />

        <div className="relative">
          <InputField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[38px] right-3 text-sm text-blue-600 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="mr-2"
            />
            Remember me
          </label>
          <a href="/login" className="text-sky-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-sky-500 py-2.5 font-semibold text-white transition hover:bg-sky-600"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="mr-2 h-5 w-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            to="/signup"
            className="relative font-bold text-sky-600 transition-all duration-300 ease-in-out before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:-translate-y-0.5 hover:text-sky-700 hover:before:w-full"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default React.memo(AuthForm);
