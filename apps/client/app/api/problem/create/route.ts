import { Problem } from "@/types/zod";
import client from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

const publisher = new Redis(process.env.REDIS_URL!);

publisher.on("connect", () => {
  console.log("connected to redis successfully");
});

const Queue_name = "Push_Problems";

export const POST = async (req: NextRequest) => {
  try {
    //server work remaining
    const body = await req.json();
    const res = Problem.safeParse(body);
    if (!res.success)
      return NextResponse.json(
        { message: "errors", errors: res.error },
        { status: 401 }
      );
    const problem = await client.question.create({ data: res.data });
    if (problem) {
      const config = {
        Id: problem.Id,
        title: problem.title,
        structure: body.structure,
        testcases: body.testcases,
        solution: body.solution,
      };
      await publisher.lpush(Queue_name, JSON.stringify(config));
      return NextResponse.json(
        { messae: "Problem Created Successfully" },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: "Some error occured" },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Some error occured" },
      { status: 404 }
    );
  }
};
