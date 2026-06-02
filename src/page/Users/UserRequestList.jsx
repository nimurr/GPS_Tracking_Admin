import { useState } from "react";

const agencyData = [
  { id: 1, name: "Mahmudul Hasan", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
  { id: 2, name: "Rakib hasan", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 2444, totalLeader: 4 },
  { id: 3, name: "Alamin", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
  { id: 4, name: "Kulsum Begum", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
  { id: 5, name: "Musfiqur Rahim", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
  { id: 6, name: "Asghar", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
  { id: 7, name: "Sayed Khan", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
  { id: 8, name: "Tamim Uzui", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
  { id: 9, name: "Nadia Islam", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
  { id: 10, name: "Farhan Ahmed", email: "tamim.uzui@gmail.com", totalGroup: "04", totalVisitor: 244, totalLeader: 4 },
];

const PAGE_SIZE = 7;
const TOTAL_PAGES = 5;

const AllAgencies = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginated = agencyData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="bg-black min-h-screen md:p-6  overflow-x-auto">
      <h2 className="text-white text-xl font-semibold mb-5">All Agencies</h2>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden border border-gray-800 min-w-[1000px]">
        {/* Header */}
        <div className="grid grid-cols-5 bg-[#f5f0a0]">
          {["Agency Name", "Email", "Total Group", "Total Visitor", "Total Leader"].map((col, i) => (
            <div
              key={i}
              className={`px-5 py-4 text-black text-sm font-medium ${i < 4 ? "border-r border-yellow-300/40" : ""}`}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginated.map((agency, index) => (
          <div
            key={agency.id}
            className={`grid grid-cols-5 ${index < paginated.length - 1 ? "border-b border-gray-800" : ""}`}
          >
            <div className="px-5 py-4 text-white text-sm border-r border-gray-800">{agency.name}</div>
            <div className="px-5 py-4 text-white text-sm border-r border-gray-800">{agency.email}</div>
            <div className="px-5 py-4 text-white text-sm border-r border-gray-800">{agency.totalGroup}</div>
            <div className="px-5 py-4 text-white text-sm border-r border-gray-800">{agency.totalVisitor}</div>
            <div className="px-5 py-4 text-white text-sm">{agency.totalLeader}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 mt-6">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${currentPage === page
                ? "bg-[#f5a623] text-black font-semibold"
                : "text-gray-400 hover:text-white"
              }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES))}
          className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors ml-1"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default AllAgencies;