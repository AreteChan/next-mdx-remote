import fs from "fs";
import { join } from "path";

import matter from "gray-matter";
const postsDir = join(process.cwd(), "posts"); // 项目启动路径@/posts

type MetaData = {
  title: string;
  date: Date;
  category: string;
  tags?: string[];
  description?: string;
  draft?: boolean;
};

// 根据文件名读取 markdown 文档内容
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  const fullPath = join(postsDir, `${realSlug}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 解析 markdown 元数据
  const { data, content } = matter(fileContents);

  // 配置文章元数据
  const meta = { ...data } as MetaData;

  return { slug: realSlug, meta, content };
}

// 获取 /posts文件夹下所用markdown文档
export function getAllPosts() {
  const slugs = fs.readdirSync(postsDir); // 读取文件夹下所有文件名，返回String[]

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // 排除草稿文件
    .filter((c) => !/\.draft$/.test(c.slug));  // 匹配文件名中包含 .draft 的文件
    // .filter((c) => !c.meta.draft);
  return posts.sort((a, b) => +b.meta.date - +a.meta.date);  // 根据日期排序
}
