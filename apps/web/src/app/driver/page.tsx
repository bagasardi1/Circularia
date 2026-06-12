"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  DollarSign, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Navigation,
  Star,
  Zap,
  ChevronRight,
  RefreshCcw,
  AlertCircle
} from 'lucide-react';

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DriverDashboard() {
  const { user } = useAuth();
  
  // Database States
  const [stats, setStats] = useState<any>({
    totalPickups: 0,
    totalCompleted: 0,
    points: 0,
    earned: 0,
    rank: 12,
    efficiency: '92%'
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const [availableTasks, setAvailableTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [taskError, setTaskError] = useState<string | null>(null);

  const fetchDriverData = async () => {
    const token = localStorage.getItem("circularia_token");
    if (!token) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

    // 1. Fetch Stats
    try {
      const statsRes = await fetch(`${apiUrl}/pickups/stats`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error("Error fetching driver stats:", err);
    } finally {
      setLoadingStats(false);
    }

    // 2. Fetch Available Tasks (Status: PENDING)
    try {
      const tasksRes = await fetch(`${apiUrl}/pickups/available`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        setAvailableTasks(tasksData);
      }
    } catch (err) {
      console.error("Error fetching available tasks:", err);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchDriverData();
  }, []);

  const handleClaimTask = async (pickupId: string) => {
    setTaskError(null);
    try {
      const token = localStorage.getItem("circularia_token");
      if (!token) throw new Error("Anda harus login.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      const response = await fetch(`${apiUrl}/pickups/${pickupId}/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({}) // Body empty, backend handles assigning to logged-in user if role is DRIVER
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Gagal mengambil tugas.");
      }

      // Refresh data after claiming
      setLoadingTasks(true);
      fetchDriverData();
    } catch (err: any) {
      setTaskError(err.message || "Terjadi kesalahan saat mengambil tugas.");
    }
  };

  const statItems = [
    { label: 'Total Pickup', value: stats.totalPickups.toString(), icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pendapatan (Rp)', value: stats.earned.toLocaleString("id-ID"), icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rating Driver', value: '4.9', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Efisiensi Rute', value: stats.efficiency, icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Semangat Pagi, {user?.name || "Driver"}! ??
            </h1>
            <p className="text-gray-500 text-sm">
              Ada {availableTasks.length} pickup yang tersedia hari ini. Tetap berkendara dengan aman!
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-amber-100 px-4 py-2 rounded-xl border border-amber-200 text-amber-800 font-bold text-sm">
                ELITE DRIVER TIER
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                 <div className={cn("p-3 rounded-2xl", stat.bg)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                 </div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{loadingStats ? '...' : stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Pickups */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-gray-900">Tugas Pickup Tersedia</h3>
              <span className="text-xs font-bold text-slate-400">Status PENDING</span>
            </div>
            
            {taskError && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-2 text-sm font-bold">
                <AlertCircle size={16} />
                {taskError}
              </div>
            )}

            <div className="space-y-4">
              {loadingTasks ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-white rounded-3xl border">
                  <RefreshCcw className="animate-spin mb-4" size={24} />
                  <p className="text-sm">Memuat daftar tugas...</p>
                </div>
              ) : availableTasks.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border text-slate-400">
                  <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-500" />
                  <p className="text-sm font-semibold text-gray-900">Semua tugas beres!</p>
                  <p className="text-xs text-slate-400 mt-1">Belum ada tugas penjemputan baru saat ini.</p>
                </div>
              ) : (
                availableTasks.map((task) => (
                  <div key={task.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:border-emerald-200 transition-all group">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors shrink-0">
                              <MapPin size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-gray-900">{task.collectionPoint?.address || 'Alamat tidak diatur'}</h4>
                              <p className="text-xs text-gray-500">
                                ID: {task.id.split('-')[0].toUpperCase()} ? Tipe: {task.collectionPoint?.wasteType || 'MIXED'}
                              </p>
                              <p className="text-[10px] text-gray-400 font-medium">
                                Jadwal: {task.scheduledAt ? new Date(task.scheduledAt).toLocaleString("id-ID") : 'Segera'}
                              </p>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-6 self-end md:self-auto">
                           <div className="text-right hidden md:block">
                              <p className="text-[10px] text-gray-400 font-bold uppercase">Kapasitas</p>
                              <p className="text-sm font-bold text-emerald-700">{task.collectionPoint?.capacity}%</p>
                           </div>
                           <button 
                             onClick={() => handleClaimTask(task.id)}
                             className="px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold text-xs hover:bg-emerald-800 transition-colors flex items-center gap-2"
                           >
                              Ambil Tugas <ChevronRight size={14} />
                           </button>
                        </div>
                     </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Performance & Ranking */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 px-2">Performa & Ranking</h3>
            
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
               <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4">
                     <div className="absolute inset-0 border-4 border-amber-400 rounded-full border-t-transparent animate-spin-slow" />
                     <div className="absolute inset-2 bg-amber-50 rounded-full flex items-center justify-center">
                        <Award size={40} className="text-amber-500" />
                     </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Peringkat #{stats.rank}</h4>
                  <p className="text-xs text-gray-500">Regional Jakarta Selatan</p>
               </div>

               <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                       <span className="text-gray-400">Progres Elite Tier</span>
                       <span className="text-amber-600">85%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                     <div className="flex items-center gap-3 mb-2">
                        <TrendingUp size={16} className="text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-900 uppercase">Statistik Terkini</span>
                     </div>
                     <p className="text-xs text-emerald-700 leading-relaxed">Kecepatan penjemputanmu naik 12% dibanding minggu lalu. Luar biasa!</p>
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-100">
                  <h5 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest text-center">Lencana Terbaru</h5>
                  <div className="flex justify-center gap-3">
                     {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                           <Zap size={18} className="text-slate-300" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Quick Status */}
            <div className="bg-emerald-900 p-6 rounded-[2rem] text-white">
               <h4 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400" /> Status Driver
               </h4>
               <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <span className="text-sm font-medium">Aktif / Online</span>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                     <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
