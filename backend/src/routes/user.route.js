import express from "express";
 export const router = express.Router();
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser as authMiddleware } from "../middlewares/auth.middleware.js";
import { loginUserValidation, registerUserValidation } from "../validation/user.validation.js";

router.post("/register", registerUserValidation,  registerUser);


router.post("/login", loginUserValidation, loginUser)

router.get("/profile", authMiddleware, getUserProfile)

router.post('/logout', authMiddleware, logoutUser)


