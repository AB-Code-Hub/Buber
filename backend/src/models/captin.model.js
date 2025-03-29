import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";

const captianSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First Name must be at least 3 characters long"],
      },

      lastName: {
        type: String,
        default: "",
        minlength: [3, "Last Name must be at least 3 characters long"],
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    socketId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, "Colour must be at least  3 characters long"],
      },

      plate: {
        type: String,
        reqired: true,
        minlength: [3, "Plate must be at least 3 characters long"],
      },

      capacity: {
        type: Number,
        required: true,
        max: [15, "Capacity must be at most 15"],
      },

      vehicleType: {
        type: String,
        requred: true,
        enum: ["car", "moto", "auto"],
      },
    },

    location: {
      ltd: {
        type: Number,
      },

      lng: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

captianSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

captianSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captianSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export const Captain = mongoose.model("Captain", captianSchema)
