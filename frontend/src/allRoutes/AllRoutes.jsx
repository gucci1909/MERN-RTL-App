import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader.jsx";

const Auth = lazy(() => import("../pages/Auth"));
const SignUp = lazy(() => import("../pages/SignUp.jsx"));
const Home = lazy(() => import("../pages/Home"));
const PrivateRoute = lazy(() => import("../hooks/PrivateRoute.jsx"));
const PublicRoute = lazy(() => import("../hooks/PublicRoute.jsx"));

function AllRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AllRoutes;
