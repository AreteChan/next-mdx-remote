import nextMdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'


const withMdx = nextMdx({
  // By default only the `.mdx` extension is supported.
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
})

const nextConfig = withMdx({
  // Support MDX files as pages:
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
})

export default nextConfig