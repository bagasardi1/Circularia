"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  X,
  Map,
  Star,
  Sprout,
  Recycle,
  Bookmark,
  Share2,
} from "lucide-react";
import dynamic from "next/dynamic";

const WasteMap = dynamic(() => import("@/components/map/WasteMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium">
      Memuat Peta...
    </div>
  ),
});

const stations = [
  { id: 1, name: "Senen Smart Station",      lat: -6.1954, lng: 106.8450, status: "Normal",   capacity: 45, type: "Mixed",   distance: "0.4 km", hours: "10 PM" },
  { id: 2, name: "Gambir Eco Hub",           lat: -6.1726, lng: 106.8181, status: "High",     capacity: 88, type: "Plastic", distance: "1.2 km", hours: "9 PM"  },
  { id: 3, name: "Menteng Collection Point", lat: -6.1960, lng: 106.8340, status: "Critical", capacity: 96, type: "Organic", distance: "2.0 km", hours: "8 PM"  },
  { id: 4, name: "Sudirman Central",         lat: -6.2088, lng: 106.8200, status: "Normal",   capacity: 12, type: "Mixed",   distance: "0.8 km", hours: "11 PM" },
  { id: 5, name: "Thamrin Station",          lat: -6.2100, lng: 106.8350, status: "Normal",   capacity: 34, type: "Paper",   distance: "1.5 km", hours: "10 PM" },
];

export default function MapPage() {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [saved, setSaved]                     = useState(false);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col gap-6">

        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Collection Map</h1>
            <p className="text-gray-500 text-sm">Peta interaktif titik pengumpulan sampah di Jakarta.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Online
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">

          {/* Map Area */}
          <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-sm relative min-h-[500px]">
             <WasteMap stations={stations} onSelectStation={setSelectedStation} />
          </div>

          {/* Detail Sidebar */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              {selectedStation ? (
                <motion.div
                  key={selectedStation.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="px-6 pt-6 pb-4 flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-emerald-900 leading-tight">
                        {selectedStation.name}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedStation.distance} away • Open until {selectedStation.hours}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedStation(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
                    >
                      <X size={14} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Map Placeholder */}
                  <div className="px-6 mb-4">
                    <div className="w-full h-32 bg-[#C8DDD6] rounded-2xl border-2 border-dashed border-[#A8C4BC] flex items-center justify-center">
                      <Map size={28} className="text-[#8FB0A5]" />
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="px-6 mb-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Current Capacity
                        </span>
                        <span className={`text-sm font-bold ${selectedStation.status === "Critical" ? "text-red-600" : "text-emerald-800"}`}>
                          {selectedStation.capacity}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedStation.capacity}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            selectedStation.status === "Critical"
                              ? "bg-gradient-to-r from-red-500 to-orange-400"
                              : "bg-gradient-to-r from-emerald-800 to-emerald-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reward Multiplier */}
                  <div className="px-6 mb-4">
                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-11 h-11 bg-[#D4E8E0] rounded-xl flex items-center justify-center shrink-0">
                        <Star size={20} className="text-emerald-800 fill-emerald-800" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Reward Multiplier
                        </p>
                        <p className="text-xl font-bold text-emerald-800">2.5x Points</p>
                      </div>
                    </div>
                  </div>

                  {/* Accepted Materials */}
                  <div className="px-6 mb-6 flex-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Accepted Materials
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStation.type === "Mixed" || selectedStation.type === "Organic" ? (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
                          <Sprout size={15} className="text-emerald-700" />
                          <span className="text-xs font-medium text-gray-700">Organic</span>
                        </div>
                      ) : null}
                      {selectedStation.type === "Mixed" || selectedStation.type === "Plastic" ? (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
                          <Recycle size={15} className="text-emerald-700" />
                          <span className="text-xs font-medium text-gray-700">Plastic</span>
                        </div>
                      ) : null}
                      {selectedStation.type === "Paper" ? (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
                          <Recycle size={15} className="text-emerald-700" />
                          <span className="text-xs font-medium text-gray-700">Paper</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="px-6 pb-6 space-y-3">
                    <button className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20">
                      <Navigation size={18} />
                      Start Navigation
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSaved(!saved)}
                        className={`flex-1 border-2 font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                          saved
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <Bookmark size={16} className={saved ? "fill-emerald-700 text-emerald-700" : ""} />
                        {saved ? "Saved" : "Save"}
                      </button>
                      <button className="w-14 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-2xl flex items-center justify-center transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl border border-gray-100 h-full flex flex-col items-center justify-center text-center p-10 shadow-sm"
                >
                  <div className="w-16 h-16 bg-[#D4E8E0] rounded-2xl flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-emerald-700" />
                  </div>
                  <p className="text-base font-bold text-gray-800 mb-1">Pilih Stasiun</p>
                  <p className="text-xs text-gray-400 max-w-[160px] leading-relaxed">
                    Klik marker di peta untuk melihat detail stasiun.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
