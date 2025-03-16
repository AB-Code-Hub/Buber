import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");
    const logout = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate('/login');
          toast.success("User logout successfully");
        }
      } catch (error) {
      }
    };

    logout();
  }, [navigate]);

  return <div>UserLogout</div>;
};

export default UserLogout;
