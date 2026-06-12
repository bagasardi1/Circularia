"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  MapPin, 
  Truck, 
  Settings, 
  CheckCircle2, 
  Package,
  ShoppingBag,
  Clock,
  ShieldCheck,
  User,
  ArrowRight,
  Factory,
  Store,
  RefreshCcw,
  Zap,
  ArrowLeft,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function TrackingPage() {
  const { user } = useAuth();
  
  // State untuk Data Pickups
  const [pickups, setPickups] = useState<any[]>([]);
  const [loadingPickups, setLoadingPickups] = useState(true);
  const [errorPickups, setErrorPickups] = useState<string | null>(null);

  // State untuk Pickup Terpilih
  const [selectedPickup, setSelectedPickup] = useState<any | null>(null);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const token = localStorage.getItem("circularia_token");
        if (!token) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://103-253-213-183.nip.io/api";
        const response = await fetch(`${apiUrl}/pickups`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPickups(data);
        } else {
          setErrorPickups("Gagal memuat daftar limbah.");
        }
      } catch (err) {
        setErrorPickups("Terjadi kesalahan koneksi.");
      } finally {
        setLoadingPickups(false);
      }
    };

    fetchPickups();
  }, []);

  // Handler kembali ke daftar
  const handleBackToList = () => {
    setSelectedPickup(null);
  };

  // ----- VIEW: DAFTAR LIMBAH -----
  if (!selectedPickup) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <header className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lacak Limbah Anda</h1>
            <p className="text-gray-500 text-sm">
              Pilih histori pickup atau laporan limbah yang sedang berlangsung untuk melihat perjalanannya.
            </p>
          </header>

          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100">
            {loadingPickups ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <RefreshCcw className="animate-spin mb-4" size={32} />
                <p className="text-sm">Memuat data limbah...</p>
              </div>
            ) : errorPickups ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
                <AlertCircle size={20} />
                {errorPickups}
              </div>
            ) : pickups.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <Package size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Belum ada aktivitas</h3>
                <p className="text-sm text-gray-500 max-w-sm">Anda belum memiliki jadwal pickup atau laporan limbah. Coba jadwalkan pickup di dashboard.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pickups.map((pickup) => (
                  <button 
                    key={pickup.id}
                    onClick={() => setSelectedPickup(pickup)}
                    className="w-full text-left bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
                        <Truck size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                            pickup.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 
                            pickup.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : pickup.status === 'COLLECTED' ? 'bg-blue-100 text-blue-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {pickup.status === 'COLLECTED' ? 'DIJEMPUT' : pickup.status}
                          </span>
                          <span className="text-xs text-slate-500 font-medium font-mono">
                            ID: {pickup.id.split('-')[0].toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900">{pickup.collectionPoint?.address || 'Alamat tidak tersedia'}</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(pickup.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          {pickup.scheduledAt && (
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              {new Date(pickup.scheduledAt).toLocaleTimeString("id-ID", { hour: '2-digit', minute:'2-digit' })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-none border-slate-200 pt-3 sm:pt-0 mt-3 sm:mt-0 text-emerald-600 font-bold text-sm">
                      <span className="sm:hidden text-xs text-slate-500">Lacak perjalanan</span>
                      <span>Lihat Detail</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ----- VIEW: DETAIL PELACAKAN (Original Logic Adapted) -----
  
  // Adapt status from DB to Journey mock
  const isCompleted = selectedPickup.status === 'COMPLETED';
  const isPending = selectedPickup.status === 'PENDING';
  
  const wasteJourney = [
    { id: 'collection', label: 'Collection Point', icon: MapPin, status: isPending ? 'current' : 'completed', time: 'Jadwal Pickup', desc: `Lokasi: ${selectedPickup.collectionPoint?.address}` },
    { id: 'driver', label: 'Pickup Driver', icon: Truck, status: isCompleted ? 'completed' : isPending ? 'pending' : 'current', time: selectedPickup.status === 'COLLECTED' ? 'Dijemput' : 'Dalam Perjalanan', desc: selectedPickup.status === 'COLLECTED' ? 'Limbah telah dijemput oleh driver.' : 'Driver sedang menuju / membawa limbah.' },
    { id: 'processing', label: 'Pengolahan', icon: Factory, status: isCompleted ? 'completed' : 'pending', time: 'Estimasi 2 Jam', desc: 'Proses konversi limbah menjadi bahan baku daur ulang.' },
    { id: 'product', label: 'Produk Daur Ulang', icon: Package, status: isCompleted ? 'completed' : 'pending', time: '-', desc: 'Produk akhir siap dikemas dan diverifikasi kualitasnya.' },
    { id: 'marketplace', label: 'Marketplace', icon: Store, status: isCompleted ? 'completed' : 'pending', time: '-', desc: 'Tersedia untuk dibeli kembali di ekosistem sirkular.' },
  ];

  const TrackingStep = ({ step, isLast, index }: any) => {
    const Icon = step.icon;
    const isActive = step.status === 'current';
    const isCompleted = step.status === 'completed';

    return (
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all z-10",
              isActive ? "bg-[#05422C] border-[#05422C] shadow-[0_0_20px_rgba(5,66,44,0.3)] text-white" : 
              isCompleted ? "bg-[#E6F4EA] border-[#E6F4EA] text-[#05422C]" : 
              "bg-slate-50 border-slate-200 text-slate-400"
            )}
          >
            <Icon size={24} />
          </motion.div>
          {!isLast && (
            <div className={cn(
              "w-1 flex-1 my-2 rounded-full",
              isCompleted ? "bg-[#05422C]" : "bg-slate-200"
            )} />
          )}
        </div>

        <div className="flex-1 pb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <h3 className={cn(
              "text-xl font-bold",
              isActive ? "text-gray-900" : isCompleted ? "text-gray-900" : "text-gray-400"
            )}>
              {step.label}
            </h3>
            <span className={cn(
              "text-[10px] font-bold px-3 py-1 rounded-full w-fit uppercase tracking-wider",
              isActive ? "bg-[#05422C] text-white" : 
              isCompleted ? "bg-[#E6F4EA] text-[#05422C]" : 
              "bg-slate-100 text-slate-500"
            )}>
              {isActive ? 'Sedang Berjalan' : isCompleted ? 'Selesai' : 'Akan Datang'}
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-3 max-w-lg">{step.desc}</p>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Clock size={14} />
            {step.time}
          </div>

          {isActive && step.id === 'driver' && selectedPickup.driver && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-slate-200 p-0.5 border border-[#05422C]/30 overflow-hidden shrink-0">
                 <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <User className="w-8 h-8 text-slate-400" />
                 </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                 <p className="text-sm font-bold text-gray-900">Driver: {selectedPickup.driver.user?.name || 'Driver Circularia'}</p>
                 <p className="text-xs text-slate-500 mb-2">Plat: {selectedPickup.driver.licensePlate || '-'}</p>
                 <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-2 py-1 bg-[#E6F4EA] rounded-md text-[10px] font-bold text-[#05422C] uppercase">On Schedule</span>
                 </div>
              </div>
              <button className="bg-[#05422C] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#043322] transition-all">
                 Hubungi Driver
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <header className="flex items-center gap-4 mb-4">
          <button 
            onClick={handleBackToList}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#05422C] hover:border-[#05422C] transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Detail Pelacakan</h1>
            <p className="text-slate-500 text-sm font-mono mt-1">ID: {selectedPickup.id.split('-')[0].toUpperCase()}</p>
          </div>
        </header>

        {/* Circular Progress Top Bar */}
        <div className="bg-[#05422C] rounded-[2.5rem] p-8 relative overflow-hidden text-white shadow-xl">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none -translate-y-1/4 translate-x-1/4">
               <RefreshCcw size={200} className="animate-spin-slow" />
            </div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                <RefreshCcw className="text-emerald-400" /> Visualisasi Circular Economy
            </h3>
            <div className="flex flex-wrap justify-between items-center gap-4 relative">
                {wasteJourney.map((step, i) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center gap-2 z-10">
                            <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                                step.status === 'completed' || step.status === 'current' ? "bg-white text-[#05422C]" : "bg-[#043322] text-[#05422C]/40"
                            )}>
                                <step.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-white/80">{step.label}</span>
                        </div>
                        {i < wasteJourney.length - 1 && (
                            <div className="hidden md:block flex-1 h-0.5 bg-[#043322] overflow-hidden">
                                <motion.div 
                                    className="h-full bg-emerald-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: step.status === 'completed' ? "100%" : "0%" }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Timeline */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex flex-col">
              {wasteJourney.map((step, idx) => (
                <TrackingStep 
                  key={step.id} 
                  step={step} 
                  index={idx}
                  isLast={idx === wasteJourney.length - 1} 
                />
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#E6F4EA] p-8 rounded-[2.5rem] border border-emerald-100">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#05422C]">
                 <ShieldCheck className="w-5 h-5" />
                 Audit Lingkungan
               </h3>
               <div className="space-y-6">
                  <div>
                    <p className="text-xs text-emerald-800 uppercase tracking-widest mb-1">Emisi Karbon Terhemat</p>
                    <p className="text-3xl font-black text-[#05422C]">8.5 kg CO?</p>
                  </div>
                  <hr className="border-emerald-200" />
                  <div>
                    <p className="text-xs text-emerald-800 uppercase tracking-widest mb-1">Status Pengolahan</p>
                    <div className="flex items-center gap-2 text-[#05422C] font-bold">
                        <Zap size={16} /> {isCompleted ? '100%' : 'Sedang Berjalan'}
                    </div>
                  </div>
                  <div className="p-4 bg-white/50 rounded-2xl border border-white/50">
                     <p className="text-xs font-bold text-[#05422C] mb-2">Blockchain ID (Verified)</p>
                     <p className="text-[10px] text-[#05422C]/70 break-all font-mono">MBG-TX-0092x83f-{selectedPickup.id.split('-')[0]}</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
               <h3 className="text-lg font-bold mb-4 text-gray-900">Target Produk Akhir</h3>
               <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
                  <ShoppingBag className="text-[#05422C]" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Eco-Packaging MBG</p>
                    <p className="text-xs text-slate-500">Ketersediaan Terjadwal</p>
                  </div>
               </div>
               <button className="w-full mt-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:text-white hover:bg-[#05422C] hover:border-transparent transition-all">
                  Lihat Marketplace
               </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
