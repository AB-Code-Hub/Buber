import { LocateFixed, MapPin, IndianRupee } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ConfirmRidePopup = ({
  confirmRidePopupRef,
  setConfirmRidePopup,
  setRidePopupPanle,
  newRide,
}) => {

  const [OTP, setOTP] = useState('')
  const navigate = useNavigate();
  

  const submitHandler = async (event) => {
    event.preventDefault();
    

    try {
      const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {rideId: newRide._id,
        otp: OTP},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if(response.status === 200) {
        setConfirmRidePopup(false);
        setRidePopupPanle(false);
        navigate("/captain-ride", {state: {ride : newRide}})

      }
    } catch (error) {
      console.log(error);   
      
    }
  }
  return (
    <div
      ref={confirmRidePopupRef}
      className="fixed w-full z-10 bottom-0 sm:h-[90%] md:h-[60%] lg:h-[80%] -ml-3 lg:-ml-12  bg-white translate-y-full py-3 px-4"
    >
      <h2 className="text-2xl font-semibold mb-5  capitalize">
        Confirm Ride Request!{" "}
      </h2>

      <div className="flex justify-between items-center mt-4  p-3 lg:p-2  bg-gray-100 border-2 border-gray-300 rounded-lg">
        <div className="flex  items-center gap-3 ">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user-image"
            className="size-12 lg:size-16 object-cover rounded-full"
          />
          <h2 className="text-lg lg:text-xl font-medium capitalize">{`${newRide?.user.fullName.firstName} ${newRide?.user.fullName.lastName}`}</h2>
        </div>
        <h5 className="text-base lg:text-lg font-semibold text-gray-600">
          2.2 km away
        </h5>
      </div>

      <div className="flex flex-col justify-between items-center  gap-2">
        <div className="w-full mt-5 lg:mt-1 ">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <LocateFixed />
            <div>
              <h3 className="text-lg font-medium">{newRide?.pickup.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600 ">{newRide?.pickup.split(",")[1]}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <MapPin color="white" fill="black" />
            <div>
              <h3 className="text-lg font-medium">{newRide?.destination.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600 ">{newRide?.destination.split(",")[1]}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <IndianRupee />
            <div>
              <h3 className="text-lg font-medium">₹{newRide?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-6 lg:mt-1">
          <form
            onSubmit={(event) => {
              submitHandler(event);
            }}
          >
            <input
            onChange={(e) => {setOTP(e.target.value)}}
            value={OTP}
              type="text"
              placeholder="Enter OTP"
              className="bg-[#eee] lg:mb-3 text-xl font-mono font-medium rounded-lg px-6 py-4 lg:py-3 focus:outline-gray-400  w-full"
            />
            <button
             type="submit"
              className=" flex justify-center w-full  lg:mb-3 mt-5 lg:mt-1 text-white p-3 font-semibold rounded-xl text-xl bg-green-500"
            >
              Confirm Ride
            </button>

            <button
              onClick={submitHandler}
              className="w-full mt-2  text-white p-3 font-semibold rounded-xl text-xl bg-red-500"
            >
              Cancel Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
