import client from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const body = await req.json();
  if (!body.email) return NextResponse.json({ message: "Please send email" });
  const user = await client.user.findFirst({
    where: {
      email: body.email,
    },
  });
  console.log(user);  
};

