import { createRideService } from "../services/ride.service.js";
import {validationResult} from "express-validator";
import { getFare } from "../services/ride.service.js";

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

   try {
    const { pickup, destination, vehicleType} = req.body;
    const ride = await createRideService({user: req.user._id , pickup, destination, vehicleType});
    return res.status(201).json(ride);
   } catch (error) {
    return res.status(500).json({error: error.message});
   }
}


export const getFareController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }
    const { pickup, destination} = req.query;
   try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);
   } catch (error) {
    return res.status(500).json({error: error.message});
   }
}

