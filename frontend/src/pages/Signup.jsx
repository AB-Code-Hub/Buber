import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (res.status === 201) {
        const data = res.data;
        setUser(data.user);
        localStorage.setItem("token", data.token)
        toast.success("User Registered Successfully");
        console.log(data);

        navigate("/home");
      }
    } catch (error) {
      toast.error(`${error.response.data.errors[0].msg}`);
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
          src="./user_signup.png"
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
          <button className="bg-[#111] text-white text-2xl font-semibold mb-5 rounded px-4  py-2 w-full  placeholder:text-base">
            Signup
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
