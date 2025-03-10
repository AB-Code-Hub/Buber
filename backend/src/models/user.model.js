import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        rquired: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },

      lastName: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

export default User;
