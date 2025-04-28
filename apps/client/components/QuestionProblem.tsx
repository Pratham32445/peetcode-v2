import { Problem } from "@/types";
import React from "react";
import ReactMarkDown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

const Difficulty = {
  MEDIUM: "#FFA116",
  EASY: "#117B6F",
  HARD: "#CC3352",
};

const desc = `# 

Given an integer array \`nums\` and an integer \`n\`, find **The Max Element in the array** and return the element 

- Return the integer if there is not any max then return -1 in that case.
- If there are multiple numbers, then return return only one number.

Examples
nums = [1,2,4,-1,-4] in this case the result will be 4 \n
nums = [1,2,2,-1,-4] in this case the result will be 2 \n
nums = [1,2,5,-1,-4] in this case the result will be 5 \n
nums = [1,2,9,-1,-4] in this case the result will be 9 \n
nums = [0,2,4,-1,-4] in this case the result will be 4 \n
nums = [] in this case because the size of the vector is 0 then the answer will be -1
---`;

const QuestionProblem = ({ problem }: { problem: Problem }) => {
  return (
    <div className="relative w-full min-h-full">
      <ScrollArea style={{ height: "calc(90vh - 100px)" }}>
        {" "}
        <div className="p-4 px-6">
          <div>
            <h1 className="capitalize text-2xl">{problem.title}</h1>
          </div>
          <div className="flex gap-5 mt-5">
            <div className="bg-hoverColor px-4 py-2 rounded-full">
              <p
                className="text-xs"
                style={{
                  color:
                    Difficulty[problem.difficulty as keyof typeof Difficulty],
                }}
              >
                {problem.difficulty}
              </p>
            </div>
            <div className="bg-hoverColor px-4 py-2 rounded-full">
              <p className="text-xs">Topics</p>
            </div>
            <div className="bg-hoverColor px-4 py-2 rounded-full">
              <p className="text-xs">Companies</p>
            </div>
          </div>
          <div className="mt-5 tracking-wider opacity-60">
            <p>Problem Description: {"\n"}</p>
            <ReactMarkDown>{desc}</ReactMarkDown>
          </div>
          <div className="mt-5 opacity-60">
            <p>Examples: {"\n\n"}</p>
            <ReactMarkDown>
              {problem.example.map((exm) => `${exm}\n\n`).join("")}
            </ReactMarkDown>
          </div>
          <div className="mt-5 opacity-60">
            <p>Constraints: {"\n\n"}</p>
            <ReactMarkDown>
              {problem.constraints.map((cons) => `${cons}\n\n`).join("")}
            </ReactMarkDown>
          </div>
          <div className="mt-[20px] flex gap-5">
            <div>
              Accepted :{" "}
              {problem.acceptancerate ? problem.acceptancerate : "100%"}
            </div>
            <div>Submissions : {problem.Submissions?.length}</div>
            <div>Acceptance Rate : {"100%"}</div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuestionProblem;
