"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateRandomId } from "@/lib/helper";

export default function InstantMeetingPage() {
  const [formData, setFormData] = useState({
    meetingLink: "",
    password: ""
  });

  const router = useRouter();

  const generateMeetingLink = () => {
    const randomId = generateRandomId();
    setFormData({ ...formData, meetingLink: `https://devmeet.com/meeting/${randomId}` });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartMeeting = () => {
    if (!formData.meetingLink) return alert("Generate a meeting link first");
    const meetingId = formData.meetingLink.split("/").pop();
    router.push(`/meeting?meetingId=${meetingId}&password=${formData.password || "none"}`);
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md flex flex-col gap-4 shadow-lg">
        <h2 className="text-xl font-bold text-center">Instant Meeting</h2>

        <button
          onClick={generateMeetingLink}
          className="bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Generate Meeting Link
        </button>

        {formData.meetingLink && (
          <>
            <div className="text-sm">
              <p className="mb-1 font-medium">Meeting Link:</p>
              <input
                name="meetingLink"
                value={formData.meetingLink}
                readOnly
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div className="text-sm">
              <p className="mb-1 font-medium">Password:</p>
              <input
                type="password"
                name="password"
                placeholder="Enter a password (optional)"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <button
              onClick={handleStartMeeting}
              className="bg-green-400 text-white py-2 rounded font-semibold"
            >
              Start Meeting
            </button>
          </>
        )}
      </div>
    </section>
  );
}
