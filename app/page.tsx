"use client"
import { sriracha } from "@/app/font";
import { Button } from "@/components/ui/button";
import { message } from "@/components/ui/message";


const HomePage = () => {
  return (
    <div className="flex-center flex-col">
      <h1 className={sriracha.className}>Welcome to Next Blog ! </h1>
      {/* <Message /> */}
      <Button onClick={() => message.success('This is a message.')}>Click me</Button>
    </div>
  );
};

export default HomePage;
