"use client";
import Navbar from "@/components/Landing/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const generateRandomId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
};

const Interview = () => {
  const [interviewId, setInterviewId] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const InputRef = useRef<HTMLInputElement>(null);
  const createInterView = () => {
    if (!interviewId) {
      toast({
        title: "Please Create InterviewId to create Interview",
        variant: "destructive",
      });
      return;
    }
    router.push(`/interview/${interviewId}`);
  };
  useEffect(() => {
    if(InputRef.current) {
        InputRef.current.focus();
    }
  }, [])
  
  return (
    <div className="flex bg-lightBg justify-center items-center w-full min-h-screen">
      <Navbar />
      <div className="w-full flex items-center flex-col">
        <Input
          ref={InputRef}
          className="p-10 w-1/2"
          placeholder="Create your Interview Id..."
          value={interviewId}
          onChange={(e) => setInterviewId(e.target.value)}
        />
        <div className="w-1/2 flex p-2 gap-3 items-start">
          <Button
            className="bg-[#423726] text-[#FFA116] hover:bg-[#423726]"
            onClick={() => setInterviewId(generateRandomId())}
          >
            Generate Radom Id
          </Button>
          <Button onClick={createInterView}>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
