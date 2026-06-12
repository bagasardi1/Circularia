"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  ArrowRight, 
  ArrowLeft,
  User, 
  Truck, 
  Shield, 
  CheckCircle2,
  UserCircle
} from 'lucide-react';

const roles = [
  { 
    id: 'user', 
    title: 'User', 
    desc: 'Buat sampahmu jadi barang berharga',
    icon: User
  },
  { 
    id: 'driver', 
    title: 'Driver', 
    desc: 'Mari bergabung dengan circular partner',
    icon: Truck
  },
  { 
    id: 'admin', 
    title: 'Admin', 
    desc: 'Pengelola Sistem Circular',
    icon: Shield
  }
];

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('user');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* -- Header --------------------------------------- */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 relative ">
            <Image
              src="/images/Logo_circular-removebg-preview.png"
              alt="Circularia Logo"
              width={40}
              height={64}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-emerald-900 tracking-tight">Circularia</span>
        </div>
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
          <UserCircle className="w-5 h-5 text-slate-500" />
        </Link>
      </header>

      {/* -- Body ----------------------------------------- */}
      <main className="flex flex-1 flex-col lg:flex-row">
        
        {/* -- Kiri: Info ---------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center gap-8 px-10 py-12 lg:w-1/2 from-emerald-50 to-cyan-50"
        >
          <div className="flex items-center gap-4 relative ">
            <Image
              src="/images/Logo_circular-removebg-preview.png"
              alt="Circularia Logo"
              width={120}
              height={64}
              className="object-contain"
            />
          </div>

          <div className="space-y-4 max-w-200">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 leading-tight">
              Mulai Perjalanan Keberlanjutanmu
            </h1>
            <p className="text-slate-500 leading-relaxed">
              Bergabunglah dengan ribuan pionir ekonomi sirkular. Bersama kita buat bumi lebih bersih sambil menghasilkan nilai ekonomi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="p-2 bg-emerald-100 rounded-lg w-fit mb-3 text-emerald-700">
                    <Leaf size={20} />
                </div>
                <h4 className="font-bold text-emerald-900 mb-1">Dampak Nyata</h4>
                <p className="text-xs text-slate-500">Setiap kg sampah yang terlacak membantu mengurangi emisi karbon.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="p-2 bg-emerald-100 rounded-lg w-fit mb-3 text-emerald-700">
                    <DollarSign size={20} />
                </div>
                <h4 className="font-bold text-emerald-900 mb-1">Nilai Ekonomi</h4>
                <p className="text-xs text-slate-500">Konversi limbah menjadi pendapatan melalui ekosistem kami.</p>
            </div>
          </div>
        </motion.div>

        {/* -- Kanan: Form Register ------------------------ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center px-8 py-12 lg:w-1/2 bg-slate-50"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-emerald-900">Daftar Akun Baru</h2>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Langkah {step} dari 2</p>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <p className="text-sm font-bold text-slate-700 mb-4">Pilih Peran Anda:</p>
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group",
                        selectedRole === role.id 
                          ? "bg-emerald-50 border-emerald-200 shadow-md" 
                          : "bg-white border-slate-100 hover:border-emerald-100 hover:bg-slate-50"
                      )}
                    >
                      <div className={cn(
                        "p-3 rounded-xl transition-colors",
                        selectedRole === role.id ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100"
                      )}>
                        <role.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className={cn("text-md font-bold", selectedRole === role.id ? "text-emerald-900" : "text-slate-700")}>{role.title}</h3>
                        <p className="text-xs text-slate-500">{role.desc}</p>
                      </div>
                      {selectedRole === role.id && (
                        <CheckCircle2 className="text-emerald-500" size={20} />
                      )}
                    </button>
                  ))}

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full mt-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all"
                  >
                    Lanjutkan Pendaftaran <ArrowRight size={18} />
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
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors mb-4"
                  >
                    <ArrowLeft size={14} /> Kembali ke Pilih Peran
                  </button>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                      <input 
                        type="text" 
                        placeholder="Masukkan nama anda"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                      <input 
                        type="email" 
                        placeholder="email@contoh.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                     <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700 shrink-0">
                        <ShieldCheck size={16} />
                     </div>
                     <p className="text-[10px] text-slate-500 leading-relaxed">
                       Dengan mendaftar, Anda menyetujui <span className="text-emerald-700 font-bold cursor-pointer">Syarat & Ketentuan</span> dan <span className="text-emerald-700 font-bold cursor-pointer">Kebijakan Privasi</span> kami.
                     </p>
                  </div>

                  <Link 
                    href="/dashboard"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all"
                  >
                    Gabung ke Ekosistem <Leaf size={18} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-8 text-center text-slate-500 text-sm">
              Sudah punya akun? <Link href="/" className="text-emerald-700 font-bold hover:underline">Login di sini</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const ShieldCheck = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

const DollarSign = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);

export default RegisterPage;
