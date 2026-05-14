"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2,
  Trash2,
  Truck,
  Building,
  ArrowLeft
} from 'lucide-react';

const roles = [
  { id: 'USER', title: 'Citizen', desc: 'Sort waste, track impact, and buy products.', icon: User },
  { id: 'DRIVER', title: 'Eco-Driver', desc: 'Pickup waste and earn eco-points.', icon: Truck },
  { id: 'COLLECTION_POINT', title: 'Smart Station', desc: 'Manage collection points and analytics.', icon: Building },
];

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('USER');

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="p-2 bg-eco-gradient rounded-xl group-hover:rotate-12 transition-transform">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold eco-text-gradient tracking-tighter">Circularia</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={cn("w-10 h-1 bg-primary rounded-full transition-all", step === 1 ? "opacity-100" : "opacity-30")} />
            <div className={cn("w-10 h-1 bg-primary rounded-full transition-all", step === 2 ? "opacity-100" : "opacity-30")} />
          </div>

          <h1 className="text-3xl font-bold font-outfit mb-2">
            {step === 1 ? "Select Your Role" : "Create Your Account"}
          </h1>
          <p className="text-slate-500 text-center">
            {step === 1 ? "Choose how you want to participate in the ecosystem." : "Join the future of circular economy today."}
          </p>
        </div>

        <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 relative">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "w-full p-6 rounded-[2rem] border transition-all flex items-center gap-6 text-left group",
                      selectedRole === role.id 
                        ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className={cn(
                      "p-4 rounded-2xl transition-colors",
                      selectedRole === role.id ? "bg-primary text-white" : "bg-slate-800 text-slate-500 group-hover:text-slate-300"
                    )}>
                      <role.icon size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className={cn("text-lg font-bold mb-1", selectedRole === role.id ? "text-white" : "text-slate-300")}>{role.title}</h3>
                      <p className="text-sm text-slate-500">{role.desc}</p>
                    </div>
                    {selectedRole === role.id && (
                      <CheckCircle2 className="text-primary" />
                    )}
                  </button>
                ))}

                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-8 py-5 bg-eco-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Continue to Registration <ArrowRight size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors mb-4"
                >
                  <ArrowLeft size={14} /> Back to Role Selection
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-primary/50 transition-all text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-primary/50 transition-all text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-primary/50 transition-all text-white"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                   <div className="p-2 bg-primary rounded-lg text-white">
                      <ShieldCheck size={16} />
                   </div>
                   <p className="text-[10px] text-slate-400">
                     By registering, you agree to our <span className="text-primary font-bold">Terms of Circularity</span> and <span className="text-primary font-bold">Data Ethics</span>.
                   </p>
                </div>

                <Link 
                  href="/dashboard"
                  className="w-full py-5 bg-eco-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Join Ecosystem <Leaf size={18} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in here</Link>
        </p>
      </motion.div>
    </div>
  );
};

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// Minimal ShieldCheck for the note
const ShieldCheck = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default RegisterPage;
