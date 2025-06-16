"use client"
import { useState } from "react";
import { Calendar, Clock, User, Lock, Video, Settings2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export default function ScheduleMeetingPage() {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hostName, setHostName] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [settings, setSettings] = useState({
    recording: false,
    waitingRoom: true,
    passwordProtected: false,
    password: ""
  });

  const copyToClipboard = () => {
    if (!meetingLink) return;
    navigator.clipboard.writeText(meetingLink);
    const button = document.querySelector('.copy-button-text');
    if (button) {
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 2000);
    }
  };

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate meeting link and simulate submission
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setMeetingLink(`https://devmeet.com/join/${randomId}?scheduled=true`);
    
    console.log({
      meetingTitle,
      date,
      time,
      hostName,
      settings
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Visual */}
        <div className="w-full lg:w-1/2 bg-blue-600 flex items-center justify-center p-8">
          <div className="relative w-full h-64 lg:h-full">
            <Image
              src="https://cdnl.iconscout.com/lottie/premium/thumb/business-meeting-animation-download-in-lottie-json-gif-static-svg-file-formats--team-work-office-worker-employee-group-co-working-space-pack-people-animations-4682303.gif"
              alt="Schedule meeting illustration"
              fill
              className="object-contain"
              priority
              unoptimized={true}
            />
            <p className="absolute bottom-4 left-0 right-0 text-white text-center text-lg font-medium">
              Plan your collaboration in advance!
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          <CardHeader className="p-0 mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">Schedule Meeting</CardTitle>
                <CardTitle className="text-gray-500 text-sm">
                  Set your meeting details and preferences
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-700">
                    Meeting Title
                  </Label>
                  <div className="relative mt-1">
                    <Video className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                    <Input
                      id="title"
                      value={meetingTitle}
                      onChange={(e) => setMeetingTitle(e.target.value)}
                      placeholder="Team sync, client call, etc."
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-gray-700">
                      Date
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-gray-700">
                      Time
                    </Label>
                    <div className="relative mt-1">
                      <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="host" className="text-gray-700">
                    Host Name
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                    <Input
                      id="host"
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                      placeholder="Your name"
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4 bg-gray-200" />

              {/* Settings Section */}
              <div className="space-y-4">
                <div 
                  className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg cursor-pointer"
                  onClick={() => toggleSetting('waitingRoom')}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${settings.waitingRoom ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Settings2 className={`h-5 w-5 ${settings.waitingRoom ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Waiting Room</h3>
                      <p className="text-gray-500 text-sm">
                        {settings.waitingRoom ? 'Participants must wait for approval' : 'Participants can join directly'}
                      </p>
                    </div>
                  </div>
                  <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center 
                    ${settings.waitingRoom ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {settings.waitingRoom && <Check className="h-4 w-4 text-white" />}
                  </div>
                </div>

                <div 
                  className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg cursor-pointer"
                  onClick={() => toggleSetting('recording')}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${settings.recording ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Video className={`h-5 w-5 ${settings.recording ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Auto-Recording</h3>
                      <p className="text-gray-500 text-sm">
                        {settings.recording ? 'Meeting will be recorded' : 'Recording disabled'}
                      </p>
                    </div>
                  </div>
                  <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center 
                    ${settings.recording ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {settings.recording && <Check className="h-4 w-4 text-white" />}
                  </div>
                </div>

                <div 
                  className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg cursor-pointer"
                  onClick={() => toggleSetting('passwordProtected')}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${settings.passwordProtected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Lock className={`h-5 w-5 ${settings.passwordProtected ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Password Protection</h3>
                      <p className="text-gray-500 text-sm">
                        {settings.passwordProtected ? 'Meeting requires password' : 'No password required'}
                      </p>
                    </div>
                  </div>
                  <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center 
                    ${settings.passwordProtected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {settings.passwordProtected && <Check className="h-4 w-4 text-white" />}
                  </div>
                </div>

                {settings.passwordProtected && (
                  <div className="pl-16">
                    <Label htmlFor="password" className="text-gray-700">
                      Meeting Password
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                      <Input
                        id="password"
                        type="password"
                        value={settings.password}
                        onChange={(e) => setSettings({...settings, password: e.target.value})}
                        placeholder="Enter password"
                        className="pl-10 h-11"
                        required={settings.passwordProtected}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Generated Link Section */}
              {meetingLink && (
                <>
                  <Separator className="my-4 bg-gray-200" />
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Meeting Link</h3>
                    <div className="flex">
                      <input
                        value={meetingLink}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Button
                        onClick={copyToClipboard}
                        className="rounded-l-none bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        <span className="copy-button-text">Copy</span>
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <Separator className="my-4 bg-gray-200" />

              {/* Action Buttons */}
              <div className="flex justify-between pt-2">
                <Link href="/host-meeting">
                  <Button variant="outline" className="border-gray-300 text-gray-700">
                    Back
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Schedule Meeting
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}