import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

const Login = () => {
  const handleLogin = (formData) => {
    console.log("Login Data:", formData);
  };

  return (
    <AuthLayout>
      <AuthForm onSubmit={handleLogin} />
    </AuthLayout>
  );
};

export default Login;
