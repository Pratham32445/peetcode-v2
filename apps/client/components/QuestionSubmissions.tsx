import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import client from "@/db";
import { getServerSession } from "next-auth";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";

const getSubmissions = async (email: string, problemId: string) => {
  const user = await client.user.findFirst({ where: { email } });
  const submission = await client.submission.findMany({
    where: {
      userId: user?.Id,
      questionId: problemId,
      status: {
        not: "PENDING",
      },
    },
  });
  return submission;
};

const getColor = (type: string) => {
  if (type == "ACCEPTED") return "text-green-500";
  return "text-red-500";
};

const QuestionSubmissions = async ({ Id }: { Id: string }) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return;
  const submissions = await getSubmissions(session?.user?.email, Id);
  return (
    <ScrollArea
      className="mx-2 mt-5 overflow-hidden"
      style={{ height: "550px" }}
    >
      {submissions.length > 0 ? (
        submissions.reverse().map(({ Id, status }) => (
          <div key={Id} className="p-2 hover:bg-neutral-700 cursor-pointer">
            <div>
              <p className={`${getColor(status)}`}>{status}</p>
            </div>
            <div></div>
          </div>
        ))
      ) : (
        <div>
          <p>No Submissions Yet</p>
        </div>
      )}
    </ScrollArea>
  );
};

export default QuestionSubmissions;
