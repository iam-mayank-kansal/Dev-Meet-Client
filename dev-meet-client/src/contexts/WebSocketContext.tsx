// src/contexts/WebSocketContext.tsx
"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// 1. Create the context with a default value
export const WebSocketContext = createContext<Socket | null>(null);

// 2. Create the Provider component
export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 3. Initialize the socket connection only on the client side
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    // 4. Clean up the connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []); // The empty dependency array ensures this runs only once

  // We only render children when the socket is connected
  if (!socket) {
    return null; // or a loading spinner
  }

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};