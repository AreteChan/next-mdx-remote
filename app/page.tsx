'use client'
import { sriracha } from "@/app/font";
import { Button } from "@/components/ui/button";
import { message } from "@/components/ui/message";

const HomePage = () => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center bg-background text-foreground slide-enter-content">
      <header className="mb-8">
        <h1 className={`${sriracha.className} text-4xl font-bold text-primary`}>Welcome to My Blog</h1>
      </header>
      <main className="max-w-2xl w-full px-4">
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-muted-foreground">
            Welcome to my personal blog! I&apos;m passionate about sharing my thoughts and experiences on various topics.
            Feel free to explore my recent posts and get in touch.
          </p>
          <Button className="mt-4" onClick={() => message.success('Thanks for visiting!')}>
            Say Hello!
          </Button>
        </section>
      </main>
      <footer className="fixed bottom-8 py-4 bg-background text-center text-muted-foreground">
        <p>&copy; 2024 My Personal Blog. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
