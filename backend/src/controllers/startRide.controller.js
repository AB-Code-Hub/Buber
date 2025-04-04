import { validationResult } from "express-validator";
import { startRideService } from "../services/ride.service.js";
import { sendMessageToSocketId } from "../socket.js";

export const startRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { rideId, otp } = req.query;
    try {
        const ride = await startRideService({ rideId, otp, captain: req.captain });
        if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
        }
    
        // Emit the event only if the ride is started
        if (ride.status === "confirmed") {
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-started",
            data: ride,
        });
        }
    
        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error starting ride:", error); // Debug log
        return res.status(500).json({ error: error.message });
    }
    }