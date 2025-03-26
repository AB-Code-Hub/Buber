import React from "react";
import { Link } from "react-router-dom";
import homeMap from "../assets/home-map.png";
import { LogOut } from "lucide-react";
import driverLogo from "../assets/Driver_Signup.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";

const CaptainHome = () => {
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

      <div className="h-3/5">
        <img
          className="-z-10 w-full h-full object-cover "
          src={homeMap}
          alt="map-image"
        />
      </div>

      <div className="h-2/5 py-4 px-3 lg:px-12">
        {/* <CaptainDetails /> */}
        <RidePopUp />
        
      </div>
    </div>
  );
};

export default CaptainHome;
