"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PreJoinPage() {
  const router = useRouter();

  const [meetingName, setMeetingName] = useState("");
  const [userName, setUserName] = useState("");

  const [cameraGranted, setCameraGranted] = useState(false);
  const [micGranted, setMicGranted] = useState(false);

  const [cameraErr, setCameraErr] = useState("");
  const [micErr, setMicErr] = useState("");
  const [formErr, setFormErr] = useState("");

  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [checkingCam, setCheckingCam] = useState(false);
  const [checkingMic, setCheckingMic] = useState(false);

  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  async function requestCamera() {
    setCameraErr("");
    setCheckingCam(true);
    try {
      const camStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraGranted(true);
      setPreviewStream(camStream);
      setCheckingCam(false);
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = camStream;
      }
    } catch (e) {
      setCameraErr("Camera access denied.");
      setCameraGranted(false);
      setCheckingCam(false);
      console.log("Camera access error:", e);
      if (videoPreviewRef.current) {  
        videoPreviewRef.current.srcObject = null; // Clear the video element if access is denied
      }
    }
  }

  async function requestMic() {
    setMicErr("");
    setCheckingMic(true);
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicGranted(true);
      setCheckingMic(false);
      // Clean up mic-only stream (don't keep hanging open)
      micStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      setMicErr("Microphone access denied.");
      setMicGranted(false);
      setCheckingMic(false);
      console.log("Microphone access error:", e);
      
    }
  }

  function handleJoinClick() {
    setFormErr("");
    if (!meetingName.trim()) {
      setFormErr("Enter a meeting name.");
      return;
    }
    if (!userName.trim()) {
      setFormErr("Enter your name.");
      return;
    }
    if (!cameraGranted) {
      setFormErr("Allow camera access before joining.");
      return;
    }
    if (!micGranted) {
      setFormErr("Allow microphone access before joining.");
      return;
    }
    router.push(
      `/meeting?meetingId=${encodeURIComponent(
        meetingName
      )}&userName=${encodeURIComponent(userName)}`
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-850 rounded-xl shadow-xl p-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">
          Join a Meeting
        </h1>


        {/* SEPARATE PERMISSION BUTTONS */}
        <div className="mb-5 space-y-1 flex flex-col items-center">
          <div className="flex gap-2 justify-center">
            <button
              onClick={requestCamera}
              disabled={cameraGranted || checkingCam}
              className={`px-6 py-2 rounded font-semibold shadow ${
                cameraGranted
                  ? "bg-green-700 text-white cursor-not-allowed"
                  : checkingCam
                  ? "bg-blue-900 text-blue-200 cursor-wait"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {cameraGranted
                ? "Camera ✓"
                : checkingCam
                ? "Requesting…"
                : "Allow Camera"}
            </button>
            <button
              onClick={requestMic}
              disabled={micGranted || checkingMic}
              className={`px-6 py-2 rounded font-semibold shadow ${
                micGranted
                  ? "bg-green-700 text-white cursor-not-allowed"
                  : checkingMic
                  ? "bg-blue-900 text-blue-200 cursor-wait"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {micGranted
                ? "Microphone ✓"
                : checkingMic
                ? "Requesting…"
                : "Allow Microphone"}
            </button>
          </div>
          <span className="text-xs text-green-400">
            {cameraGranted && micGranted ? "Permissions granted!" : ""}
          </span>
        </div>

        {cameraErr && (
          <div className="text-red-400 text-center font-semibold my-1 animate-shake">
            {cameraErr}
          </div>
        )}
        {micErr && (
          <div className="text-red-400 text-center font-semibold my-1 animate-shake">
            {micErr}
          </div>
        )}

        {/* LIVE CAMERA PREVIEW */}
        <div className="flex flex-col items-center mb-6">
          <div
            className={`transition-all border-2 mb-1 ${
              cameraGranted
                ? "border-green-400 bg-black"
                : "border-gray-600 bg-gray-900"
            } rounded-lg w-48 h-36 flex items-center justify-center`}
          >
            {cameraGranted && previewStream ? (
              <video
                ref={videoPreviewRef}
                autoPlay
                muted
                playsInline
                className="rounded-lg object-cover w-full h-full"
                style={{
                  background: "#222",
                  transition: "box-shadow 0.3s",
                }}
              />
            ) : (
              <span className="text-gray-500 text-lg text-center px-3">
                Camera Preview
              </span>
            )}
          </div>
          {cameraGranted && <span className="text-xs text-gray-300">Live preview from your camera</span>}
        </div>

        {/* DETAILS FORM */}
        <div className="space-y-4 mb-2">
          <div>
            <label
              htmlFor="meeting"
              className="block mb-1 font-semibold text-gray-200"
            >
              Meeting Name
            </label>
            <input
              id="meeting"
              type="text"
              className="w-full rounded px-3 py-2 bg-gray-800 border border-gray-600 focus:border-blue-500 outline-none transition-all text-white"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              placeholder="Enter Meeting Name"
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="user"
              className="block mb-1 font-semibold text-gray-200"
            >
              Your Name
            </label>
            <input
              id="user"
              type="text"
              className="w-full rounded px-3 py-2 bg-gray-800 border border-gray-600 focus:border-blue-500 outline-none transition-all text-white"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </div>
        </div>

        {formErr && (
          <div className="text-red-400 font-semibold text-center mt-3 animate-shake">
            {formErr}
          </div>
        )}

        <button
          onClick={handleJoinClick}
          className={`w-full bg-green-600 hover:bg-green-700 rounded py-2 font-bold mt-5 transition-colors shadow-lg 
            ${!(cameraGranted && micGranted) ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!(cameraGranted && micGranted)}
        >
          Join Meeting
        </button>
      </div>

      <style jsx global>{`
        .bg-gray-850 {
          background: #1a1d23;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes shake {
          10%,90%{transform:translate3d(-2px,0,0)}
          20%,80%{transform:translate3d(4px,0,0)}
          30%,50%,70%{transform:translate3d(-8px,0,0)}
          40%,60%{transform:translate3d(8px,0,0)}
        }
        .animate-shake {
          animation: shake 0.35s;
        }
      `}</style>
    </div>
  );
}
