// "use server"
import { connectDB } from '@/lib/utils'
// import User from '@/models/User'
import { cookies } from "next/headers";

import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: number;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
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

let User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

connectDB();

export const getUser = async (formdata: FormData) => {
  let user: IUser | null = null
  try {
    const { email, password } = Object.fromEntries(formdata) 
    user = await User.findOne({email, password})
  } catch (error: any) {
    console.error("💥Unexpected get user error!\n", error)
    throw new Error('Unexpected error!')
  }

  // user为null，email或password未输入或输入错误
  if (user) {
    const { name, email, createdAt } = user
    return { name, email, createdAt }
  } else {
    throw new Error('Please check your email and password!')
  }
}

export const createUser = async (formdata: FormData) => {
  let user: IUser | null = null
  try {
    const { name, email, password } = Object.fromEntries(formdata)
    user = await User.create({name, email, password}) 
  } catch (error: any) {
    // email重复错误
    if (error.code === 11000) throw new Error('This email has been registered!')
    // 格式错误
    else if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      throw new Error(errors.join(' '))
    }
    // 其他错误
    else {
      console.error('💥Unexpected create user error!\n', error)
      throw new Error('Unexpected error!')
    }
  }

  if (user) {
    const { name, email, createdAt } = user
    return { name, email, createdAt }
  } else {
    throw new Error('Please check your email and password!')
  }
}

export const setCookiesTheme = (theme: string) => {
  cookies().set("theme", theme)
}