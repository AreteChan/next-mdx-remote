import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 连接数据库
let isConnected: mongoose.ConnectionStates;
export async function connectDB() {
  try {
    if (isConnected) return
    const db = await mongoose.connect(process.env.MONGODB_URI!)
    isConnected = db.connections[0].readyState
  } catch (error) {
    console.error("💥Database Connected Error:", error)
    throw error
  }
}

