"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user, isAuthenticated, logout, isAdmin, isOrganizer } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-6 py-4">
                <Link href="/" className="group">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300">
                        EventHub
                    </h1>
                </Link>

                <nav className="flex items-center space-x-6">
                    <Link href="/events" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                        Events
                    </Link>

                    {isAuthenticated ? (
                        <>
                            {isAdmin && (
                                <Link href="/admin" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                                    Admin Panel
                                </Link>
                            )}

                            {isOrganizer && (
                                <Link href="/organizer" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                                    My Events
                                </Link>
                            )}

                            {!isAdmin && !isOrganizer && (
                                <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                                    My Bookings
                                </Link>
                            )}

                            {!isAdmin && (
                                <Link href="/tickets" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                                    My Tickets
                                </Link>
                            )}

                            <div className="flex items-center gap-4">
                                <span className="text-slate-400 text-sm">
                                    Welcome, <span className="text-white font-semibold">{user?.name}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">
                                Login
                            </Link>
                            <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-blue-500/50">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
