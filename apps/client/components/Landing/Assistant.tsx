import Image from "next/image";
import React from "react";

const features = [
  {
    title: "Smart Hints",
    description:
      "Get step-by-step guidance when you're stuck, tailored to your progress",
  },
  {
    title: "Time Complexity Analysis",
    description:
      "Understand the efficiency of your solution with detailed analysis",
  },
  {
    title: "Code Optimization",
    description: "Get suggestions to improve your code quality and performance",
  },
];

const Assistant = () => {
  return (
    <div className="p-10 flex justify-center gap-5 mt-[100px]">
      <div>
        <div>
          <h1 className="text-5xl">
            Stuck on a Problem? <br /> AI Assistant Is Here to Help
          </h1>
          <p className="my-2 text-lg">
            Get intelligent hints and explanations without revealing the
            <br />
            complete solution. Our AI assistant helps you learn and grow.
          </p>
        </div>
        <div className="my-[50px]">
          {features.map(({ title, description }, idx) => (
            <div className="my-5" key={idx}>
              <p className="text-xl">{title}</p>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="bg-[#171717] w-[400px] h-[400px] relative">
          <Image
            src="/assistant.jpg"
            alt="Assistant"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
