"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, MapPin, Truck, ChevronRight, X, Info } from "lucide-react";

// Fix for leaflet default icons
const driverIcon = L.divIcon({
  html: `<div class="w-10 h-10 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  className: "",
});

const stationIcon = (color: string) => L.divIcon({
  html: `<div class="w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center" style="background-color: ${color}"><div class="w-2 h-2 bg-white rounded-full"></div></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  className: "",
});

const collectionPoints = [
  { id: 1, name: "Smart Station #042 - Menteng", lat: -6.1850, lng: 106.8320, status: "Critical", weight: "120 kg", address: "Jl. HOS Cokroaminoto No. 5" },
  { id: 2, name: "Smart Station #015 - Sabang", lat: -6.1880, lng: 106.8250, status: "High", weight: "85 kg", address: "Jl. H. Agus Salim No. 12" },
  { id: 3, name: "Smart Station #088 - Sarinah", lat: -6.1920, lng: 106.8230, status: "Normal", weight: "30 kg", address: "Jl. M.H. Thamrin No. 11" },
  { id: 4, name: "Smart Station #102 - Sudirman", lat: -6.2020, lng: 106.8230, status: "High", weight: "92 kg", address: "Jl. Jenderal Sudirman No. 25" },
];

const driverPosition: [number, number] = [-6.2100, 106.8270];

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15);
  }, [center, map]);
  return null;
}

export default function DriverRoutesPage() {
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [route, setRoute] = useState<[number, number][] | null>(null);

  const handleSelectPoint = (point: any) => {
    setSelectedPoint(point);
    // Simulate route calculation (straight line for demo, could use OSRM API)
    setRoute([driverPosition, [point.lat, point.lng]]);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-140px)] gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 font-outfit">Navigasi Rute Koleksi</h1>
            <p className="text-slate-500 text-sm">Pilih titik penjemputan untuk melihat rute tercepat.</p>
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-200 flex items-center gap-2">
             <Navigation size={14} className="animate-pulse" /> SISTEM NAVIGASI AKTIF
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:row gap-6 overflow-hidden">
          {/* Map Section */}
          <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <MapContainer
              center={driverPosition}
              zoom={13}
              className="w-full h-full"
              style={{ zIndex: 1 }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapController center={selectedPoint ? [selectedPoint.lat, selectedPoint.lng] : driverPosition} />

              {/* Driver Marker */}
              <Marker position={driverPosition} icon={driverIcon} />

              {/* Collection Point Markers */}
              {collectionPoints.map((point) => (
                <Marker
                  key={point.id}
                  position={[point.lat, point.lng]}
                  icon={stationIcon(point.status === "Critical" ? "#ef4444" : point.status === "High" ? "#f59e0b" : "#10b981")}
                  eventHandlers={{
                    click: () => handleSelectPoint(point),
                  }}
                />
              ))}

              {/* Route Polyline */}
              {route && (
                <Polyline 
                  positions={route} 
                  color="#2563eb" 
                  weight={5} 
                  opacity={0.6} 
                  dashArray="10, 10"
                />
              )}
            </MapContainer>

            {/* Float Info Card */}
            <AnimatePresence>
              {selectedPoint && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  className="absolute bottom-6 left-6 right-6 lg:right-auto lg:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-[1000]"
                >
                  <button 
                    onClick={() => { setSelectedPoint(null); setRoute(null); }}
                    className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full"
                  >
                    <X size={18} className="text-slate-400" />
                  </button>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">{selectedPoint.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{selectedPoint.address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status Muatan</p>
                      <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-md",
                        selectedPoint.status === "Critical" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                      )}>{selectedPoint.status}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Berat</p>
                      <p className="text-sm font-bold text-gray-900">{selectedPoint.weight}</p>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    Mulai Navigasi Sekarang <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* List Sidebar */}
          <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto pr-2">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
               <Truck size={18} className="text-emerald-500" /> Titik Koleksi Terdekat
            </h3>
            
            {collectionPoints.map((point) => (
              <button
                key={point.id}
                onClick={() => handleSelectPoint(point)}
                className={cn(
                  "p-5 rounded-2xl border transition-all text-left group",
                  selectedPoint?.id === point.id 
                    ? "bg-blue-50 border-blue-200 shadow-sm" 
                    : "bg-white border-slate-100 hover:border-blue-100"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                   <span className={cn(
                     "text-[8px] font-bold px-2 py-0.5 rounded-full uppercase",
                     point.status === "Critical" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                   )}>{point.status}</span>
                   <p className="text-[10px] font-bold text-slate-400">1.2 KM</p>
                </div>
                <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">{point.name}</h4>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{point.address}</p>
              </button>
            ))}

            <div className="mt-auto p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
               <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
               <p className="text-[10px] text-amber-700 leading-relaxed">Peta ini diperbarui setiap 30 detik berdasarkan sensor level sampah di Smart Station.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
