import { FlameKindling } from "lucide-react";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;
  return (
    <div className="p-3 flex items-center justify-between">
      <div className="px-5">
        <Link href={"/problems"} className="flex-1 flex items-center gap-3">
          <FlameKindling color="#FFA116" width={30} height={30} />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Link href={"/user/profile"}>
          <Image
            src={session.user.image!}
            width={30}
            height={30}
            alt="user"
            className="rounded-full cursor-pointer"
          />
        </Link>
        <Button className="bg-[#423726] hover:bg-[#423726] text-[#FFA116]">
          Premium
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
