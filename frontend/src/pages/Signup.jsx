import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import toast from "react-hot-toast";
import userSignup from '../assets/user_signup.png'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newUser = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    };

    try {
      const res = await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser),
        {
          loading: 'Registering...',
          success: 'User Registered Successfully',
        }
      );

      if (res.status === 201) {
        const data = res.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.message;
      toast.error(errorMessage);
    }

    finally {
      setIsSubmitting(false)
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between lg:pl-48 lg:pr-48 lg:pb-48">
      <div>
        <img
          className="w-16 mb-3 lg:w-20 lg:ml-1"
          src={userSignup}
          alt="logo"
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-base mb-2 font-medium ">What's your Full Name</h3>

          <div className="flex gap-4 w-full mb-5">
            <input
              type="text"
              required
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              placeholder="First Name"
              className="bg-[#eeeeee]  w-1/2 rounded px-4 border py-2  text-base placeholder:text-sm"
            />

            <input
              type="text"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              placeholder="Last Name"
              className="bg-[#eeeeee]  w-1/2 rounded px-4 border py-2  text-base placeholder:text-sm"
            />
          </div>

          <h3 className="text-base mb-2 font-medium ">
            What's your email address
          </h3>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="email@example.com"
            className="bg-[#eeeeee] mb-5 rounded px-4 border py-2 w-full text-lg placeholder:text-base"
          />
          <h3 className="text-base mb-2 font-medium">Enter Password</h3>
          <input
            type="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            placeholder="password"
            className="bg-[#eeeeee] mb-5 rounded px-4 border py-2 w-full text-lg placeholder:text-base"
          />
          <button  
          className="bg-[#111] text-white text-2xl font-semibold mb-5 rounded px-4  py-2 w-full  placeholder:text-base"
          disabled= {isSubmitting} 
          type="submit"   
          >
            {isSubmitting ? "Submitting" : "Signup"}
          </button>
        </form>

        <p className="text-center mb-2 text-base lg:text-lg font-medium">
          Already have a account?
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[9px] leading-tight  xl:text-center lg:leading-normal lg:text-xs">
          By registering with Buber, you agree to provide accurate information,
          comply with platform rules and local laws, and accept{" "}
          <span className="underline text-blue-600 cursor-pointer">
            Buber's Privacy Policy and Terms.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
