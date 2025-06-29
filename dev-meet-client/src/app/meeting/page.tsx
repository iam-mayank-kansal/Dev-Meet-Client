"use client";
import { useSearchParams } from "next/navigation";

export default function MeetingPage() {
    const searchParams = useSearchParams();
    const meetingId = searchParams.get("meetingId");

    return (
        <section className="text-center min-h-[678px] bg-black flex items-center justify-center text-white flex-col">
            <h1 className="text-3xl font-bold">Meeting Page</h1>
            <p className="mt-2 text-xl">Meeting ID: {meetingId}</p>
        </section>
    );
}
