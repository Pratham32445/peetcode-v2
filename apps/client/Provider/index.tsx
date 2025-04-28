"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import State from "@/context/State";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <State>{children}</State>
    </SessionProvider>
  );
};

export default Provider;
