import { BlacklistToken as blacklistTokenModel } from "../models/blacklistToken.model.js";
import { Captain as captainModel } from "../models/captin.model.js";
import { createCaptain as captainService } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import { User as userModel } from "../models/user.model.js";

export const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isUserExists = await userModel.findOne({email: email})

    if(isUserExists){
      return res.status(400).json({message: "email already registred as User"})
    }

    const iscaptainexists = await captainModel.findOne({ email });

    if (iscaptainexists) {
      return res.status(400).json({ message: "Captain already exist" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

   

    const captain = await captainService({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    if (!captain) {
      return res.status(400).json({ message: "Error in createing captain" });
    }

    const token = captain.generateAuthToken();

    return res
      .status(201)
      .json({ message: "Captain created successfully ", token, captain });
  } catch (error) {
    console.error("Error in register Captain controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const isUserExists = await userModel.findOne({email: email})
    if(isUserExists){
      return res.status(400).json({message: "email registred as User"})
    }

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({ token, captain });
  } catch (error) {
    console.error("Error in login captain controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getcaptianProfile = async (req, res) => {
  try {
    return res.status(200).json({ captain: req.captain });
  } catch (error) {
    console.error("error in getCaptain Profile controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blacklistTokenModel.create({ token });

    res.clearCookie("token");

    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    console.error("Error in captain logout controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
