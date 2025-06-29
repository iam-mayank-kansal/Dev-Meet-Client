"use client";

import { useSearchParams } from "next/navigation";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    Monitor,
    MonitorOff,
    MessageCircle,
    PhoneOff
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function MeetingPage() {
    const searchParams = useSearchParams();
    const meetingId = searchParams.get("meetingId");

    const [micOn, setMicOn] = useState(false);
    const [camOn, setCamOn] = useState(false);
    const [screenShareOn, setScreenShareOn] = useState(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);

    // Cleanup function
    useEffect(() => {
        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (screenStream) {
                screenStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [localStream, screenStream]);

    const toggleMic = async () => {
        try {
            if (!micOn) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (localStream) {
                    localStream.getAudioTracks().forEach(track => track.stop());
                    stream.getAudioTracks().forEach(track => localStream.addTrack(track));
                } else {
                    setLocalStream(stream);
                }
            } else {
                if (localStream) {
                    localStream.getAudioTracks().forEach(track => track.stop());
                    if (localStream.getVideoTracks().length === 0) {
                        setLocalStream(null);
                    }
                }
            }
            setMicOn(!micOn);
        } catch (error) {
            alert("Mic access denied.");
            console.error(error);
        }
    };

    const toggleCam = async () => {
        try {
            if (!camOn) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                
                if (localStream) {
                    localStream.getVideoTracks().forEach(track => track.stop());
                    stream.getVideoTracks().forEach(track => localStream.addTrack(track));
                } else {
                    setLocalStream(stream);
                }
                
                if (videoRef.current && !screenShareOn) {
                    videoRef.current.srcObject = localStream || stream;
                }
            } else {
                if (localStream) {
                    localStream.getVideoTracks().forEach(track => track.stop());
                    if (localStream.getAudioTracks().length === 0) {
                        setLocalStream(null);
                    }
                }
                
                if (videoRef.current && !screenShareOn) {
                    videoRef.current.srcObject = null;
                }
            }
            setCamOn(!camOn);
        } catch (error) {
            alert("Camera access denied.");
            console.error(error);
        }
    };

    const toggleScreenShare = async () => {
        try {
            if (!screenShareOn) {
                // Get screen share stream
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true // You can set this to false if you don't want to share audio
                });
                
                setScreenStream(stream);
                
                // Handle when user stops screen sharing from browser controls
                stream.getVideoTracks()[0].onended = () => {
                    setScreenShareOn(false);
                    setScreenStream(null);
                    if (videoRef.current && camOn) {
                        videoRef.current.srcObject = localStream;
                    } else if (videoRef.current) {
                        videoRef.current.srcObject = null;
                    }
                };
                
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } else {
                // Stop screen sharing
                if (screenStream) {
                    screenStream.getTracks().forEach(track => track.stop());
                    setScreenStream(null);
                }
                
                if (videoRef.current && camOn) {
                    videoRef.current.srcObject = localStream;
                } else if (videoRef.current) {
                    videoRef.current.srcObject = null;
                }
            }
            setScreenShareOn(!screenShareOn);
        } catch (error) {
            console.error("Error sharing screen:", error);
        }
    };

    // Update video element when stream changes
    useEffect(() => {
        if (videoRef.current) {
            if (screenShareOn && screenStream) {
                videoRef.current.srcObject = screenStream;
            } else if (camOn && localStream) {
                videoRef.current.srcObject = localStream;
            } else {
                videoRef.current.srcObject = null;
            }
        }
    }, [localStream, screenStream, camOn, screenShareOn]);

    return (
        <section className="min-h-[680px] bg-black flex flex-col text-white">
            {/* Top Bar */}
            <div className="p-4 text-center border-b border-gray-700">
                <h2 className="text-lg font-semibold">
                    Meeting ID: <span className="text-green-400">{meetingId}</span>
                </h2>
            </div>

            {/* Video Preview Area */}
            <div className="flex-1 flex items-center justify-center bg-black">
                {screenShareOn ? (
                    <video
                        ref={videoRef}
                        className="rounded-lg w-full max-w-4xl h-full max-h-[80vh] bg-gray-800 object-contain"
                        autoPlay
                        muted
                        playsInline
                    />
                ) : camOn ? (
                    <video
                        ref={videoRef}
                        className="rounded-lg w-[480px] h-[360px] bg-gray-800 object-cover"
                        autoPlay
                        muted
                        playsInline
                    />
                ) : (
                    <div className="rounded-lg w-[480px] h-[360px] bg-gray-800 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                            <VideoOff className="text-gray-400" size={48} />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="p-4 border-t border-gray-700 flex justify-center gap-6 bg-gray-900">
                {/* Mic Toggle */}
                <button
                    onClick={toggleMic}
                    className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${micOn ? 'bg-gray-700' : 'bg-gray-800'}`}
                >
                    {micOn ? <Mic className="text-white" /> : <MicOff className="text-red-500" />}
                </button>

                {/* Camera Toggle */}
                <button
                    onClick={toggleCam}
                    className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${camOn ? 'bg-gray-700' : 'bg-gray-800'}`}
                    disabled={screenShareOn}
                >
                    {camOn ? <Video className="text-white" /> : <VideoOff className="text-red-500" />}
                </button>

                {/* Screen Share Toggle */}
                <button
                    onClick={toggleScreenShare}
                    className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${screenShareOn ? 'bg-red-500' : 'bg-gray-800'}`}
                >
                    {screenShareOn ? <MonitorOff className="text-white" /> : <Monitor className="text-white" />}
                </button>

                {/* Chat */}
                <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 cursor-pointer">
                    <MessageCircle className="text-white" />
                </button>

                {/* Leave / Cut Call */}
                <button className="bg-red-600 hover:bg-red-700 p-3 rounded-full cursor-pointer">
                    <PhoneOff className="text-white" />
                </button>
            </div>
        </section>
    );
}   