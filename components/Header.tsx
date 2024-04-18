'use client'
import { Button } from './ui/button'
import Link from 'next/link';
import { SunDim, MoonStars } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

function Header() {

  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } 
  }, [])

  const toggleDark = () => {
    const isLight = theme === 'light'
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isLight ? 'dark' : 'light')
    setTheme(isLight ? 'dark' : 'light')
  }

  return (
    <header className='fixed top-0 w-full z-50'>
      <div className='flex justify-between items-center py-2 px-4 '>
        <Button variant="link" size='icon' onClick={toggleDark}>
          {theme === 'light' ? <SunDim size={24} /> : <MoonStars size={24} />}
        </Button>
        <div>
          <Button variant="link">
            <Link href='/'>Home</Link>
          </Button>
          <Button variant="link">
            <Link href='/blog'>Blog</Link>
          </Button>
          <Button variant="link">
            <Link href='/post'>Post</Link>
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