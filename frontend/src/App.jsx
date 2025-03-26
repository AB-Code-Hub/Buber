import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import { Toaster } from "react-hot-toast";
import UserProtactWrapper from "./pages/UserProtactWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import PublicRouteWrapper from "./pages/PublicRouteWrapper";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRouteWrapper>
              <Start />
            </PublicRouteWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRouteWrapper>
              <Login />
            </PublicRouteWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRouteWrapper>
              <Signup />
            </PublicRouteWrapper>
          }
        />
        <Route
          path="/captain-login"
          element={
            <PublicRouteWrapper>
              <CaptainLogin />
            </PublicRouteWrapper>
          }
        />
        <Route
          path="/captain-signup"
          element={
            <PublicRouteWrapper>
              <CaptainSignup />
            </PublicRouteWrapper>
          }
        />
        <Route
          path="/riding"
          element={
            <UserProtactWrapper>
              <Riding />
            </UserProtactWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtactWrapper>
              <Home />
            </UserProtactWrapper>
          }
        />

        <Route
          path="/user/logout"
          element={
            <UserProtactWrapper>
              <UserLogout />
            </UserProtactWrapper>
          }
        />

        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />

        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
