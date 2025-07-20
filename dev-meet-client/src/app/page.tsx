"use client";
import { fetchProfile } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchProfile();
      setUser(data);
    };

    getUser();
  }, []);

  return (
    <section className="text-center min-h-[678px] bg-black border-2 flex items-center justify-center">
      <h1 className="mb-4 text-white text-8xl">
        {user ? `Welcome, ${user.name}` : "Loading..."}
      </h1>
    </section>
  );
}
