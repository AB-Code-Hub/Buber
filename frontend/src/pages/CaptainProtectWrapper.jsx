import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios';
import {Loader} from 'lucide-react'

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    } else {
      axios.get(`${import.meta.env.VITE_BASE_URL}/captins/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setLoading(false);
        }
      }).catch(err => {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
    }
  }, [token, navigate, setCaptain]);

  if (Loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="w-16 h-16 text-black animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
