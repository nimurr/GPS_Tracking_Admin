import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const clusterIcon = (count, color) => {
  const colors = {
    blue: '#2563eb',
    green: '#16a34a',
    orange: '#ea580c',
    yellow: '#ca8a04',
    red: '#dc2626',
    purple: '#7c3aed',
  };
  const bg = colors[color] || '#2563eb';
  return L.divIcon({
    className: '',
    html: `<div style="background:${bg};color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.25)">${count}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const alertIcon = () =>
  L.divIcon({
    className: '',
    html: `<div style="background:#f59e0b;color:#fff;border-radius:4px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid #fff;">⚠</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

const kaabahIcon = () =>
  L.divIcon({
    className: '',
    html: `
      <div style="background:#1a1a1a;color:#fff;border-radius:8px;width:48px;height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:22px;border:2.5px solid #fff;">
        🕋
        <div style="font-size:6px;margin-top:1px;white-space:nowrap;">MASJID AL HARAM</div>
      </div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

const pinIcon = (color) => {
  const bg = color === 'red' ? '#dc2626' : '#2563eb';
  return L.divIcon({
    className: '',
    html: `<div style="width:24px;height:24px;background:${bg};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

const MARKERS = [
  { pos: [21.4225, 39.8262], icon: kaabahIcon(),         label: 'Masjid Al Haram' },
  { pos: [21.4545, 39.8200], icon: clusterIcon(8, 'blue'),   label: '8 members' },
  { pos: [21.4380, 39.7950], icon: clusterIcon(12, 'green'),  label: '12 members' },
  { pos: [21.3960, 39.7800], icon: clusterIcon(25, 'blue'),   label: '25 members' },
  { pos: [21.3700, 39.8100], icon: clusterIcon(3, 'orange'),  label: '3 members' },
  { pos: [21.3750, 39.9200], icon: clusterIcon(15, 'green'),  label: '15 members' },
  { pos: [21.4600, 39.9500], icon: clusterIcon(7, 'blue'),    label: '7 members' },
  { pos: [21.3800, 39.8600], icon: alertIcon(),           label: 'Alert zone' },
  { pos: [21.3560, 39.9800], icon: pinIcon('red'),        label: 'SOS Alert – Arafat' },
  { pos: [21.4100, 39.8700], icon: pinIcon('blue'),       label: 'Location pin' },
];

const GrouthAndSubscriptionOverview = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
            <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-1.447-.894L15 9m0 8V9m0 0L9 7" />
          </svg>
          Live Map
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
          View Full Screen
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={[21.3891, 39.8579]}
        zoom={11}
        style={{ height: '480px', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {MARKERS.map((m, i) => (
          <Marker key={i} position={m.pos} icon={m.icon}>
            <Popup>{m.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GrouthAndSubscriptionOverview;