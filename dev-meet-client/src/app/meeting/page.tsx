"use client";

import { useSearchParams } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MessageCircle,
  PhoneOff
} from "lucide-react";
import { useState } from "react";

export default function MeetingPage() {
  const searchParams = useSearchParams();
  const meetingId = searchParams.get("meetingId");

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  return (
    <section className="min-h-[680px] bg-black flex flex-col text-white">
      {/* Top Bar */}
      <div className="p-4 text-center border-b border-gray-700">
        <h2 className="text-lg font-semibold">
          Meeting ID: <span className="text-green-400">{meetingId}</span>
        </h2>
      </div>

      {/* Main content area (camera/screen placeholder) */}
      <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
        {/* This is where the video/camera screen would go */}
        Video Stream Area
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-gray-700 flex justify-center gap-6 bg-gray-900">
        {/* Mic Toggle */}
        <button
          onClick={() => setMicOn(!micOn)}
          className="bg-gray-800 p-3 rounded-full hover:bg-gray-700"
        >
          {micOn ? <Mic className="text-white" /> : <MicOff className="text-red-500" />}
        </button>

        {/* Camera Toggle */}
        <button
          onClick={() => setCamOn(!camOn)}
          className="bg-gray-800 p-3 rounded-full hover:bg-gray-700"
        >
          {camOn ? <Video className="text-white" /> : <VideoOff className="text-red-500" />}
        </button>

        {/* Screen Share */}
        <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
          <Monitor className="text-white" />
        </button>

        {/* Chat */}
        <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
          <MessageCircle className="text-white" />
        </button>

        {/* Leave / Cut Call */}
        <button className="bg-red-600 hover:bg-red-700 p-3 rounded-full">
          <PhoneOff className="text-white" />
        </button>
      </div>
    </section>
  );
}
