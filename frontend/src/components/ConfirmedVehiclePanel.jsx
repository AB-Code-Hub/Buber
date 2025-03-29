import { BadgeIndianRupee, ChevronDown, IndianRupee, LocateFixed, MapPin, ReceiptIndianRupee } from "lucide-react";
import React from "react";
import whiteCar from '../assets/White-Car.png'

const ConfirmedVehiclePanel = ({
  confirmedVehiclePanelRef,
  setConfirmedVehiclePanel,
  setVehicleFound,
  createRide,
  pickupLocation,
  destination,
  fare,
  vehicleType
}) => {
  const pickupCity = pickupLocation.split(',')[0];
  const destinationCity = destination.split(',')[0];

  return (
    <div
      ref={confirmedVehiclePanelRef}
      className="fixed w-full z-10 bottom-0 bg-white translate-y-full py-3 px-3 p-3 opacity-0 pointer-events-none"
    >
      <h5
        className="p-3 text-center absolute top-0 right-0 cursor-pointer"
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
            <LocateFixed />
            <div>
              <h3 className="text-lg font-medium">{pickupCity}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {pickupLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <MapPin color="white" fill="black" />
            <div>
              <h3 className="text-lg font-medium">{destinationCity}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <IndianRupee />
            <div>
              <h3 className="text-lg font-medium">₹{fare[vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setConfirmedVehiclePanel(false)
            setVehicleFound(true)
            createRide()
          }}
          className="w-full mt-5 text-white p-2 font-semibold rounded-xl text-lg bg-black">
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmedVehiclePanel;
