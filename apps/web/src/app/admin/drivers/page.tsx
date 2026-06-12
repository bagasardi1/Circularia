"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Award, 
  Clock, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Plus
} from 'lucide-react';

const driversData = [
  { id: 1, name: 'Andi Wijaya', vehicle: 'Toyota Dyna (Electric)', rating: 4.9, totalPickups: 142, status: 'Online', performance: '98%' },
  { id: 2, name: 'Budi Santoso', vehicle: 'Mitsubishi Fuso', rating: 4.7, totalPickups: 89, status: 'On Delivery', performance: '92%' },
  { id: 3, name: 'Rahmat Hidayat', vehicle: 'E-Motorcycle', rating: 4.8, totalPickups: 210, status: 'Online', performance: '95%' },
  { id: 4, name: 'Siti Aminah', vehicle: 'Toyota Dyna (Electric)', rating: 4.5, totalPickups: 64, status: 'Offline', performance: '85%' },
];

const DriverManagementPage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 font-outfit">Manajemen Driver</h1>
            <p className="text-slate-500 text-sm">Monitor performa, status, dan penugasan armada driver Circularia.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 shadow-lg shadow-emerald-900/20">
             <Plus size={18} /> Daftarkan Driver Baru
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-center gap-4">
              <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-100">
                 <CheckCircle2 size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Driver Online</p>
                 <h4 className="text-2xl font-black text-emerald-900">342 Driver</h4>
              </div>
           </div>
           <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-center gap-4">
              <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-100">
                 <Truck size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Sedang Pickup</p>
                 <h4 className="text-2xl font-black text-amber-900">89 Armada</h4>
              </div>
           </div>
           <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-center gap-4">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-100">
                 <Star size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Avg Rating</p>
                 <h4 className="text-2xl font-black text-emerald-900">4.8 / 5.0</h4>
              </div>
           </div>
        </div>

        {/* Driver List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {driversData.map((driver) => (
             <div key={driver.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-emerald-200 transition-all group">
                <div className="flex items-start justify-between mb-8">
                   <div className="flex items-center gap-5">
                      <div className="relative w-16 h-16">
                         <div className={cn(
                           "absolute -top-1 -right-1 w-5 h-5 rounded-full border-4 border-white z-10",
                           driver.status === 'Online' ? 'bg-emerald-500' : driver.status === 'On Delivery' ? 'bg-amber-500' : 'bg-slate-300'
                         )} />
                         <img 
                           src={`https://i.pravatar.cc/150?u=${driver.name}`} 
                           alt={driver.name} 
                           className="w-full h-full rounded-2xl object-cover border border-slate-100 shadow-sm"
                         />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 text-lg">{driver.name}</h4>
                         <p className="text-xs text-slate-400 font-medium">{driver.vehicle}</p>
                      </div>
                   </div>
                   <button className="p-2 text-slate-300 hover:text-gray-900 transition-colors">
                      <MoreVertical size={20} />
                   </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                   <div className="text-center p-3 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Pickup</p>
                      <p className="font-black text-slate-900">{driver.totalPickups}</p>
                   </div>
                   <div className="text-center p-3 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Rating</p>
                      <p className="font-black text-amber-500">★ {driver.rating}</p>
                   </div>
                   <div className="text-center p-3 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Speed</p>
                      <p className="font-black text-emerald-600">{driver.performance}</p>
                   </div>
                </div>

                <div className="flex gap-2">
                   <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all">
                      Lihat Rute Saat Ini
                   </button>
                   <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
                      Riwayat Kerja
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default DriverManagementPage;

