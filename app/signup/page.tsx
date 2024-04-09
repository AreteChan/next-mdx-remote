"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { message } from 'antd'
import Link from 'next/link'
import React from 'react'
import { createUser } from '@/lib/actions'

const SignupPage = () => {

  const signup = async (formdata: FormData) => {
    try {
      const { password, confirmPassword } = Object.fromEntries(formdata)
      if (password !== confirmPassword) message.error('Passwords do not match!')
      
      const user = await createUser(formdata)  
      message.success('Sign up successfully!')
    } catch (error: any) {
      message.error(`Sign up failed! ${error.message}`)
    }
  }

  return (
    <div className="flex items-center flex-col h-full px-96 pt-[7%]">
      <h1>Sign up</h1>
      <form action={signup} className='w-80 flex-center flex-col gap-4'>
        <Input name="name" type="text" placeholder="Name" />
        <Input name="email"  placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Input name="confirmPassword" type="password" placeholder="Confirm Password" />
        <Button type="submit" variant="secondary" className='w-80'>Submit</Button>
      </form>
      <p className='my-2'>Already have an account? <Link href="/login" className='text-sky-600'>Log In</Link> </p>
    </div>
  )
}

export default SignupPage
