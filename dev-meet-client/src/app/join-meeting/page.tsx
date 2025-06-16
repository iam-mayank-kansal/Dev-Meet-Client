"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, Video, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

// Define form validation schema using Zod
const formSchema = z.object({
    meetingId: z.string().min(3, "Meeting ID must be at least 3 characters"),
    displayName: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().optional(), // Optional password field
});

export default function JoinMeetingPage() {
    // Initialize React Hook Form with Zod resolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            meetingId: "",
            displayName: "",
            password: "",
        },
    });

    // Form submission handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Joining meeting with:", values);
        // Add your join meeting logic here (API call, redirection, etc.)
    };

    return (
        // Main container with gradient background
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            {/* Card container with responsive layout (column on mobile, row on desktop) */}
            <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Side - Visual Section (Image/GIF) */}
                <div className="w-full md:w-1/2 bg-blue-600 flex items-center justify-center p-5">
                    <div className="relative w-full h-72 md:h-full rounded-xl overflow-hidden">

                        {/* Responsive image/GIF component */}
                        <Image
                            src="https://cdnl.iconscout.com/lottie/premium/thumb/business-meeting-animation-download-in-lottie-json-gif-static-svg-file-formats--team-work-office-worker-employee-group-co-working-space-pack-people-animations-4682303.gif"
                            alt="Video meeting illustration"
                            fill
                            className="object-cover"
                            priority
                            unoptimized={true} // Required for GIFs in Next.js
                        />
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8">
                    {/* Card Header with title and description */}
                    <CardHeader className="p-0 mb-6">
                        <div className="flex items-center space-x-3">
                            <Video className="h-8 w-8 text-blue-600" />
                            <div>
                                <CardTitle className="text-2xl font-bold text-gray-800">
                                    Join Meeting
                                </CardTitle>
                                <CardDescription className="text-gray-500">
                                    Enter the meeting details provided by your host
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    {/* Form Content */}
                    <CardContent className="p-0">
                        {/* React Hook Form wrapper */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                
                                {/* Meeting ID Field */}
                                <FormField
                                    control={form.control}
                                    name="meetingId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label className="text-gray-700">Meeting ID</Label>
                                            <div className="relative">
                                                {/* Icon inside input field */}
                                                <Video className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                                                <FormControl>
                                                    <Input
                                                        id="meetingId"
                                                        placeholder="Enter meeting ID (e.g. DEV-123-456)"
                                                        className="pl-10 h-11 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            {/* Validation error message */}
                                            <FormMessage className="text-red-500 text-sm" />
                                        </FormItem>
                                    )}
                                />

                                {/* Display Name Field */}
                                <FormField
                                    control={form.control}
                                    name="displayName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label className="text-gray-700">Your Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                                                <FormControl>
                                                    <Input
                                                        id="displayName"
                                                        placeholder="How should we call you?"
                                                        className="pl-10 h-11 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-red-500 text-sm" />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field (Optional) */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label className="text-gray-700">Password (if required)</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
                                                <FormControl>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        placeholder="Enter meeting password"
                                                        className="pl-10 h-11 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-red-500 text-sm" />
                                        </FormItem>
                                    )}
                                />

                                {/* Separator */}
                                <Separator className="my-6 bg-gray-200" />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <LogIn className="mr-2 h-5 w-5" />
                                    Join Meeting
                                </Button>
                            </form>
                        </Form>

                        {/* Footer Link */}
                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>
                                Don't have a meeting?{' '}
                                <Link
                                    href="/host-meeting"
                                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                    aria-label="Start your own meeting"
                                >
                                    Start your own
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </div>
            </div>
        </div>
    );
}