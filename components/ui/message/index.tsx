"use client"
import { CheckCircle,XCircle } from '@phosphor-icons/react/dist/ssr'
import s from './style.module.css'
import { createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { lightInter } from '@/app/font';
import { createRoot } from 'react-dom/client';

type MessageObj = {
  message: string
  type: 'success' | 'error'
  key: number
}

type wrapperRefCurrent = {
  addFadeOut(): () => void;
  add: (message: string, type: 'success' | 'error') => void
  remove: () => void
}

const Message = forwardRef(({ message, type }: MessageObj, ref) => {
  return (
    <div 
      className={s.message}>
      <span className='inline-block '>
        {type === 'success' && <CheckCircle className={s['color-success']} weight="fill" />}
        {type === 'error' && <XCircle className={s['color-error']} weight="fill" />}
      </span>
      <span className={"inline-block text-black " + lightInter.className}>{message}</span>
    </div>
  )
})
Message.displayName = 'Message'

const MessageWrapper = forwardRef((props, ref) => {
  const [msgList, setMsgList] = useState<MessageObj[]>([])
  const msgListRef = useRef<HTMLDivElement | null>(null)

  useImperativeHandle(ref, () => ({
    add(message: string, type: 'success' | 'error') {
      setMsgList((prev) => [...prev, { message, type, key: Math.random()}]);
    },
    addFadeOut() {
      const msgDiv = msgListRef.current!.children[0] as HTMLDivElement
      msgDiv.style.transform = 'translateY(var(--start-height)) translateX(-50%)'
      msgDiv.style.opacity = '0'
    },
    remove() {
      setMsgList((prev) => prev.slice(1))
    }
  }), []); 

  useEffect(() => {
    for (let i = 0; i < msgListRef.current!.children.length; i++) {
      let h = i*3.2
      let msgDiv = msgListRef.current!.children[i] as HTMLDivElement
      msgDiv.style.setProperty('--start-height', `${h-2}rem`)
      msgDiv.style.setProperty('--height', `${h}rem`)
      setTimeout(() => {
        msgDiv.style.transform=`translateY(${h}rem) translateX(-50%)`
        msgDiv.style.opacity = '1'
      }, 0);
    }
  }, [msgList])

  return (
    <div className="fixed top-0 p-4 w-full" ref={msgListRef}>
        { msgList.map((msg) => 
            <Message key={msg.key} message={msg.message} type={msg.type}/>
        )}
    </div>
  )
})
MessageWrapper.displayName = 'MessageWrapper'

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

const wrapperRef = createRef<wrapperRefCurrent>()
export function MessageContainer() {
  return <MessageWrapper ref={wrapperRef} />
}

// const fragment = document.createDocumentFragment();
// document.body.appendChild(fragment);
// const root = createRoot(fragment);
// root.render(<MessageWrapper ref={wrapperRef} />);

function msgList(message: string, type: 'success' | 'error') {
  const wrapperRefCurrent = wrapperRef.current as wrapperRefCurrent
  wrapperRefCurrent.add(message, type)
  setTimeout(() => {
    wrapperRefCurrent.addFadeOut()
  }, 2700);
  setTimeout(() => {
    wrapperRefCurrent.remove()
  }, 3000);
}

export const message = {
  success: (message: string) => msgList(message, 'success'),
  error: (message: string) => msgList(message, 'error')
}
