import { fetchSubmissionResult } from "@/lib/submission";
import { useContext, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { LoaderCircle } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { MainContext } from "@/context/State";

const SubmissionResult = ({ submissionId }: { submissionId: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [submission, setSubmission] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isProblemSubmitted, setIsProblemSubmitted } = useContext(MainContext);
  useEffect(() => {
    const fetchResult = async () => {
      const res = await fetchSubmissionResult(submissionId, "submission");
      if (res) {
        setSubmission(res.submission);
        setIsLoading(false);
      }
    };
    fetchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customStyle = {
    ...docco,
    hljs: {
      ...docco.hljs,
      background: "#333333",
      color: "#D4D4D4",
      padding: "1.5rem",
      borderRadius: "0.5rem",
      fontSize: "18px",
      lineHeight: "1.5",
    },
    "hljs-keyword": { color: "#569CD6" },
    "hljs-string": { color: "#CE9178" },
    "hljs-number": { color: "#B5CEA8" },
    "hljs-function": { color: "#DCDCAA" },
    "hljs-comment": { color: "#6A9955" },
    "hljs-variable": { color: "#9CDCFE" },
    "hljs-built_in": { color: "#4EC9B0" },
    "hljs-params": { color: "#E06C75" },
    "hljs-attr": { color: "#E06C75" },
  };

  return (
    <ScrollArea className="h-[90vh]">
      {!isLoading && submission ? (
        <div className="px-10 py-4">
          <div
            className="py-3 cursor-pointer"
            onClick={() =>
              setIsProblemSubmitted({ ...isProblemSubmitted, status: false })
            }
          >
            <ArrowLeft />
          </div>
          <div className="flex items-top justify-between">
            <div className="flex items-top gap-3">
              {submission.status == "WRONG_ANSWER" && (
                <div>
                  <p className="text-red-700 text-2xl">Wrong Answer</p>
                </div>
              )}
              {submission.status == "ERROR" && (
                <div>
                  <p className="text-red-400 text-2xl">
                    {submission.errorType}
                  </p>
                </div>
              )}
              {submission.status == "ACCEPTED" && (
                <div>
                  <p className="text-bgSucess text-xl font-medium">Accepted</p>
                </div>
              )}
              {(submission.status == "ACCEPTED" ||
                submission.status == "WRONG_ANSWER") && (
                <div>
                  <p className="text-sm text-neutral-400">
                    {submission.acceptedtestCase} / {submission.testCaseLength}{" "}
                    testcases passed
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-sm items-center">Pratham Mehta</p>
                    <p className="text-xs text-neutral-400">
                      submitted at Dec 21, 2024 09:02
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-5">
              <Button className="px-10 py-4 bg-lightSubmit text-white">
                Editorial
              </Button>
              <Button className="bg-bgSucess px-10 py-4 text-white">
                Solution
              </Button>
            </div>
          </div>
          {submission.status == "WRONG_ANSWER" && (
            <div className="my-3">
              <p>Input:</p>
              {submission.expectedInput.map((Input: string) => (
                <div
                  className="bg-[#333333] p-4 my-3 rounded"
                  key={Math.random()}
                >
                  <div>
                    <p>{Input}</p>
                  </div>
                </div>
              ))}
              <p>Output:</p>
              <div className="bg-[#362b2a] p-4 my-3 rounded">
                <div>
                  <p>{submission.userOutput}</p>
                </div>
              </div>
              <p>Expected Output:</p>
              <div className="p-4 bg-[#333333] my-3 rounded">
                <div>
                  <p>{submission.expectedOutput}</p>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6">
            {submission.status == "ERROR" && (
              <div className="bg-[#362b2a] p-5 py-10 rounded">
                <div>
                  <p className="text-red-400">{submission.message}</p>
                </div>
              </div>
            )}
            {(submission.status == "ACCEPTED" ||
              submission.status == "WRONG_ANSWER") && (
              <SyntaxHighlighter
                language="cpp"
                style={customStyle}
                className="shadow-lg"
                showLineNumbers={true}
                wrapLines={true}
              >
                {submission.code}
              </SyntaxHighlighter>
            )}
          </div>
          <div className="my-6">
            <Textarea
              placeholder="Write your Notes Here..."
              className="bg-[#333333] h-[300px] text-[20px] p-5"
            />
          </div>
        </div>
      ) : (
        <div className="h-[70vh]">
          <div className="flex h-full justify-center items-center">
            <LoaderCircle className="animate-spin" />
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default SubmissionResult;
