"use client";
import { FEATURES, TESTIMONIALS } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col items-center">
      
      {/* Hero */}
      <section
        className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-4 py-24 px-6 md:px-12"
        id="hero"
      >
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight">
            Unite Scientists.<br />Accelerate Discovery.
          </h1>
          <p className="text-blue-800 text-xl mb-10 max-w-xl">
            Empowering researchers and students worldwide to connect, collaborate, and transform ideas into impact.
          </p>
          <Link
            href="/host-meeting/instant"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Create Instant Meeting
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-blue-100 rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-300">
            <span className="text-8xl md:text-9xl text-blue-500">🔬</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="w-full bg-white flex flex-col items-center py-24 px-6 md:px-12"
      >
        <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow hover:scale-105 hover:shadow-xl transition-all text-center"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">{f.title}</h3>
              <p className="text-blue-700 text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how"
        className="w-full flex flex-col md:flex-row items-center justify-between gap-16 py-24 px-6 md:px-12 bg-blue-50"
      >
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl font-bold text-blue-900 mb-8">How It Works</h2>
          <ol className="space-y-6 text-left text-blue-800 text-lg">
            <li>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full mr-2 font-bold">1</span>
              Register and set up your profile.
            </li>
            <li>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full mr-2 font-bold">2</span>
              Explore existing groups or create your own event.
            </li>
            <li>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full mr-2 font-bold">3</span>
              Schedule meetings, send invites, and manage attendance.
            </li>
            <li>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full mr-2 font-bold">4</span>
              Present, discuss, and collaborate live with fellow scientists.
            </li>
            <li>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full mr-2 font-bold">5</span>
              Access past sessions, shared resources, and stay connected.
            </li>
          </ol>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-blue-100 w-64 h-64 md:w-[500px] md:h-[400px] rounded-xl flex items-center justify-center shadow-xl border-2 border-blue-200">
            <Image
              src={"/download.jpeg"}
              alt="meeting"
              height={400}
              width={500}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="w-full bg-white flex flex-col items-center py-24 px-6 md:px-12"
      >
        <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-md flex flex-col items-center"
            >
              <div className="text-5xl mb-2">{t.avatar}</div>
              <blockquote className="text-blue-700 italic mb-4 text-lg leading-relaxed">“{t.quote}”</blockquote>
              <div className="text-blue-600 font-bold mb-1">{t.name}</div>
              <div className="text-blue-400">{t.country}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section
        id="join"
        className="w-full flex flex-col items-center justify-center py-24 px-6 md:px-12 bg-blue-50"
      >
        <div className="bg-gradient-to-tr from-blue-300 via-blue-100 to-white rounded-2xl px-10 py-16 flex flex-col items-center w-full max-w-2xl shadow-xl border">
          <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center">Ready to Connect?</h2>
          <p className="text-blue-800 mb-8 text-lg text-center">
            Sign up now and be part of a thriving international scientific community!
          </p>
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-10 py-4 rounded-lg text-xl font-bold shadow hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>

    </main>
  );
}
