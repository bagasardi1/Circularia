"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  Filter, 
  Layers, 
  Info, 
  Navigation, 
  Trash2, 
  AlertCircle,
  Activity,
  Battery,
  Cloud
} from 'lucide-react';

const stations = [
  { id: 1, name: 'Senen Smart Station', x: '25%', y: '30%', status: 'Normal', capacity: '45%', type: 'Mixed' },
  { id: 2, name: 'Gambir Eco Hub', x: '60%', y: '45%', status: 'High', capacity: '88%', type: 'Plastic' },
  { id: 3, name: 'Menteng Collection Point', x: '40%', y: '70%', status: 'Critical', capacity: '96%', type: 'Organic' },
  { id: 4, name: 'Sudirman Central', x: '75%', y: '20%', status: 'Normal', capacity: '12%', type: 'Mixed' },
  { id: 5, name: 'Thamrin Station', x: '15%', y: '60%', status: 'Normal', capacity: '34%', type: 'Paper' },
];

const StationMarker = ({ station, isSelected, onSelect }: any) => {
  const getStatusColor = (status: string) => {
    if (status === 'Critical') return 'bg-red-500';
    if (status === 'High') return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div 
      className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
      style={{ left: station.x, top: station.y }}
      onClick={() => onSelect(station)}
    >
      <div className="relative">
        <div className={`w-4 h-4 rounded-full ${getStatusColor(station.status)} shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-white`} />
        {station.status !== 'Normal' && (
          <div className={`absolute -inset-2 rounded-full ${getStatusColor(station.status)} opacity-30 animate-ping`} />
        )}
      </div>
      {isSelected && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-white/20 px-3 py-1 rounded-lg text-xs font-bold shadow-2xl">
          {station.name}
        </div>
      )}
    </div>
  );
};

const MapPage = () => {
  const [selectedStation, setSelectedStation] = useState<any>(null);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Smart Collection Map</h1>
            <p className="text-slate-500">Interactive Digital Twin of waste collection points in Jakarta.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/5 rounded-xl">
              <Cloud size={16} className="text-cyan-400" />
              <span className="text-sm font-medium">Jakarta: 28°C / Clear</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/5 rounded-xl">
               <Activity size={16} className="text-green-400" />
               <span className="text-sm font-medium">System Online</span>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[600px]">
          {/* Main Map Area */}
          <div className="lg:col-span-3 glassmorphism rounded-[3rem] border border-white/5 bg-slate-950 relative overflow-hidden group">
            {/* Map Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            {/* Simulated Map SVG Background (Simplified Cityscape) */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 600">
               <path d="M100 100 L200 150 L300 120 L400 180 L500 140 L700 200" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="5 5" />
               <path d="M50 400 L150 450 L450 420 L550 480 L750 450" stroke="#06B6D4" strokeWidth="2" fill="none" strokeDasharray="5 5" />
               <rect x="200" y="200" width="100" height="150" fill="white" opacity="0.1" />
               <rect x="500" y="300" width="150" height="100" fill="white" opacity="0.1" />
            </svg>

            {/* Markers */}
            {stations.map(station => (
              <StationMarker 
                key={station.id} 
                station={station} 
                isSelected={selectedStation?.id === station.id}
                onSelect={setSelectedStation}
              />
            ))}

            {/* Map Controls */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <button className="p-3 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-slate-800 transition-colors shadow-xl">
                 <Search className="w-5 h-5" />
              </button>
              <button className="p-3 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-slate-800 transition-colors shadow-xl">
                 <Layers className="w-5 h-5" />
              </button>
              <button className="p-3 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-slate-800 transition-colors shadow-xl">
                 <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-4">
               <div className="glassmorphism-dark px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold text-slate-400">Normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-bold text-slate-400">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-[10px] font-bold text-slate-400">Critical</span>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-6 right-6 flex items-center gap-2 text-xs text-slate-500 font-mono">
               <span>LAT: -6.2088</span>
               <span>LNG: 106.8456</span>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {selectedStation ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 h-full flex flex-col gap-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Trash2 className="w-6 h-6 text-primary" />
                    </div>
                    <button onClick={() => setSelectedStation(null)} className="text-slate-500 hover:text-white">
                      <AlertCircle size={20} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-1">{selectedStation.name}</h3>
                    <p className="text-sm text-slate-500">Jakarta, Indonesia • ID: CST-{selectedStation.id}042</p>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-400">Current Capacity</span>
                          <span className={`text-sm font-bold ${selectedStation.status === 'Critical' ? 'text-red-500' : 'text-primary'}`}>
                            {selectedStation.capacity}
                          </span>
                       </div>
                       <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: selectedStation.capacity }}
                            className={`h-full ${selectedStation.status === 'Critical' ? 'bg-red-500' : 'bg-primary'}`}
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-2 text-slate-400 mb-1">
                             <Activity size={14} />
                             <span className="text-[10px] uppercase font-bold tracking-wider">Health</span>
                          </div>
                          <p className="text-sm font-bold">Excellent</p>
                       </div>
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-2 text-slate-400 mb-1">
                             <Battery size={14} />
                             <span className="text-[10px] uppercase font-bold tracking-wider">Power</span>
                          </div>
                          <p className="text-sm font-bold">98% Solar</p>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Waste Breakdown</p>
                       <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-xs text-slate-300">Plastic</span>
                          <span className="text-xs font-bold">45.2 kg</span>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-xs text-slate-300">Organic</span>
                          <span className="text-xs font-bold">12.8 kg</span>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-xs text-slate-300">Other</span>
                          <span className="text-xs font-bold">4.1 kg</span>
                       </div>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-eco-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all">
                     <Navigation size={18} />
                     Dispatch Driver
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glassmorphism p-12 rounded-[2.5rem] border border-white/5 bg-slate-900/20 h-full flex flex-col items-center justify-center text-center"
                >
                  <MapPin className="w-16 h-16 text-slate-600 mb-4 animate-bounce" />
                  <p className="text-lg font-bold text-slate-400">Select a Station</p>
                  <p className="text-sm text-slate-500 max-w-[200px]">Click on a marker to view realtime data and station status.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapPage;
