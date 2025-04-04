import { body, query } from 'express-validator';


export const createRideValidation = [
    body("pickup").isString().isLength({min: 3}).withMessage("Invalid Pickup address"),
    body("destination").isString().isLength({min: 3}).withMessage("Invalid Destination address"),
    body("vehicleType").isString().isIn(["moto", "car", "auto"]).withMessage("Invalid Vehicle Type"),
]

export const getFareValidation = [
    query("pickup").isString().isLength({min: 3}).withMessage("Invalid Pickup address"),
    query("destination").isString().isLength({min: 3}).withMessage("Invalid Destination address"),
    
]

export const confirmRideValidation = [
    body("rideId").notEmpty().withMessage("Ride ID is required").isMongoId().withMessage("Invalid Ride ID"),
]


export const startRideValidation = [
    query("rideId").notEmpty().withMessage("Ride ID is required").isMongoId().withMessage("Invalid Ride ID"),
    query("otp").notEmpty().withMessage("OTP is required").isLength({min: 6}).withMessage("Invalid OTP"),
]
