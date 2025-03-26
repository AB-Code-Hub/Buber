import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const UserProtactWrapper = ({ children }) => {
  const [Loading, setLoading] = useState(true);
  const { setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [token, navigate, setUser]);

  if (Loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="w-16 h-16 text-black animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtactWrapper;
