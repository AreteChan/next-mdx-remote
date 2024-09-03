'use client'
import { Button } from '@/components/ui/button'
import { message } from '@/components/ui/message'

function ButtonDemo({ children }: { children: React.ReactNode }) {
  return (
    <Button className='m-2' onClick={() => message.success('This is a success message.')}>{children}</Button>
  );
}

export default ButtonDemo