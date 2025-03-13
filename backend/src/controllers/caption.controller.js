import { Captain as captainModel } from "../models/captin.model.js";
import { createCaptain as captainService } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res) => {
    try {

        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array() })
        }

        const {fullName, email, password, vehicle} = req.body


            const iscaptainexists = await captainModel.findOne({email})

            if(iscaptainexists)
            {
                return res.status(400).json({message: "Captain already exist"})
            }

        const hashedPassword = await captainModel.hashPassword(password)

        const captain =  await captainService({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        })

        if(!captain){
            return res.status(400).json({message: "Error in createing captain"})
        }

        const token = captain.generateAuthToken();

       return res.status(201).json({message: "Captain created successfully ", token, captain,})
        
    } catch (error) {
        console.error("Error in register Captain controller", error)
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}
