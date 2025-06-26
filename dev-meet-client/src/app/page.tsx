"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const getCameraAndAudioAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  useEffect(() => {
    getCameraAndAudioAccess();
  }, []);

  useEffect(() => {
    if (localStream) {
      if (videoRef1.current) videoRef1.current.srcObject = localStream;
      if (videoRef2.current) videoRef2.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <div className="text-center min-h-[600px] border-2">
      <h1 className="text-xl mb-4">Dev Meet</h1>
      <div className="flex gap-5 h-[500px] w-[90%] m-auto">
        <video ref={videoRef1} autoPlay playsInline className="bg-black w-[50%] h-full" />
        <video ref={null} autoPlay playsInline className="bg-black w-[50%] h-full" />
      </div>
    </div>
  );
}
