"use client";

import React, { useContext, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { LoaderCircle, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_MAPPING, MONACO_LANGUAGE_MAPPING } from "@/lib/Mapping";
import { Button } from "./ui/button";
import axios from "axios";
import { fetchSubmissionResult } from "@/lib/submission";
import { MainContext } from "@/context/State";
import ChatWithAI from "./ChatWithAi";

const QuestionEditor = ({
  boilerPlates,
  problemId,
}: {
  boilerPlates: Record<string, string>;
  problemId: string;
}) => {
  const [language, setLanguage] = useState("cpp");
  const [editorState, setEditorState] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setIsProblemSubmitted } = useContext(MainContext);
  const [showAI, setShowAI] = useState(false);
  const SERVER_URI = process.env.NEXT_PUBLIC_PRODUCTION_URL!;

  useEffect(() => {
    setEditorState(boilerPlates[language] || "");
    setLoading(false);
  }, [language, boilerPlates]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatCode = (editor: any) => {
    editor.getAction("editor.action.formatDocument").run();
  };

  const createSubmission = async () => {
    try {
      setIsSubmitted(true);
      console.log(SERVER_URI);
      const res = await axios.post(`${SERVER_URI}/api/problem/submit`, {
        problemId,
        languageId: LANGUAGE_MAPPING[language as keyof typeof LANGUAGE_MAPPING],
        code: editorState,
      });
      if (res.data.submissionId) {
        const intervalId = setInterval(async () => {
          const { submission } = await fetchSubmissionResult(
            res.data.submissionId
          );
          console.log(submission.status, "Status");
          if (submission.status !== "PENDING") {
            setIsProblemSubmitted({
              status: true,
              submissionID: res.data.submissionId,
            });
            if (submission.status == "ACCEPTED") {
            }
            clearInterval(intervalId);
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (loading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <>
      <div className="relative w-full h-full p-2 mb-5">
        <div className="border mb-1 flex items-center justify-between">
          <div>
            <Select onValueChange={setLanguage} value={language}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder={language} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpp">Cpp</SelectItem>
                <SelectItem value="js">Js</SelectItem>
                <SelectItem value="ts">Ts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="px-3">
            <RotateCcw width={20} height={20} />
          </div>
        </div>
        <Editor
          height="100%"
          language={
            MONACO_LANGUAGE_MAPPING[
              language as keyof typeof MONACO_LANGUAGE_MAPPING
            ]
          }
          theme="vs-dark"
          value={editorState}
          onMount={formatCode}
          onChange={(value) => setEditorState(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            cursorStyle: "line",
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            parameterHints: {
              enabled: false,
            },
            wordBasedSuggestions: "off",
            renderValidationDecorations: "off",
            snippetSuggestions: "none",
            codeLens: false,
            contextmenu: false,
            colorDecorators: false,
            suggest: {
              showMethods: false,
              showFunctions: false,
              showConstructors: false,
              showFields: false,
              showVariables: false,
              showClasses: false,
              showStructs: false,
              showInterfaces: false,
              showModules: false,
              showProperties: false,
              showEvents: false,
              showOperators: false,
              showUnits: false,
              showValues: false,
              showConstants: false,
              showEnums: false,
              showEnumMembers: false,
              showKeywords: false,
              showWords: false,
              showColors: false,
              showFiles: false,
              showReferences: false,
              showFolders: false,
              showTypeParameters: false,
              showSnippets: false,
            },
          }}
        />
        <div className="absolute bottom-0 right-[10px] p-2">
          {!isSubmitted ? (
            <div className="flex items-center gap-5">
              <Button onClick={() => setShowAI(!showAI)}>Chat with AI</Button>
              <Button
                className="bg-bgSucess px-10 py-5 hover:bg-[#26a954] text-white"
                onClick={createSubmission}
              >
                Submit
              </Button>{" "}
            </div>
          ) : (
            <div>
              <Button className="bg-lightSubmit hover:bg-lightSubmit px-20 py-5">
                <p className="text-white">Pending...</p>
              </Button>
            </div>
          )}
        </div>
      </div>
      <ChatWithAI
        editorState={editorState}
        problemId={problemId}
        open={showAI}
        setOpen={setShowAI}
      />
    </>
  );
};

export default QuestionEditor;
