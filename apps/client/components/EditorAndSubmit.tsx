"use client";

import React, { useContext, useEffect } from "react";
import QuestionEditor from "./QuestionEditor";
import { MainContext } from "@/context/State";
import SubmissionResult from "./SubmissionResult";

const EditorAndSubmit = ({
  boilerPlates,
  questionId,
}: {
  questionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  boilerPlates: any;
}) => {
  const { isProblemSubmitted, setIsProblemSubmitted } = useContext(MainContext);

  useEffect(() => {
    setIsProblemSubmitted({ status: false, submissionID: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !isProblemSubmitted.status ? (
    <div className="flex h-full">
      {boilerPlates && (
        <QuestionEditor boilerPlates={boilerPlates} problemId={questionId} />
      )}
    </div>
  ) : (
    <div className="w-full bg-lightBg z-50 absolute bg- top-0 left-0 bottom-0 right-0 h-[90vh]">
      <SubmissionResult submissionId={isProblemSubmitted.submissionID} />
    </div>
  );
};

export default EditorAndSubmit;
