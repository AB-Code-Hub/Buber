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
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanle, setRidePopupPanle] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [newRide, setNewRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupRef = useRef(null);
  const { captain } = useContext(CaptainDataContext);
  const { sendMessage, onMessage } = useSocket();

  useEffect(() => {
    if (captain) {
      sendMessage("join", { userId: captain._id, userType: "captain" });
    }

    // Set up interval to send captain location updates every 10 seconds
  }, [captain, sendMessage]);

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
                lng: longitude,
              },
            });
            // console.log("Location updated:", latitude, longitude);
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

  useEffect(() => {
    onMessage("new-ride", (data) => {
      setNewRide(data);
      setRidePopupPanle(true);
    });
  }, [onMessage]);

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
       <LiveTracking />
      </div>

      <div className="h-2/5 py-4 px-3 lg:px-12">
        <CaptainDetails />
        <RidePopUp
          newRide={newRide}
          ridePopupPanelRef={ridePopupPanelRef}
          setRidePopupPanle={setRidePopupPanle}
          setConfirmRidePopup={setConfirmRidePopup}
          confirmRide={async (rideId) => {
            try {
              const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
                {
                  rideId: rideId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                }
              );
              if (response.data) {
                setRidePopupPanle(false);
                setConfirmRidePopup(true);
              }
            } catch (error) {
              console.error("Error in confirmRide:", error);
            }
          }}
        />
        <ConfirmRidePopup
          newRide={newRide}
          confirmRidePopupRef={confirmRidePopupRef}
          setConfirmRidePopup={setConfirmRidePopup}
          setRidePopupPanle={setRidePopupPanle}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
