import express, { Request, Response } from "express";
import cors from "cors";
import client from "./db/index"
import base64 from "base-64";
import { testCase } from "./zod";
import { calculateTimeMemory } from "./lib/submission";

const app = express();

const PORT = 5000;

app.use(express.json());

app.use(cors());

app.put("/api/submission-callback", async (req: Request, res: Response) => {
  try {
    if (req.body.status.id == 6 || req.body.status.id == 11) {
      const testCase = await client.testCase.findFirst({
        where: { token: req.body.token },
      });
      if (testCase?.status == "PENDING") {
        const res = await client.testCase.update({
          where: {
            token: req.body.token,
          },
          data: {
            status: req.body.status.description,
          },
        });
        const submission = await client.submission.findFirst({
          where: {
            Id: res.submissionId,
          },
        });
        if (submission?.status == "PENDING") {
          await client.submission.update({
            where: { Id: submission.Id },
            data: {
              status: "ERROR",
              errorType: req.body.status.description,
              message: req.body.compile_output
                ? base64.decode(req.body.compile_output)
                : "",
            },
          });
        }
      }
      return res.status(201).send("chill testcase");
    }
    if (req.body.status.id == 3) {
      const res = await client.testCase.update({
        where: { token: req.body.token },
        data: {
          status: "ACCEPTED",
          time: req.body.time,
          memory: String(req.body.memory),
        },
      });
      const allCases: any[] = await client.testCase.findMany({
        where: { submissionId: res.submissionId },
      });
      let isEvaluated = 0;
      for (let testcase of allCases) {
        if (testcase.status == "ACCEPTED") isEvaluated++;
      }
      if (isEvaluated == allCases.length) {
        const [totalTime, totalMemory] = calculateTimeMemory(allCases);
        console.log(totalMemory,totalTime);
        await client.submission.update({
          where: { Id: res.submissionId },
          data: {
            status: "ACCEPTED",
            memoryUsed: Number(totalMemory)/1024,
            time: Number(totalTime) * 1000,
            testCaseLength: allCases.length,
            acceptedtestCase: isEvaluated,
          },
        });
      }
    } else if (req.body.status.id == 4) {
      const submittedCount = 0;
      const testCase = await client.testCase.findFirst({
        where: { token: req.body.token },
      });
      let isEvaluated = 0;
      const allCases: any[] = await client.testCase.findMany({
        where: { submissionId: testCase?.submissionId },
      });
      for (let testcase of allCases) {
        if (testcase.status == "ACCEPTED") isEvaluated++;
      }
      console.log(testCase);
      const res = await client.submission.update({
        where: { Id: testCase?.submissionId! },
        data: {
          status: "WRONG_ANSWER",
          testCaseLength: allCases.length,
          acceptedtestCase: isEvaluated,
          expectedInput: testCase?.Input,
          expectedOutput: testCase?.output,
          userOutput: base64.decode(req.body.stdout),
        },
      });
    }
    return res.status(201).json({
      message: "send",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT);
