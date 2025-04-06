import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
//   const { isAuth } = useSelector((store) => store.login);

  if (!false) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default PrivateRoute;
