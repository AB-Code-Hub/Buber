import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import LocationSearchPanle from "../components/LocationSearchPanle";
import BookingPanel from "../components/BookingPanel";
import ConfirmedVehiclePanel from "../components/ConfirmedVehiclePanel";
const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmedVehiclePanel, setConfirmedVehiclePanel] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedVehiclePanelRef = useRef(null);

  const subimtHandler = async (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (isPanelOpen) {
        gsap.to(panelRef.current, {
          height: "60%",
          padding: 24,
        });

        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });

        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [isPanelOpen, panelCloseRef]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel, vehiclePanelRef]
  );

  useGSAP(
    function () {
      if (confirmedVehiclePanel) {
        gsap.to(confirmedVehiclePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmedVehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmedVehiclePanel, confirmedVehiclePanelRef]
  );

  return (
    <div
      className={`relative h-screen w-screen overflow-x-hidden ${
        isPanelOpen ? "overflow-x-auto" : "overflow-hidden"
      } lg:overflow-x-hidden`}
    >
      <img
        className="w-16 absolute left-3 top-3  "
        src="./App-icon.png"
        alt="logo"
      />

      <div className="h-screen w-screen">
        <img
          className="-z-10 w-full h-full object-cover "
          src="./home-map.png"
          alt="map-image"
        />
      </div>

      <div className=" absolute h-screen top-0 w-full flex flex-col justify-end  ">
        <div className="h-[30%] lg:h-[40%] p-6 bg-white relative lg:p-5">
          <h5
            onClick={() => {
              setIsPanelOpen(false);
            }}
            ref={panelCloseRef}
            className="absolute opacity-0 top-5 right-0"
          >
            {" "}
            <ChevronDown size={38} />
          </h5>
          <h4 className="text-2xl font-semibold mb-3">Find a trip </h4>
          <form
            onSubmit={(e) => {
              subimtHandler(e);
            }}
          >
            <div className=" absolute w-3 h-3 top-[43%] left-[9.8%] lg:hidden lg:left-[2.9%] lg:top-[50%] bg-gray-600 rounded-full"></div>
            <div className="line absolute w-1 h-16 top-[45%] lg:top-[55%] lg:hidden left-10 bg-gray-600 rounded-full">
              {" "}
            </div>
            <div className=" absolute w-3 h-3 top-[73%] left-[9.8%]  lg:hidden lg:left-[2.9%] lg:top-[88%] bg-gray-600 rounded-full"></div>
            <input
              value={pickupLocation}
              onClick={() => {
                setIsPanelOpen(true);
              }}
              onChange={(e) => {
                setPickupLocation(e.target.value);
              }}
              type="text"
              className="bg-[#eee] text-lg font-normal rounded-lg px-12 py-3  w-full"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onClick={() => {
                setIsPanelOpen(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              type="text"
              className="bg-[#eee] text-lg font-normal px-12 py-3 rounded-lg mt-3 lg:mb-10 placeholder:text-lg w-full"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div ref={panelRef} className="h-0 lg:p-24 bg-white ">
          <LocationSearchPanle
            setIsPanelOpen={setIsPanelOpen}
            setvehiclePanel={setvehiclePanel}
          />
        </div>
      </div>

      <BookingPanel
        setvehiclePanel={setvehiclePanel}
        vehiclePanelRef={vehiclePanelRef}
        setConfirmedVehiclePanel={setConfirmedVehiclePanel}

      />
      <ConfirmedVehiclePanel
        confirmedVehiclePanelRef={confirmedVehiclePanelRef}
        setConfirmedVehiclePanel={setConfirmedVehiclePanel}
      />
    </div>
  );
};

export default Home;
