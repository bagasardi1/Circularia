"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight, ArrowLeft, User, Truck, Shield, CheckCircle2, UserCircle, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const roles = [
  { id: 'user', title: 'Individual User', desc: 'Track and monetize your personal waste.', icon: User },
  { id: 'driver', title: 'Logistics Partner', desc: 'Join our fleet of collectors.', icon: Truck },
  
];

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('user');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setIsSubmitting(true);
    
    try {
      await register(fullName, email, password, selectedRole.toUpperCase() as any);
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
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-slate-500" />
        </Link>
      </header>

      <main className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center gap-8 px-10 py-12 lg:w-1/2 from-emerald-50 to-cyan-50">
          <Image src="/images/Logo_circular-removebg-preview.png" alt="Circularia Logo" width={100} height={150} className="object-contain" />
          <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black text-emerald-950 leading-tight">Mulai Perjalanan Keberlanjutanmu</h1>
            <p className="text-slate-500 leading-relaxed text-lg">Bergabunglah dengan ribuan pionir ekonomi sirkular. Bersama kita buat bumi lebih bersih sambil menghasilkan nilai ekonomi.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-center px-8 py-12 lg:w-1/2 bg-slate-50">
          <div className="w-full max-w-md bg-white rounded-[3rem] shadow-xl border border-slate-100 p-10 space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-wider">Registrasi Akun</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-2">Langkah {step} dari 2</p>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  {roles.map((role) => (
                    <button key={role.id} onClick={() => setSelectedRole(role.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${selectedRole === role.id ? 'border-emerald-600 bg-emerald-50 shadow-md' : 'border-slate-100 hover:border-emerald-100 bg-white'}`}>
                      <div className={`p-3 rounded-xl transition-colors ${selectedRole === role.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}><role.icon size={20} /></div>
                      <div className="flex-1"><h3 className={`text-xs font-black uppercase tracking-widest ${selectedRole === role.id ? 'text-emerald-900' : 'text-slate-600'}`}>{role.title}</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">{role.desc}</p></div>
                      {selectedRole === role.id && <CheckCircle2 className="text-emerald-600" size={20} />}
                    </button>
                  ))}
                  <button onClick={() => setStep(2)} className="w-full mt-6 py-5 bg-emerald-900 text-white rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-900/20">Lanjutkan <ArrowRight size={18} /></button>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} /> Kembali</button>
                  
                  <form onSubmit={handleRegister} className="space-y-4">
                    {localError && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-shake">
                        <AlertCircle size={16} />
                        {localError}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                      <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Masukkan nama Anda" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none transition-all text-slate-900" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@contoh.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none transition-all text-slate-900" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none transition-all text-slate-900" required />
                    </div>
                    
                    <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-emerald-900 text-white rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70">
                      {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Selesaikan Pendaftaran'} 
                      {!isSubmitting && <Leaf size={18} />}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-center text-xs text-slate-500 font-bold mt-8">Sudah punya akun? <Link href="/" className="text-emerald-600 hover:underline">Login di sini</Link></p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RegisterPage;
