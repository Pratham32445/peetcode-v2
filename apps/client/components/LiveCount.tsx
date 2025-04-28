"use client";
import React, { useEffect, useRef, useState } from "react";

const LiveCount = ({ Id }: { Id: string }) => {
  const [usersCount, setUsersCount] = useState(0);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(
        `${process.env.NEXT_PUBLIC_PRODUCTION_WEB_SOCKET!}?problemId=${Id}`
      );
      ws.current.onopen = () => {
        console.log("connected");
      };
      ws.current.onmessage = (event) => {
        const parsedata = JSON.parse(event.data);
        setUsersCount(parsedata.count);
      };
    };

    connectWebSocket();

    const handleBeforeUnload = () => {
      if (ws.current) {
        ws.current.send(
          JSON.stringify({
            type: "userDisconnect",
            payload: {
              problemId: Id,
            },
          })
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [Id]);

  return (
    <div className="absolute bottom-10 right-[30px]">
      <div className="gap-2 p-2 flex items-center">
        <div className="w-2 h-2 bg-[#2CBB5D] rounded-full"></div>
        <p>{usersCount} Online</p>
      </div>
    </div>
  );
};

export default LiveCount;
