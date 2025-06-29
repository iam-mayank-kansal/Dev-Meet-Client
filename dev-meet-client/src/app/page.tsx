"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  // const videoRef1 = useRef<HTMLVideoElement>(null);
  // const videoRef2 = useRef<HTMLVideoElement>(null);

  // const getCameraAndAudioAccess = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //     setLocalStream(stream);
  //   } catch (err) {
  //     console.error("Error accessing media devices.", err);
  //   }
  // };

  // useEffect(() => {
  //   getCameraAndAudioAccess();
  // }, []);

  // useEffect(() => {
  //   if (localStream) {
  //     if (videoRef1.current) videoRef1.current.srcObject = localStream;
  //     if (videoRef2.current) videoRef2.current.srcObject = localStream;
  //   }
  // }, [localStream]);

  return (
    <section className="text-center min-h-[678px] bg-black border-2 flex items-center justify-center">
      <h1 className="mb-4 text-white text-8xl ">Dev Meet</h1>
   
    </section>
  );
}
