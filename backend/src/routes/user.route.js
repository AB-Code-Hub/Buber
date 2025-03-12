import express from "express";
 export const router = express.Router();
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller.js";

router.post("/register", [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
], registerUser);


