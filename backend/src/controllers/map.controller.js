import { getAddressCordinates as mapServices } from "../services/maps.service.js";
import { getDistanceTimeService } from "../services/maps.service.js";
import { validationResult } from "express-validator";
import { getSuggestionsService } from "../services/maps.service.js";

export const getCordinates = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const corrdinates = await mapServices(address);
    return res.status(200).json(corrdinates);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getDistanceTime = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const distanceTime = await getDistanceTimeService(origin, destination);
    return res.status(200).json(distanceTime);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const autoCompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input } = req.query;

  try {
    const suggestions = await getSuggestionsService(input);
    return res.status(200).json(suggestions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
