import type { Metadata } from "next";
import { inter }  from "@/app/font";
import "./globals.css";
import Header from "../components/Header";
import { MessageContainer } from "@/components/ui/message";
import "highlight.js/styles/github-dark.css";

export const metadata: Metadata = {
  title: "My Next Blog",
  description: "My blog create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <MessageContainer />
        <Header />
        <main className="py-16">
          {children}
        </main>
      </body>
    </html>
  );
}

