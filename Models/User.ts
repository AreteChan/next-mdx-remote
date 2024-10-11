import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: number;
}

const userSchema: Schema<User> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name."],
  },
  email: {
    type: String,
    required: [true, "A user must have an email."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."]
  },
  password: {
    type: String,
    required: [true, "A user must have a password."],
    select: false 
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

export default mongoose.models.User || mongoose.model<User>("User", userSchema);