"use server"
import User from '@/Models/User'
import { connectDB } from '@/lib/utils'

connectDB();

type ClientUser = {
  name: string;
  email: string;
  createdAt: number;
}

export const getUser = async (formdata: FormData) => {

    const email = formdata.get('email');
    const password = formdata.get('password');
    const user = await User.findOne({email, password})

    const clientUser: ClientUser = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  
    return clientUser

}

export const createUser = async (formdata: FormData) => {
  
  const name = formdata.get('name');
  const email = formdata.get('email');
  const password = formdata.get('password');
  
  const user = await User.create({name, email, password})
  
  const clientUser: ClientUser = {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }

  return clientUser
}