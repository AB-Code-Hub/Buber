import React from "react";
import { MapPin } from "lucide-react";

const LocationSearchPanle = ({ setIsPanelOpen, setvehiclePanel }) => {
  const locationAddress = [
    "123 Main St, Springfield, IL",
    "456 Elm St, Shelbyville, IL",
    "789 Oak St, Capital City, IL",
    "101 Maple St, Ogdenville, IL",
    "202 Pine St, North Haverbrook, IL",
    "303 Cedar St, Brockway, IL",
    "404 Birch St, Waverly Hills, IL",
    "505 Walnut St, West Springfield, IL",
    "606 Chestnut St, East Springfield, IL",
    "707 Poplar St, South Springfield, IL",
  ];

  return (
    <div className="py-3">
      {locationAddress.map((address, idx) => (
        <div
          key={idx}
          onClick={() => {
            setvehiclePanel(true);
            setIsPanelOpen(false);
          }}
          className="flex p-3 border-2 border-gray-200 rounded-xl  justify-start active:border-2 active:border-black  active:rounded-xl active:bg-gray-100 items-center my-2 gap-4"
        >
          <h2 className="bg-[#eee] size-10 rounded-full flex justify-normal items-center p-2">
            <p className="w-full h-full">
              <MapPin />
            </p>
          </h2>
          <h4 className=" font-medium">{address}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanle;
