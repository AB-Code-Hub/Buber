import express from 'express';
export const router = express.Router();
import { authUser } from '../middlewares/auth.middleware.js';
import { getCordinates } from '../controllers/map.controller.js';
import { getDistanceTime } from '../controllers/map.controller.js';
import { autoCompleteSuggestions } from '../controllers/map.controller.js';
import { query } from 'express-validator'


router.get('/get-corrdinates', query('address').isString().isLength({min: 3}) ,  authUser, getCordinates);

router.get('/get-distance-time', query('origin').isString().isLength({min: 3}), query('destination').isString().isLength({min: 3}), authUser, getDistanceTime);


router.get('/get-suggestions', query('input').isString().isLength({min: 3}), authUser, autoCompleteSuggestions);

