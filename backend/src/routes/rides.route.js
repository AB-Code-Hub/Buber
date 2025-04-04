import express from "express";
import {
  createRideValidation,
  getFareValidation,
  confirmRideValidation,
  startRideValidation,
} from "../validation/ride.validation.js";
import { createRide as rideController } from "../controllers/ride.controller.js";
import { getFareController } from "../controllers/ride.controller.js";
import { confirmRideController } from "../controllers/ride.controller.js";
import { authUser, authCaptain } from "../middlewares/auth.middleware.js";
import { startRideController } from "../controllers/startRide.controller.js";
export const router = express.Router();

router.post("/create-ride", authUser, createRideValidation, rideController);

router.get("/get-fare", authUser, getFareValidation, getFareController);

router.post('/confirm', authCaptain, confirmRideValidation,  confirmRideController )

router.get('/start-ride', authCaptain, startRideValidation, startRideController)
