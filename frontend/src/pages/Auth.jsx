import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import { login } from "../store/userSlice";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    const { email, password } = formData;

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { email, password }
      );

      const { token, user } = response.data;

      dispatch(login({ token, user }));
      navigate("/");

      console.log("Login Success:", response.data);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        (language === "AR"
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى."
          : "Invalid email or password. Please try again.");
      setError(errMsg);

      console.error("Login Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      

      <AuthForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
        setError={setError}
        language={"en"}
      />
    </AuthLayout>
  );
};

export default React.memo(Auth);
