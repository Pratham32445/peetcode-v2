import client from "@/db/index"
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const res = await client.submission.findFirst({ where: { Id: body.Id } });
    if (body.request == "status")
      return NextResponse.json({ status: res?.status }, { status: 201 });
    else return NextResponse.json({ submission: res }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ status: error }, { status: 401 });
  }
};
