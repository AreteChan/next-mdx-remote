"use client"
import { CheckCircle,XCircle } from '@phosphor-icons/react/dist/ssr'
import s from './style.module.css'
import { createRef, forwardRef, useImperativeHandle, useState } from 'react'
import { lightInter } from '@/app/font';
import { randomString } from '@/lib/utils';

type MessageObj = {
  message: string
  type: 'success' | 'error'
  key: string
}

type wrapperRefCurrent = {
  add: (message: string, type: 'success' | 'error') => void
  remove: () => void
}

function Message({ message, type }: MessageObj) {

  return (
    <div 
      className={s.message} >
      <span className='flex-center gap-2'>
        <span className='inline-block '>
          {type === 'success' && <CheckCircle className={s['color-success']} weight="fill" />}
          {type === 'error' && <XCircle className={s['color-error']} weight="fill" />}
        </span>
        <span className={"inline-block text-black " + lightInter.className}>{message}</span>
      </span>
    </div>
  )
}

const MessageWrapper = forwardRef((props, ref) => {
  const [msgList, setMsgList] = useState<MessageObj[]>([])

  useImperativeHandle(ref, () => ({
    add(message: string, type: 'success' | 'error') {
      setMsgList((prev) => [...prev, { message, type, key: randomString(8)}]);
    },
    remove() {
      setMsgList((prev) => prev.slice(1))
    }
  }), []); 

  return (
    <div className="fixed top-4 transform -translate-x-1/2 left-1/2 z-[999]">
      <div className="flex flex-col gap-4 ">
        { msgList.map((msg) => 
            <Message key={msg.key} message={msg.message} type={msg.type} />
        )}
      </div> 
    </div>
  )
    
})

// function create(ref: LegacyRef<unknown> | undefined) {
  // const container = document.createElement('div');
//   container.className = 'fixed top-4 transform -translate-x-1/2 left-1/2 z-[999]';
//   document.body.appendChild(container);
//   const root = createRoot(container);
//   root.render(<MessageWrapper ref={ref} />);
//   return container;
// }

// function destroy(item: HTMLDivElement, time: number=3000) {
//   return setTimeout(() => {
//     unmountComponentAtNode(item);
//     document.body.removeChild(item);
//   }, time);
// }

const wrapperRef = createRef()
export function MessageContainer() {
  return <MessageWrapper ref={wrapperRef} />
}

export const message = {
  success: (message: string) => {
    (wrapperRef.current as wrapperRefCurrent)?.add(message, 'success')
    const timer = setTimeout(() => {
      (wrapperRef.current as wrapperRefCurrent)?.remove()
      clearTimeout(timer)
    }, 2990);
  },
  error: (message: string) => {
    (wrapperRef.current as wrapperRefCurrent)?.add(message, 'error')
    const timer = setTimeout(() => {
      (wrapperRef.current as wrapperRefCurrent)?.remove()
      clearTimeout(timer)
    }, 2990);
  },
}