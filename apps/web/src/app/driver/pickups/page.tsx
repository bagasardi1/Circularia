"use client";

import React, { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';

const activePickups = [
  { id: 'PK-001', location: 'Dapur MBG #4 - Jl. Thamrin', items: 'Plastik & Kertas', time: '09:00 AM', status: 'In Queue', weight: '12 kg', priority: 'High' },
  { id: 'PK-002', location: 'Collection Point #08 - Blok M', items: 'Logam & Elektronik', time: '10:30 AM', status: 'Scheduled', weight: '45 kg', priority: 'Medium' },
  { id: 'PK-003', location: 'Dapur MBG #1 - Senayan', items: 'Limbah Organik', time: '01:00 PM', status: 'Scheduled', weight: '20 kg', priority: 'Low' },
];

const completedPickups = [
  { id: 'PK-995', location: 'Rumah Makan Padang - Tebet', items: 'Minyak Jelantah', date: '11 Juni 2026', weight: '15 kg', points: '+150', earned: 'Rp 45.000' },
  { id: 'PK-994', location: 'Apartemen Green - Kuningan', items: 'Anorganik Campur', date: '11 Juni 2026', weight: '88 kg', points: '+880', earned: 'Rp 264.000' },
  { id: 'PK-993', location: 'Kantor Tech - Sudirman', items: 'Kertas & Karton', date: '10 Juni 2026', weight: '32 kg', points: '+320', earned: 'Rp 96.000' },
];

const PickupListPage = () => {
  const [activeTab, setActiveTab] = useState('active');

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
              Tugas Aktif ({activePickups.length})
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'history' ? "bg-white text-emerald-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Riwayat Selesai
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Cari lokasi atau ID tugas..." 
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all text-sm"
              />
           </div>
           <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50">
              <Filter size={18} /> Filter
           </button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'active' ? (
            <motion.div 
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {activePickups.map((task) => (
                <div key={task.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-emerald-200 transition-all group relative overflow-hidden">
                   {/* Priority Indicator */}
                   <div className={cn(
                     "absolute top-0 left-0 w-2 h-full",
                     task.priority === 'High' ? "bg-red-500" : task.priority === 'Medium' ? "bg-amber-500" : "bg-emerald-500"
                   )} />

                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 ml-2">
                      <div className="flex items-start gap-4">
                         <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                            <Truck size={28} />
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center gap-2">
                               <h4 className="font-bold text-gray-900 text-lg">{task.location}</h4>
                               <span className={cn(
                                 "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                                 task.priority === 'High' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"
                               )}>{task.priority} Priority</span>
                            </div>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                               <Package size={14} className="text-emerald-500" /> {task.items} • <Clock size={14} /> {task.time}
                            </p>
                            <p className="text-[10px] font-mono text-slate-400">ID TUGAS: {task.id}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4">
                         <div className="text-right px-4 border-r border-slate-100 hidden md:block">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Estimasi Berat</p>
                            <p className="text-xl font-bold text-emerald-900">{task.weight}</p>
                         </div>
                         <div className="flex flex-col gap-2">
                            <button className="px-8 py-3 bg-emerald-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/10">
                               Mulai Navigasi
                            </button>
                            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                               Detail Pesanan
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
              {completedPickups.map((task) => (
                <div key={task.id} className="bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100 opacity-80 hover:opacity-100 transition-all group">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4 text-slate-400">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100">
                            <CheckCircle2 size={24} className="text-emerald-500" />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-700">{task.location}</h4>
                            <div className="flex items-center gap-3 text-xs">
                               <span className="flex items-center gap-1"><Calendar size={12} /> {task.date}</span>
                               <span className="flex items-center gap-1"><Package size={12} /> {task.items}</span>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center gap-12">
                         <div className="text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Berat</p>
                            <p className="font-bold text-slate-700">{task.weight}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Pendapatan</p>
                            <p className="font-bold text-emerald-600">{task.earned}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Poin</p>
                            <p className="font-bold text-amber-500">{task.points} pts</p>
                         </div>
                         <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <MoreVertical size={20} className="text-slate-400" />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
              
              {/* Summary Bottom */}
              <div className="mt-8 p-6 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-between text-slate-500 text-sm">
                 <p>Menampilkan <span className="font-bold text-emerald-900">3 dari 124</span> total riwayat penjemputan.</p>
                 <button className="font-bold text-emerald-700 hover:underline">Download Laporan (.PDF)</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default PickupListPage;
