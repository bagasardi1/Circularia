"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
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
  ChevronRight
} from 'lucide-react';

const stats = [
  { label: 'Total Pickup', value: '142', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pendapatan (Rp)', value: '1.250.000', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Rating Driver', value: '4.9', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Efisiensi Rute', value: '92%', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const activeTasks = [
  { id: 'PK-001', location: 'Dapur MBG #4', time: '09:00 AM', status: 'In Queue', weight: '12 kg' },
  { id: 'PK-002', location: 'Collection Point #08', time: '10:30 AM', status: 'Scheduled', weight: '45 kg' },
  { id: 'PK-003', location: 'Dapur MBG #1', time: '01:00 PM', status: 'Scheduled', weight: '20 kg' },
];

const DriverDashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Semangat Pagi, Andi! 🚛</h1>
            <p className="text-gray-500 text-sm">Ada 3 pickup terjadwal untuk hari ini. Tetap berkendara dengan aman!</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-amber-100 px-4 py-2 rounded-xl border border-amber-200 text-amber-800 font-bold text-sm">
                ELITE DRIVER TIER
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
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
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Pickups */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-gray-900">Tugas Pickup Aktif</h3>
              <button className="text-sm font-bold text-emerald-700 hover:text-emerald-900">Lihat Semua</button>
            </div>
            
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <div key={task.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:border-emerald-200 transition-all group">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                            <MapPin size={24} />
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900">{task.location}</h4>
                            <p className="text-xs text-gray-500">ID: {task.id} • Estimasi: {task.time}</p>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                         <div className="text-right hidden md:block">
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Estimasi Berat</p>
                            <p className="text-sm font-bold text-emerald-700">{task.weight}</p>
                         </div>
                         <button className="px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold text-xs hover:bg-emerald-800 transition-colors flex items-center gap-2">
                            Ambil Tugas <ChevronRight size={14} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            {/* Route Map Preview Placeholder */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] relative overflow-hidden h-[300px]">
               <div className="absolute inset-0 opacity-30">
                  {/* Pseudo Map Background */}
                  <div className="absolute inset-0 border-[40px] border-white/5 rounded-full scale-150 rotate-45" />
                  <div className="absolute top-1/2 left-1/4 w-full h-1 bg-white/10" />
                  <div className="absolute left-1/2 top-0 w-1 h-full bg-white/10" />
               </div>
               <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-emerald-500 rounded-lg text-white">
                        <Navigation size={20} />
                     </div>
                     <h3 className="text-xl font-bold text-white">Rute Teroptimasi</h3>
                  </div>
                  <p className="text-slate-400 text-sm max-w-sm mb-6">Sistem AI kami telah menghitung rute tercepat untuk 3 titik penjemputan hari ini.</p>
                  <button className="w-fit px-8 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm">
                     Mulai Navigasi
                  </button>
               </div>
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
                  <h4 className="text-lg font-bold text-gray-900">Peringkat #12</h4>
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

            {/* Quick Actions */}
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
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default DriverDashboard;
