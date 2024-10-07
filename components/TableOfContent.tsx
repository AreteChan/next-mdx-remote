'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface TableOfContentsProps {
  titles: string[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ titles }) => {
  const [activeId, setActiveId] = useState<string>('');

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      console.log(entry);
      // 检查元素是否进入视口，且其顶部接近视口顶部
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const rect = entry.boundingClientRect;
        
        // 检查元素是否在顶部 20px 范围内
        if (rect.top >= 0 && rect.top <= 20) {
          setActiveId(id);
        }
      }
    });
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      rootMargin: '0px 0px -80% 0px',
      threshold: [0, 1],
    };

    titles.forEach((title) => {
      const pureTitle = title.replace(/^#{1,3}\s/, '');
      const element = document.getElementById(pureTitle);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [titles]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, pureTitle: string) => {
    event.preventDefault();
    const element = document.getElementById(pureTitle);
    if (element) {
      setActiveId(pureTitle);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="slide-enter-content space-y-2 fixed mt-16">
      {titles.map((title: string) => {
        const pureTitle = title.replace(/^#{1,3}\s/, '');
        let className = "block text-slate-500 hover:text-slate-900 dark:text-slate-200 dark:hover:text-slate-400 whitespace-nowrap ";

        if (title.startsWith("## ")) className += "ml-2 ";
        else if (title.startsWith("### ")) className += "ml-4 ";

        if (pureTitle === activeId) {
          className += "text-slate-900 dark:text-slate-100 ";
        }

        return (
          <a
            key={title}
            href={`#${pureTitle}`}
            className={className}
            onClick={(e) => handleClick(e, pureTitle)}
          >
            {pureTitle}
          </a>
        );
      })}
    </div>
  );
};

export default TableOfContents;