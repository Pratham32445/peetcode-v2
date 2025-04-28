"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { SYSTEM_PROMPT } from "@/lib/Prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ScrollArea } from "./ui/scroll-area";

interface Content {
  role: string;
  parts: string[];
}

const ChatWithAI = ({
  open,
  setOpen,
  problemId,
  editorState,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  problemId: string;
  editorState: string;
}) => {
  const [conversation, setConversation] = useState<Content[]>([]);
  const [startTalk, setStartTalk] = useState(false);
  const [userprompt, setUserprompt] = useState("");

  const startConversation = async () => {
    setStartTalk(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/problem/${problemId}`
      );
      if (data) {
        const problem = data;
        const fullproblem = `${problem.title}\n${problem.desc}\n${problem.example}\n${problem.topics}`;
        const systemPromptModified = SYSTEM_PROMPT.replace(
          "{{problem_statement}}",
          fullproblem
        )
          .replace("{{user_code}}", editorState)
          .replace("{{programming_language}}", "c++");

        await callAI(systemPromptModified, [
          { role: "user", parts: [systemPromptModified] },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch problem details:", error);
    }
  };

  const callAI = async (prompt: string, history: Content[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY!;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      const formattedHistory =
        history.length > 0 && history[0].role === "user"
          ? history.map((item) => ({
              role: item.role,
              parts: [{ text: item.parts.join(" ") }],
            }))
          : [{ role: "user", parts: [{ text: prompt }] }];

      const chatSession = model.startChat({
        generationConfig,
        history: formattedHistory,
      });

      const result = await chatSession.sendMessage(prompt);
      const responseText =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (responseText) {
        setConversation((prev) => [
          ...prev,
          { role: "AI", parts: [responseText] },
        ]);
      }
    } catch (error) {
      console.error("AI call failed:", error);
    }
  };

  const handleSend = async () => {
    if (userprompt.trim() === "") return;

    const newConversation: Content[] = conversation.length
      ? [...conversation, { role: "user", parts: [userprompt] }]
      : [{ role: "user", parts: [userprompt] }];

    setConversation(newConversation);

    await callAI(userprompt, newConversation);
    setUserprompt("");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Talk with AI</SheetTitle>
          <SheetDescription>
            We highly recommend you ask hints from the AI, not the full
            solution. This will help you improve your problem-solving skills.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          {conversation.length > 0 ? (
            <ScrollArea className="conversation-box h-[400px] p-4">
              {conversation.map((line, index) => (
                <div
                  key={`${line.role}-${index}`}
                  className={`${line.role == "AI" ? "bg-neutral-600 " : "bg-blue-600"} rounded p-4 my-2`}
                >
                  <p>{line.parts[0]}</p>
                </div>
              ))}
            </ScrollArea>
          ) : !startTalk ? (
            <div className="flex justify-center flex-col items-center mt-28 gap-5">
              <Button
                className="bg-[#FFA116] hover:bg-[#FFA116]"
                onClick={startConversation}
              >
                Start Conversation
              </Button>
              <SheetDescription>
                <p>
                  This feature is free for limited purposes. If you want to use
                  it for a lifetime, please upgrade your account or provide your{" "}
                  <Link className="underline" href={"/user/account"}>
                    API Key
                  </Link>
                  .
                </p>
              </SheetDescription>
            </div>
          ) : null}
          {startTalk && (
            <div className="flex flex-col gap-4 mt-4">
              <Textarea
                value={userprompt}
                onChange={(e) => setUserprompt(e.target.value)}
                placeholder="Type your question here..."
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatWithAI;
