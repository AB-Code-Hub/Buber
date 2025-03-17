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

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
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
        element= {
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
          
        }
        />
      </Routes>
    </div>
  );
};

export default App;
