"use client";

import Link from "next/link";
import EventCard from "./components/EventCard";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/api/events");
        // Show only approved events on home page, limit to 6
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Discover Amazing Events
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Book tickets to the most exciting events in your city. From concerts to conferences, we've got you covered.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/events" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300">
              Browse Events
            </Link>
            <Link href="/register" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-lg border border-slate-700 hover:border-slate-600 transition-all duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">Featured Events</h2>
          <Link href="/events" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 transition-colors">
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 text-lg mt-4">Loading events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No events available at the moment. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose EventHub?</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Easy Booking</h3>
            <p className="text-slate-300">Book your tickets in just a few clicks. Simple, fast, and secure.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Verified Events</h3>
            <p className="text-slate-300">All events are verified by our admin team for your safety.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700/50 hover:border-green-500/50 transition-all duration-300">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Digital Tickets</h3>
            <p className="text-slate-300">Get your tickets instantly via email. No printing required.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
