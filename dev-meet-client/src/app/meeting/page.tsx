// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import {
//   Mic,
//   MicOff,
//   Video,
//   VideoOff,
//   Monitor,
//   MonitorOff,
//   MessageCircle,
//   PhoneOff,
// } from "lucide-react";

// import useMediaControls from "@/lib/mediaDevice";
// import { io, Socket } from "socket.io-client";

// export default function MeetingPage() {
//   const searchParams = useSearchParams();
//   const meetingId = searchParams.get("meetingId") || "default-room";

//   // Your existing media controls hook:
//   const {
//     micOn,
//     camOn,
//     screenShareOn,
//     videoRef, // ref for your local video element
//     toggleMic,
//     toggleCam,
//     toggleScreenShare,
//   } = useMediaControls();

//   // Socket and WebRTC refs/state
//   const socketRef = useRef<Socket | null>(null);
//   const localStream = useRef<MediaStream | null>(null);
//   const peersRef = useRef<
//     Map<string, { peerConnection: RTCPeerConnection; stream: MediaStream }>
//   >(new Map());

//   // State for remote peer streams to trigger UI render
//   const [peerStreams, setPeerStreams] = useState<
//     { id: string; stream: MediaStream }[]
//   >([]);

//   // ICE servers for WebRTC (Google STUN)
//   const iceServers = {
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   };

//   useEffect(() => {
//     async function init() {
//       try {
//         // Get local media stream using navigator.mediaDevices
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         localStream.current = stream;

//         // Attach local stream to your existing videoRef (local video element)
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Error accessing media devices:", err);
//       }

//       // Connect to signaling server
//       socketRef.current = io("http://localhost:8080", {
//         withCredentials: true,
//       });

//       socketRef.current.on("connect", () => {
//         console.log("Connected to signaling server:", socketRef.current?.id);

//         // Join the meeting room
//         socketRef.current?.emit("join-room", meetingId);
//       });

//       // List of existing users in room when you join
//       socketRef.current.on("all-users", (users: string[]) => {
//         users.forEach((userID) => {
//           createPeerConnection(userID, true);
//         });
//       });

//       // When new user joins after you
//       socketRef.current.on("user-joined", (userID: string) => {
//         createPeerConnection(userID, false);
//       });

//       // When a user leaves room
//       socketRef.current.on("user-left", (userID: string) => {
//         removePeer(userID);
//       });

//       // Receive WebRTC signaling data (offer/answer/candidate)
//       socketRef.current.on(
//         "signal",
//         async (data: { from: string; signal: any }) => {
//           const { from, signal } = data;
//           const pcData = peersRef.current.get(from);
//           if (!pcData) {
//             console.warn("No peer connection found for user", from);
//             return;
//           }
//           const pc = pcData.peerConnection;

//           if (signal.type === "offer") {
//             await pc.setRemoteDescription(new RTCSessionDescription(signal));
//             const answer = await pc.createAnswer();
//             await pc.setLocalDescription(answer);

//             socketRef.current?.emit("signal", {
//               to: from,
//               from: socketRef.current?.id,
//               signal: pc.localDescription,
//             });
//           } else if (signal.type === "answer") {
//             await pc.setRemoteDescription(new RTCSessionDescription(signal));
//           } else if (signal.candidate) {
//             try {
//               await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
//             } catch (e) {
//               console.error("Error adding ICE candidate", e);
//             }
//           }
//         }
//       );
//     }

//     init();

//     return () => {
//       socketRef.current?.disconnect();
//       peersRef.current.forEach(({ peerConnection }) => {
//         peerConnection.close();
//       });
//       peersRef.current.clear();
//       setPeerStreams([]);
//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }
//     };
//   }, [meetingId, videoRef]);

//   // Function to create RTCPeerConnection and handle WebRTC signaling
//   function createPeerConnection(userID: string, isInitiator: boolean) {
//     if (!socketRef.current) return;
//     if (!localStream.current) return;
//     if (peersRef.current.has(userID)) return;

//     const peerConnection = new RTCPeerConnection(iceServers);

//     localStream.current.getTracks().forEach((track) => {
//       peerConnection.addTrack(track, localStream.current!);
//     });

//     const remoteStream = new MediaStream();

//     peerConnection.ontrack = (event) => {
//       event.streams[0].getTracks().forEach((track) => {
//         remoteStream.addTrack(track);
//       });

//       setPeerStreams((prev) => {
//         const exists = prev.find((p) => p.id === userID);
//         if (exists) {
//           return prev.map((p) =>
//             p.id === userID ? { id: userID, stream: remoteStream } : p
//           );
//         } else {
//           return [...prev, { id: userID, stream: remoteStream }];
//         }
//       });
//     };

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socketRef.current?.emit("signal", {
//           to: userID,
//           from: socketRef.current?.id,
//           signal: { candidate: event.candidate },
//         });
//       }
//     };

//     peersRef.current.set(userID, { peerConnection, stream: remoteStream });

//     if (isInitiator) {
//       peerConnection
//         .createOffer()
//         .then((offer) => peerConnection.setLocalDescription(offer))
//         .then(() => {
//           socketRef.current?.emit("signal", {
//             to: userID,
//             from: socketRef.current?.id,
//             signal: peerConnection.localDescription,
//           });
//         })
//         .catch((err) => console.error(err));
//     }
//   }

//   // Remove peer on disconnect
//   function removePeer(userID: string) {
//     const pcData = peersRef.current.get(userID);
//     if (pcData) {
//       pcData.peerConnection.close();
//       peersRef.current.delete(userID);
//       setPeerStreams((prev) => prev.filter((p) => p.id !== userID));
//     }
//   }

//   // Add your existing button handlers here, unchanged
//   // (You already have toggleMic, toggleCam etc from useMediaControls)

//   // Button to send a test message — you can integrate your existing message button if you want
//   // For example, you can emit "new-message" here if desired

//   return (
//     <section className="min-h-[680px] bg-black flex flex-col text-white">
//       <div className="p-4 text-center border-b border-gray-700">
//         <h2 className="text-lg font-semibold">
//           Meeting ID: <span className="text-green-400">{meetingId}</span>
//         </h2>
//       </div>

//       <div className="flex-1 flex flex-wrap gap-4 items-center justify-center bg-black">
//         {/* Your local video */}
//         {screenShareOn ? (
//           <video
//             ref={videoRef}
//             className="rounded-lg w-full max-w-4xl h-full max-h-[80vh] bg-gray-800 object-contain"
//             autoPlay
//             muted
//             playsInline
//           />
//         ) : camOn ? (
//           <video
//             ref={videoRef}
//             className="rounded-lg w-[480px] h-[360px] bg-gray-800 object-cover"
//             autoPlay
//             muted
//             playsInline
//           />
//         ) : (
//           <div className="rounded-lg w-[480px] h-[360px] bg-gray-800 flex items-center justify-center">
//             <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
//               <VideoOff className="text-gray-400" size={48} />
//             </div>
//           </div>
//         )}

//         {/* Remote peers videos */}
//         {peerStreams.map(({ id, stream }) => (
//           <video
//             key={id}
//             className="rounded-lg w-[320px] h-[240px] bg-gray-800 object-cover"
//             autoPlay
//             playsInline
//             ref={(el) => {
//               if (el) el.srcObject = stream;
//             }}
//           />
//         ))}
//       </div>

//       <div className="p-4 border-t border-gray-700 flex justify-center gap-6 bg-gray-900">
//         <button
//           onClick={toggleMic}
//           className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${
//             micOn ? "bg-gray-700" : "bg-gray-800"
//           }`}
//         >
//           {micOn ? <Mic className="text-white" /> : <MicOff className="text-red-500" />}
//         </button>

//         <button
//           onClick={toggleCam}
//           className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${
//             camOn ? "bg-gray-700" : "bg-gray-800"
//           }`}
//           disabled={screenShareOn}
//         >
//           {camOn ? <Video className="text-white" /> : <VideoOff className="text-red-500" />}
//         </button>

//         <button
//           onClick={toggleScreenShare}
//           className={`p-3 rounded-full hover:bg-gray-700 cursor-pointer ${
//             screenShareOn ? "bg-red-500" : "bg-gray-800"
//           }`}
//         >
//           {screenShareOn ? <MonitorOff className="text-white" /> : <Monitor className="text-white" />}
//         </button>

//         <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 cursor-pointer">
//           <MessageCircle className="text-white" />
//         </button>

//         <button className="bg-red-600 hover:bg-red-700 p-3 rounded-full cursor-pointer">
//           <PhoneOff className="text-white" />
//         </button>
//       </div>
//     </section>
//   );
// }

export default function LoginForm() {
  return (
    <div className="bg-black h-[90vh] flex items-center justify-center">
      <h1 className="text-white text-5xl">Meeting JOINED</h1>
    </div>
  );
}