"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Plus,
  Truck,
  ShoppingBag,
  Recycle,
  CalendarDays,
  Sparkles,
  ScanLine,
  ChevronRight,
  X,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Map as MapIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

// Dynamic import for Map to avoid SSR issues
const WasteMap = dynamic(() => import("@/components/map/WasteMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center text-slate-400">Memuat Peta...</div>
});

const mockStations = [
  { id: 1, lat: -6.1988, lng: 106.8310, status: "Normal", name: "Menteng Station" },
  { id: 2, lat: -6.1945, lng: 106.8230, status: "High", name: "Sarinah Station" },
  { id: 3, lat: -6.2020, lng: 106.8280, status: "Critical", name: "Sudirman Station" },
];

/* ---------- sub-components ---------- */

const ActivityItem = ({
  icon,
  bg,
  title,
  subtitle,
  points,
  positive,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  subtitle: string;
  points: string;
  positive: boolean;
}) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
    <span className={`text-xs font-bold ${positive ? "text-emerald-700" : "text-red-600"}`}>
      {points}
    </span>
  </div>
);

/* ---------- page ---------- */

const weeklyData = [
  { week: 1, height: 40 },
  { week: 2, height: 55 },
  { week: 3, height: 70 },
  { week: 4, height: 100 },
];

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Halo, Eco Hero 👋</h1>
            <p className="text-gray-500 text-sm">
              Anda telah menghemat 42 kg CO₂ bulan ini. Teruskan kerja bagusnya!
            </p>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — Stats & Chart */}
          <div className="lg:col-span-2 space-y-6">

            {/* Points Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                <Recycle size={200} />
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    Point Kamu Sekarang
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-5xl font-extrabold text-emerald-900">1,250</h2>
                    <span className="text-emerald-600 font-medium">Eco Points</span>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                  MASTER TIER PROGRESS
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 w-[65%] rounded-full" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>Peringkat: Level 4 Recycler</span>
                <span className="text-emerald-700">250 point menuju Master Recycler</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Impact Chart Card */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Dampak Mingguan</h3>
                    <button className="text-xs font-bold text-emerald-700">Detail</button>
                  </div>
                  <div className="flex items-end justify-around gap-2 h-32">
                    {weeklyData.map((d, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className={`w-full rounded-xl transition-all ${
                            index === 3 ? "bg-emerald-900" : "bg-gray-100"
                          }`}
                          style={{ height: `${d.height}%` }}
                        />
                        <span className="text-[10px] font-bold text-gray-400">W{d.week}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Map Card */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Stasiun Terdekat</h3>
                    <MapIcon size={18} className="text-emerald-600" />
                  </div>
                  <div className="flex-1 min-h-[120px] rounded-2xl overflow-hidden relative border border-gray-100">
                     <WasteMap stations={mockStations} onSelectStation={() => {}} />
                  </div>
                </div>
            </div>
          </div>

          {/* RIGHT — Actions & Activity */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 ml-1">Apa yang bisa dilakukan?</h3>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Pickup */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="col-span-2 w-full text-left bg-emerald-900 text-white p-5 rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <div>
                  <h4 className="font-bold text-lg mb-1">Pickup Sampah</h4>
                  <p className="text-emerald-200 text-sm">Jadwalkan penjemputan sampah sekarang</p>
                </div>
                <div className="bg-white/10 p-2 rounded-lg">
                  <Truck size={24} />
                </div>
              </button>

              {/* AI Scan */}
              <div className="bg-emerald-100 text-emerald-900 p-4 rounded-2xl flex flex-col justify-between h-32 cursor-pointer hover:bg-emerald-200 transition-colors">
                <div className="bg-white/50 w-10 h-10 rounded-full flex items-center justify-center">
                  <ScanLine size={20} />
                </div>
                <span className="font-bold">AI Scan</span>
              </div>

              {/* Shop */}
              <div className="bg-[#F2EBE5] text-[#5C4033] p-4 rounded-2xl flex flex-col justify-between h-32 cursor-pointer hover:brightness-95 transition-all">
                <div className="bg-white/50 w-10 h-10 rounded-full flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
                <span className="font-bold">Marketplace</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Aktifitas terbaru</h3>
                <button className="text-xs font-bold text-emerald-700 hover:text-emerald-900">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                <ActivityItem
                  icon={<Recycle className="text-emerald-600" size={18} />}
                  bg="bg-emerald-100"
                  title="Pengambilan Kertas"
                  subtitle="Kemarin 2:30 PM"
                  points="+45 pts"
                  positive
                />
                <ActivityItem
                  icon={<CalendarDays className="text-red-800" size={18} />}
                  bg="bg-red-100"
                  title="Toko"
                  subtitle="Pembelian Botol Air"
                  points="-120 pts"
                  positive={false}
                />
                <ActivityItem
                  icon={<Sparkles className="text-emerald-800" size={18} />}
                  bg="bg-emerald-100"
                  title="AI Scan Streak"
                  subtitle="3 Hari Scan"
                  points="+10 pts"
                  positive
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pickup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-10">
                {!isSuccess ? (
                  <>
                    <div className="mb-8">
                      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 mb-4">
                        <Truck size={28} />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">Jadwalkan Pickup</h2>
                      <p className="text-slate-500">Isi detail pengambilan sampah Anda.</p>
                    </div>

                    <form onSubmit={handleSchedule} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Pengambilan</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                          <textarea 
                            required
                            placeholder="Jl. Raya Circularia No. 123, Kota Eco"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 min-h-[100px] resize-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tanggal</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                            <input 
                              type="date" 
                              required
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Waktu</label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                            <select 
                              required
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 appearance-none"
                            >
                              <option value="">Pilih Jam</option>
                              <option value="09:00">09:00 AM</option>
                              <option value="11:00">11:00 AM</option>
                              <option value="13:00">01:00 PM</option>
                              <option value="15:00">03:00 PM</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-5 bg-emerald-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Konfirmasi Jadwal <ArrowRight size={18} />
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Jadwal Berhasil Dibuat!</h2>
                    <p className="text-slate-500 max-w-xs">Driver kami akan segera menuju lokasi Anda sesuai jadwal.</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
