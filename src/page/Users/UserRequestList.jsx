import { useState } from "react";
import { MdOutlineFileUpload, MdOutlineFileDownload } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";

const agencyData = [
  { id: 1, name: "Istanbul Travel", country: "Turkey", flag: "🇹🇷", startDate: "05.06.2025", endDate: "20.06.2025", totalMembers: 45, location: "Makkah", locationType: "kaaba", status: "Active" },
  { id: 2, name: "Madinah Travel", country: "Germany", flag: "🇩🇪", startDate: "08.06.2025", endDate: "22.06.2025", totalMembers: 38, location: "Madinah", locationType: "pin", status: "Active" },
  { id: 3, name: "Cairo Travel", country: "Egypt", flag: "🇪🇬", startDate: "10.06.2025", endDate: "24.06.2025", totalMembers: 52, location: "Mina", locationType: "pin", status: "Active" },
  { id: 4, name: "Jakarta Travel", country: "Indonesia", flag: "🇮🇩", startDate: "09.06.2025", endDate: "23.06.2025", totalMembers: 41, location: "Arafat", locationType: "pin", status: "Active" },
  { id: 5, name: "Kuala Lumpur Travel", country: "Malaysia", flag: "🇲🇾", startDate: "08.06.2025", endDate: "21.06.2025", totalMembers: 39, location: "Muzdalifah", locationType: "pin", status: "Active" },
  { id: 6, name: "Karachi Travel", country: "Pakistan", flag: "🇵🇰", startDate: "07.06.2025", endDate: "19.06.2025", totalMembers: 48, location: "Makkah", locationType: "kaaba", status: "Active" },
  { id: 7, name: "Lahore Travel", country: "Pakistan", flag: "🇵🇰", startDate: "06.06.2025", endDate: "18.06.2025", totalMembers: 30, location: "Madinah", locationType: "pin", status: "Active" },
  { id: 8, name: "Riyadh Travel", country: "Saudi Arabia", flag: "🇸🇦", startDate: "05.06.2025", endDate: "17.06.2025", totalMembers: 26, location: "Jeddah", locationType: "pin", status: "Inactive" },
  { id: 9, name: "Doha Travel", country: "Qatar", flag: "🇶🇦", startDate: "04.06.2025", endDate: "16.06.2025", totalMembers: 22, location: "Jeddah", locationType: "pin", status: "Inactive" },
  { id: 10, name: "Dubai Travel", country: "UAE", flag: "🇦🇪", startDate: "03.05.2025", endDate: "15.05.2025", totalMembers: 28, location: "Jeddah", locationType: "flag", status: "Finished" },
  { id: 11, name: "Dhaka Travel", country: "Bangladesh", flag: "🇧🇩", startDate: "01.06.2025", endDate: "14.06.2025", totalMembers: 60, location: "Makkah", locationType: "kaaba", status: "Active" },
  { id: 12, name: "Manila Travel", country: "Philippines", flag: "🇵🇭", startDate: "02.06.2025", endDate: "16.06.2025", totalMembers: 33, location: "Mina", locationType: "pin", status: "Inactive" },
  { id: 13, name: "Tehran Travel", country: "Iran", flag: "🇮🇷", startDate: "11.06.2025", endDate: "25.06.2025", totalMembers: 55, location: "Arafat", locationType: "pin", status: "Active" },
  { id: 14, name: "Lagos Travel", country: "Nigeria", flag: "🇳🇬", startDate: "12.06.2025", endDate: "26.06.2025", totalMembers: 44, location: "Madinah", locationType: "pin", status: "Active" },
  { id: 15, name: "Nairobi Travel", country: "Kenya", flag: "🇰🇪", startDate: "13.06.2025", endDate: "27.06.2025", totalMembers: 19, location: "Jeddah", locationType: "pin", status: "Finished" },
];

const AVATAR_COLORS = [
  "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
  "bg-red-500", "bg-teal-500", "bg-yellow-500", "bg-gray-500",
  "bg-pink-500", "bg-indigo-500",
];

const COUNTRIES = ["All Countries", ...new Set(agencyData.map((a) => a.country))];
const LOCATIONS = ["All Locations", ...new Set(agencyData.map((a) => a.location))];
const STATUSES = ["All Status", "Active", "Inactive", "Finished"];
const ROW_OPTIONS = [5, 10, 15, 20];

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-50  text-green-600  border border-green-200",
    Inactive: "bg-red-50    text-red-500    border border-red-200",
    Finished: "bg-gray-100  text-gray-500   border border-gray-200",
  };
  const dot = {
    Active: "bg-green-500",
    Inactive: "bg-red-500",
    Finished: "bg-gray-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
};

const LocationIcon = ({ type }) => {
  if (type === "kaaba") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-500">
        <rect x="4" y="8" width="16" height="12" rx="1" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
        <line x1="10" y1="13" x2="14" y2="13" />
      </svg>
    );
  }
  if (type === "flag") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-500">
        <path d="M4 21V4" /><path d="M4 4l16 4-16 4" />
      </svg>
    );
  }
  return <MdOutlineLocationOn className="w-4 h-4 text-gray-500" />;
};

const AllAgencies = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [location, setLocation] = useState("All Locations");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = agencyData.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCountry = country === "All Countries" || a.country === country;
    const matchLoc = location === "All Locations" || a.location === location;
    const matchStatus = statusFilter === "All Status" || a.status === statusFilter;
    return matchSearch && matchCountry && matchLoc && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const clearFilters = () => {
    setSearch(""); setCountry("All Countries");
    setLocation("All Locations"); setStatusFilter("All Status");
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen p-6 my-5 rounded font-sans">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-1">
        Dashboard <span className="mx-1">›</span> Groups & Agencies
      </p>

      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Groups & Agencies</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <MdOutlineFileUpload size={16} /> Upload Excel
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <MdOutlineFileDownload size={16} /> Export List
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            + Create New Agency
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search agency name..."
            value={search}
            onChange={handleFilterChange(setSearch)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <select value={country} onChange={handleFilterChange(setCountry)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={location} onChange={handleFilterChange(setLocation)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
          {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select value={statusFilter} onChange={handleFilterChange(setStatusFilter)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button onClick={clearFilters}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <HiOutlineRefresh size={15} /> Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium text-left">
              <th className="px-4 py-3 w-8">#</th>
              <th className="px-4 py-3">Agency Name</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Total Members</th>
              <th className="px-4 py-3">Current Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-10 text-gray-400">No agencies found.</td>
              </tr>
            ) : (
              paginated.map((agency, index) => {
                const globalIndex = (currentPage - 1) * rowsPerPage + index + 1;
                const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
                return (
                  <tr key={agency.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0">
                    <td className="px-4 py-3 text-gray-400">{globalIndex}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg ${avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {agency.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{agency.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">{agency.flag}</span>
                        {agency.country}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{agency.startDate}</td>
                    <td className="px-4 py-3 text-gray-600">{agency.endDate}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{agency.totalMembers}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <LocationIcon type={agency.locationType} />
                        {agency.location}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={agency.status} />
                    </td>
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === agency.id ? null : agency.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <BsThreeDotsVertical size={15} />
                      </button>
                      {openMenu === agency.id && (
                        <div className="absolute right-8 top-8 z-10 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-36"
                          onMouseLeave={() => setOpenMenu(null)}>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View Details</button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit Agency</button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: count + pagination + rows per page */}
      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
        <p className="text-sm text-gray-500">
          Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filtered.length)}–{Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length} agencies
        </p>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}>
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight size={14} />
          </button>
        </div>

        {/* Rows per page */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          Rows per page
          <select
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 focus:outline-none bg-white"
          >
            {ROW_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllAgencies;