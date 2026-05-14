"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  Phone,
  MessageSquare,
  Box,
  TrendingUp,
  Award
} from 'lucide-react';

const pickups = [
  { id: 'PK-921', station: 'Senen Smart Station', type: 'Mixed Waste', weight: '45kg', time: '10 mins ago', status: 'PENDING', priority: 'HIGH' },
  { id: 'PK-922', station: 'Menteng Collection Point', type: 'Organic', weight: '120kg', time: '25 mins ago', status: 'IN_TRANSIT', priority: 'MEDIUM' },
  { id: 'PK-923', station: 'Gambir Eco Hub', type: 'Plastic', weight: '85kg', time: '1 hour ago', status: 'COMPLETED', priority: 'LOW' },
];

const PickupCard = ({ pickup }: any) => {
  const isPending = pickup.status === 'PENDING';
  const isInTransit = pickup.status === 'IN_TRANSIT';
  const isCompleted = pickup.status === 'COMPLETED';

  return (
    <motion.div 
      layout
      className="glassmorphism p-6 rounded-[2.5rem] border border-white/5 bg-slate-900/40 relative overflow-hidden"
    >
      {pickup.priority === 'HIGH' && (
        <div className="absolute top-0 right-10 px-4 py-1 bg-red-500 text-white text-[10px] font-bold rounded-b-xl">
           PRIORITY
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className={cn(
          "w-20 h-20 rounded-3xl flex items-center justify-center shrink-0",
          isPending ? "bg-amber-500/10 text-amber-500" : 
          isInTransit ? "bg-blue-500/10 text-blue-500" : 
          "bg-green-500/10 text-green-500"
        )}>
           <Truck size={32} />
        </div>

        <div className="flex-1">
           <div className="flex justify-between items-start mb-2">
              <div>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">ID: {pickup.id}</p>
                 <h3 className="text-xl font-bold">{pickup.station}</h3>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                isPending ? "bg-amber-500/20 text-amber-500" : 
                isInTransit ? "bg-blue-500/20 text-blue-500" : 
                "bg-green-500/20 text-green-500"
              )}>
                 {pickup.status.replace('_', ' ')}
              </span>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-400">
                 <Box size={14} />
                 <span className="text-xs font-medium">{pickup.type}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                 <TrendingUp size={14} />
                 <span className="text-xs font-medium">{pickup.weight}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                 <Clock size={14} />
                 <span className="text-xs font-medium">{pickup.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                 <MapPin size={14} />
                 <span className="text-xs font-medium">Zone A</span>
              </div>
           </div>

           <div className="flex flex-wrap gap-3">
              {isPending && (
                <button className="flex-1 md:flex-none px-8 py-3 bg-eco-gradient text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                   Accept Task <CheckCircle2 size={18} />
                </button>
              )}
              {isInTransit && (
                <>
                  <button className="flex-1 md:flex-none px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                    Open Navigation <Navigation size={18} />
                  </button>
                  <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300">
                    <Phone size={18} />
                  </button>
                  <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300">
                    <MessageSquare size={18} />
                  </button>
                </>
              )}
              {isCompleted && (
                <button className="flex-1 md:flex-none px-8 py-3 bg-white/5 border border-white/10 text-slate-400 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-default">
                  Task Completed <CheckCircle2 size={18} />
                </button>
              )}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const PickupsPage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Pickup Management</h1>
            <p className="text-slate-500">Manage your active tasks and track your earnings.</p>
          </div>
          <div className="flex gap-4">
             <div className="glassmorphism px-6 py-3 rounded-2xl border border-primary/20 bg-primary/5 flex items-center gap-3">
                <Award className="text-primary w-5 h-5" />
                <div>
                   <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Driver Level</p>
                   <p className="text-lg font-bold">Elite Master <span className="text-xs font-medium text-primary/80">LV. 42</span></p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Available Tasks</h2>
                <span className="text-xs font-bold text-primary">3 TASKS ACTIVE</span>
             </div>
             <div className="flex flex-col gap-6">
                {pickups.map(pickup => (
                  <PickupCard key={pickup.id} pickup={pickup} />
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-8">
             <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
                <h3 className="text-lg font-bold mb-6">Earnings Dashboard</h3>
                <div className="space-y-6">
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Today's Revenue</p>
                        <p className="text-3xl font-bold">Rp 850.200</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs text-green-400 font-bold">+12% vs yesterday</p>
                      </div>
                   </div>
                   <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-eco-gradient" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl">
                         <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Pickups</p>
                         <p className="text-lg font-bold">14</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl">
                         <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Eco-Points</p>
                         <p className="text-lg font-bold text-amber-500">+1,420</p>
                      </div>
                   </div>
                </div>
                <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all">
                   Withdraw Earnings
                </button>
             </div>

             <div className="glassmorphism p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                   <AlertTriangle className="w-5 h-5 text-primary" />
                   Safety Alerts
                </h3>
                <p className="text-sm text-slate-300 mb-6">Heavy rain reported in Central Jakarta. Drive safely and ensure waste coverage is secure.</p>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10">
                   <Navigation className="text-primary" />
                   <p className="text-xs font-medium">Recommended safe routes updated.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default PickupsPage;
