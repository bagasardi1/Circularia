"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
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
  Zap
} from 'lucide-react';

const wasteJourney = [
  { id: 'mbg', label: 'Dapur MBG', icon: Home, status: 'completed', time: '12 Juni, 07:00', desc: 'Limbah dipilah dan dikumpulkan dari Dapur MBG.' },
  { id: 'collection', label: 'Collection Point', icon: MapPin, status: 'completed', time: '12 Juni, 09:30', desc: 'Diterima di Smart Station #08. Verifikasi AI berhasil.' },
  { id: 'driver', label: 'Pickup Driver', icon: Truck, status: 'current', time: 'Dalam Perjalanan', desc: 'Driver sedang membawa limbah ke pusat pengolahan.' },
  { id: 'processing', label: 'Pengolahan', icon: Factory, status: 'pending', time: 'Estimasi: 15:00', desc: 'Proses konversi limbah menjadi bahan baku daur ulang.' },
  { id: 'product', label: 'Produk Daur Ulang', icon: Package, status: 'pending', time: '-', desc: 'Produk akhir siap dikemas dan diverifikasi kualitasnya.' },
  { id: 'marketplace', label: 'Marketplace', icon: Store, status: 'pending', time: '-', desc: 'Tersedia untuk dibeli kembali di ekosistem sirkular.' },
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
            isActive ? "bg-emerald-500 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]" : 
            isCompleted ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500" : 
            "bg-slate-900 border-white/5 text-slate-600"
          )}
        >
          <Icon className={isActive ? "text-white" : ""} size={24} />
        </motion.div>
        {!isLast && (
          <div className={cn(
            "w-1 flex-1 my-2 rounded-full",
            isCompleted ? "bg-emerald-500/40" : "bg-slate-800"
          )} />
        )}
      </div>

      <div className="flex-1 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
          <h3 className={cn(
            "text-xl font-bold",
            isActive ? "text-slate-800" : isCompleted ? "text-slate-800" : "text-slate-800"
          )}>
            {step.label}
          </h3>
          <span className={cn(
            "text-[10px] font-bold px-3 py-1 rounded-full w-fit uppercase tracking-wider",
            isActive ? "bg-emerald-500 text-white" : 
            isCompleted ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : 
            "bg-slate-800 text-slate-500"
          )}>
            {isActive ? 'Sedang Berjalan' : isCompleted ? 'Selesai' : 'Akan Datang'}
          </span>
        </div>
        <p className="text-slate-500 text-sm mb-3 max-w-lg">{step.desc}</p>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Clock size={14} />
          {step.time}
        </div>

        {isActive && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 glassmorphism rounded-3xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-slate-800 p-0.5 border border-emerald-500/30 overflow-hidden">
               <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <User className="w-10 h-10 text-slate-400" />
               </div>
            </div>
            <div className="flex-1 text-center md:text-left">
               <p className="text-sm font-bold text-white">Driver: Andi Wijaya</p>
               <p className="text-xs text-slate-500 mb-2">ID: DRV-0012 â€¢ Kendaraan Listrik</p>
               <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-emerald-400 uppercase">On Schedule</span>
               </div>
            </div>
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">
               Hubungi Driver
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const TrackingPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-outfit text-white-900">Lacak Perjalanan Limbah</h1>
            <p className="text-slate-500">Transparansi penuh dari Dapur MBG hingga menjadi produk di Marketplace.</p>
          </div>
          <div className="flex items-center gap-3 bg-emerald-900 border border-white/5 px-4 py-2 rounded-xl">
             <span className="text-xs text-slate-200 font-bold uppercase tracking-widest">Tracking ID</span>
             <span className="text-sm font-mono font-bold text-white">#MBG-TRK-7721</span>
          </div>
        </div>

        {/* Circular Economy Visualization */}
        <div className=" p-8 rounded-[2.5rem]  bg-emerald-100 mb-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-50">
                <RefreshCcw size={200} className="animate-spin-slow" />
            </div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-white-800">
                <RefreshCcw className="text-emerald-900" /> Visualisasi Circular Economy
            </h3>
            <div className="flex flex-wrap justify-between items-center gap-4 relative">
                {wasteJourney.map((step, i) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center gap-2 z-10">
                            <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                                step.status === 'completed' || step.status === 'current' ? "bg-emerald-800 text-white" : "bg-slate-800 text-slate-600"
                            )}>
                                <step.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-900">{step.label}</span>
                        </div>
                        {i < wasteJourney.length - 1 && (
                            <div className="hidden md:block flex-1 h-0.5 bg-slate-800 overflow-hidden">
                                <motion.div 
                                    className="h-full bg-emerald-500"
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
          <div className="lg:col-span-2 glassmorphism p-8 md:p-12 rounded-[3rem] border border-white/5 bg-slate-900/40">
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
            <div className="glassmorphism p-8 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white-700">
                 <ShieldCheck className="w-5 h-5 text-emerald-900" />
                 Audit Lingkungan
               </h3>
               <div className="space-y-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Emisi Karbon Terhemat</p>
                    <p className="text-3xl font-bold text-emerald-900">8.5 kg CO₂</p>
                  </div>
                  <hr className="border-white/5" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Status Pengolahan</p>
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <Zap size={16} /> 75% Selesai
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <p className="text-xs font-bold text-slate-400 mb-2">Blockchain ID (Verified)</p>
                     <p className="text-[10px] text-slate-500 break-all font-mono">MBG-TX-0092x83f-circularia</p>
                  </div>
               </div>
            </div>

            <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
               <h3 className="text-lg font-bold mb-4 text-slate-800">Target Produk Akhir</h3>
               <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                  <ShoppingBag className="text-emerald-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-600">Eco-Packaging MBG</p>
                    <p className="text-xs text-slate-500">Tersedia 15 Juni</p>
                  </div>
               </div>
               <button className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  Lihat Marketplace
               </button>
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

export default TrackingPage;
