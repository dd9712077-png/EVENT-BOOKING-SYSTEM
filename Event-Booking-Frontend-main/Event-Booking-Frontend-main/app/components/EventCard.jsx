import Link from "next/link";

export default function EventCard({ event }) {
    const eventDate = new Date(event.eventDate);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const formattedTime = eventDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const statusColors = {
        pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
        approved: "bg-green-500/20 text-green-300 border-green-500/30",
        rejected: "bg-red-500/20 text-red-300 border-red-500/30",
    };

    return (
        <Link href={`/events/${event._id}`}>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 border border-slate-700/50">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Status badge */}
                <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[event.status]}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                </div>

                <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                        {event.description || "No description available"}
                    </p>

                    {/* Date & Time */}
                    <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-slate-300 text-sm">
                            {formattedDate} at {formattedTime}
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-slate-300 text-sm">{event.location}</span>
                    </div>

                    {/* Seats */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-slate-300 text-sm">
                                <span className="font-semibold text-green-400">{event.availableSeats}</span> / {event.totalSeats} seats
                            </span>
                        </div>

                        <div className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                            View Details →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
