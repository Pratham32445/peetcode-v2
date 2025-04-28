import React from "react";
import Navbar from "./Navbar";
import Question from "./Question";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Problem = async ({ params }: { params: Promise<any> }) => {
  const Params = await params;
  return (
    <div className="overflow-hidden w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Question questionId={Params.Id} />
      </div>
    </div>
  );
};

export default Problem;
