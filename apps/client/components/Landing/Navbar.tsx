import Link from "next/link";
import React from "react";
import { FlameKindling } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";

const NavabarItems = [
  { name: "Explore", href: "/explore" },
  { name: "Problems", href: "/problems" },
  { name: "Discussion", href: "/discussion" },
  { name: "Interview", href: "/interview" },
];

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden bg-zinc-950/80 backdrop-blur transition will-change-auto md:block">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="flex items-center border-b border-b-white/5 py-5">
          <Link href="/problems" className="flex-1 flex items-center gap-3">
            <FlameKindling color="#FFA116" />
            <p className="text-white text-2xl">PeetCode</p>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-10 justify-center">
              {NavabarItems.map(({ name, href }, idx) => (
                <div
                  key={idx}
                  className="rounded-full px-4 py-2 opacity-60 hover:bg-white/5 hover:opacity-100"
                >
                  <Link href={href}>
                    <p className="flex">{name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-end">
              {session?.user ? (
                <div>
                  <Image
                    src={session.user.image!}
                    width={30}
                    height={30}
                    alt="user"
                    className="rounded-full cursor-pointer"
                  />
                </div>
              ) : (
                <div className="bg-[#423726] cursor-pointer transition rounded-full px-4 py-2">
                  <Link href={"/login"}>
                    <p className="text-[#FFA116]">Login</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
