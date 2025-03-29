import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import homeMap from "../assets/home-map.png";
import { LogOut } from "lucide-react";
import driverLogo from "../assets/Driver_Signup.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useSocket } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainHome = () => {

  const [ridePopupPanle, setRidePopupPanle] = useState(true)
  const [confirmRidePopup, setConfirmRidePopup] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupRef = useRef(null)
  const {captain} = useContext(CaptainDataContext)
  const {  sendMessage} = useSocket()

  useEffect(()=>{

    
     if(captain){
      sendMessage("join", {userId: captain._id, userType: 'captain'})
     }

    // Set up interval to send captain location updates every 10 seconds
  
    
  },[captain, sendMessage])

  useEffect(() => {
    if (!captain) return;
    
    // Function to get current location and send to server
    const sendLocationUpdate = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            sendMessage("update-location-captain", {
              userId: captain._id,
              location: {
                ltd: latitude,
                lng: longitude
              }
            });
            console.log("Location updated:", latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser");
      }
    };
    
    // Send initial location update
    sendLocationUpdate();
    
    // Set up interval for regular updates
    const locationInterval = setInterval(sendLocationUpdate, 10000);
    
    // Clean up interval on component unmount
    return () => clearInterval(locationInterval);
  }, [captain, sendMessage]);



  
  useGSAP(
    function () {
      if (ridePopupPanle) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanle]
  );
  
  useGSAP(
    function () {
      if (confirmRidePopup) {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopup]
  );
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
        <CaptainDetails />
        <RidePopUp  ridePopupPanelRef={ridePopupPanelRef} setRidePopupPanle={setRidePopupPanle} setConfirmRidePopup={setConfirmRidePopup}/>
        <ConfirmRidePopup confirmRidePopupRef={confirmRidePopupRef} setConfirmRidePopup={setConfirmRidePopup} setRidePopupPanle={setRidePopupPanle}/>
      </div>
    </div>
  );
};

export default CaptainHome;
