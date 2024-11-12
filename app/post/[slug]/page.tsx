import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts, getMarkdownTitles } from "@/lib/parse-posts";
import { Metadata } from "next";
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import remarkCodeTitles from 'remark-flexible-code-titles'
import ButtonDemo from '@/app/post-components/ButtonDemo';
import TableOfContents from "@/components/TableOfContent";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 根据 slug 获取文章内容
function getPost(params: Props["params"]) {
  const post = getPostBySlug(params.slug);
  return post;
}

// 根据 slug 获取文章子标题
function getPostTitles(params: Props["params"]) {
  const titles = getMarkdownTitles(params.slug);
  return titles;
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
    remarkPlugins: [remarkGfm, remarkCodeTitles as any],
    rehypePlugins: [rehypeHighlight as any],
  },
};

const components: MDXRemoteProps['components'] = {
  pre: (props: any) => (
    <pre {...props} className="hljs">
      {props.children}
    </pre>
  ),
  h1: ({children}) => <h1 id={children?.toString()}>{children}</h1>,
  h2: ({children}) => <h2 id={children?.toString()}>{children}</h2>,
  h3: ({children}) => <h3 id={children?.toString()}>{children}</h3>,
  ButtonDemo,
}

export default function Post({ params }: Props) {
  const post = getPost(params);
  const titles = getPostTitles(params);
  const isTitlesShow = titles.length > 0;

  return (
    <div className="container mt-4 flex">
      <div id="post" className="prose prose-slate dark:prose-invert slide-enter-content ml-32 mr-8 ">
        <h1 className="mb-4 !max-w-none whitespace-nowrap">{post.meta.title}</h1>
        <div className="text-gray-400 mb-4">{post.meta.date.toLocaleString()}</div> 
        <MDXRemote source={post.content} options={options} components={components} />
      </div >
      <div id="menu">
        {isTitlesShow && <TableOfContents titles={titles} />}
      </div>
      
    </div>
  );
}