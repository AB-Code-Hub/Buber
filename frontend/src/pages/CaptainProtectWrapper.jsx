import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios';
import {Loader} from 'lucide-react'

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        }
      }).catch(err => {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
    }
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return (
      <><Loader className="size-10 animate-spin" /></>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
