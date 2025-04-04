import { ChevronDown, IndianRupee, LocateFixed, MapPin } from "lucide-react";
import React from "react";
import whiteCar from '../assets/White-Car.png'

const WaitingForDriver = ({ setWaitForDriver, waitForDriverRef, setVehicleFound, waitForDriver,  ride }) => {
  return (
    <div
      ref={waitForDriverRef}
      className="fixed w-full z-10 bottom-0   bg-white pt-12  py-3 px-3  p-3"
    >
      <h5
        className="p-3 text-center absolute top-0  left-[43%]"
        onClick={() => {
          setWaitForDriver(false);
        }}
      >
        <ChevronDown size={40} />
      </h5>

      <div className="flex items-center gap-x-14 justify-around">
        <img
          className="size-24 lg:size-40 object-contain"
          src={whiteCar}
          alt="vehicle"
        />

        <div className="text-right">
          <h2 className="text-xl font-semibold">{`${ride?.user.fullName.firstName} ${ride?.user.fullName.lastName}`}</h2>
          <h4 className="text-lg font-medium">{ride?.captain.vehicle.plate}</h4>
          <p className="text-gray-600 text-base font-medium">{`OTP`} <span className="font-bold text-black text-lg">{ride?.otp}</span></p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <LocateFixed />
            <div>
              <h3 className="text-lg font-medium capitalize">{ride?.pickup.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600 capitalize ">{ride?.pickup.split(",")[1]}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <MapPin color="white" fill="black" />
            <div>
              <h3 className="text-lg font-medium">{ride?.destination.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600 ">{ride?.destination.split(",")[1]}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <IndianRupee />
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Cash</p>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
