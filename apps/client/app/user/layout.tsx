import { FlameKindling } from "lucide-react";
import Link from "next/link";
import React from "react";
import Sidebar from "./Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-[20px]">
      <Link
        href={"/"}
        className="absolute top-5 flex-1 flex items-center gap-3 p-4"
      >
        <FlameKindling color="#FFA116" />
        <p className="text-white text-2xl">PeetCode</p>
      </Link>
      <div className="mt-16"></div>
      <div className="w-3/4 h-full m-auto flex gap-5">
        <div className="w-1/3 p-10 bg-[#1E1E1E] min-h-full rounded-lg">
          <Sidebar />
        </div>
        <div className="w-2/3 bg-[#1E1E1E] rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default layout;
