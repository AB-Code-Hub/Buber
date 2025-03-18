import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CaptainLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    navigate("/captain-login");

    const userLogout = async () => {
      try {
        toast.promise(
          axios.post(
            `${import.meta.env.VITE_BASE_URL}/captins/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          {
            loading: "Logging out...",
            success: "Logout successfully",
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    userLogout();
  }, [navigate]);
  return <div>CaptainLogout</div>;
};

export default CaptainLogout;
