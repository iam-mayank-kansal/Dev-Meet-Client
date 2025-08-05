"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateRandomId } from "@/lib/helper";

export default function ScheduleMeetingPage() {
  const [formData, setFormData] = useState({
    title: "Project Manage Meeting",
    date: "2025-07-10",
    time: "12:00",
    host: "Mayank Kansal",
    password: "1234"
  });

  const [meetingLink, setMeetingLink] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = generateRandomId();
    const link = `https://devmeet.com/meeting/${randomId}?scheduled=true`;
    setMeetingLink(link);
    console.log(formData);
  };

  const handleJoin = () => {
    if (!meetingLink) return;
    const meetingId = meetingLink.split("/").pop()?.split("?")[0];
    console.log(formData);
    router.push(`/meeting?meetingId=${meetingId}&password=${formData.password ? formData.password : "none"}`);
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md flex flex-col gap-4 shadow-lg">
        <h2 className="text-xl font-bold text-center">Schedule Meeting</h2>

        <form onSubmit={handleSchedule} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Meeting Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="host"
            placeholder="Host Name"
            value={formData.host}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Meeting Password (optional)"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded font-semibold"
          >
            Schedule
          </button>
        </form>

        {meetingLink && (
          <>
            <div className="text-sm">
              <p className="mb-1 font-medium">Scheduled Link:</p>
              <input
                value={meetingLink}
                readOnly
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <button
              onClick={handleJoin}
              className="bg-green-400 text-white py-2 rounded font-semibold"
            >
              Join Meeting
            </button>
          </>
        )}
      </div>
    </section>
  );
}
