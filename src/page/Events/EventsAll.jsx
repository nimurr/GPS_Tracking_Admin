import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const events = [
    {
        id: 1,
        title: 'Jazz Is Dead?',
        category: 'Music',
        date: 'Tue, May 5 • 5:00 AM GMT+6',
        location: 'Cable Beach, Nassau',
        price: '$50.00',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
    },
    {
        id: 2,
        title: 'Caribbean Art Fair & Exhibition',
        category: 'Art',
        date: 'Tue, May 5 • 5:00 AM GMT+6',
        location: 'Cable Beach, Nassau',
        price: '$50.00',
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=250&fit=crop',
    },
    {
        id: 3,
        title: 'Junkanoo Summer Festival 2026',
        category: 'Music',
        date: 'Tue, May 5 • 5:00 AM GMT+6',
        location: 'Cable Beach, Nassau',
        price: '$50.00',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=250&fit=crop',
    },
    {
        id: 4,
        title: 'Hello Moving Cooler Cruise',
        category: 'Music',
        date: 'Tue, May 5 • 5:00 AM GMT+6',
        location: 'Cable Beach, Nassau',
        price: '$50.00',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
    },
];


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

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
    </svg>
);

const HeartIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill={filled ? '#f97316' : 'none'} viewBox="0 0 24 24" stroke={filled ? '#f97316' : '#6b7280'} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);


const EventCard = ({ event }) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
            {/* Image */}
            <div className="relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-60 p-3 object-cover [clip-path:polygon(30%_0%,70%_0%,100%_0,100%_100%,70%_100%,40%_100%,0_100%,0%_40%)]"
                />
                {/* Category Badge */}
                <div className="absolute bottom-2 m-2 left-2 flex items-center gap-1 bg-white rounded-md px-2 py-1 shadow text-xs font-semibold text-gray-700">
                    {event.category === 'Art' ? <ArtIcon /> : <MusicIcon />}
                    <span>{event.category}</span>
                </div>
                {/* Heart Button */}
                {/* <button
                    onClick={() => setLiked(!liked)}
                    className="absolute top-2 right-2 m-2 bg-white rounded-full p-1.5 shadow hover:scale-110 transition-transform"
                >
                    <HeartIcon className="text-xl" size={25} filled={liked} />
                </button> */}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">{event.title}</h3>

                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <CalendarIcon />
                    <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <LocationIcon />
                    <span>{event.location}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mt-1 pt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                        From : <span className="text-orange-500 font-bold">{event.price}</span>
                    </span>
                    <Link to={`/events/${event.id}`} className="bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-md">
                        See Details 
                    </Link>
                </div>
            </div>
        </div>
    );
};


const EventsAll = () => (



    <div className='md:p-5'>
        <div>
            <h2 className='text-2xl font-bold text-gray-800'>Events</h2>
        </div>
        <div className='flex justify-between items-center flex-wrap gap-5 mt-5'>
            <div>
                <input type="text" placeholder='Search' className='p-3 border border-gray-300 rounded-md min-w-48 w-60' />
            </div>
            <div>
                <button className='bg-primary text-white py-3 px-8 rounded flex items-center gap-2'> <FiPlus />Add New events</button>
            </div>
        </div>

        {/* // multiple events card  */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5'>
            {events?.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    </div>
)

export default EventsAll;
