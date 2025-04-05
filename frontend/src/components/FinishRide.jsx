import axios from "axios";
import {
  LocateFixed,
  MapPin,
  IndianRupee,
  ChevronDown,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FinishRide = ({
  finishRidePanelRef,
  rideData,
  setFinishRidePanel,
  finishRidePanel,
}) => {
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const navigate = useNavigate();

  const endRide = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
        rideId: rideData._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setFinishRidePanel(false);
        navigate("/captain-home");
        
        
      }
    } catch (error) {
      console.error("Error ending ride:", error);
      
    }
  }

  return (
    <div
      ref={finishRidePanelRef}
      className="fixed w-full z-10 bottom-0 bg-white py-3 -ml-4 lg:-ml-12 px-4"
    >
      <h5
        className=" text-center absolute top-0  left-[45%]"
        onClick={() => {
          setFinishRidePanel(!finishRidePanel);
        }}
      >
        <ChevronDown size={40} />
      </h5>
      <h2 className="text-2xl font-semibold mb-5 mt-5 capitalize">
        Finish This Ride
      </h2>

      <div className="flex justify-between items-center mt-4  p-3 lg:p-2  bg-gray-100 border-2 border-gray-300 rounded-lg">
        <div className="flex  items-center gap-3 ">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user-image"
            className="size-12 lg:size-16 object-cover rounded-full"
          />
          <h2 className="text-lg lg:text-xl font-medium">{`${rideData?.user.fullName.firstName} ${rideData?.user.fullName.lastName}`}</h2>
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
              <h3 className="text-lg font-medium">
                {rideData?.pickup.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600 ">
                {rideData?.pickup.split(",")[1]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <MapPin color="white" fill="black" />
            <div>
              <h3 className="text-lg font-medium">
                {rideData?.destination.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600 ">
                {rideData?.destination.split(",")[0]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <IndianRupee />
            <div>
              <h3 className="text-lg font-medium">₹{rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-6">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="payment-done"
              checked={isPaymentDone}
              onChange={(e) => setIsPaymentDone(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="payment-done" className="text-lg font-medium">
              Payment is done
            </label>
          </div>
          <button
            onClick={(e) => {
              if (!isPaymentDone) e.preventDefault();
              endRide();
             
            }}
            className={`flex justify-center w-full lg:w-1/2 lg:mt-1 text-white p-3 font-semibold rounded-xl text-xl ${
              isPaymentDone ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
