import { ChevronDown, IndianRupee, LocateFixed, MapPin } from "lucide-react";
import React from "react";
import whiteCar from '../assets/White-Car.png';

const LookingForDriver = ({ setVehicleFound, vehicleFoundRef, pickupLocation, destination, fare, vehicleType, rideStatus }) => {
  return (
    <div
      ref={vehicleFoundRef}
      className={`fixed w-full z-10 bottom-0 bg-white ${
        rideStatus === "confirmed" ? "hidden" : "translate-y-0"
      } py-3 px-3 p-3`}
    >
      <h5
        className="p-3 text-center absolute top-0 right-0 cursor-pointer"
        onClick={() => {
          setVehicleFound(false);
        }}
      >
        <ChevronDown size={40} />
      </h5>

      <h2 className="text-2xl font-semibold mb-5">Looking for a Driver</h2>

      <div className="flex flex-col justify-between items-center gap-2">
        <img
          className="size-40 animate-pulse lg:size-52 object-contain"
          src={whiteCar}
          alt="vehicle"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <LocateFixed />
            <div>
              <h3 className="text-lg font-medium">{pickupLocation?.split(',')[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">{pickupLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <MapPin color="white" fill="black" />
            <div>
              <h3 className="text-lg font-medium">{destination?.split(',')[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2">
            <IndianRupee />
            <div>
              <h3 className="text-lg font-medium">₹{fare[vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
