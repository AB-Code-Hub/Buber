import express from "express";
export const router = express.Router();
import {
  registerCapValidation,
  loginCapValidation,
} from "../validation/captain.validation.js";
import {
  getcaptianProfile as captainProfileController,
  loginCaptain as loginCaptainController,
  logoutCaptain as logoutCaptainController,
  registerCaptain as registerCaptainController,
} from "../controllers/caption.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

router.post("/register", registerCapValidation, registerCaptainController);

router.post("/login", loginCapValidation, loginCaptainController);

router.get("/profile", authCaptain, captainProfileController);

router.post("/logout", authCaptain, logoutCaptainController);
