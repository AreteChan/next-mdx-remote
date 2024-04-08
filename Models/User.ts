import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name."],
  },
  email: {
    type: String,
    required: [true, "A user must have an email."],
    unique: true,
    lowercase: true,
    select: false
  },
  password: {
    type: String,
    required: [true, "A user must have a password."],
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

export default mongoose.models.User || mongoose.model("User", userSchema);