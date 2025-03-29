import express from 'express';
import { createRideValidation, getFareValidation } from '../validation/ride.validation.js';
import { createRide as rideController } from '../controllers/ride.controller.js';
import { getFareController } from '../controllers/ride.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
export const router = express.Router();



router.post('/create-ride',  authUser, createRideValidation, rideController);

router.get("/get-fare", authUser, getFareValidation, getFareController);