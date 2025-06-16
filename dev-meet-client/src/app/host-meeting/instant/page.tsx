"use client"
import { useState } from "react";
import { Video, Mic, User, Settings2, Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function InstantMeetingPage() {
  const [meetingLink, setMeetingLink] = useState("https://devmeet.com/join/abc123");
  const [settings, setSettings] = useState({
    audio: true,
    video: true,
    waitingRoom: false
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    // Show temporary feedback
    const originalText = document.querySelector('.copy-button-text')?.textContent;
    if (originalText) {
      const button = document.querySelector('.copy-button-text');
      if (button) button.textContent = "Copied!";
      setTimeout(() => {
        if (button && originalText) button.textContent = originalText;
      }, 2000);
    }
  };

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const generateMeetingLink = () => {
    // In a real app, this would call your API to generate a unique meeting link
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setMeetingLink(`https://devmeet.com/join/${randomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Visual */}
        <div className="w-full lg:w-1/2 bg-blue-600 flex items-center justify-center p-8">
          <div className="relative w-full h-64 lg:h-full">
            <Image
              src="https://cdnl.iconscout.com/lottie/premium/thumb/business-meeting-animation-download-in-lottie-json-gif-static-svg-file-formats--team-work-office-worker-employee-group-co-working-space-pack-people-animations-4682303.gif"
              alt="Instant meeting illustration"
              fill
              className="object-contain"
              priority
              unoptimized={true}
            />
            <p className="absolute bottom-4 left-0 right-0 text-white text-center text-lg font-medium">
              Start collaborating instantly!
            </p>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          <CardHeader className="p-0 mb-6">
            <div className="flex items-center space-x-3">
              <Video className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">Instant Meeting</CardTitle>
                <CardTitle className="text-gray-500 text-sm">
                  Configure your meeting settings
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            <div className="space-y-4">
              {/* Audio Setting */}
              <div 
                className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg cursor-pointer"
                onClick={() => toggleSetting('audio')}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${settings.audio ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <Mic className={`h-5 w-5 ${settings.audio ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Audio</h3>
                    <p className="text-gray-500 text-sm">
                      {settings.audio ? 'Microphone enabled' : 'Microphone disabled'}
                    </p>
                  </div>
                </div>
                <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center 
                  ${settings.audio ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                  {settings.audio && <Check className="h-4 w-4 text-white" />}
                </div>
              </div>

              {/* Video Setting */}
              <div 
                className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg cursor-pointer"
                onClick={() => toggleSetting('video')}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${settings.video ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <Video className={`h-5 w-5 ${settings.video ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Video</h3>
                    <p className="text-gray-500 text-sm">
                      {settings.video ? 'Camera enabled' : 'Camera disabled'}
                    </p>
                  </div>
                </div>
                <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center 
                  ${settings.video ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                  {settings.video && <Check className="h-4 w-4 text-white" />}
                </div>
              </div>

              {/* Waiting Room Setting */}
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
                      {settings.waitingRoom ? 'Participants must wait' : 'Join directly'}
                    </p>
                  </div>
                </div>
                <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center 
                  ${settings.waitingRoom ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                  {settings.waitingRoom && <Check className="h-4 w-4 text-white" />}
                </div>
              </div>
            </div>

            <Separator className="my-4 bg-gray-200" />

            <div>
              <h3 className="font-medium text-gray-800 mb-2">Meeting Link</h3>
              <div className="flex items-center">
                <input
                  value={meetingLink}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  onClick={copyToClipboard}
                  className="rounded-l-none bg-blue-600 hover:bg-blue-700 shadow-none cursor-pointer pb-[13px] border-2 text-white flex items-center h-full "
                >
                  <Copy className="h-full w-4 mr-2" />
                  <span className="copy-button-text ">Copy</span>
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={generateMeetingLink}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg"
              >
                Start Meeting Now
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}