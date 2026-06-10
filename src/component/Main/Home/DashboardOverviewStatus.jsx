import React from 'react';
import { RiUserVoiceFill } from 'react-icons/ri';
import { FaUsersGear } from 'react-icons/fa6';
import { MdPersonOff, MdSos, MdLocationOn } from 'react-icons/md';

const stats = [
  {
    title: 'Total Agencies',
    value: '128',
    icon: <RiUserVoiceFill size={28} />,
    bg: 'bg-blue-600',
  },
  {
    title: 'Total Members',
    value: '24,789',
    icon: <FaUsersGear size={28} />,
    bg: 'bg-green-600',
  },
  {
    title: 'Missing Members',
    value: '18',
    icon: <MdPersonOff size={28} />,
    bg: 'bg-red-600',
  },
  {
    title: 'SOS Alerts',
    value: '3',
    icon: <MdSos size={28} />,
    bg: 'bg-red-900',
    badge: 'Active',
  },
  {
    title: 'Active Umrah',
    value: '156',
    icon: <MdLocationOn size={28} />,
    bg: 'bg-emerald-600',
  },
];

const DashboardStats = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4">
    {stats.map((stat) => (
      <div
        key={stat.title}
        className={`${stat.bg} rounded-[14px] px-4 py-6 flex flex-col gap-2 text-white`}
      >
        <span className="text-xs font-semibold uppercase tracking-wider opacity-85">
          {stat.title}
        </span>
        <div className="flex items-end justify-between">
          <span className="text-[32px] font-bold leading-none font-mono">
            {stat.value}
          </span>
          {stat.badge ? (
            <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full">
              {stat.badge}
            </span>
          ) : (
            <span className="opacity-70">{stat.icon}</span>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default DashboardStats;