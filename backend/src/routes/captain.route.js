import express from 'express'
export const router = express.Router();
import { registerValidation as captainRegValidation } from '../validation/captain.validation.js';
import { registerCaptain as registerCaptainController } from '../controllers/caption.controller.js';




router.post('/register', captainRegValidation, registerCaptainController)


