

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className="container mt-8 prose dark:prose-invert slide-enter-content">{children}</div>
}