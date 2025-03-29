import { body } from 'express-validator';


export const createRideValidation = [
    body("pickup").isString().isLength({min: 3}).withMessage("Invalid Pickup address"),
    body("destination").isString().isLength({min: 3}).withMessage("Invalid Destination address"),
    body("vehicleType").isString().isIn(["moto", "car", "auto"]).withMessage("Invalid Vehicle Type"),
]
