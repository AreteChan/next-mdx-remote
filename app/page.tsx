// "use client"
import { sriracha } from "@/app/font";
import { Button } from "@/components/ui/button";
import { message } from "@/components/ui/message";


const HomePage = () => {
  return (
    <div className="flex-center flex-col anima-in">
      <h1 className={sriracha.className}>Welcome to Next Blog ! </h1>
    </div>
  );
};

export default HomePage;
