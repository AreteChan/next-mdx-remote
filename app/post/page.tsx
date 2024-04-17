import React from 'react'
import { getAllPosts } from "@/lib/parse-posts";
import Link from 'next/link';


const PostPage = () => {
  const posts = getAllPosts();
  return (
    <div className="container prose dark:prose-invert anima-in">
      { posts.map((post: any) => (
        <Link key={post.slug} href={`/post/${post.slug}`}>
          <h2>{post.meta.title}</h2>
        </Link>
      ))}
      
    </div>
  )
}

export default PostPage