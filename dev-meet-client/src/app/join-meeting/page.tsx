"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 

type InputDataType = {
  meetingId: string;
  name: string;
  email: string;
  password: string;
};

export default function JoinMeetingPage() {
  const [inputData, setInputData] = useState<InputDataType>({
    meetingId: "1234",
    name: "admin",
    email: "admin@gmail.com",
    password: "admin@123"
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleJoin = () => {
    if (inputData.meetingId.trim()) {
      // ✅ Navigate with query param
      router.push(`/meeting?meetingId=${encodeURIComponent(inputData.meetingId.trim())}`);
    } else {
      alert("Please enter a valid Meeting ID");
    }
  };

  return (
    <section className="text-center min-h-[678px] bg-black border-2 flex items-center justify-center ">
      <div className="border-2 border-white flex flex-col gap-2 p-5 px-3 bg-white text-black rounded-md min-w-[360px]">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter Meeting ID"
            name="meetingId"
            value={inputData.meetingId}
            className="border-gray-800 border-1 p-2 w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={inputData.name}
            className="border-gray-800 border-1 p-2 w-full"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={inputData.email}
            className="border-gray-800 border-1 p-2 w-full"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Meeting Password"
            name="password"
            value={inputData.password}
            className="border-gray-800 border-1 p-2 w-full"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-600 text-white w-full p-2 font-semibold cursor-pointer"
          onClick={handleJoin}
        >
          JOIN
        </button>
      </div>
    </section>
  );
}
