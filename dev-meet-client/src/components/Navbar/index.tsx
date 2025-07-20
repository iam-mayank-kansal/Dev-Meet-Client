"use client";
import { useState, useEffect } from 'react';
import { Home, Video, LogIn, ChevronDown, Menu, X, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, logoutUserThunk } from '@/store/slices/UserProfileSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [hasMounted, setHasMounted] = useState(false); // fix hydration

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user, status } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!user && status !== 'loading') {
            dispatch(fetchUserProfile());
        }
    }, [user, status, dispatch]);

    const handleLogout = async () => {
        await dispatch(logoutUserThunk());
        router.push('/login');
    };

    const navItems = [
        { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
        { name: "Join Meeting", path: "/join-meeting", icon: <LogIn className="w-5 h-5" /> },
        {
            name: "Host Meeting",
            icon: <Video className="w-5 h-5" />,
            dropdown: [
                { name: "Instant Meeting", path: "/host-meeting/instant" },
                { name: "Schedule Meeting", path: "/host-meeting/schedule" },
            ]
        }
    ];

    const toggleDropdown = (itemName: string) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    if (!hasMounted) return null; // SSR fix

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
                            DevMeet
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        <ul className="flex space-x-6">
                            {navItems.map((item) => (
                                <li key={item.name} className="relative">
                                    {item.dropdown ? (
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(item.name)}
                                                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                            >
                                                <span className="mr-1">{item.icon}</span>
                                                {item.name}
                                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                                            </button>

                                            {openDropdown === item.name && (
                                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.path}
                                                            href={subItem.path}
                                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                            onClick={() => setOpenDropdown(null)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.path}
                                            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                        >
                                            <span className="mr-1">{item.icon}</span>
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Auth Buttons */}
                        <div className="flex space-x-4 ml-4">
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
                                        onClick={handleLogout}
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
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <ul className="px-2 py-3 space-y-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                {item.dropdown ? (
                                    <>
                                        <span className="block px-4 py-2 font-medium text-gray-700">{item.name}</span>
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.path}
                                                href={subItem.path}
                                                className="block px-6 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    <Link
                                        href={item.path}
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <div className="pt-2 space-y-2">
                            {user ? (
                                <>
                                    <Link href="/profile" className="block w-full px-3 py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium" onClick={() => setIsOpen(false)}>Profile</Link>
                                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full px-3 py-2 text-center bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="block w-full px-3 py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link href="/signup" className="block w-full px-3 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium" onClick={() => setIsOpen(false)}>Sign Up</Link>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            )}
        </nav>
    );
};
