"use client";
import { IUser } from "@/lib/interface";
import { LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface AuthButtonsProps {
  user: IUser | null;
  onLogout: () => void;
  setIsOpen: (value: boolean) => void;
}

export default function AuthButtons({ user, onLogout, setIsOpen }: AuthButtonsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Mobile logout handler which also closes mobile menu
  const handleMobileLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  // Get the first letter uppercase of user's name for avatar
  const getInitial = () => {
    if (!user?.name) return "";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Desktop Auth Buttons */}
      <div
        className="hidden md:flex ml-4 items-center relative"
        ref={dropdownRef}
      >
        {user ? (
          <>
            {/* 
              Fixed width container, flex with space-between to prevent shift 
              Width = 56px (w-14 * 4px), align items center 
            */}
            <button
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className="flex items-center justify-between w-14 cursor-pointer select-none focus:outline-none "
            >
              {/* Profile circle */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold text-lg shrink-0">
                {getInitial() || <UserIcon className="w-6 h-6" />}
              </div>
              {/* Chevron */}
              <ChevronDown className={`w-5 h-5 stroke-2  flex-shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
           

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-12 right-0 z-20 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-gray-800 font-medium">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-blue-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-blue-600" /> Profile
                  </div>
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setDropdownOpen(false);
                  }}
                  className="w-full cursor-pointer text-left px-4 py-2 hover:bg-red-100 text-red-600 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex space-x-4">
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
          </div>
        )}
      </div>

      {/* Mobile Auth Buttons */}
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
