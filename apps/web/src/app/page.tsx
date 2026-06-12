"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, User, Truck, Shield, UserCircle, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Role = 'user' | 'driver' | 'admin';

const roles: { key: Role; label: string; icon: any }[] = [
  { key: 'user',   label: 'User',   icon: User },
  { key: 'driver', label: 'Driver', icon: Truck },
  { key: 'admin',  label: 'Admin',  icon: Shield },
];

export default function HomePage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [activeRole, setActiveRole] = useState<Role>('user');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setIsSubmitting(true);
    
    try {
      await login(email, password, activeRole);
    } catch (err: any) {
      setLocalError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Image src="/images/Logo_circular-removebg-preview.png" alt="Circularia Logo" width={30} height={48} className="object-contain" />
          <span className="text-xl font-bold text-emerald-900 tracking-tight">Circularia</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-slate-500" />
        </div>
      </header>

      <main className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center gap-8 px-10 py-12 lg:w-1/2 from-emerald-50 to-cyan-50"
        >
          <Image src="/images/Logo_circular-removebg-preview.png" alt="Circularia Logo" width={100} height={150} className="object-contain" />
          <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black text-emerald-950 leading-tight">Selamat Datang di Masa Depan Circular</h1>
            <p className="text-slate-500 leading-relaxed text-lg">Circularia memberdayakan ekonomi global dengan membuat keberlanjutan menjadi mudah, satu transaksi pada satu waktu.</p>
          </div>
          <div className="relative w-full max-w-md h-56 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image src="/images/hero-digital-twin.png" alt="Circularia Platform" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center px-8 py-12 lg:w-1/2 bg-slate-50"
        >
          <div className="w-full max-w-md bg-white rounded-[3rem] shadow-xl border border-slate-100 p-10 space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-wider">Login Portal</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-2">Pilih Role Akses Anda</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRole(r.key)}
                  className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                    activeRole === r.key ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-md' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <r.icon size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{r.label}</span>
                </button>
              ))}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {localError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-shake">
                  <AlertCircle size={16} />
                  {localError}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Alamat Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@circularia.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900" required />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900" required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Masuk ke Sistem'} 
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 font-bold">
              Tidak punya akun? <Link href="/register" className="text-emerald-600 hover:underline ml-1">Daftar Sekarang</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
