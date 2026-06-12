"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Package,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  AlertCircle,
  RefreshCcw,
  Navigation
} from 'lucide-react';

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PickupListPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [pickups, setPickups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem("circularia_token");
      if (!token) return;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      const response = await fetch(`${apiUrl}/pickups`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setPickups(data);
      } else {
        setError("Gagal memuat tugas pickup.");
      }
    } catch (err) {
      setError("Kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const handleUpdateStatus = async (pickupId: string, currentStatus: string) => {
    let nextStatus = 'ASSIGNED';
    if (currentStatus === 'ASSIGNED') nextStatus = 'ON_THE_WAY';
    else if (currentStatus === 'ON_THE_WAY') nextStatus = 'COLLECTED';
    else if (currentStatus === 'COLLECTED') return;

    try {
      const token = localStorage.getItem("circularia_token");
      if (!token) return;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      const response = await fetch(`${apiUrl}/pickups/${pickupId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });

      if (response.ok) {
        setLoading(true);
        fetchPickups();
      } else {
        const errData = await response.json();
        alert(errData.message || "Gagal memperbarui status.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  const getStatusButtonText = (status: string) => {
    if (status === 'ASSIGNED') return 'Mulai Perjalanan';
    if (status === 'ON_THE_WAY') return 'Sudah Dijemput';
    if (status === 'COLLECTED') return 'Sudah Dijemput';
    return 'Tugas Selesai';
  };

  // Filter pickups
  const filteredPickups = pickups.filter(p => {
    const matchesSearch = p.collectionPoint?.address?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'active') {
      return matchesSearch && p.status !== 'COMPLETED';
    } else {
      return matchesSearch && p.status === 'COMPLETED';
    }
  });

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 font-outfit">Daftar Tugas Pickup</h1>
            <p className="text-slate-500 text-sm">Kelola tugas penjemputan harian Anda dengan efisien.</p>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('active')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'active' ? "bg-white text-emerald-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Tugas Aktif ({pickups.filter(p => p.status !== 'COMPLETED').length})
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'history' ? "bg-white text-emerald-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Riwayat Selesai ({pickups.filter(p => p.status === 'COMPLETED').length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Cari lokasi atau ID tugas..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all text-sm"
              />
           </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-3xl border">
              <RefreshCcw className="animate-spin mb-4" size={32} />
              <p className="text-sm">Memuat data pickup...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <AlertCircle size={20} />
              {error}
            </div>
          ) : filteredPickups.length === 0 ? (
            <div className="bg-white p-16 text-center rounded-3xl border text-slate-400">
              <Package size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-bold text-gray-900">Tidak ada tugas ditemukan</p>
              <p className="text-xs text-slate-400 mt-1">Cek tab lain atau coba cari kata kunci lainnya.</p>
            </div>
          ) : activeTab === 'active' ? (
            <motion.div 
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {filteredPickups.map((task) => (
                <div key={task.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-emerald-200 transition-all group relative overflow-hidden">
                   <div className={cn(
                     "absolute top-0 left-0 w-2 h-full",
                     task.status === 'ASSIGNED' ? "bg-blue-500" : task.status === 'ON_THE_WAY' ? "bg-amber-500" : "bg-emerald-500"
                   )} />

                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 ml-2">
                      <div className="flex items-start gap-4">
                         <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                            <Truck size={28} />
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-900 font-outfit">{task.collectionPoint?.name || 'Titik Penjemputan'}</span>
                              <span className={cn(
                                "text-[9px] font-bold px-2 py-0.5 rounded uppercase",
                                task.status === 'ASSIGNED' ? "bg-blue-50 text-blue-700" : 
                                task.status === 'ON_THE_WAY' ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                              )}>{task.status === 'COLLECTED' ? 'DIJEMPUT' : task.status}</span>
                            </div>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                               <MapPin size={14} className="text-[#05422C]" /> {task.collectionPoint?.address || 'Alamat tidak tersedia'}
                            </p>
                            <p className="text-[10px] font-mono text-slate-400">ID TUGAS: {task.id.split('-')[0].toUpperCase()}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4 self-end md:self-auto">
                         <div className="text-right px-4 border-r border-slate-100 hidden md:block">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Kapasitas</p>
                            <p className="text-xl font-bold text-emerald-900">{task.collectionPoint?.capacity}%</p>
                         </div>
                         <div className="flex flex-col sm:flex-row gap-2">
                            <button 
                              onClick={() => handleUpdateStatus(task.id, task.status)}
                              disabled={task.status === 'COLLECTED'}
                              className={cn(
                                "px-6 py-3 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-md shadow-emerald-900/10",
                                task.status === 'COLLECTED'
                                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                                  : "bg-emerald-900 text-white hover:bg-emerald-800"
                              )}
                            >
                               {getStatusButtonText(task.status)} <ChevronRight size={14} />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {filteredPickups.map((task) => (
                <div key={task.id} className="bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100 opacity-90 hover:opacity-100 transition-all group">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4 text-slate-500">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                            <CheckCircle2 size={24} className="text-emerald-500" />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-700">{task.collectionPoint?.name || 'Collection Point'}</h4>
                            <div className="flex items-center gap-3 text-xs mt-1">
                               <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(task.createdAt).toLocaleDateString("id-ID")}</span>
                               <span className="flex items-center gap-1"><MapPin size={12} /> {task.collectionPoint?.address?.slice(0, 30)}...</span>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center gap-8 self-end md:self-auto">
                         <div className="text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Kapasitas</p>
                            <p className="font-bold text-slate-700">{task.collectionPoint?.capacity}%</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Pendapatan</p>
                            <p className="font-bold text-emerald-600">Rp 45.000</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Poin Leaderboard</p>
                            <p className="font-bold text-amber-500">+100 pts</p>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}


