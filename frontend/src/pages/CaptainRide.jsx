import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import homeMap from "../assets/home-map.png";
import { ChevronUp, LogOut } from "lucide-react";
import driverLogo from "../assets/Driver_Signup.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRide = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        height: "80%",
        padding: 24,
        translateY: 0,
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        height: "0%",
        padding: 0,
        translateY: "100%",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen ">
      <div className="fixed flex p-1 top-0 items-center justify-between w-full ">
        <img className="w-24" src={driverLogo} alt="logo" />
        <Link
          to="/captain/logout"
          className=" mb-6   size-12 bg-white rounded-full flex items-center justify-center  z-10"
        >
          <LogOut />
        </Link>
      </div>

      <div className="h-[75%] lg:h-[70%]">
        <img
          className="-z-10 w-full h-full object-cover "
          src={homeMap}
          alt="map-image"
        />
      </div>

      <div className="h-[25%] py-4 px-4 relative   bg-white lg:px-12">
        <h5
          className=" text-center absolute top-0  left-[45%]"
          onClick={() => {
            setFinishRidePanel(!finishRidePanel);
          }}
        >
          <ChevronUp size={40} />
        </h5>
        <div className="bg-gray-200 border-2 mt-8 lg:mt-12 border-gray-400 flex p-4 rounded-xl items-center justify-between">
          <h4 className="text-xl font-semibold">2.2 KM away</h4>
          <button
            onClick={() => {
              setFinishRidePanel(true);
            }}
            className=" text-white p-2 px-6 font-semibold rounded-xl text-lg bg-black"
          >
            Complete Ride
          </button>
        </div>
        <FinishRide
          rideData={rideData}
          finishRidePanelRef={finishRidePanelRef}
          finishRidePanel={finishRidePanel}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRide;
