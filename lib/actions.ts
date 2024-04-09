"use server"
import User from '@/Models/User'
import { connectDB } from '@/lib/utils'

connectDB();

type User = {
  name: string;
  email: string;
  createdAt: number;
}

export const getUser = async (formdata: FormData) => {
  let user: User | null = null
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
  let user: User | null = null
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