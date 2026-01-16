"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                name,
                email,
                password,
                role
            });
            
            authLogin(response.data.token, response.data.user);

            // Redirect based on role
            if (response.data.user.role === "organizer") {
                router.push("/organizer");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700/50">
                    <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h1>
                    <p className="text-slate-400 text-center mb-8">Join EventHub today</p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">
                                I want to register as:
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center p-4 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 transition-all">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={role === "user"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="ml-3">
                                        <p className="text-white font-semibold">Event Attendee</p>
                                        <p className="text-slate-400 text-sm">Browse and book events</p>
                                    </div>
                                </label>

                                <label className="flex items-center p-4 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:border-purple-500 transition-all">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="organizer"
                                        checked={role === "organizer"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div className="ml-3">
                                        <p className="text-white font-semibold">Event Organizer</p>
                                        <p className="text-slate-400 text-sm">Create and manage events</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <p className="text-slate-400 text-center mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
