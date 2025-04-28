"use client";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { MainContext } from "@/context/State";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Heroactivity = ({ activity }: { activity: any }) => {
  const { title, desc, color, defaultValue } = activity;
  const { hoverState, setHoverState } = useContext(MainContext);
  
  return (
    <div
      onMouseEnter={() => setHoverState(color)}
      onMouseLeave={() => setHoverState(defaultValue)}
      className="group/hero-product relative flex flex-col items-center p-6 md:p-8 cursor-default bg-white/5 backdrop-blur transition rounded-lg xl:first:!rounded-l-4xl xl:last:!rounded-r-4xl hover:scale-[1.02] hover:bg-white/10"
    >
      <h3 className="text-white text-lg">{title}</h3>
      <p className="mt-2 grow opacity-60 text-white">{desc}</p>
      <Button className={`my-3 ${hoverState[0]} text-white`}>Explore</Button>
    </div>
  );
};

export default Heroactivity;
