import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import appIcon from '../assets/App-icon.png'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userData = {
      email: email,
      password: password,
    };

    try {
      const res = await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData),
        {
          loading: 'Logging in...',
          success: 'Logged In successfully',
          error: (error) => error.response.data.message,
        }
      );

      if (res.status === 200) {
        const data = res.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate('/home');
      }
    } catch {
    }

    finally {
      setIsSubmitting(false)
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between lg:pl-48 lg:pr-48 lg:pb-48">
      <div>
        <img className="w-16 mb-3 lg:w-24 " src={appIcon} alt="logo" />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-lg mb-2 font-medium ">
            What's your email address
          </h3>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] mb-7 rounded px-4 border py-2 w-full text-lg placeholder:text-base"
          />
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            placeholder="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 border py-2 w-full text-lg placeholder:text-base"
          />
          <button 
            className="bg-[#111] text-white text-2xl font-semibold mb-5 rounded px-4  py-2 w-full  placeholder:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mb-2 text-base lg:text-lg font-medium">
          New here?
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-green-600 justify-center items-center text-white text-2xl flex  font-semibold mb-7 rounded px-4  py-2 w-full  placeholder:text-base"
        >
          Login as Captain
        </Link>
      </div>
    </div>
  );
};

export default Login;
