import { createRideService } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getFare } from "../services/ride.service.js";
import { getAddressCordinates, getCaptainsInRadius } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { Ride as rideModel } from "../models/ride.model.js";
import { confirmRideService } from "../services/ride.service.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinates = await getAddressCordinates(pickup);
    console.log("pickupCoordinates==", pickupCoordinates);

    const captainsInRadius = await getCaptainsInRadius(pickupCoordinates.lng, pickupCoordinates.ltd, 10000);



    ride.otp = "";

    const rideWithUser =  await rideModel.findOne({ _id: ride._id }).populate("user");

    // Send notifications to all available captains
    captainsInRadius?.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

    console.log(`captains in Radius output: ${captainsInRadius}`);
    
    // Send single response with all data
    return res.status(201).json({
      ride,
      availableCaptains: captainsInRadius
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getFareController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const confirmRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array()); // Debug log
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  console.log("Received rideId:", rideId); // Debug log

  try {
    const ride = await confirmRideService({ rideId, captain: req.captain });
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Emit the event only if the ride is confirmed
    if (ride.status === "confirmed") {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-confirmed",
        data: ride,
      });
    }

    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


