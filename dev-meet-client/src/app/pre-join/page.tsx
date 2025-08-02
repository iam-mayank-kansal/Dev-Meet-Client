"use client";
import { WebSocketContext } from "@/contexts/WebSocketContext";
import { useContext, useEffect } from "react";

export default function PreJoinPage() {
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    // on connecting
    socket?.on("connect", () => {
      console.log("Connected Succesfully");
    });

    // on running on Message Event
    socket?.on("new-message", (data) => {
      console.log("new-message Event Recieved");
      console.log("Data : ", data);
    });

    // cleanup - if we don't do this duplicates events may subscribe multiple times
    return () => {
      console.log("Unregistering Events ...");
      socket?.off("connect");
      // ✅ CORRECTED THIS LINE
      socket?.off("new-message");
    };
  }, []); // The empty array still correctly ensures this logic runs on mount/unmount

  return (
    <div>
      <h1>Pre Join Page</h1>
    </div>
  );
}