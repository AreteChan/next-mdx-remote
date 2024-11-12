import React from 'react'
import { getAllPosts } from "@/lib/parse-posts";
import Link from 'next/link';


function PostPage() {
  const posts = getAllPosts();
  return (
      <div className="container prose dark:prose-invert slide-enter-content max-w-[1400px]">
        { posts.map((post: any) => (
          <div key={post.slug}>
            <time className="text-xl mr-8 w-32 inline-block">
              {post.meta.date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </time>
            <Link href={`/post/${post.slug}`}>
              <h1 className='inline-block text-3xl mt-4'>{post.meta.title}</h1>
            </Link>
          </div>
        ))}
      </div>    
  )
}

export default PostPage