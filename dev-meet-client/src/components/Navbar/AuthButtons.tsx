"use client";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function AuthButtons({ user, onLogout, setIsOpen }: { user: any, onLogout: () => void, setIsOpen: (value: boolean) => void }) {
  // This is a combined handler for the mobile logout button to also close the menu
  const handleMobileLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Auth Buttons (rendered by parent) */}
      <div className="hidden md:flex space-x-4 ml-4">
        {user ? (
          <>
            <Link
              href="/profile"
              className="px-4 py-2 flex items-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
            >
              <User className="w-5 h-5 mr-2" />
              Profile
            </Link>
            <button
              onClick={onLogout}
              className="px-4 py-2 flex items-center bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Auth Buttons (rendered by parent) */}
      <div className="md:hidden pt-2 space-y-2">
        {user ? (
          <>
            <Link
              href="/profile"
              className="block w-full px-3 py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleMobileLogout}
              className="block w-full px-3 py-2 text-center bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="block w-full px-3 py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block w-full px-3 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
}