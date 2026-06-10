import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MEMBERS = [
    { initials: "AK", name: "Ahmad Kaur", time: "5m ago", status: "online", color: "#2563eb", group: "A", lat: 21.460, lng: 39.780 },
    { initials: "FH", name: "Fatima Hassan", time: "12m ago", status: "online", color: "#9333ea", group: "B", lat: 21.440, lng: 39.870 },
    { initials: "MA", name: "Mohammed Ali", time: "1h ago", status: "offline", color: "#16a34a", group: "C", lat: 21.410, lng: 39.850 },
    { initials: "AR", name: "Aisha Rahman", time: "30m ago", status: "online", color: "#2563eb", group: "D", lat: 21.370, lng: 39.860 },
    { initials: "OA", name: "Omar Abdullah", time: "2h ago", status: "na", color: "#0891b2", group: "A", lat: 21.420, lng: 39.800 },
    { initials: "ZM", name: "Zainab Malik", time: "8m ago", status: "online", color: "#16a34a", group: "B", lat: 21.390, lng: 39.760 },
    { initials: "IS", name: "Ibrahim Siddiq", time: "20m ago", status: "online", color: "#f59e0b", group: "C", lat: 21.450, lng: 39.840 },
    { initials: "KY", name: "Khadija Yusuf", time: "45m ago", status: "online", color: "#dc2626", group: "D", lat: 21.380, lng: 39.900 },
    { initials: "YN", name: "Yusuf Nasser", time: "3h ago", status: "na", color: "#7c3aed", group: "A", lat: 21.430, lng: 39.920 },
    { initials: "HL", name: "Hassan Lamin", time: "15m ago", status: "online", color: "#16a34a", group: "B", lat: 21.400, lng: 39.830 },
    { initials: "RA", name: "Rania Aziz", time: "6h ago", status: "offline", color: "#f97316", group: "C", lat: 21.360, lng: 39.790 },
    { initials: "NJ", name: "Nour Jabir", time: "2m ago", status: "online", color: "#0f766e", group: "D", lat: 21.470, lng: 39.860 },
];

const GROUPS = [
    { label: "Group A", color: "#f59e0b" },
    { label: "Group B", color: "#f97316" },
    { label: "Group C", color: "#16a34a" },
    { label: "Group D", color: "#a855f7" },
];

const AGENCIES = ["Istanbul Travel", "Madinah Travel", "Cairo Travel", "Jakarta Travel"];

const STATUS_COLOR = { online: "#16a34a", offline: "#dc2626", na: "#9ca3af" };

const LEGEND = [
    { label: "Group A", color: "#f59e0b" },
    { label: "Group B", color: "#f97316" },
    { label: "Group C", color: "#16a34a" },
    { label: "Group D", color: "#a855f7" },
];

function avatarIcon(member) {
    return L.divIcon({
        className: "",
        html: `
      <div style="position:relative;width:44px;height:44px">
        <div style="
          width:40px;height:40px;border-radius:50%;
          background:${member.color};border:3px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,0.25);
          display:flex;align-items:center;justify-content:center;
          font-size:14px;font-weight:700;color:#fff;
        ">${member.initials}</div>
        <span style="
          width:11px;height:11px;border-radius:50%;
          background:${STATUS_COLOR[member.status]};
          border:2px solid #fff;
          position:absolute;bottom:1px;right:1px;
        "></span>
      </div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
    });
}

function sosIcon() {
    return L.divIcon({
        className: "",
        html: `
      <div style="
        width:44px;height:44px;border-radius:50%;
        background:rgba(220,38,38,0.15);
        display:flex;align-items:center;justify-content:center;
        animation:sosPulse 1.5s infinite;
      ">
        <div style="
          width:28px;height:28px;border-radius:50%;
          background:#dc2626;color:#fff;
          font-size:8px;font-weight:900;
          display:flex;align-items:center;justify-content:center;
        ">SOS</div>
      </div>
      <style>
        @keyframes sosPulse {
          0%,100%{transform:scale(1);opacity:1}
          50%{transform:scale(1.4);opacity:0.5}
        }
      </style>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
    });
}

const AllUserMap = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [agency, setAgency] = useState("Istanbul Travel");
    const [activeGroups, setActiveGroups] = useState(["A", "B", "C", "D"]);
    const [mapType, setMapType] = useState("map");

    const stats = {
        total: MEMBERS.length,
        online: MEMBERS.filter((m) => m.status === "online").length,
        offline: MEMBERS.filter((m) => m.status === "offline").length,
        na: MEMBERS.filter((m) => m.status === "na").length,
    };

    const toggleGroup = (g) =>
        setActiveGroups((prev) =>
            prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
        );

    useEffect(() => {
        if (mapInstance.current) return;

        mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView(
            [21.4225, 39.8262], 12
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance.current);

        L.control.zoom({ position: "bottomleft" }).addTo(mapInstance.current);

        MEMBERS.forEach((m) => {
            L.marker([m.lat, m.lng], { icon: avatarIcon(m) })
                .addTo(mapInstance.current)
                .bindPopup(`<b>${m.name}</b><br>Group ${m.group} · ${m.status}`);
        });

        L.marker([21.415, 39.826], { icon: sosIcon() })
            .addTo(mapInstance.current)
            .bindPopup("<b>SOS Alert</b><br>Masjid Al-Haram area");

        return () => {
            mapInstance.current?.remove();
            mapInstance.current = null;
        };
    }, []);

    return (
        <div className="bg-white rounded-2xl border my-5 max-h-[80vh] border-gray-200 overflow-hidden">
            {/* Map + Sidebar */}
            <div className="flex h-full" >
                {/* Map */}
                <div className="relative flex-1">
                    {/* Map/Satellite toggle */}
                    <div className="absolute top-3 left-3 z-[999] flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        {["Map", "Satellite"].map((t) => (
                            <button
                                key={t}
                                onClick={() => setMapType(t.toLowerCase())}
                                className={`px-4 py-1.5 text-xs font-semibold transition-colors ${mapType === t.toLowerCase()
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div ref={mapRef} style={{ height: "100%", width: "100%" }} />

                    {/* Legend */}
                    <div className="absolute bottom-0 left-0 right-0 z-[999] bg-white/90 border-t border-gray-200 px-4 py-2 flex flex-wrap gap-x-5 gap-y-1">
                        {LEGEND.map((l) => (
                            <span key={l.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                                {l.label}
                            </span>
                        ))}
                        <span className="flex items-center gap-1.5 text-xs text-gray-600">
                            <span className="text-base leading-none">📱</span> Phone
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-600">
                            <span className="text-base leading-none">⚙️</span> Tracker
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-600">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> SOS
                        </span>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-52 border-l border-gray-200 flex flex-col overflow-hidden bg-white">
                    <div className="flex-1 overflow-y-auto p-3 space-y-4">

                        {/* Agency selector */}
                        <div>
                            <p className="text-xs text-gray-500 font-medium mb-1.5">Select Agency</p>
                            <select
                                value={agency}
                                onChange={(e) => setAgency(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                            >
                                {AGENCIES.map((a) => <option key={a}>{a}</option>)}
                            </select>
                        </div>

                        {/* Group filter */}
                        <div>
                            <p className="text-xs text-gray-500 font-medium mb-2">Group Filter</p>
                            <div className="space-y-1.5">
                                {GROUPS.map((g) => (
                                    <label key={g.label} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={activeGroups.includes(g.label.slice(-1))}
                                            onChange={() => toggleGroup(g.label.slice(-1))}
                                            className="rounded"
                                        />
                                        <span
                                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                            style={{ background: g.color }}
                                        />
                                        <span className="text-xs text-gray-700">{g.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-1.5">
                            <div className="bg-gray-50 rounded-lg p-2">
                                <p className="text-[10px] text-gray-500 flex items-center gap-1">👥 Members</p>
                                <p className="text-lg font-bold text-gray-800">{stats.total}</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-2">
                                <p className="text-[10px] text-green-600 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Online
                                </p>
                                <p className="text-lg font-bold text-green-600">{stats.online}</p>
                            </div>
                            <div className="bg-red-50 rounded-lg p-2">
                                <p className="text-[10px] text-red-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /> Offline
                                </p>
                                <p className="text-lg font-bold text-red-500">{stats.offline}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2">
                                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" /> N/A
                                </p>
                                <p className="text-lg font-bold text-gray-400">{stats.na}</p>
                            </div>
                        </div>

                        {/* Member list */}
                        <div>
                            <p className="text-xs font-semibold text-gray-800 mb-2">
                                Members ({stats.total})
                            </p>
                            <div className="space-y-2">
                                {MEMBERS.map((m) => (
                                    <div key={m.name} className="flex items-center gap-2">
                                        <div
                                            className="relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                            style={{ background: m.color }}
                                        >
                                            {m.initials}
                                            <span
                                                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                                                style={{ background: STATUS_COLOR[m.status] }}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-gray-800 truncate">{m.name}</p>
                                            <p className="text-[10px] text-gray-400">{m.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUserMap;