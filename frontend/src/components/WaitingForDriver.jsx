import { ChevronDown, IndianRupee, LocateFixed, MapPin } from "lucide-react";
import React from "react";

const WaitingForDriver = ({ setWaitForDriver, waitForDriverRef }) => {
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
          src="./White-Car.png"
          alt="vehicle"
        />

        <div className="text-right">
          <h2 className="text-xl font-semibold">Bilal</h2>
          <h4 className="text-lg font-medium">UP 00 AB 1234</h4>
          <p className="text-gray-600 text-base font-medium">Tesla Model 3</p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <LocateFixed />
            <div>
              <h3 className="text-lg font-medium">Ghzaidabad</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Delhi NCR, India</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <MapPin color="white" fill="black" />
            <div>
              <h3 className="text-lg font-medium">123 Main St</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Springfield, USA</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <IndianRupee />
            <div>
              <h3 className="text-lg font-medium">₹155</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
