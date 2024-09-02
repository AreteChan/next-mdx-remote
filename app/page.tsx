'use client'
import { sriracha } from "@/app/font";
import { Button } from "@/components/ui/button";
import { message } from "@/components/ui/message";

const HomePage = () => {

  return (
    <div className="flex-center flex-col slide-enter-content">
      <h1 className={sriracha.className}>Welcome to Next Blog ! </h1>
      <Button onClick={() => message.success('This is a success message.')}>sdsda</Button>
    </div>
  );
};

export default HomePage;
