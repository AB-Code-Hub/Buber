import { body } from "express-validator";

export const registerUserValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

export const loginUserValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({min: 6}).withMessage("Password must be at lest 6 character long")

];