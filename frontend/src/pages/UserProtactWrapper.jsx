import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const UserProtactWrapper = ({ children }) => {
  const [Loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

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

  if (Loading) {
    return <><Loader className="size-10 animate-spin" /></>;
  }

  return <>{children}</>;
};

export default UserProtactWrapper;
