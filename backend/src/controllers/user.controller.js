import { User as userModel } from "../models/user.model.js";
import { Captain as captainModel } from "../models/captin.model.js";
import { createUserService } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { BlacklistToken as blacklistTokenModel } from "../models/blacklistToken.model.js";


export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserExist = await userModel.findOne({email})

    if(isUserExist){
      return res.status(400).json({message: "User already exist"})
    }

    const hashedPassword = await userModel.hashPassword(password);

    const isCaptainExists = await captainModel.findOne({email: email})
    if(isCaptainExists){
      return res.status(400).json({message: "email already registred as Captain "})
    }

    const user = await createUserService({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    if(!user)
    {
      return res.status(400).json({message: "Error in creating User"})
    }

    const token = user.generateAuthToken();

    res.status(201).json({ token: token, data: user });
  } catch (error) {
    console.error("Error in User controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const isCaptainExists = await captainModel.findOne({email: email})
    if(isCaptainExists){
      return res.status(400).json({message: "email  registred as Captain "})
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000, // ms
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    });

    return res.status(200).json({ token, UserData: user });
  } catch (error) {
    console.error("error in login user controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in get User Profile controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    res.clearCookie("token");
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    console.error("Error in logout user controller", error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
