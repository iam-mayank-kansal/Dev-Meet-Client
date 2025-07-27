// hooks/useMediaControls.ts
import { useEffect, useRef, useState } from "react";

type UseMediaControlsResult = {
  micOn: boolean;
  camOn: boolean;
  screenShareOn: boolean;
  localStream: MediaStream | null;
  screenStream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement | null>; 
  toggleMic: () => void;
  toggleCam: () => void;
  toggleScreenShare: () => void;
};

export default function useMediaControls(): UseMediaControlsResult {
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [screenShareOn, setScreenShareOn] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      screenStream?.getTracks().forEach(track => track.stop());
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
        localStream?.getAudioTracks().forEach(track => track.stop());
        if (localStream?.getVideoTracks().length === 0) setLocalStream(null);
      }
      setMicOn(prev => !prev);
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
        localStream?.getVideoTracks().forEach(track => track.stop());
        if (localStream?.getAudioTracks().length === 0) setLocalStream(null);
        if (videoRef.current && !screenShareOn) videoRef.current.srcObject = null;
      }
      setCamOn(prev => !prev);
    } catch (error) {
      alert("Camera access denied.");
      console.error(error);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!screenShareOn) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        setScreenStream(stream);

        stream.getVideoTracks()[0].onended = () => {
          setScreenShareOn(false);
          setScreenStream(null);
          if (videoRef.current && camOn) {
            videoRef.current.srcObject = localStream;
          } else if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        };

        if (videoRef.current) videoRef.current.srcObject = stream;
      } else {
        screenStream?.getTracks().forEach(track => track.stop());
        setScreenStream(null);
        if (videoRef.current && camOn) {
          videoRef.current.srcObject = localStream;
        } else if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
      setScreenShareOn(prev => !prev);
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    if (screenShareOn && screenStream) {
      videoRef.current.srcObject = screenStream;
    } else if (camOn && localStream) {
      videoRef.current.srcObject = localStream;
    } else {
      videoRef.current.srcObject = null;
    }
  }, [localStream, screenStream, camOn, screenShareOn]);

  return {
    micOn,
    camOn,
    screenShareOn,
    localStream,
    screenStream,
    videoRef,
    toggleMic,
    toggleCam,
    toggleScreenShare
  };
}
