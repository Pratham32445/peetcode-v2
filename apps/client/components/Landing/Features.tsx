import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlarmClock } from "lucide-react";

const featuresData = [
  {
    title: "Premium Problems Free",
    desc: "Access to all LeetCode premium problems without any subscription. Practice the most important interview questions.",
  },
  {
    title: "AI-Powered Hints",
    desc: "Stuck on a problem? Get intelligent hints and explanations from our AI assistant without revealing the complete solution.",
  },
  {
    title: "Company-Wise Problems",
    desc: "Practice problems specifically asked by top tech companies. Prepare targeted for your dream company.",
  },
  {
    title: "Difficulty Tracking",
    desc: "Track your progress with detailed analytics and difficulty-wise problem solving statistics.",
  },
  {
    title: "Community Discussion",
    desc: "Engage with a community of developers. Share solutions and learn from others' approaches.",
  },
  {
    title: "Mock Interviews",
    desc: "Practice with timed mock interviews. Get real interview experience with our specialized modules.",
  },
];

const Features = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-[100px]">
        <div className="mb-[5px] flex flex-col items-center">
          <p className="text-4xl">Why Choose PeetCode?</p>
          <p>Everything you need to ace your coding interviews</p>
        </div>
        <div className="mt-[50px]">
          <div className="flex flex-wrap justify-center gap-5 p-4 px-10 w-full">
            {featuresData.map(({ title, desc }, idx) => (
              <Card
                key={idx}
                className="w-96 cursor-pointer hover:translate-y-[-10px] transition-transform duration-300"
              >
                <CardHeader>
                  <div className="bg-[#4F46E5] w-fit p-3 rounded-md">
                    <AlarmClock />
                  </div>
                  <CardTitle className="text-xl ">{title}</CardTitle>
                  <CardDescription>{desc} </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
