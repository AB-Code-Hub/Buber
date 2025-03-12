import { User as userModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";


export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if(!token)
    {
        return res.status(401).json({message: "Unauthorized"})
    }

    const isBlackListed = await userModel.findOne({token: token})

    if(isBlackListed){
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decodedToken._id);
        req.user = user;

        return next()
    } catch (error) {
        return res.status(401).json({message: "Invalid token or token expired"})
    }
}