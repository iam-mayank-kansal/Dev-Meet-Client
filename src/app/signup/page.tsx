// app/signup/page.tsx
import { SignupForm } from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <div className={`min-h-screen min-w-screen  flex items-center justify-center p-4 border-2 fixed top-0 z-[100] backdrop-blur-xs bg-black`}>
      <SignupForm />
    </div>
  );
}