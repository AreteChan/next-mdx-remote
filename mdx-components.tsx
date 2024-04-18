import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: (props) => (
      <pre {...props} className="hljs">
        {props.children}
      </pre>
    ),
    ...components,
  }
}