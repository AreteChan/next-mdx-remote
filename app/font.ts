import { Inter, Sriracha } from 'next/font/google'
// weight: 字重
// subsets: 字体子集
// display: 字体加载方式
export const sriracha = Sriracha({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
// 字体加载方式有什么区别
// 1. swap: 字体加载完成后替换默认字体
// 2. block: 字体加载完成后立即替换默认字体，可能会导致页面闪烁
export const inter = Inter({ subsets: ["latin"] });

export const lightInter = Inter({ weight: '300', subsets: ["latin"] });