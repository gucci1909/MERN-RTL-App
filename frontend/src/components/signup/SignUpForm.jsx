import React, { useState } from "react";
import TextAreaField from "./TextAreaField";
import { Link } from "react-router-dom";
import InputField from "../common/InputField";
import SelectField from "./Choose";

const initialState = {
  username: "",
  email: "",
  password: "",
  gender: "",
  bio: "",
};

const SignUpForm = () => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    // API call here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        id="username"
        label="Username"
        type="text"
        value={form.username}
        onChange={handleChange}
        placeholder="john_doe"
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@social.com"
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
      />
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
  );
};

export default SignUpForm;
