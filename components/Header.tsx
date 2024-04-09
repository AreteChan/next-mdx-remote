'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link';
import { SunDim, MoonStars } from '@phosphor-icons/react/dist/ssr';

const Header = () => {

  const [theme, setTheme] = useState('light')

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <header className='sticky w-full'>
      <div className='flex justify-between items-center py-2 px-4 '>
        <Button variant="link" size='icon' onClick={toggleDark}>
          {theme === 'light' ? <SunDim size={24} /> : <MoonStars size={24} />}
        </Button>
        <div>
          <Button variant="link">
            <Link href='/'>Home</Link>
          </Button>
          <Button variant="link">
            <Link href='/login'>Log in</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header