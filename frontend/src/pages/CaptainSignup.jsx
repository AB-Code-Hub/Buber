import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import toast from "react-hot-toast";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate()
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const captainData = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      }
    };
      try {
          const response = await toast.promise(
            axios.post(`${import.meta.env.VITE_BASE_URL}/captins/register`, captainData),
            {
              loading: 'Creating account...',
              success: 'Captain Created Successfully!',
              
            }
          );

          if(response.status === 201){
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
          }


      } catch (error) {
        const errorMessage = error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.message;
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }


    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor(""),
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-5 h-screen flex flex-col justify-between lg:pl-48 lg:pr-48 lg:pb-48">
      <div>
        <img
          className="w-24 lg:w-28 mb-2 "
          src="./Driver_Signup.png"
          alt="logo"
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-base mb-2 font-medium ">What's your Full Name</h3>

          <div className="flex gap-4 w-full mb-3">
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
            className="bg-[#eeeeee] mb-3 rounded px-4 border py-2 w-full text-lg placeholder:text-base"
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
            className="bg-[#eeeeee] mb-3 rounded px-4 border py-2 w-full text-lg placeholder:text-base"
          />

          <h3 className="text-base mb-2 font-medium">Vehicle Information</h3>

          <div className="flex gap-4 w-full mb-3">
            <input
              type="text"
              required
              value={vehicleColor}
              onChange={(event) => {
                setVehicleColor(event.target.value);
              }}
              placeholder="Vehicle Color"
              className="bg-[#eeeeee] w-1/2 rounded px-4 border py-2 text-base placeholder:text-sm"
            />

            <input
              type="text"
              required
              value={vehiclePlate}
              onChange={(event) => {
                setVehiclePlate(event.target.value);
              }}
              placeholder="Vehicle Plate"
              className="bg-[#eeeeee] w-1/2 rounded px-4 border py-2 text-base placeholder:text-sm"
            />
          </div>

          <div className="flex gap-4 w-full mb-3">
            <input
              type="number"
              required
              value={vehicleCapacity}
              onChange={(event) => {
                setVehicleCapacity(event.target.value);
              }}
              placeholder="Vehicle Capacity"
              className="bg-[#eeeeee] w-1/2 rounded px-4 border py-2 text-base placeholder:text-sm"
            />

            <select
              required
              value={vehicleType}
              onChange={(event) => {
                setVehicleType(event.target.value);
              }}
              className="bg-[#eeeeee] w-1/2 rounded px-4 border py-2 text-base placeholder:text-sm"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">car</option>
              <option value="auto">auto</option>
              <option value="motorcycle">motorcycle</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#111] text-white text-2xl font-semibold mb-3 rounded px-4 py-2 w-full placeholder:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Signup'}
          </button>
        </form>

        <p className="text-center mb-2 text-base lg:text-lg font-medium">
          Already have a account?
          <Link to="/captain-login" className="text-blue-600">
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

export default CaptainSignup;
