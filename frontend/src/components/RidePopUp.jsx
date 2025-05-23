import { IndianRupee, LocateFixed, MapPin } from "lucide-react";
import React from "react";

const RidePopUp = ({
  ridePopupPanelRef,
  setRidePopupPanle,
  setConfirmRidePopup,
  newRide,
  confirmRide,
}) => {
  return (
    <div
      ref={ridePopupPanelRef}
      className="fixed w-full z-10 bottom-0 bg-white translate-y-full  py-3 -ml-3 lg:-ml-12 px-4  "
    >
      <h2 className="text-2xl font-semibold mb-5  capitalize">
        new ride available!{" "}
      </h2>

      <div className="flex justify-between items-center mt-4  p-3 lg:p-2  bg-gray-100 border-2 border-gray-300 rounded-lg">
        <div className="flex  items-center gap-3 ">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user-image"
            className="size-12 lg:size-16 object-cover rounded-full"
          />
          <h2 className="text-lg lg:text-xl font-medium">{`${newRide?.user.fullName.firstName} ${newRide?.user.fullName.lastName}`}</h2>
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

        <div className="flex flex-col my-4 w-full items-center  gap-5">
          <button
            onClick={() => {
              confirmRide(newRide._id);
            }}
            className="bg-black text-white w-full py-3 rounded-lg"
          >
            Accept Ride
          </button>

          <button
            onClick={() => {
              setRidePopupPanle(false);
            }}
            className=" w-full  lg:w-1/2 text-white p-2 px-10 font-semibold rounded-xl text-lg bg-gray-400"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
