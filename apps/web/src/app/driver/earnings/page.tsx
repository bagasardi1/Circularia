"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet,
  Download,
  Filter,
  ChevronRight,
  PieChart,
  CreditCard
} from 'lucide-react';

const earningsStats = [
  { label: 'Hari Ini', value: 'Rp 145.000', change: '+12%', positive: true },
  { label: 'Minggu Ini', value: 'Rp 890.000', change: '+5%', positive: true },
  { label: 'Bulan Ini', value: 'Rp 3.420.000', change: '-2%', positive: false },
];

const transactions = [
  { id: 'TRX-9901', type: 'Income', source: 'Pickup #PK-001', amount: 'Rp 12.000', date: 'Hari ini, 09:45', status: 'Selesai' },
  { id: 'TRX-9900', type: 'Income', source: 'Pickup #PK-042', amount: 'Rp 45.000', date: 'Hari ini, 08:20', status: 'Selesai' },
  { id: 'TRX-9850', type: 'Withdraw', source: 'Bank Transfer (BCA)', amount: 'Rp 500.000', date: '11 Juni, 14:00', status: 'Proses' },
  { id: 'TRX-9842', type: 'Income', source: 'Pickup #PK-882', amount: 'Rp 88.000', date: '11 Juni, 10:15', status: 'Selesai' },
  { id: 'TRX-9831', type: 'Bonus', source: 'Elite Driver Reward', amount: 'Rp 100.000', date: '10 Juni, 18:00', status: 'Selesai' },
];

const EarningsPage = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 font-outfit">Pendapatan & Keuangan</h1>
            <p className="text-slate-500 text-sm">Kelola penghasilan Anda dari setiap kontribusi sirkular.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50">
                <Download size={18} /> Unduh Laporan
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 shadow-lg shadow-emerald-900/10">
                <CreditCard size={18} /> Tarik Saldo
             </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-gradient-to-br from-emerald-900 to-teal-800 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Wallet size={120} />
              </div>
              <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-2">Total Saldo Tersedia</p>
              <h2 className="text-4xl font-black mb-8">Rp 850.000</h2>
              
              <div className="flex flex-col gap-3">
                 <div className="flex justify-between text-xs border-b border-white/10 pb-3">
                    <span className="text-emerald-200">Total Pendapatan</span>
                    <span className="font-bold">Rp 12.450.000</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-emerald-200">Total Penarikan</span>
                    <span className="font-bold">Rp 11.600.000</span>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {earningsStats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{stat.label}</p>
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit",
                        stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      )}>
                        <TrendingUp size={10} className={!stat.positive ? "rotate-180" : ""} /> {stat.change}
                      </div>
                   </div>
                </div>
              ))}
              
              {/* Bonus / Info Card */}
              <div className="md:col-span-3 bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                       <PieChart size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold text-amber-900 text-sm">Target Bonus Bulanan</h4>
                       <p className="text-xs text-amber-700">Lakukan 8 pickup lagi untuk mendapatkan bonus Rp 200.000!</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-bold text-amber-900">12 / 20</p>
                    <div className="w-32 h-1.5 bg-amber-200 rounded-full mt-1 overflow-hidden">
                       <div className="w-[60%] h-full bg-amber-500 rounded-full" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h3 className="text-xl font-bold text-gray-900">Riwayat Transaksi</h3>
              <div className="flex gap-2">
                 {['Semua', 'Pendapatan', 'Penarikan'].map(f => (
                   <button 
                     key={f}
                     onClick={() => setActiveFilter(f)}
                     className={cn(
                       "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                       activeFilter === f ? "bg-emerald-900 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                     )}
                   >
                     {f}
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-4">
              {transactions.map((trx) => (
                <div key={trx.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                        trx.type === 'Income' ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100" :
                        trx.type === 'Withdraw' ? "bg-red-50 text-red-600 group-hover:bg-red-100" :
                        "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                      )}>
                        {trx.type === 'Income' ? <ArrowDownLeft size={20} /> : 
                         trx.type === 'Withdraw' ? <ArrowUpRight size={20} /> : <TrendingUp size={20} />}
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 text-sm">{trx.source}</h4>
                         <p className="text-[10px] text-slate-400 font-medium">{trx.date} • ID: {trx.id}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-8">
                      <div className="text-right">
                         <p className={cn(
                           "font-bold text-sm",
                           trx.type === 'Income' || trx.type === 'Bonus' ? "text-emerald-600" : "text-red-600"
                         )}>
                            {trx.type === 'Income' || trx.type === 'Bonus' ? '+' : '-'} {trx.amount}
                         </p>
                         <span className={cn(
                           "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase",
                           trx.status === 'Selesai' ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"
                         )}>{trx.status}</span>
                      </div>
                      <button className="text-slate-300 hover:text-slate-600 transition-colors">
                         <ChevronRight size={20} />
                      </button>
                   </div>
                </div>
              ))}
           </div>

           <button className="w-full mt-8 py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold text-sm hover:bg-slate-100 hover:text-emerald-900 transition-all">
              Lihat Riwayat Lengkap
           </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default EarningsPage;
