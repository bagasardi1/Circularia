"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Filter, 
  Map as MapIcon,
  Navigation,
  X,
  Info,
  Maximize2
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for Map to avoid SSR issues
const WasteMap = dynamic(() => import("@/components/map/WasteMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center text-slate-400 font-bold italic">Menghubungkan ke Satelit...</div>
});

const initialStations = [
  { id: 1, lat: -6.1850, lng: 106.8320, status: "Normal", name: "Menteng Station #042", address: "Jl. HOS Cokroaminoto No. 5", capacity: "45%" },
  { id: 2, lat: -6.1880, lng: 106.8250, status: "High", name: "Sabang Station #015", address: "Jl. H. Agus Salim No. 12", capacity: "82%" },
  { id: 3, lat: -6.1920, lng: 106.8230, status: "Critical", name: "Sarinah Station #088", address: "Jl. M.H. Thamrin No. 11", capacity: "95%" },
];

const CollectionManagementPage = () => {
  const [stations, setStations] = useState(initialStations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 font-outfit">Collection Point Management</h1>
            <p className="text-slate-500 text-sm">Monitor dan kelola lokasi fisik Smart Station Circularia.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50">
                <Maximize2 size={18} /> Fullscreen
             </button>
             <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 shadow-lg shadow-emerald-900/20 transition-all"
             >
                <Plus size={18} /> Tambah Station
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
            {/* Map View */}
            <div className="lg:col-span-2 h-[650px] bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                <WasteMap stations={stations} onSelectStation={(s) => console.log(s)} />
                
                {/* Floating Map Controls */}
                <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <h4 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Live Monitor</h4>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium max-w-[150px]">3 Station Aktif • 1 Dalam Perbaikan</p>
                    </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Normal
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-amber-500" /> High
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                        <div className="w-2 h-2 rounded-full bg-red-500" /> Critical
                    </div>
                </div>
            </div>

            {/* List Management */}
            <div className="flex flex-col gap-6 overflow-hidden">
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Daftar Smart Station</h3>
                        <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase tracking-wider">{stations.length} Lokasi</span>
                    </div>

                    <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                        {stations.map((s) => (
                            <div key={s.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                            s.status === 'Critical' ? "bg-red-50 text-red-600" : s.status === 'High' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                        )}>
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-900 transition-colors">{s.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{s.address}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                className={cn("h-full rounded-full", s.status === 'Critical' ? "bg-red-500" : "bg-emerald-500")} 
                                                initial={{ width: 0 }}
                                                animate={{ width: s.capacity }}
                                                transition={{ duration: 1 }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500">{s.capacity}</span>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                            <Edit size={14} />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shrink-0">
                    <div className="absolute -right-4 -bottom-4 p-8 opacity-10">
                        <Navigation size={120} className="rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <Navigation size={20} className="text-emerald-400" /> Smart Logistic
                        </h4>
                        <p className="text-xs text-emerald-100/60 leading-relaxed mb-6">Hubungkan data kapasitas station dengan rute driver untuk efisiensi maksimal.</p>
                        <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
                            Aktifkan AI Dispatcher
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Add Station Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 opacity-50" />
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-8">
                       <div>
                          <h3 className="text-2xl font-black text-gray-900">New Station</h3>
                          <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">Registrasi Titik Koleksi</p>
                       </div>
                       <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X size={20} className="text-slate-400" /></button>
                    </div>
                    <div className="space-y-5">
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nama Station</label>
                          <input type="text" placeholder="Contoh: Menteng Central #42" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Koordinat GPS</label>
                          <div className="relative">
                             <input type="text" placeholder="-6.185, 106.832" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all" />
                             <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          </div>
                       </div>
                       <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                          <Info size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-emerald-700 leading-relaxed font-medium">Titik baru akan langsung muncul di peta driver Circularia setelah disimpan.</p>
                       </div>
                       <button className="w-full py-5 bg-emerald-900 text-white rounded-2xl font-bold text-sm mt-4 shadow-xl shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all">Simpan & Publikasikan</button>
                    </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default CollectionManagementPage;
