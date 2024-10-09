"use client"
import { useEffect } from "react"

const TestPage = () => {

  useEffect(() => {
    let prevScollTop = document.documentElement.scrollTop

    const observer = new IntersectionObserver(
      (entries) => {
        const isScrollDown = prevScollTop > document.documentElement.scrollTop
        const isScrollUp = !isScrollDown
        prevScollTop = document.documentElement.scrollTop
        
        console.log(isScrollDown)
        // 标题k向上移动到视口顶部，目录标题k高亮
        
      },
      {
        threshold: [1]
      }
    )
    observer.observe(document.getElementById('test') as Element)

    return () => {
      observer.disconnect()
    }

  }, [])

  return (
    <div>
      <h1 id="test">Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
    </div>
  )
}

export default TestPage;
