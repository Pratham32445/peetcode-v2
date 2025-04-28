"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const userProfileSidebar = [
  {
    title: "Profile",
    href: "/user/profile",
  },
  {
    title: "Account",
    href: "/user/account",
  },
  {
    title: "Badges",
    href: "/user/badges",
  },
  {
    title: "Reffaral",
    href: "/user/reffaral",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [setPath, setSetPath] = useState(
    pathname.split("/")[pathname.split("/").length - 1]
  );
  const changePath = (href : string) => {
    setSetPath(href);
    router.push(href);
  }
  return (
    <div className="w-full p-1 bg-[#1E1E1E] min-h-full rounded-lg">
      {userProfileSidebar.map(({ title, href }, idx) => (
        <div
          className="px-10 my-2 py-5 cursor-pointer  hover:bg-[#454545] rounded"
          style={{
            backgroundColor:
              title.toLowerCase() == setPath ? "#454545" : "transparent",
          }}
          key={idx}
          onClick={() => changePath(href)}
        >
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
