'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface TableOfContentsProps {
  titles: string[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ titles }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {

    let prevScollTop = document.documentElement.scrollTop
    const pureTitles = titles.map((title) => title.replace(/^#{1,3}\s/, ''));

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const isMoveDown = prevScollTop >= document.documentElement.scrollTop
        const isMoveUp = !isMoveDown
        prevScollTop = document.documentElement.scrollTop


        // 标题k向上移动到视口顶部，目录标题k高亮
        if (isMoveUp && !entry.isIntersecting) {
          const pureTitle = entry.target.id;
          setActiveId(pureTitle);
        }
        // 标题k从视口顶部下移，目录标题k-1高亮
        else if (isMoveDown && entry.isIntersecting) {
          const pureTitle = entry.target.id;
          const index = pureTitles.indexOf(pureTitle);
          if (index > 0) {
            setActiveId(pureTitles[index - 1]);
          } else {
            // index === 0
            setActiveId('')
          }
        }
      }),
      {
        threshold: [1],
        rootMargin: '-21px 0px 0px 0px',
      }
    )

    pureTitles.forEach((pureTitle) => {
      const element = document.getElementById(pureTitle);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [titles]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, pureTitle: string) => {
    event.preventDefault();
    const element = document.getElementById(pureTitle);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="slide-enter-content space-y-2 fixed mt-16">
      {titles.map((title: string) => {
        const pureTitle = title.replace(/^#{1,3}\s/, '');
        let className = "block text-slate-500 hover:text-cyan-900 dark:text-slate-400 dark:hover:text-slate-100 whitespace-nowrap ";

        if (title.startsWith("## ")) className += "ml-2 ";
        else if (title.startsWith("### ")) className += "ml-4 ";

        if (pureTitle === activeId) {
          className += "font-bold text-cyan-700 dark:text-slate-200 ";
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