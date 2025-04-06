import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  console.log({r:token});

  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default PublicRoute;
