"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import {
  Plus,
  Truck,
  ShoppingBag,
  Recycle,
  ScanLine,
  X,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Map as MapIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockActivities = [
  {
    icon: <Recycle size={18} />,
    bg: "bg-emerald-100 text-emerald-700",
    title: "Pengambilan Kertas",
    subtitle: "Kemarin 2:30 PM",
    points: "+45 pts",
    positive: true,
  },
  {
    icon: <ShoppingBag size={18} />,
    bg: "bg-amber-100 text-amber-700",
    title: "Toko",
    subtitle: "Pembelian Botol Air",
    points: "-120 pts",
    positive: false,
  },
  {
    icon: <Sparkles size={18} />,
    bg: "bg-teal-100 text-teal-700",
    title: "AI Scan Streak",
    subtitle: "3 Hari Scan",
    points: "+10 pts",
    positive: true,
  }
];

const weeklyData = [
  { label: "WEEK 1", height: 35, active: false },
  { label: "WEEK 2", height: 60, active: false },
  { label: "WEEK 3", height: 45, active: false },
  { label: "WEEK 4", height: 85, active: true, value: "22kg" },
  { label: "WEEK 5", height: 50, active: false },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMapSuccess, setIsMapSuccess] = useState(false);

  // States for Pickup
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupError, setPickupError] = useState<string | null>(null);

  // States for Collection Point (Map)
  const [cpName, setCpName] = useState("");
  const [cpAddress, setCpAddress] = useState("");
  const [cpLat, setCpLat] = useState("");
  const [cpLng, setCpLng] = useState("");
  const [cpWasteType, setCpWasteType] = useState("MIXED");
  const [cpError, setCpError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Pick up scheduling function
  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setPickupError(null);
    try {
      const token = localStorage.getItem("circularia_token");
      if (!token) throw new Error("Anda harus login.");
      if (!pickupDate || !pickupTime) throw new Error("Pilih tanggal dan waktu.");

      const dateTimeString = `${pickupDate}T${pickupTime}:00.000Z`;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      
      const response = await fetch(`${apiUrl}/pickups`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ address: pickupAddress, scheduledAt: dateTimeString }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menjadwalkan pickup.");
      }

      setIsSuccess(true);
      setPickupAddress(""); setPickupDate(""); setPickupTime("");
      setTimeout(() => { setIsSuccess(false); setIsModalOpen(false); }, 2000);
    } catch (err: any) {
      setPickupError(err.message || "Terjadi kesalahan.");
    }
  };

  // Add new Collection Point function
  const handleAddMapPoint = async (e: React.FormEvent) => {
    e.preventDefault();
    setCpError(null);
    try {
      const token = localStorage.getItem("circularia_token");
      if (!token) throw new Error("Anda harus login.");
      if (!cpName || !cpAddress || !cpLat || !cpLng) throw new Error("Mohon lengkapi semua data.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      
      const response = await fetch(`${apiUrl}/collection-points`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          name: cpName,
          address: cpAddress,
          latitude: parseFloat(cpLat),
          longitude: parseFloat(cpLng),
          wasteType: cpWasteType,
          capacity: 100
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mendaftarkan titik lokasi.");
      }

      setIsMapSuccess(true);
      setCpName(""); setCpAddress(""); setCpLat(""); setCpLng("");
      setTimeout(() => { setIsMapSuccess(false); setIsMapModalOpen(false); }, 2000);
    } catch (err: any) {
      setCpError(err.message || "Terjadi kesalahan.");
    }
  };

  const getLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCpLat(position.coords.latitude.toFixed(6));
          setCpLng(position.coords.longitude.toFixed(6));
          setIsLocating(false);
        },
        (error) => {
          setCpError("Gagal mendapatkan lokasi. Pastikan GPS aktif.");
          setIsLocating(false);
        }
      );
    } else {
      setCpError("Browser tidak mendukung geolokasi.");
      setIsLocating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Halo, {user?.name || "Eco Hero"}</h1>
            <p className="text-gray-500 text-sm">
              Anda telah menghemat 42kg CO2 bulan ini. Teruskan kerja bagusnya!
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsMapModalOpen(true)}
              className="bg-emerald-900 hover:bg-emerald-800 text-white px-5 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2 transition-all self-start sm:self-center border border-emerald-200"
            >
              <MapPin size={18} /> Atur Lokasiku
            </button>
           
          </div>
        </header>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Stats & Impact Chart */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Points Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 relative overflow-hidden shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-2">
                    POINT KAMU SEKARANG
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-6xl font-black text-[#05422C] tracking-tight">1,250</h2>
                    <span className="text-gray-500 text-sm font-medium">Eco Points</span>
                  </div>
                </div>
                <div className="bg-[#E6F4EA] text-[#05422C] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">
                  MASTER TIER PROGRESS
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-3.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#34A853] w-[65%] rounded-full" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 font-semibold">
                <span>Peringkat: Level 4 Recycler</span>
                <span className="text-[#05422C]">250 point menuju Master Recycler</span>
              </div>
            </div>

            {/* Impact Chart */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-900">Grafik Impact</h3>
                <div className="flex gap-2">
                  <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-semibold cursor-pointer">Juni</span>
                  <span className="text-xs bg-[#E6F4EA] text-[#05422C] px-3 py-1.5 rounded-full font-semibold cursor-pointer">Juli</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium mb-8">Data pengurangan limbah (Mingguan)</p>
              
              <div className="h-56 flex items-end gap-5 justify-between px-4">
                {weeklyData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center gap-3 group">
                    <div className="w-full flex flex-col items-center justify-end relative h-full">
                      {data.active && (
                        <span className="text-xs font-bold text-[#05422C] mb-1.5 absolute -top-6">
                          {data.value}
                        </span>
                      )}
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-300 ${
                          data.active ? 'bg-[#05422C]' : 'bg-[#E5E9E7]'
                        }`}
                        style={{ height: `${data.height}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{data.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Actions & Recent Activities */}
          <div className="space-y-8">
            
            {/* Actions Panel */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tindakan</p>
              
              {/* Pickup Samph Card */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#05422C] hover:bg-[#043322] text-white p-6 rounded-3xl flex items-center justify-between transition-all hover:scale-[1.01] active:scale-95 group shadow-sm text-left"
              >
                <div>
                  <h4 className="font-bold text-base mb-1">Pickup Sampah</h4>
                  <p className="text-xs text-emerald-200">Schedule a collection</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Truck size={22} />
                </div>
              </button>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#E6F4EA] hover:bg-[#d4edd9] text-[#05422C] p-5 rounded-3xl flex flex-col justify-between items-start transition-all hover:scale-[1.02] h-28 text-left font-bold">
                  <ScanLine size={22} className="text-[#05422C]" />
                  <span className="text-sm">AI Scan</span>
                </button>
                <button className="bg-[#F6EFEA] hover:bg-[#ebdcd1] text-[#704224] p-5 rounded-3xl flex flex-col justify-between items-start transition-all hover:scale-[1.02] h-28 text-left font-bold">
                  <ShoppingBag size={22} className="text-[#704224]" />
                  <span className="text-sm">Shop</span>
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 text-base">Aktifitas terbaru</h3>
                <button className="text-xs text-[#05422C] font-bold hover:underline">View All</button>
              </div>

              <div className="space-y-5">
                {mockActivities.map((act, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${act.bg} shrink-0`}>
                        {act.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">{act.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{act.subtitle}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold ${act.positive ? "text-emerald-700" : "text-red-600"}`}>
                      {act.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Map Point Modal */}
      <AnimatePresence>
        {isMapModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMapModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden p-8"
            >
              <button 
                onClick={() => setIsMapModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>

              {!isMapSuccess ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Atur Lokasi Anda di Peta</h2>
                    <p className="text-slate-500 text-sm mt-1">Daftarkan atau perbarui lokasi rumah Anda sebagai titik jemput.</p>
                  </div>

                  <form onSubmit={handleAddMapPoint} className="space-y-4">
                    {cpError && (
                      <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-2">
                        <AlertCircle size={16} /> {cpError}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nama Tempat</label>
                      <input 
                        required placeholder="Misal: Rumah Budi" value={cpName} onChange={(e) => setCpName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:border-emerald-500 transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alamat Lengkap</label>
                      <textarea 
                        required placeholder="Jl. Raya No. 123..." value={cpAddress} onChange={(e) => setCpAddress(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:border-emerald-500 transition-all min-h-[60px] resize-none text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Latitude</label>
                        <input required value={cpLat} onChange={(e) => setCpLat(e.target.value)} placeholder="-6.2000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Longitude</label>
                        <input required value={cpLng} onChange={(e) => setCpLng(e.target.value)} placeholder="106.8166" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm" />
                      </div>
                    </div>
                    
                    <button type="button" onClick={getLocation} className="w-full py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors flex justify-center items-center gap-2">
                       <MapPin size={14} /> {isLocating ? "Mencari Lokasi..." : "Gunakan Lokasi Saat Ini"}
                    </button>

                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Jenis Sampah Utama</label>
                      <select required value={cpWasteType} onChange={(e) => setCpWasteType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm">
                        <option value="MIXED">Campuran (Mixed)</option>
                        <option value="PLASTIC">Plastik</option>
                        <option value="ORGANIC">Organik</option>
                        <option value="PAPER">Kertas</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full py-4 mt-2 bg-[#05422C] text-white rounded-2xl font-bold hover:scale-[1.01] transition-all text-sm">
                      Daftarkan Lokasi
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Lokasi Berhasil Disimpan!</h2>
                  <p className="text-slate-500 text-sm mt-1 max-w-xs">Lokasi Anda kini sudah terdaftar di Smart Collection Map kami.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Pickup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden p-8"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>

              {!isSuccess ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Jadwalkan Pickup</h2>
                    <p className="text-slate-500 text-sm mt-1">Lengkapi alamat dan waktu pengambilan sampah Anda.</p>
                  </div>

                  <form onSubmit={handleSchedule} className="space-y-4">
                    {pickupError && (
                      <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-2">
                        <AlertCircle size={16} /> {pickupError}
                      </div>
                    )}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alamat Pengambilan</label>
                      <textarea 
                        required placeholder="Alamat lengkap Anda..." value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:border-emerald-500 transition-all min-h-[80px] resize-none text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggal</label>
                        <input type="date" required value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:border-emerald-500 transition-all text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Waktu</label>
                        <select required value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:border-emerald-500 transition-all text-sm">
                          <option value="">Pilih Jam</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full py-4 mt-2 bg-[#05422C] text-white rounded-2xl font-bold hover:scale-[1.01] transition-all text-sm">
                      Konfirmasi Jadwal
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Jadwal Berhasil Dibuat!</h2>
                  <p className="text-slate-500 text-sm mt-1 max-w-xs">Driver kami akan segera menuju lokasi Anda sesuai jadwal.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </DashboardLayout>
  );
}

