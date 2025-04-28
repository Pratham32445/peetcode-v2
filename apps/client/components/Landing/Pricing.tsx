import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const SupportData = [
  {
    background: "#262626",
    buttonData: "#2563EB",
    title: "Free Forever",
    desc: "Everything you need to excel",
    points: [
      "Access to all premium problems",
      "Limited AI-powered hints and guidance",
      "Company-wise problem sets",
      "Progress tracking",
    ],
  },
  {
    background: "#7141EA",
    buttonData: "#fff",
    title: "Pro",
    desc: "For the dedicated coder",
    points: [
      "Everything in Free plan",
      "Unlimited AI assistance",
      "Mock interviews with AI",
      "Advanced analytics",
      "Priority support",
    ],
  },
];

function Pricing() {
  return (
    <div className="mt-[100px]">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl">Simple Pricing</h1>
        <p className="mt-[20px]">
          Premium features without the premium price tag
        </p>
      </div>
      <div className="flex justify-center items-center my-[50px] gap-10">
        {SupportData.map(
          ({ background, title, buttonData, desc, points }, idx) => (
            <Card
              key={idx}
              style={{ background }}
              className="w-96 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-top">
                  <div>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>{desc}</CardDescription>
                  </div>
                  <div>
                    <p>$0/month</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {points.map((point, idx) => (
                  <p key={idx} className="text-lg my-5">
                    {point}
                  </p>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full" style={{ background: buttonData }}>
                  Get Started Free
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

export default Pricing;
