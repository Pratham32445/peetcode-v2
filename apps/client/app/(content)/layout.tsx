import Frontnavbar from "@/components/Frontnavbar";
import React, { ReactNode } from "react";
import Companies from "./companies";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-lightBg w-full min-h-screen">
      <Frontnavbar />
      <Companies/>
      {children}
    </div>
  );
};

export default Layout;
