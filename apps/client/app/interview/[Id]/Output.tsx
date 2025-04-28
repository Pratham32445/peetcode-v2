"use client";
import { Button } from "@/components/ui/button";
import { MainContext } from "@/context/State";
import React, { useContext, useState } from "react";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

const Output = () => {
  const { InterviewEditor } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [outputResult, setOutputResult] = useState<any>(null);
  const API_HOST = process.env.NEXT_PUBLIC_JUDGE_0_URI!;
  const submitCode = async () => {
    setIsLoading(true);
    const { data } = await axios.post(`http://${API_HOST}/submissions`, {
      language_id: 76,
      source_code: InterviewEditor,
    });
    const token = data.token;
    const Interval = setInterval(async () => {
      const res = await axios.get(`http://${API_HOST}/submissions/${token}`);
      if (res.data.status.description != "Processing") {
        setOutputResult(res.data);
        setIsLoading(false);
        clearInterval(Interval);
      }
    }, 1000);
  };
  return (
    <div className="bg-white text-black h-full p-6">
      <Button
        onClick={submitCode}
        className="bg-bgSucess hover:bg-bgSucess text-white transform transition-transform duration-300 hover:scale-110"
      >
        Run code
      </Button>
      <Button onClick={() => setOutputResult({ stdout: {} })}>Clear</Button>
      <p className="text-neutral-600 my-4">Output:</p>
      {!isLoading ? (
        <div>
          {outputResult && outputResult.status.id == 3 ? (
            <ScrollArea className="h-[500px]">
              <div>
                {outputResult.stdout
                  ?.split("\n")
                  .map((result: string, idx: number) => (
                    <p key={idx}>{result}</p>
                  ))}
              </div>
            </ScrollArea>
          ) : (
            <div>
              <p className="text-red-600">{outputResult?.compile_output}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <LoaderCircle className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Output;
