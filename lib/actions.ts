"use server"
import { connectDB } from '@/lib/utils'
import User from './User'
import { cookies } from "next/headers";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: number;
}

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