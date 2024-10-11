"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { message } from '@/components/ui/message'
import Link from 'next/link'
import { createUser } from '@/lib/actions'
import { sriracha } from '@/app/font'

const SignupPage = () => {

  // const signup = async (formdata: FormData) => {
  //   try {
  //     const { password, confirmPassword } = Object.fromEntries(formdata)
  //     if (password !== confirmPassword) message.error('Passwords do not match!')
      
  //     const user = await createUser(formdata)  
  //     message.success('Sign up successfully!')
  //   } catch (error: any) {
  //     message.error(`Sign up failed! ${error.message}`)
  //   }
  // }

  return (
    <div className="container flex items-center flex-col pt-[7%] slide-enter-content">
      <h1 className={sriracha.className}>Sign up</h1>
      <form className='w-80 space-y-4'>
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
