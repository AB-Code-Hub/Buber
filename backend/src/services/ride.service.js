import { Ride as rideModel } from "../models/ride.model.js";
import { getDistanceTimeService as getDistanceTime } from "./maps.service.js";
import crypto from "crypto";

export const getFare = async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);

  const baseFare = {
    moto: 20,
    car: 50,
    auto: 30,
  };

  const perKmRate = {
    moto: 5,
    car: 10,
    auto: 7,
  };

  const perMinuteRate = {
    moto: 2,
    car: 4,
    auto: 3,
  };

  const fare = {
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
  };

  return fare;
};

function getOTP(num) {
  // Ensure num is at least 1
  if (num < 1) throw new Error("Number of digits must be at least 1");

  // Generate OTP with exact number of digits
  const min = Math.pow(10, num - 1);
  const max = Math.pow(10, num);
  return crypto.randomInt(min, max).toString();
}

export const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: getOTP(6),
  });

  return ride;
};

export const confirmRideService = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    throw new Error("Ride ID and Captain are required");
  }

  const updateride = await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "confirmed", captain: captain._id },
    { new: true }
  );
  if (!updateride) {
    throw new Error("Ride not found");
  }

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

export const startRideService = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Ride ID, OTP and Captain are required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId, otp, captain: captain._id })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found or invalid OTP");
  }

  if (ride.status !== "confirmed") {
    throw new Error("Ride is not confirmed yet");
  }
  if (ride.status === "started") {
    throw new Error("Ride already started");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }
  ride.otp = "";

  const updateride = await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "started", otp: "" },
    { new: true }
  );

  if (!updateride) {
    throw new Error("Ride not found");
  }

  return ride;
};
