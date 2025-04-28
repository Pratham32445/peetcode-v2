import { NextResponse } from "next/server";
import client from "@/db/index"

export const GET = async () => {
  try {
    const res = await client.question.findMany({});
    return NextResponse.json({ problems: res || [] }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
