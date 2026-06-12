"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Users, 
  Truck, 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Activity,
  UserCheck,
  UserX,
  Clock,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

const stats = [
  { label: 'Total User', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Driver Aktif', value: '450', icon: Truck, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Poin Beredar', value: '1.2M', icon: Coins, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { label: 'Uptime Sistem', value: '99.9%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const recentUsers = [
  { name: 'Siti Aminah', role: 'User', date: '2 mnt yang lalu', status: 'Active' },
  { name: 'Budi Santoso', role: 'Driver', date: '5 mnt yang lalu', status: 'Pending' },
  { name: 'John Doe', role: 'User', date: '10 mnt yang lalu', status: 'Active' },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 font-outfit">Admin Control Panel</h1>
            <p className="text-slate-500 text-sm">Monitor seluruh ekosistem Circularia dalam satu layar.</p>
          </div>
          <div className="bg-emerald-900 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/20">
             <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> SYSTEM ONLINE
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
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                 <div className={cn("p-3 rounded-2xl", stat.bg)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                 </div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity Management */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-gray-900">Manajemen Pengguna Terbaru</h3>
                  <button className="text-sm font-bold text-emerald-700 hover:underline">Kelola Semua User</button>
               </div>

               <div className="space-y-4">
                  {recentUsers.map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100 group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-sm">
                             <img src={`https://i.pravatar.cc/150?u=${user.name}`} alt="" />
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase">{user.role} • {user.date}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <span className={cn(
                            "text-[9px] font-bold px-3 py-1 rounded-full uppercase",
                            user.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          )}>{user.status}</span>
                          <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all opacity-0 group-hover:opacity-100">
                             <UserCheck size={18} />
                          </button>
                          <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100">
                             <UserX size={18} />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* System Log */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Activity size={120} />
               </div>
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="text-emerald-400" /> Log Aktivitas Sistem
               </h3>
               <div className="space-y-3 font-mono text-[10px] text-slate-400">
                  <p><span className="text-emerald-400">[09:42:01]</span> Pickup #PK-042 Berhasil Diselesaikan (Driver Andi)</p>
                  <p><span className="text-emerald-400">[09:35:12]</span> User Baru Terdaftar: Budi Santoso</p>
                  <p><span className="text-emerald-400">[09:30:00]</span> Otomatisasi Point Collection Berjalan...</p>
                  <p><span className="text-amber-400">[09:15:44]</span> Peringatan: Station #012 Hampir Penuh (85%)</p>
               </div>
            </div>
          </div>

          {/* Point Collection Overview */}
          <div className="space-y-6">
             <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm text-center">
                <div className="w-16 h-16 bg-emerald-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-emerald-200">
                   <Coins size={32} />
                </div>
                <h4 className="text-lg font-black text-emerald-900">Total Eco Points</h4>
                <p className="text-xs text-emerald-700 mb-6 uppercase font-bold tracking-widest">Global Circulation</p>
                <h2 className="text-4xl font-black text-emerald-950 mb-8">1,240,500</h2>
                <div className="flex flex-col gap-2">
                   <button className="w-full py-4 bg-emerald-900 text-white rounded-2xl font-bold text-sm hover:bg-emerald-800 transition-all">
                      Audit Distribusi Poin
                   </button>
                   <button className="w-full py-4 bg-white border border-emerald-200 text-emerald-900 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-all">
                      Ubah Kurs Poin/IDR
                   </button>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-6">Distribusi Reward</h4>
                <div className="space-y-6">
                   {[
                     { label: 'Redeem Marketplace', value: '65%', color: 'bg-emerald-500' },
                     { label: 'Driver Incentives', value: '25%', color: 'bg-amber-500' },
                     { label: 'System Fee', value: '10%', color: 'bg-emerald-600' },
                   ].map((item, i) => (
                     <div key={i}>
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                           <span className="text-slate-400">{item.label}</span>
                           <span className="text-slate-900">{item.value}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                           <div className={cn("h-full rounded-full", item.color)} style={{ width: item.value }} />
                        </div>
                     </div>
                   ))}
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

export default AdminDashboard;

