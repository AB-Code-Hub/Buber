import { User as userModel } from "../models/user.model.js";
import { createUserService } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUserService({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token: token, data: user });
  } catch (error) {
    console.error("Error in User controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const loginUser = async (req, res, next) => {
 try {
     const errors = validationResult(req.body);
   
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
   
     const { email, password } = req.body;
   
     const user = await userModel.findOne({email}).select("+password")
   
     if(!user){
       return res.status(401).json({message: "Invalid email or password"})
     }

   
     const isMatch = await user.comparePassword(password)
     console.log("ismatch ===",isMatch);
   
     if(!isMatch){
       return res.status(401).json({message: "Invalid email or password"})
     }
   
     const token = user.generateAuthToken()
   
     return res.status(200).json({token, UserData: user})
 } catch (error) {
    console.error("error in login user controller", error)
    return res.status(500).json({message: "Internal server error", error: error.message})
 }
};
