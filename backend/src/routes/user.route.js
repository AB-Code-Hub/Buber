import express from "express";
 export const router = express.Router();
import { body } from "express-validator";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser as authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/register", [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
], registerUser);


router.post("/login", [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({min: 6}).withMessage("Password must be at lest 6 character long")

], loginUser)

router.get("/profile", authMiddleware, getUserProfile)

router.post('/logout', authMiddleware, logoutUser)


