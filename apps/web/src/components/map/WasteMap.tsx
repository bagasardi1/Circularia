"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createIcon = (color: "green" | "amber" | "red") => {
  const colors = {
    green: "#16a34a",
    amber: "#d97706",
    red:   "#dc2626",
  };
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z"
            fill="${colors[color]}" stroke="white" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
    className: "",
  });
};

const getIconColor = (status: string): "green" | "amber" | "red" => {
  if (status === "Critical") return "red";
  if (status === "High")     return "amber";
  return "green";
};

interface WasteMapProps {
  stations: any[];
  onSelectStation: (station: any) => void;
}

export default function WasteMap({ stations, onSelectStation }: WasteMapProps) {
  return (
    <MapContainer
      center={[-6.1988, 106.8310]}
      zoom={13}
      className="w-full h-full"
      style={{ minHeight: "100%", borderRadius: "1.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((s) => (
        <Marker
          key={s.id}
          position={[s.lat, s.lng]}
          icon={createIcon(getIconColor(s.status))}
          eventHandlers={{
            click: () => {
              onSelectStation(s);
            },
          }}
        />
      ))}
    </MapContainer>
  );
}
