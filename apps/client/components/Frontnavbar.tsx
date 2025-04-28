"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FlameKindling } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const navbarItems = [
  { name: "Problems", href: "/problems" },
  { name: "Contest", href: "/contests" },
  { name: "Discuss", href: "/discussion" },
  { name: "Interview", href: "/interview" },
  { name: "About Us", href: "/about-us" },
];

const Frontnavbar = () => {
  const [selectedState, setSelectedState] = useState("Problems");
  const session = useSession();
  return (
    <div className="bg-[#282828] flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link href={"/"} className="p-4">
          <FlameKindling color="#FFA116" width={30} height={30} />
        </Link>
        <div className="flex mx-10 gap-10">
          {navbarItems.map(({ name, href }, idx) => (
            <div
              key={idx}
              className={`p-4 cursor-pointer ${
                selectedState === name
                  ? "border-b-4 border-white"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedState(name)}
            >
              <Link href={href}>
                <p>{name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        {session.data?.user?.image && (
          <Link href={"/user/profile"}>
            <Image
              src={session.data?.user?.image}
              width={35}
              height={35}
              className="rounded-full"
              alt="profile" 
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Frontnavbar;
