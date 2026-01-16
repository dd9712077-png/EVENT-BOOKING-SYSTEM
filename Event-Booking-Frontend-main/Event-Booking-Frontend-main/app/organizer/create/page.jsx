"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/Button";
import axios from "axios";

export default function CreateEventPage() {
    const { isAuthenticated, token, isOrganizer } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eventDate: "",
        location: "",
        totalSeats: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isAuthenticated || !isOrganizer) {
        router.push("/login");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;
            await axios.post(`${API_BASE_URL}/api/events`, {
                title: formData.title,
                description: formData.description,
                eventDate: formData.eventDate,
                location: formData.location,
                totalSeats: parseInt(formData.totalSeats),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push("/organizer");
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12">
            <div className="container mx-auto px-6 max-w-2xl">
                <h1 className="text-4xl font-bold text-white mb-8">Create New Event</h1>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700/50">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                                Event Title *
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Enter event title"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                placeholder="Describe your event"
                            />
                        </div>

                        <div>
                            <label htmlFor="eventDate" className="block text-sm font-medium text-slate-300 mb-2">
                                Event Date & Time *
                            </label>
                            <input
                                id="eventDate"
                                name="eventDate"
                                type="datetime-local"
                                required
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
                                Location *
                            </label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Event location"
                            />
                        </div>

                        <div>
                            <label htmlFor="totalSeats" className="block text-sm font-medium text-slate-300 mb-2">
                                Total Seats *
                            </label>
                            <input
                                id="totalSeats"
                                name="totalSeats"
                                type="number"
                                required
                                min="1"
                                value={formData.totalSeats}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Number of available seats"
                            />
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/50 text-blue-400 px-4 py-3 rounded-lg text-sm">
                            <strong>Note:</strong> Your event will be submitted for admin approval before it appears publicly.
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={loading} className="flex-1">
                                {loading ? "Creating..." : "Create Event"}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.push("/organizer")}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
