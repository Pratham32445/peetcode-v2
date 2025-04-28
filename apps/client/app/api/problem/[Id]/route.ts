import client from "@/db/index"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.nextUrl);
    const Id = url.pathname.split("/")[url.pathname.split("/").length - 1];
    if (Id) {
      const problem = await client.question.findFirst({ where: { Id } });
      if (problem) return NextResponse.json({ problem }, { status: 201 });
    }
    return NextResponse.json({ message: "Problem not Found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Internal server Error" }, { status: 500 });
  }
};
