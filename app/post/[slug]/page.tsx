import { MDXRemote } from "next-mdx-remote/rsc";

import { getPostBySlug, getAllPosts } from "@/lib/parse-posts";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 根据 slug 获取文章内容
async function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug);
  return post;
}

export const dynamicParams = false;

// 获取所有文章的 slug 数组
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// 生成文章的元数据
export async function generateMetadata( { params, searchParams }: Props) {
  const post = await getPost(params);
  const metadata: Metadata = {
    title: post.meta.title,
    description: post.meta.description,
  };
  return metadata;
}


export default async function Post({ params }: Props) {
  const post = await getPost(params);

  return (
    <div className="container mt-4 prose dark:prose-invert anima-in">
      <h2 className="text-5xl">{post.meta.title}</h2>
      <time className="">{post.meta.date.toLocaleString()}</time>
      <MDXRemote source={post.content} components={{}} options={{}} />
    </div>
  );
}