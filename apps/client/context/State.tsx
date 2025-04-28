"use client";

import React, { createContext, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MainContext = createContext<any>(null);

const State = ({ children }: { children: React.ReactNode }) => {
  const [isProblemSubmitted, setIsProblemSubmitted] = useState<{
    status: boolean;
    submissionID: null | string;
  }>({ status: false, submissionID: null });

  const [hoverState, setHoverState] = useState<string[]>();

  const [InterviewEditor, setInterviewEditor] = useState("");

  const [submissionResult, setSubmissionResult] = useState();

  const contextValue = {
    isProblemSubmitted,
    setIsProblemSubmitted,
    hoverState,
    setHoverState,
    submissionResult,
    setSubmissionResult,
    InterviewEditor,
    setInterviewEditor,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

export default State;
