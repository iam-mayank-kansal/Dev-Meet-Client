"use client";
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X,  } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, logoutUserThunk } from '@/store/slices/UserProfileSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import AuthButtons from './AuthButtons';
import MobileNavigation from './MobileNavigation';
import { navItemsData } from '@/lib/data';

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
        if (status === 'idle') {
            dispatch(fetchUserProfile());
        }
    }, [status, dispatch]);

    const handleLogout = async () => {
        await dispatch(logoutUserThunk());
        router.push('/login');
    };

    const toggleDropdown = (itemName: string) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    if (!hasMounted) return null; // SSR fix

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="px-4 sm:px-6 lg:px-12">
                <div className="flex justify-between h-16 items-center">
                    {/* logo  */}
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
                            DevMeet
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {/* nav items  */}
                        <ul className="flex space-x-6">
                            {navItemsData.map((item) => (
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
                        <AuthButtons user={user} onLogout={handleLogout} setIsOpen={setIsOpen} />
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
                <MobileNavigation user={user} onLogout={handleLogout} setIsOpen={setIsOpen} />
            )}
        </nav>
    );
};
