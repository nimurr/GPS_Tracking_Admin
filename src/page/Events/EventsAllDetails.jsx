import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiMapPin, FiClock, FiUsers, FiBookmark } from 'react-icons/fi';

const MusicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z" />
    </svg>
);

const ArtIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.1-1.02 2.1-2.25 0-.59-.23-1.12-.6-1.52-.36-.38-.58-.9-.58-1.48 0-1.24 1.01-2.25 2.25-2.25H17c2.76 0 5-2.24 5-5 0-4.97-4.48-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5S18.33 11 17.5 11z" />
    </svg>
);

// ---- static mock data (replace with API call using useParams id) ----
const eventData = {
    id: 3,
    title: 'Junkanoo Summer Festival 2026',
    category: 'Music',
    date: 'Tue, May 5 • 5:00 AM GMT+6',
    doorsOpen: '4:30 PM',
    location: 'Cable Beach, Nassau',
    attending: '500+',
    price: '$50.00',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=320&fit=crop',
    description:
        'Experience the vibrant rhythms and colorful parade costumes of the Junkanoo — Nassau\'s most iconic cultural celebration. Live performances, local food, and a night you won\'t forget.',
    tags: ['Music', 'Festival', 'Outdoor', 'Nassau', 'Caribbean', 'Live Performance'],
    lineup: [
        { initials: 'DJ', name: 'DJ Phantom',   time: '8:00 PM – 10:00 PM' },
        { initials: 'MB', name: 'Marla Beats',  time: '10:00 PM – 12:00 AM' },
        { initials: 'KR', name: 'King Riddim',  time: '12:00 AM – 2:00 AM' },
    ],
    tickets: [
        { tier: 'General',  desc: 'Standing area',               price: '$50' },
        { tier: 'VIP',      desc: 'Reserved seating + drinks',   price: '$120' },
        { tier: 'Platinum', desc: 'Backstage + meet & greet',    price: '$250' },
    ],
};

const EventsAllDetails = () => {
    const { id } = useParams(); // use id to fetch real data later

    const event = eventData; // replace with fetched data

    return (
        <div className="md:p-5 p-3 max-w-5xl mx-auto">

            {/* Back */}
            <Link to="/events" className="inline-flex items-center gap-1 text-gray-600 font-semibold hover:text-gray-800 mb-4">
                <FiArrowLeft /> Back to events
            </Link>

            {/* Hero card */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5">
                <div className="relative">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-white rounded-md px-2 py-1 shadow text-xs font-semibold text-gray-700">
                        {event.category === 'Art' ? <ArtIcon /> : <MusicIcon />}
                        <span>{event.category}</span>
                    </div>
                </div>

                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h1>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">{event.description}</p>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiCalendar className="text-orange-500" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiMapPin className="text-orange-500" />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiClock className="text-orange-500" />
                            <span>Doors open at {event.doorsOpen}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiUsers className="text-orange-500" />
                            <span>{event.attending} attending</span>
                        </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="border-t border-gray-100 pt-5 flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Starting from</p>
                            <p className="text-3xl font-extrabold text-orange-500">
                                {event.price} <span className="text-sm font-normal text-gray-400">/ person</span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 border border-orange-500 text-orange-500 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-colors">
                                <FiBookmark /> Save Event
                            </button>
                            <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-6 py-3 rounded-lg font-semibold text-sm">
                                Book Tickets
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lineup + Tickets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                {/* Lineup */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h2 className="text-sm font-bold text-gray-800 mb-4">Lineup</h2>
                    <div className="flex flex-col gap-4">
                        {event.lineup.map((artist) => (
                            <div key={artist.name} className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600 flex-shrink-0">
                                    {artist.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{artist.name}</p>
                                    <p className="text-xs text-gray-400">{artist.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ticket tiers */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h2 className="text-sm font-bold text-gray-800 mb-4">Ticket tiers</h2>
                    <div className="flex flex-col gap-3">
                        {event.tickets.map((t) => (
                            <div key={t.tier} className="flex items-center justify-between bg-orange-50 rounded-lg px-4 py-3">
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{t.tier}</p>
                                    <p className="text-xs text-gray-400">{t.desc}</p>
                                </div>
                                <span className="text-orange-500 font-extrabold text-sm">{t.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="text-sm font-bold text-gray-800 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                        <span key={tag} className="bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default EventsAllDetails;