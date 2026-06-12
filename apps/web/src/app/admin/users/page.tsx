"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Mail, 
  MapPin,
  Trash2,
  Edit,
  UserPlus
} from 'lucide-react';

const usersData = [
  { id: 1, name: 'Siti Aminah', email: 'siti@example.com', location: 'Jakarta Selatan', role: 'User', status: 'Active', points: '1,250' },
  { id: 2, name: 'John Doe', email: 'john@example.com', location: 'Jakarta Barat', role: 'User', status: 'Active', points: '890' },
  { id: 3, name: 'Bambang Heru', email: 'bambang@example.com', location: 'Tangerang', role: 'User', status: 'Suspended', points: '12,400' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi@example.com', location: 'Depok', role: 'User', status: 'Active', points: '2,100' },
  { id: 5, name: 'Rahmat Hidayat', email: 'rahmat@example.com', location: 'Jakarta Timur', role: 'User', status: 'Active', points: '450' },
];

const UserManagementPage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 font-outfit">Manajemen User</h1>
            <p className="text-slate-500 text-sm">Kelola akses, data, dan status seluruh pengguna Circularia.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 shadow-lg shadow-emerald-900/10">
             <UserPlus size={18} /> Tambah User Baru
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Cari nama, email, atau lokasi..." 
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-600 transition-all text-sm"
              />
           </div>
           <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50">
              <Filter size={18} /> Filter Status
           </button>
        </div>

        {/* User Table Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Points</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {usersData.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-white shadow-sm">
                                  <img src={`https://i.pravatar.cc/150?u=${user.email}`} alt="" />
                               </div>
                               <div>
                                  <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                                  <p className="text-xs text-slate-400">{user.email}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                               <MapPin size={14} className="text-slate-300" /> {user.location}
                            </div>
                         </td>
                         <td className="px-8 py-6 text-sm font-black text-emerald-700">{user.points} <span className="text-[10px] font-bold text-slate-400 uppercase">PTS</span></td>
                         <td className="px-8 py-6">
                            <span className={cn(
                              "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider",
                              user.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            )}>{user.status}</span>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl">
                                  <Edit size={18} />
                               </button>
                               <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                                  <Trash2 size={18} />
                               </button>
                               <button className="p-2 text-slate-400 hover:text-gray-900 hover:bg-slate-100 rounded-xl">
                                  <MoreVertical size={18} />
                               </button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400 font-medium">Menampilkan <span className="text-slate-900 font-bold">5 dari 12,450</span> total user</p>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>Sebelumnya</button>
                 <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">Berikutnya</button>
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

export default UserManagementPage;

