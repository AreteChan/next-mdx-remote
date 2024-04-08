"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'
import { message } from 'antd'
import { getUser } from '@/lib/actions'

const LoginPage = () => {

  const login = async (formdata: FormData) => {
    try {
      const user = await getUser(formdata)
      
      message.success('Login successful')
    } catch (error: any) {
      message.error('Log in failed. Please try again.')
      console.error(error)
    }
    
  }

  return (
    <div className="flex-center flex-col h-full px-96 pt-24">
      {/* {contextHolder} */}
      <h1>Log in</h1>
      <form action={login} className='w-96 flex-center flex-col'>
        <Input name="email" type="email" placeholder="Email" className='w-80 mb-4'/>
        <Input name="password" type="password" placeholder="Password" className='w-80 mb-4'/>
        <Button type="submit" variant="secondary" className='w-80 mb-4'>Submit</Button>
      </form>
      <p>Don&apos;t have an account? <Link href="/signup" className='text-sky-600'>Sign up</Link> </p>
    </div>
  )
}

export default LoginPage