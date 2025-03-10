import mongoose from "mongoose";
import { DB_URL } from "../config/env.js";
export const dbConnect = async () => {
    try {
      const conn =  await mongoose.connect(DB_URL) 
      console.log(`database connected : ${conn.connection.host}`)
    } catch (error) {
        console.error("Error in connecting to database :", error)
    }
}