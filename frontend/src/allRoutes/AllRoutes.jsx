import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader.jsx";
import SignUp from "../pages/SignUp.jsx";

const Auth = lazy(() => import("../pages/Auth"));
const Home = lazy(() => import("../pages/Home"));
const PrivateRoute = lazy(() => import("../hooks/PrivateRoute.jsx"));

function AllRoutes() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<Auth />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Suspense>
  );
}

export default AllRoutes;
