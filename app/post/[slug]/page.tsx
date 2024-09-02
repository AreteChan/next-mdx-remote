import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/parse-posts";
import { Metadata } from "next";
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Button } from '@/components/ui/button';
import ButtonDemo from "@/app/demo/message-component/ButtonDemo";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 根据 slug 获取文章内容
function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug);
  return post;
}

// 禁止动态路由
export const dynamicParams = false;

// 生成静态路由参数
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// 生成文章的元数据
export function generateMetadata( { params, searchParams }: Props) {
  const post = getPost(params);
  const metadata: Metadata = { ...post.meta };
  return metadata;
}

// MDX 配置
const options: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight as any],
  },
};

const components: MDXRemoteProps['components'] = {
  pre: (props: any) => (
    <pre {...props} className="hljs">
      {props.children}
    </pre>
  ),
  ButtonDemo,
}

export default function Post({ params }: Props) {
  const post = getPost(params);

  return (
    <div className="container mt-4 prose prose-slate dark:prose-invert slide-enter-content space-y-4 ">
      <h1 className="mb-4">{post.meta.title}</h1>
      <div className="text-gray-400 mb-8">{post.meta.date.toLocaleString()}</div> 
      <MDXRemote source={post.content} options={options} components={components}  />
    </div>
  );
}