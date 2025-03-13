import { body } from "express-validator";

export const registerCapValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
    body('vehicle.color').isLength({min: 3}).withMessage("Colour must be at least 3 characters long"),
    body('vehicle.plate').isLength({min: 3}).withMessage("Plate must be at least 3 characters long"),
    body('vehicle.capacity').isInt({min: 1}).withMessage("Capacity must be at least 1 "),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid vehicle Type")
];


export const loginCapValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long")
]
