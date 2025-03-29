import express from 'express';
import { createRideValidation } from '../validation/ride.validation.js';
import { createRide as rideController } from '../controllers/ride.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
export const router = express.Router();



router.post('/create',  authUser, createRideValidation, rideController);