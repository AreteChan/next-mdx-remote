// 'use client'
import React from 'react'
import Mdx from './content.mdx'

const MdxPage = () => {
  return (
    <div className='container mx-auto px-4 py-8'> 
      <article className='prose dark:prose-invert anima-in'>
        <Mdx />
      </article>
    </div>
    
  )
}

export default MdxPage