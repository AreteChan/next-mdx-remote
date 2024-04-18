'use client'
import { Button } from '@/components/ui/button'
import { message } from '@/components/ui/message'

function messageComponentDemo() {
  return (
    <div className='flex-center mt-48'>
      <h1 className='text-gray-400 text-5xl'>Click the button to add success message</h1>
      <Button className='absolute right-16 bottom-16' onClick={() => message.success('This is a success message.')}>Add Success Message</Button>
    </div>
  )
}

export default messageComponentDemo