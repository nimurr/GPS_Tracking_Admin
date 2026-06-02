import React from 'react';
import { FaUsersGear } from 'react-icons/fa6';
import { RiUserVoiceFill } from 'react-icons/ri';

const stats = [
  {
    title: 'Total Agency',
    value: '08',
    icon: <RiUserVoiceFill size={28} />,
  },
  {
    title: 'Total Visitor',
    value: '322',
    icon: <FaUsersGear size={28} />
  },
  {
    title: 'Total Group Created',
    value: '455',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M1 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" /><circle cx="9" cy="7" r="4" /></svg>,
  },
];

const DashboardStats = () => (
  <div className="grid md:grid-cols-3 gap-3 p-4 bg-[#111] rounded-2xl">
    {stats.map((stat) => (
      <div
        key={stat.title}
        className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px] px-[22px] py-5 flex flex-col items-center text-center gap-2"
      >
        <span className="text-white">{stat.icon}</span>
        <span className="text-sm text-[#aaa]">{stat.title}</span>
        <span className="text-[36px] font-bold text-[#fecd38] leading-none font-mono">
          {stat.value}
        </span>
      </div>
    ))}
  </div>
);

export default DashboardStats;