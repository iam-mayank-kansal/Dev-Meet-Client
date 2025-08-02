"use client";

import { useSearchParams } from "next/navigation";
import {
  Mic, MicOff, Video, VideoOff, Monitor,
  MonitorOff, MessageCircle, PhoneOff
} from "lucide-react";

import useMediaControls from "@/lib/mediaDevice";
import { io } from "socket.io-client";

export default function MeetingPage() {
  const searchParams = useSearchParams();
  const meetingId = searchParams.get("meetingId");

  const {
    micOn, camOn, screenShareOn,
    videoRef,
    toggleMic, toggleCam, toggleScreenShare
  } = useMediaControls();

  const socket = io("http://localhost:8080");

  socket.on("new-message", (data:any) => {
    console.log(data);
  });



  return (
    <section className="min-h-[680px] bg-black flex flex-col text-white">
      <div className="p-4 text-center border-b border-gray-700">
        <h2 className="text-lg font-semibold">
          Meeting ID: <span className="text-green-400">{meetingId}</span>
        </h2>
      </div>

      <div className="flex-1 flex items-center justify-center bg-black">
        {screenShareOn ? (
          <video
            ref={videoRef}
            className="rounded-lg w-full max-w-4xl h-full max-h-[80vh] bg-gray-800 object-contain"
            autoPlay muted playsInline
          />
        ) : camOn ? (
          <video
            ref={videoRef}
            className="rounded-lg w-[480px] h-[360px] bg-gray-800 object-cover"
            autoPlay muted playsInline
          />
        ) : (
          <div className="rounded-lg w-[480px] h-[360px] bg-gray-800 flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
              <VideoOff className="text-gray-400" size={48} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700 flex justify-center gap-6 bg-gray-900">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${micOn ? 'bg-gray-700' : 'bg-gray-800'}`}
        >
          {micOn ? <Mic className="text-white" /> : <MicOff className="text-red-500" />}
        </button>

        <button
          onClick={toggleCam}
          className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${camOn ? 'bg-gray-700' : 'bg-gray-800'}`}
          disabled={screenShareOn}
        >
          {camOn ? <Video className="text-white" /> : <VideoOff className="text-red-500" />}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${screenShareOn ? 'bg-red-500' : 'bg-gray-800'}`}
        >
          {screenShareOn ? <MonitorOff className="text-white" /> : <Monitor className="text-white" />}
        </button>

        <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 cursor-pointer">
          <MessageCircle className="text-white" />
        </button>

        <button className="bg-red-600 hover:bg-red-700 p-3 rounded-full cursor-pointer">
          <PhoneOff className="text-white" />
        </button>
      </div>
    </section>
  );
}
