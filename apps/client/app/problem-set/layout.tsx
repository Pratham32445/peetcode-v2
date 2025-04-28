import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { House } from "lucide-react";
import Link from "next/link";

const layout = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div>
        <Link href={"/problems"} className="my-4 cursor-pointer">
          <House />
        </Link>
        <h1 className="text-4xl my-2">Coming soon...</h1>
        <div className="my-4">
          <Input placeholder="Write your Email..." />
          <Button className="my-3 w-full">Join Waitlist</Button>
        </div>
      </div>
    </div>
  );
};

export default layout;
