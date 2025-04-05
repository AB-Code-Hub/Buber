import { House, IndianRupee, MapPin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useSocket } from "../context/SocketContext";
import homeMap from "../assets/home-map.png";
import whiteCar from "../assets/White-Car.png";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rideData = location.state?.ride;
  const { onMessage } = useSocket();

  useEffect(() => {
    try {
      onMessage("ride-ended", (data) => {
        if (data) {
          navigate("/home");
        }
        console.log("Ride ended:", data);
      });
    } catch (error) {
      console.error("Error in socket connection:", error);
    }
  }, [onMessage, navigate]);

  return (
    <div className="h-screen ">
      <Link
        to="/home"
        className="fixed size-12 bg-white rounded-full flex items-center justify-center top-5 right-5 z-10"
      >
        <House fill="white" color="black" size={28} />
      </Link>

      <div className="h-1/2">
        <LiveTracking />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center gap-x-14 justify-around">
          <img
            className="size-24 lg:size-40 object-contain"
            src={whiteCar}
            alt="vehicle"
          />

          <div className="text-right">
            <h2 className="text-xl font-semibold">{`${rideData?.captain.fullName.firstName} ${rideData?.captain.fullName.lastName}`}</h2>
            <h4 className="text-lg font-medium">
              {rideData?.captain.vehicle.plate}
            </h4>
            <p className="text-gray-600 text-base font-medium">Tesla Model 3</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-2">
          <div className="w-full mt-5 ">
            <div className="flex items-center gap-5 p-2 border-b-2">
              <MapPin color="white" fill="black" />
              <div>
                <h3 className="text-lg font-medium">
                  {rideData?.destination.split(",")[0]}
                </h3>
                <p className="text-sm -mt-1 text-gray-600 ">
                  {rideData?.destination.split(",")[1]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-2 ">
              <IndianRupee />
              <div>
                <h3 className="text-lg font-medium">₹{rideData?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600 ">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 text-white p-2 font-semibold rounded-xl text-lg bg-black">
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
