import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { navItemsData } from "@/lib/data";
import { IUser } from "@/lib/interface";

export default function MobileNavigation({ user, onLogout, setIsOpen }: { user: IUser | null, onLogout: () => void, setIsOpen: (value: boolean) => void }) {
    return (
        <div className="md:hidden bg-white border-t border-gray-200">
            <ul className="px-2 py-3 space-y-2">
                {navItemsData.map((item) => (
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
                <AuthButtons user={user} onLogout={onLogout} setIsOpen={setIsOpen} />
            </ul>
        </div>
    )
}