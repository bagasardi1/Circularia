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
  Circle,
  Package,
  ShoppingBag,
  Clock,
  ChevronRight,
  ShieldCheck,
  User
} from 'lucide-react';

const trackingSteps = [
  { id: 'kitchen', label: 'Kitchen / Source', icon: Home, status: 'completed', time: 'May 14, 08:00 AM', desc: 'Waste generated and sorted at source.' },
  { id: 'collection', label: 'Smart Station', icon: MapPin, status: 'completed', time: 'May 14, 10:30 AM', desc: 'Deposited at Station #042. AI validation complete.' },
  { id: 'driver', label: 'Driver Pickup', icon: Truck, status: 'current', time: 'In Progress', desc: 'Driver Budi Santoso is en route to processing plant.' },
  { id: 'processing', label: 'Processing Plant', icon: Settings, status: 'pending', time: 'Estimated: 2 PM', desc: 'Sorting and conversion to raw material.' },
  { id: 'product', label: 'Recycled Product', icon: Package, status: 'pending', time: '-', desc: 'Final product quality check.' },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, status: 'pending', time: '-', desc: 'Listed for circular consumption.' },
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
            isActive ? "bg-primary border-primary shadow-[0_0_20px_rgba(16,185,129,0.4)]" : 
            isCompleted ? "bg-primary/10 border-primary/40 text-primary" : 
            "bg-slate-900 border-white/5 text-slate-600"
          )}
        >
          <Icon className={isActive ? "text-white" : ""} size={24} />
        </motion.div>
        {!isLast && (
          <div className={cn(
            "w-1 flex-1 my-2 rounded-full",
            isCompleted ? "bg-primary/40" : "bg-slate-800"
          )} />
        )}
      </div>

      <div className="flex-1 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
          <h3 className={cn(
            "text-xl font-bold",
            isActive ? "text-white" : isCompleted ? "text-slate-200" : "text-slate-600"
          )}>
            {step.label}
          </h3>
          <span className={cn(
            "text-xs font-bold px-3 py-1 rounded-full w-fit",
            isActive ? "bg-primary text-white" : 
            isCompleted ? "bg-primary/10 text-primary border border-primary/20" : 
            "bg-slate-800 text-slate-500"
          )}>
            {isActive ? 'Live Tracking' : isCompleted ? 'Completed' : 'Upcoming'}
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
            className="mt-6 p-6 glassmorphism rounded-3xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-slate-800 p-0.5 border border-primary/30">
               <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <User className="w-10 h-10 text-slate-400" />
               </div>
            </div>
            <div className="flex-1 text-center md:text-left">
               <p className="text-sm font-bold">Driver Budi Santoso</p>
               <p className="text-xs text-slate-500 mb-2">ID: DRV-9921 • Toyota Dyna (Electric)</p>
               <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold">⭐ 4.9</span>
                  <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-green-400">ON TIME</span>
               </div>
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all">
               Call Driver
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
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Waste Tracking Journey</h1>
            <p className="text-slate-500">Trace your waste from source to its new life as a recycled product.</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 border border-white/5 px-4 py-2 rounded-xl">
             <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Tracking ID</span>
             <span className="text-sm font-mono font-bold text-primary">#CIR-9283-4821</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2 glassmorphism p-8 md:p-12 rounded-[3rem] border border-white/5 bg-slate-900/40">
            <div className="flex flex-col">
              {trackingSteps.map((step, idx) => (
                <TrackingStep 
                  key={step.id} 
                  step={step} 
                  index={idx}
                  isLast={idx === trackingSteps.length - 1} 
                />
              ))}
            </div>
          </div>

          {/* Impact Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="glassmorphism p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-primary" />
                 Environmental Audit
               </h3>
               <div className="space-y-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Carbon Footprint Saved</p>
                    <p className="text-3xl font-bold text-primary">12.4 kg</p>
                  </div>
                  <hr className="border-white/5" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Water Conserved</p>
                    <p className="text-3xl font-bold text-cyan-400">45 Liters</p>
                  </div>
                  <hr className="border-white/5" />
                  <div className="p-4 bg-white/5 rounded-2xl">
                     <p className="text-sm font-bold text-slate-300 mb-2">Blockchain Verified</p>
                     <p className="text-[10px] text-slate-500 break-all font-mono">0x4a92...f8217e92b3c18</p>
                  </div>
               </div>
            </div>

            <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
               <h3 className="text-lg font-bold mb-4">Circular Reward</h3>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                    <Zap className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">120 Eco-Points</p>
                    <p className="text-xs text-slate-500">Pending verification</p>
                  </div>
               </div>
               <button className="w-full py-4 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/5 transition-all">
                  Redeem Rewards
               </button>
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

export default TrackingPage;
