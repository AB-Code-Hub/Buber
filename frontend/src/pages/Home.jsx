import React, { useRef, useState, useCallback, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown, Turtle } from "lucide-react";
import LocationSearchPanle from "../components/LocationSearchPanle";
import BookingPanel from "../components/BookingPanel";
import ConfirmedVehiclePanel from "../components/ConfirmedVehiclePanel";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import appIcon from '../assets/App-icon.png';
import homeMap from '../assets/home-map.png';
import axios from "axios";
import toast from 'react-hot-toast';
import { useSocket } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

// Custom debounce hook
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
};

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmedVehiclePanel, setConfirmedVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitForDriver, setWaitForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchType, setSearchType] = useState(""); 
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null)
  const navigate = useNavigate();

  const { sendMessage, onMessage } = useSocket();
  const { user } = useContext(UserDataContext);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedVehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitForDriverRef = useRef(null);

  const token = localStorage.getItem("token");

  const fetchSuggestions = async (input, type) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.length === 0) {
        toast.error(`No matches for '${input}'. Try a nearby address`, {
          duration: 3000,
          position: 'top-center',
        });
        setSuggestions([]);
      } else {
        setSuggestions(response.data);
        setSearchType(type);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast.error('Failed to fetch locations. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = useDebounce(fetchSuggestions, 500);

  const handleFindTrip = async () => {
    if (!pickupLocation.trim()) {
      toast.error('Please enter a pickup location', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }
    
    if (!destination.trim()) {
      toast.error('Please enter a destination', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup: pickupLocation, destination: destination },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      
      setFare(response.data);
    } catch (error) {
      console.error("Error fetching fare:", error);
      toast.error('Failed to fetch fare. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
    }
    setIsPanelOpen(false);
    setvehiclePanel(true);
  };

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickupLocation(value);
    debouncedFetchSuggestions(value, "pickup");
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    debouncedFetchSuggestions(value, "destination");
  };


  const createRide = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
        vehicleType,
        pickup: pickupLocation,
        destination: destination,
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setVehicleFound(true);
    } catch (error) {
      console.error("Error creating ride:", error);
      toast.error('Failed to create ride. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    sendMessage("join", { userId: user?._id, userType: "user" });
  }, [user, sendMessage]);

  useEffect(() => {
    onMessage("ride-confirmed", (ride) => {
      if (ride && ride.status === "confirmed") {
        setWaitForDriver(true);
        setVehicleFound(false);
        setRide(ride);
        console.log("Driver accepted the ride:", ride);
      }
    });
  }, [onMessage]);

  useEffect(() => {
    onMessage("ride-started", (ride) => {
      if (ride && ride.status === "confirmed") {
        setWaitForDriver(false);
        setVehicleFound(false);
        setRide(ride);
        navigate('/riding', { state: {ride}})
        console.log("Ride started:", ride);
      }
    }); 
  }, [onMessage]);

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
          opacity: 1,
          pointerEvents: "auto",
        });
      } else {
        gsap.to(confirmedVehiclePanelRef.current, {
          transform: "translateY(100%)",
          opacity: 0,
          pointerEvents: "none",
        });
      }
    },
    [confirmedVehiclePanel, confirmedVehiclePanelRef]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0%)",
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
        });
      }
    },
    [vehicleFound, vehicleFoundRef]
  );

  useGSAP(
    function () {
      if (waitForDriver) {
        gsap.to(waitForDriverRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(waitForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitForDriver]
  );

  return (
    <div
      className={`relative h-screen w-screen overflow-x-hidden ${
        isPanelOpen ? "overflow-x-auto" : "overflow-hidden"
      } lg:overflow-x-hidden`}
    >
      <img
        className="w-16 absolute left-3 top-3  "
        src={appIcon}
        alt="logo"
      />

      <div className="h-screen w-screen">
       <LiveTracking  />
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
            
            <input
              value={pickupLocation}
              onClick={() => {
                setIsPanelOpen(true);
                setSearchType("pickup");
              }}
              onChange={handlePickupChange}
              type="text"
              className="bg-[#eee] text-lg font-normal rounded-lg px-12 py-3  w-full"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onClick={() => {
                setIsPanelOpen(true);
                setSearchType("destination");
              }}
              onChange={(e) => {
                handleDestinationChange(e);
             
                
              }}
              
              type="text"
              className="bg-[#eee] text-lg font-normal px-12 py-3 rounded-lg mt-3 lg:mb-5 placeholder:text-lg w-full"
              placeholder="Enter your destination"
            />
          </form>
          <button onClick={() => {handleFindTrip();}} className="bg-black w-full text-white px-4 py-3 my-5 rounded-lg">find a trip </button>
        </div>

        <div ref={panelRef} className="h-0 lg:p-24 bg-white ">
          <LocationSearchPanle
            setIsPanelOpen={setIsPanelOpen}
            setvehiclePanel={setvehiclePanel}
            suggestions={suggestions}
            searchType={searchType}
            setPickupLocation={setPickupLocation}
            setDestination={setDestination}
          />
        </div>
      </div>

      <BookingPanel
        setVehicleType={setVehicleType}
        fare={fare}
        setvehiclePanel={setvehiclePanel}
        vehiclePanelRef={vehiclePanelRef}
        setConfirmedVehiclePanel={setConfirmedVehiclePanel}
      />
      <ConfirmedVehiclePanel
        pickupLocation={pickupLocation}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        createRide={createRide}
        confirmedVehiclePanelRef={confirmedVehiclePanelRef}
        setConfirmedVehiclePanel={setConfirmedVehiclePanel}
        setVehicleFound={setVehicleFound}
      />
      <LookingForDriver
        pickupLocation={pickupLocation}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        vehicleFoundRef={vehicleFoundRef}
        setVehicleFound={setVehicleFound}
        rideStatus={waitForDriver ? "confirmed" : "searching"} // Pass ride status
      />

      <WaitingForDriver
        ride={ride}
        setVehicleFound={setVehicleFound}
        waitForDriver={waitForDriver}
        setWaitForDriver={setWaitForDriver}
        waitForDriverRef={waitForDriverRef}
      />
    </div>
  );
};

export default Home;
