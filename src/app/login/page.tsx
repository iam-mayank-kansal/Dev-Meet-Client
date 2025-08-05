"use client";
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
    return (
        <div className={`min-h-screen min-w-screen  flex items-center justify-center p-4 border-2 fixed top-0 z-[100] backdrop-blur-xs bg-black`}>
            <LoginForm />
        </div>
    );
}