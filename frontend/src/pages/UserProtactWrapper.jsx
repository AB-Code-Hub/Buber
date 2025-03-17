import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtactWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default UserProtactWrapper;
