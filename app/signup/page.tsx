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
      if (formdata.get('password') !== formdata.get('confirmPassword')) {
        message.error('Passwords do not match')
        return
      }
      const user = await createUser(formdata)  
      
    } catch (error: any) {
      message.error(`Sign up failed. Please try again.`)
      console.error(error)
    }
  }

  return (
    <div className="flex-center flex-col h-full px-96 pt-24">
      <h1>Sign up</h1>
      <form action={signup} className='w-96 flex-center flex-col'>
        <Input name="name" type="text" placeholder="Name" className='w-80 mb-4'/>
        <Input name="email" type="email" placeholder="Email" className='w-80 mb-4'/>
        <Input name="password" type="password" placeholder="Password" className='w-80 mb-4'/>
        <Input name="confirmPassword" type="password" placeholder="Confirm Password" className='w-80 mb-4'/>
        <Button type="submit" variant="secondary" className='w-80 mb-4'>Submit</Button>
      </form>
      <p>Already have an account? <Link href="/login" className='text-sky-600'>Log In</Link> </p>
    </div>
  )
}

export default SignupPage
