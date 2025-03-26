import {  ChevronDown, IndianRupee, LocateFixed, MapPin,  } from "lucide-react";
import React from "react";
import whiteCar from '../assets/White-Car.png'

const RidePopUp = ({ confirmedVehiclePanelRef,
    setConfirmedVehiclePanel,
    setVehicleFound,}) => {
  return (
    <div
      ref={confirmedVehiclePanelRef}
      className="fixed w-full z-10 bottom-0 bg-white  py-3 -ml-3 lg:-ml-12 px-4  "
    >
      <h5
        className="p-3 text-center absolute top-0  right-0"
        onClick={() => {
          setConfirmedVehiclePanel(false);
        }}
      >
        <ChevronDown size={40} />
      </h5>

      <h2 className="text-2xl font-semibold mb-5">Confirm your ride </h2>

      <div className="flex flex-col justify-between items-center gap-2">
        <img
          className="size-40 lg:size-44 object-contain"
          src={whiteCar}
          alt="vehicle"
        />
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <LocateFixed   />
            <div>
              <h3 className="text-lg font-medium">Ghaziabad</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Delhi NCR, India</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <MapPin color="white" fill="black"  />
            <div>
              <h3 className="text-lg font-medium">123 Main St</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Springfield, USA</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <IndianRupee  />
            <div>
              <h3 className="text-lg font-medium">₹155</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Cash Cash</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setConfirmedVehiclePanel(false)
            setVehicleFound(true)
          }}
        className="w-full mt-5 text-white p-2 font-semibold rounded-xl text-lg bg-black">
          Confirm Ride
        </button>
      </div>
    </div>
  )
}

export default RidePopUp