"use client";

import React, { useContext, useEffect, useState } from "react";
import Heroactivity from "./Heroactivity";
import WordRotate from "./ui/word-rotate";
import { MainContext } from "@/context/State";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const heroAcitivityData = [
  {
    title: "Premium Problems",
    desc: "Solve the curated list of problems",
    button: "Solve",
    defaultValue: ["bg-orange-500", "from-orange-500 to-orange-300"],
    color: ["bg-emerald-500", "from-emerald-400 to-yellow-300"],
  },
  {
    title: "Coding Challenges",
    desc: "Participate in Contests",
    button: "Compete",
    color: ["bg-orange-500", "from-orange-500 to-orange-300"],
    defaultValue: ["bg-orange-500", "from-orange-500 to-orange-300"],
  },
  {
    title: "Mock Interviews",
    desc: "Give 1-1 mock Interview Anytime",
    button: "Prepare",
    color: ["bg-purple-500", "from-purple-500 to-purple-200"],
    defaultValue: ["bg-orange-500", "from-orange-500 to-orange-300"],
  },
];

const Hero = () => {
  const { hoverState, setHoverState } = useContext(MainContext);
  const [email, setEmail] = useState("");
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  const { toast } = useToast();

  const subscribe = () => {
    const emailSchema = z.string().email();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Please Provide a Valid Email", variant: "destructive" });
    }
    toast({title : "Done"});
    setEmail("")
  };

  useEffect(() => {
    // Set default background color
    setHoverState(heroAcitivityData[0].defaultValue);
  }, [setHoverState]);

  const carouselImages = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
  ];

  return (
    hoverState && (
      <main className="text-center py-24 min-h-full">
        <section className="relative z-10 h-full">
          {/* Dynamic background based on hoverState */}
          <div
            className={`absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-10 blur-[100px] transition-all ${hoverState[0]}`}
          ></div>
          <div className="mx-auto max-w-screen-xl px-6 md:px-10">
            <h1
              className={`inline-flex flex-col gap-1 transition font-display text-6xl font-bold leading-none md:text-[8rem] bg-gradient-to-r from-20% bg-clip-text text-transparent ${hoverState[1]}`}
            >
              <span>Peet Code</span>
              <span className="text-3xl my-3">
                <WordRotate
                  duration={1500}
                  className="text-4xl font-bold text-black dark:text-white"
                  words={[
                    "Say no to Leetcode Premium!",
                    "Best Place to Prepare for Technical Interview",
                  ]}
                />
              </span>
            </h1>
            <div className="mt-8 grid gap-2 md:mt-16 md:grid-cols-3">
              {heroAcitivityData.map((activity, idx) => (
                <Heroactivity activity={activity} key={idx} />
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col items-center justify-center mt-[150px]">
            <div>
              <h1 className="text-5xl">Solve Premium Problem with Same Feel</h1>
            </div>
            <div className="mt-7 w-3/4">
              <Carousel
                plugins={[plugin.current]}
                className="w-full h-[600px] overflow-hidden"
              >
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem className="p-0" key={index}>
                      <div className="flex justify-center">
                        <Card className="p-0">
                          <CardContent className="flex items-center justify-center">
                            <Image
                              src={`/${image}.png`}
                              alt={`Image ${index + 1}`}
                              width={1500}
                              height={1000}
                              className="object-cover"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>
        <section className="flex justify-center mt-[100px]">
          <div>
            <p className="text-3xl">Notify Me</p>
            <div className="mt-[30px] gap-4 flex items-center">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                className="p-5"
                placeholder="Type Your Email..."
              />
              <Button className="p-5" onClick={subscribe}>
                Notify me
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  );
};

export default Hero;
