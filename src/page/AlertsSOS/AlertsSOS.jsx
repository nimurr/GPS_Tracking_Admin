import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IoSearchOutline, IoRefreshOutline } from "react-icons/io5";
import { BsThreeDotsVertical, BsBuildingFill } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

const SOS_ALERTS = [
  {
    id: 1, initials: "AK", name: "Ahmed Khan", agency: "Istanbul Travel",
    group: "Group A", groupColor: "#f59e0b", location: "Makkah, Near Masjid Al Haram",
    time: "2 min ago", status: "Active", lat: 21.430, lng: 39.815,
  },
  {
    id: 2, initials: "FA", name: "Fatima Ali", agency: "Madinah Travel",
    group: "Group B", groupColor: "#f97316", location: "Mina, Near Tent 89",
    time: "30 sec ago", status: "Active", lat: 21.395, lng: 39.885,
  },
  {
    id: 3, initials: "YA", name: "Yusuf Ahmed", agency: "Cairo Travel",
    group: "Group C", groupColor: "#16a34a", location: "Arafat",
    time: "5 min ago", status: "In Progress", lat: 21.370, lng: 39.855,
  },
];

const AGENCIES = ["All Agencies", "Istanbul Travel", "Madinah Travel", "Cairo Travel"];

const STATUS_STYLE = {
  Active:      { bg: "bg-red-50",    text: "text-red-500",    border: "border-red-200"    },
  "In Progress":{ bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-200" },
  Resolved:    { bg: "bg-green-50",  text: "text-green-600",  border: "border-green-200"  },
};

const AVATAR_BG = {
  Active:       "#1f2937",
  "In Progress":"#1f2937",
  Resolved:     "#1f2937",
};

function sosMapIcon(initials, status, timeLabel) {
  const ringColor = status === "Active" ? "#ef4444" : status === "In Progress" ? "#f97316" : "#16a34a";
  return L.divIcon({
    className: "",
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <div style="position:relative">
          <div style="
            width:44px;height:44px;border-radius:50%;
            background:rgba(${status==="Active"?"239,68,68":status==="In Progress"?"249,115,22":"22,163,74"},0.18);
            display:flex;align-items:center;justify-content:center;
            animation:${status==="Active"?"sosPulse 1.4s infinite":"none"};
          ">
            <div style="
              width:28px;height:28px;border-radius:50%;
              background:${ringColor};color:#fff;
              font-size:10px;font-weight:800;
              display:flex;align-items:center;justify-content:center;
            ">${initials}</div>
          </div>
        </div>
        <div style="
          background:rgba(0,0,0,0.65);color:#fff;
          font-size:9px;font-weight:600;padding:2px 5px;
          border-radius:4px;white-space:nowrap;line-height:1.3;text-align:center;
        ">${timeLabel}</div>
      </div>
      <style>
        @keyframes sosPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.35);opacity:0.55}}
      </style>`,
    iconSize: [44, 60],
    iconAnchor: [22, 60],
  });
}

const StatCard = ({ icon, iconBg, label, count }) => (
  <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 flex-1">
    <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 leading-none">{count}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  </div>
);

const AlertsSOS = () => {
  const mapRef      = useRef(null);
  const mapInstance = useRef(null);
  const [agency,    setAgency]    = useState("All Agencies");
  const [search,    setSearch]    = useState("");
  const [mapType,   setMapType]   = useState("map");
  const [lastUpdate]= useState("10 sec ago");

  const filtered = SOS_ALERTS.filter((a) => {
    const matchAgency = agency === "All Agencies" || a.agency === agency;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                        a.location.toLowerCase().includes(search.toLowerCase());
    return matchAgency && matchSearch;
  });

  useEffect(() => {
    if (mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current, { zoomControl: false })
      .setView([21.4025, 39.855], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(mapInstance.current);
    L.control.zoom({ position: "bottomleft" }).addTo(mapInstance.current);

    SOS_ALERTS.forEach((a) => {
      const timeLines = a.time.split(" ");
      const label = timeLines.length >= 3
        ? `${timeLines[0]}\n${timeLines[1]}\n${timeLines[2]}`
        : a.time;
      L.marker([a.lat, a.lng], { icon: sosMapIcon(a.initials, a.status, a.time) })
        .addTo(mapInstance.current)
        .bindPopup(`<b>${a.name}</b><br>${a.location}<br>${a.status}`);
    });

    return () => { mapInstance.current?.remove(); mapInstance.current = null; };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6 my-5 rounded font-sans">
      {/* Page Title */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-red-600">SOS Alerts</h1>
          <span className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center text-red-500 text-xs font-bold">!</span>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">Real-time SOS alerts from all agencies</p>
      </div>

      {/* Search + Agency + Last update */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-xs">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            type="text" placeholder="Search by name or phone..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </div>
        <div className="relative">
          <select value={agency} onChange={(e) => setAgency(e.target.value)}
            className="appearance-none border border-gray-200 rounded-lg pl-9 pr-8 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-100 cursor-pointer">
            {AGENCIES.map((a) => <option key={a}>{a}</option>)}
          </select>
          <BsBuildingFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Last update: {lastUpdate}
          <button className="ml-1 text-gray-400 hover:text-gray-600 transition-colors">
            <IoRefreshOutline size={16} />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4 mb-5">
        <StatCard
          iconBg="bg-red-500"
          icon={<span className="text-white text-xs font-black">SOS</span>}
          label="Members"
          count={<span className="text-red-600">3</span>}
        />
        <StatCard
          iconBg="bg-orange-400"
          icon={<IoRefreshOutline className="text-white" size={22} />}
          label="Members"
          count={<span className="text-orange-500">1</span>}
        />
        <StatCard
          iconBg="bg-green-500"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="22" height="22">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          }
          label="Members"
          count={<span className="text-green-600">12</span>}
        />
        {/* Stat Labels row */}
      </div>
      {/* Stat labels under counts */}
      <div className="flex gap-4 -mt-3 mb-5 px-0.5">
        {["Active SOS", "In Progress", "Resolved Today"].map((l) => (
          <div key={l} className="flex-1 px-5 text-sm font-medium text-gray-500">{l}</div>
        ))}
      </div>

      {/* Map + Sidebar */}
      <div className="flex gap-4">
        {/* Map */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="relative" style={{ height: 480 }}>
            <div className="absolute top-3 left-3 z-[999] flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {["Map", "Satellite"].map((t) => (
                <button key={t} onClick={() => setMapType(t.toLowerCase())}
                  className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                    mapType === t.toLowerCase() ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}>{t}</button>
              ))}
            </div>
            <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
            {/* Legend */}
            <div className="absolute bottom-0 left-0 right-0 z-[999] bg-white/90 border-t border-gray-100 px-4 py-2 flex gap-5">
              {[
                { color:"#ef4444", label:"Active SOS" },
                { color:"#f97316", label:"In Progress" },
                { color:"#16a34a", label:"Resolved" },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex flex-col gap-0 bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-900">
              SOS Alerts ({filtered.length})
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              Sort by: Latest
              <FiChevronDown size={13} />
            </div>
          </div>

          {/* Alert cards */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filtered.map((alert) => {
              const ss = STATUS_STYLE[alert.status] || STATUS_STYLE.Active;
              const leftBorder = alert.status === "Active"
                ? "border-l-4 border-l-red-500"
                : alert.status === "In Progress"
                ? "border-l-4 border-l-orange-400"
                : "border-l-4 border-l-green-500";
              return (
                <div key={alert.id} className={`p-4 ${leftBorder}`}>
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {alert.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">{alert.name}</span>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${ss.bg} ${ss.text} ${ss.border}`}>
                            {alert.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <BsBuildingFill size={11} className="text-gray-400" />
                          {alert.agency}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: alert.groupColor }} />
                          {alert.group}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 flex-shrink-0 mt-0.5">
                      <BsThreeDotsVertical size={15} />
                    </button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 mt-2.5 text-xs text-gray-500">
                    <MdOutlineLocationOn size={14} className="text-gray-400 flex-shrink-0" />
                    {alert.location}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="flex items-center gap-1 text-xs text-orange-500 font-medium">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      {alert.time}
                    </span>
                    <button className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium border border-red-200 rounded-lg px-3 py-1 hover:bg-red-50 transition-colors">
                      <MdOutlineLocationOn size={13} />
                      Show on Map
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View Resolved */}
          <div className="border-t border-gray-100">
            <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
              View Resolved Alerts
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsSOS;