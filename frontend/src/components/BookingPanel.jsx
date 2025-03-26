import { ChevronDown, User } from "lucide-react";
import React from "react";
import whiteCar from '../assets/White-Car.png'
import buberBike from '../assets/Buber-bike.png'
import buberAuto from '../assets/Buber-auto.png'

const BookingPanel = ({
  vehiclePanelRef,
  setvehiclePanel,
  setConfirmedVehiclePanel,
}) => {
  return (
    <div
      ref={vehiclePanelRef}
      className="fixed w-full z-10 bottom-0 bg-white translate-y-full py-6 px-3  p-3 "
    >
      <h5
        className="p-3 text-center absolute top-0  right-0"
        onClick={() => {
          setvehiclePanel(false);
        }}
      >
        <ChevronDown size={45} />
      </h5>
      <h2 className="text-2xl font-semibold mb-5">Choose a vehicle</h2>

      <div
        onClick={() => {
          setvehiclePanel(false)
          setConfirmedVehiclePanel(true);
        }}
        className="flex border-2 active:bg-gray-100 active:broder-2 active:border-black border-gray-200 rounded-xl mb-2 px-3 py-6 w-full items-center justify-between"
      >
        <img
          className="size-20 object-contain"
          src={whiteCar}
          alt="vehicle"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-lg flex">
            BuberGo{" "}
            <span className="ml-2">
              <User fill="black" />
            </span>{" "}
            4
          </h4>
          <h5 className="font-medium text-base">2 mins away</h5>
          <p className="font-normal text-sm">Affordable, compact rides</p>
        </div>

        <h2 className="text-xl font-semibold">₹205</h2>
      </div>

      <div
        onClick={() => {
          setvehiclePanel(false)
          setConfirmedVehiclePanel(true);
        }}
        className="flex border-2 active:bg-gray-100 active:broder-2 active:border-black border-gray-200 rounded-xl mb-2 px-3 py-6 w-full items-center justify-between"
      >
        <img className="size-16 object-contain" src={buberBike} alt="" />
        <div className=" w-1/2">
          <h4 className="font-medium text-lg flex">
            Moto{" "}
            <span className="ml-2">
              <User fill="black" />
            </span>{" "}
            1
          </h4>
          <h5 className="font-medium text-base">4 mins away</h5>
          <p className="font-normal text-sm">Affordable, motorcycles rides</p>
        </div>

        <h2 className="text-xl font-semibold">₹105</h2>
      </div>

      <div
        onClick={() => {
          setvehiclePanel(false)
          setConfirmedVehiclePanel(true);
        }}
        className="flex border-2  active:bg-gray-100 active:broder-2 active:border-black  border-gray-200 rounded-xl mb-2 px-3 py-6 w-full items-center justify-between"
      >
        <img className="size-16 object-contain" src={buberAuto} alt="" />
        <div className=" w-1/2">
          <h4 className="font-medium text-lg flex">
            BuberAuto{" "}
            <span className="ml-2">
              <User fill="black" />
            </span>{" "}
            3
          </h4>
          <h5 className="font-medium text-base">5 mins away</h5>
          <p className="font-normal text-sm">Affordable, Auto rides</p>
        </div>

        <h2 className="text-xl font-semibold">₹155</h2>
      </div>
    </div>
  );
};

export default BookingPanel;
