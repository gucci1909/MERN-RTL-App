import React, { useState } from "react";
import TextAreaField from "./TextAreaField";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../common/InputField";
import SelectField from "./Choose";
import axios from "axios";

const initialState = {
  username: "",
  email: "",
  password: "",
  gender: "",
  bio: "",
};

const SignUpForm = () => {
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    console.log({e:"sdfg"});
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        form,
      );

      setSuccess(res.data.message || "Signup successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {

      console.log({e:err});
      const errMsg =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
          {success}
        </div>
      )}

      <InputField
        id="username"
        label="Username"
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="john_doe"
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@social.com"
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
      <SelectField
        id="gender"
        label="Gender"
        value={form.gender}
        onChange={handleChange}
        options={[
          { value: "", label: "Select gender (optional)" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
      />
      <TextAreaField
        id="bio"
        label="Bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Tell us a little about yourself (optional)..."
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-lg bg-sky-500 py-2.5 font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50"
      >
        {loading ? "Signing Up..." : "Sign Up"}
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
  );
};

export default SignUpForm;
