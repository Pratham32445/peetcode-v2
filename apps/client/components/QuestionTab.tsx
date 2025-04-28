import React from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import TabBar from "./TabBar";

const getQuestion = async (Id: string) => {
  try {
    const SERVER_URI = process.env.NEXT_PUBLIC_PRODUCTION_URL;
    const { data } = await axios.get(`${SERVER_URI}/api/problem/${Id}`);
    return data.problem;
  } catch (error) {
    console.log(error);
  }
};

const QuestionTab = async ({ questionId }: { questionId: string }) => {
  const problem = await getQuestion(questionId);

  return problem ? (
    <div className="w-full h-[95%] bg-lightBg rounded mb-5">
      <TabBar problem={problem} />
    </div>
  ) : (
    <div>
      <Loader className="animate-spin w-[50px] h-[50px]" />
    </div>
  );
};

export default QuestionTab;
