import React, { useState } from 'react';

const agencyData = [
  { id: 1, name: 'Mahmudul Hasan', email: 'tamim.uzui@gmail.com', totalGroup: '04', totalVisitor: 244, totalLeader: 4 },
  { id: 2, name: 'Rakib hasan', email: 'tamim.uzui@gmail.com', totalGroup: '04', totalVisitor: 2444, totalLeader: 4 },
  { id: 3, name: 'Alamin', email: 'tamim.uzui@gmail.com', totalGroup: '04', totalVisitor: 244, totalLeader: 4 },
  { id: 4, name: 'Kulsum Begum', email: 'tamim.uzui@gmail.com', totalGroup: '04', totalVisitor: 244, totalLeader: 4 },
  { id: 5, name: 'Musfiqur Rahim', email: 'tamim.uzui@gmail.com', totalGroup: '04', totalVisitor: 244, totalLeader: 4 },
  { id: 6, name: 'Asghar', email: 'tamim.uzui@gmail.com', totalGroup: '04', totalVisitor: 244, totalLeader: 4 },
  { id: 7, name: 'Sayed Khan', email: 'tamim.uzui@gmail.com', totalGroup: '04', totalVisitor: 244, totalLeader: 4 },
];

const ITEMS_PER_PAGE = 7;
const TOTAL_PAGES = 5;

const AllAgencies = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-black py-5 rounded-xl">
      <h2 className="text-white text-xl font-semibold mb-4">All Agencies</h2>

      <div className="rounded-xl overflow-hidden border border-gray-800">
        {/* Header */}
        <div className="grid grid-cols-5 bg-[#f5f0a0] px-4 py-3">
          <span className="text-black text-sm font-medium">Agency Name</span>
          <span className="text-black text-sm font-medium">Email</span>
          <span className="text-black text-sm font-medium">Total Group</span>
          <span className="text-black text-sm font-medium">Total Visitor</span>
          <span className="text-black text-sm font-medium">Toal Leader</span>
        </div>

        {/* Rows */}
        {agencyData.map((agency, index) => (
          <div
            key={agency.id}
            className={`grid grid-cols-5 px-4 py-3 ${index !== agencyData.length - 1 ? 'border-b border-gray-800' : ''}`}
          >
            <span className="text-white text-sm">{agency.name}</span>
            <span className="text-white text-sm">{agency.email}</span>
            <span className="text-white text-sm">{agency.totalGroup}</span>
            <span className="text-white text-sm">{agency.totalVisitor}</span>
            <span className="text-white text-sm">{agency.totalLeader}</span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-[#fecd38] text-black'
                : 'bg-transparent text-gray-400 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES))}
          className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default AllAgencies;