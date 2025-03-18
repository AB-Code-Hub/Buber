import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    navigate("/login");

    const logout = async () => {
      try {
        toast.promise(
          axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          {
            loading: "Logging out...",
            success: "logout sucessfully",
          }
        );
      } catch (error) {
        // Handle error if needed
      }
    };

    logout();
  }, [navigate]);

  return <div></div>;
};

export default UserLogout;
