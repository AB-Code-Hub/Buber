import { User as userModel } from "../models/user.model.js";
import { Captain as captainModel } from "../models/captin.model.js";
import { BlacklistToken as blacklistTokenModel } from "../models/blacklistToken.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blacklistTokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decodedToken._id);
    req.user = user;

    return next();
  } catch (error) {
    console.error("Error in auth user middleware", error)
    return res.status(401).json({ message: "Invalid token or token expired", error: error.message });
  }
};

export const authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if(!token){
            return res.status(401).json({message: "Unauthorized"})
        }

        const isBlackListed = await blacklistTokenModel.findOne({token: token})

        if(isBlackListed){
            return res.status(401).json({message: "Unauthorized or Token expired"})
        }

            const decodedToken = jwt.verify(token, JWT_SECRET)
            const captain = await captainModel.findById(decodedToken._id)

            if(!captain){
                return res.status(401).json({message: "Unauthorized User"})
            }

            req.captain = captain

            return next()

    } catch (error) {
        console.error("Error in AuthCaption middleWare :", error)
        return res.status(401).json({message: "Unauthorized", error: error.message})
    }
}
