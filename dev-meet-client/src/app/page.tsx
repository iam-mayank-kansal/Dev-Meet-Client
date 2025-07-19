"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get('http://localhost:8080/api/users/profile', {
          withCredentials: true,
        });

        setUser(res.data); 
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }

    fetchProfile();
  }, []);

  return (
    <section className="text-center min-h-[678px] bg-black border-2 flex items-center justify-center">
      <h1 className="mb-4 text-white text-8xl">
        {user ? `Welcome, ${user.name}` : "Loading..."}
      </h1>
    </section>
  );
}
