"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { getUser } from '@/lib/actions'
import { message } from '@/components/ui/message'
import { sriracha } from '@/app/font'

function LoginPage() {
  const login = async (formdata: FormData) => {
    try {
      const user = await getUser(formdata)
      message.success('Log in successfully!')
    } catch (error: any) {
      message.error(`Log in failed! ${error.message}`)
    }
  }

  return (
    <div className="container flex items-center flex-col pt-[7%] slide-enter-content">
      <h1 className={sriracha.className}>Log in</h1>
      <form action={login} className='w-80 space-y-4'>
        <Input name="email" type="email" placeholder="Email"/>
        <Input name="password" type="password" placeholder="Password"/>
        <Button type="submit" variant="secondary" className='w-80'>Submit</Button>
      </form>
      <p className='my-2'>Don&apos;t have an account? <Link href="/signup" className='text-sky-600'>Sign up</Link> </p>
    </div>
  )
}

export default LoginPage