"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Button } from "@/components/ui/button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowRightIcon } from "lucide-react";
import { AnimatedShinyText } from "../ui/animated-shiny-text";

const problemsData = [
  {
    name: "Premium Problems",
    data: "500+",
  },
  {
    name: "AI Assistant",
    data: "24/7",
  },
  {
    name: "Happy Users",
    data: "1K",
  },
  {
    name: "Free Forever",
    data: "100%",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const session = useSession();
  const isLogin = () => {
    if (session) router.push("/problems");
    else router.push("/login");
  };
  return (
    <div className="relative flex mt-[50px] h-[100vh] w-full overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="z-10 flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Introducing Peetcode</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div> 
          <h1 className="z-10 whitespace-pre-wrap text-center text-7xl font-medium tracking-tighter text-black dark:text-white my-4">
            Master L**tCode Premium <br /> Problems Completely Free
          </h1>
          <p className="my-4 text-lg text-center">
            Practice premium coding problems with integrated AI assistance.{" "}
            <br />
            Level up your coding skills without spending a dime.
          </p>
          <div className="flex items-center gap-5">
            <Button
              className="p-7 text-lg bg-[#423726] hover:bg-[#423726] text-[#FFA116]"
              onClick={isLogin}
            >
              Start Practising Now
            </Button>
            <Button className="p-7 text-lg">Explore Feature</Button>
          </div>
        </div>
        <div className="flex items-center justify-around w-full p-16">
          {problemsData.map(({ name, data }, idx) => (
            <div key={idx}>
              {name == "Premium Problems" ? (
                <div className="flex justify-center items-center gap-1">
                  <NumberTicker
                    value={100} 
                    className="whitespace-pre-wrap text-3xl font-medium tracking-tighter text-black dark:text-white text-center"
                  />
                  <p>+</p>
                </div>
              ) : (
                <p className="text-3xl text-center">{data}</p>
              )}
              <p className="">{name}</p>
            </div>
          ))}
        </div>
      </div>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  );
}
