"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, User, Truck, Shield, UserCircle } from 'lucide-react';

type Role = 'user' | 'driver' | 'admin';

const roles: { key: Role; label: string; icon: React.ReactNode }[] = [
  { key: 'user',   label: 'User',   icon: <User   size={18} /> },
  { key: 'driver', label: 'Driver', icon: <Truck  size={18} /> },
  { key: 'admin',  label: 'Admin',  icon: <Shield size={18} /> },
];

export default function HomePage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [activeRole, setActiveRole] = useState<Role>('user');

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
        <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
          <UserCircle className="w-5 h-5 text-slate-500" />
        </button>
      </header>

      {/* -- Body ----------------------------------------- */}
      <main className="flex flex-1 flex-col lg:flex-row">

        {/* -- Kiri: Landing ------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center gap-8 px-10 py-12 lg:w-1/2 from-emerald-50 to-cyan-50"
        >
          {/* Logo besar */}
          <div className="flex items-center gap-4 relative ">
            <Image
              src="/images/Logo_circular-removebg-preview.png"
              alt="Circularia Logo"
              width={150}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Teks utama */}
          <div className="space-y-4 max-w-200">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 leading-tight text-green-900">
              Selamat Datang di Masa Depan Circular
            </h1>
            <p className="text-slate-500 leading-relaxed">
              Circularia memberdayakan ekonomi global dengan membuat keberlanjutan menjadi mudah,
              satu transaksi pada satu waktu.
            </p>
          </div>

          {/* Gambar hero */}
          <div className="relative w-full max-w-md h-56 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/hero-digital-twin.png"
              alt="Circularia Platform"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
          </div>

          {/* Stats kecil */}
          <div className="flex gap-8">
            {[
              { value: '1.2M+', label: 'KG Sampah Terlacak' },
              { value: '450+', label: 'Stasiun Pintar' },
              { value: '98%',  label: 'Tingkat Daur Ulang' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-emerald-800">{s.value}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* -- Kanan: Form Login --------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center px-8 py-12 lg:w-1/2 bg-slate-50"
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-6">

            {/* Judul */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-900">Login ke Circularia</h2>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Pilih Role Mu</p>
            </div>

            {/* Pilih Role */}
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRole(r.key)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 text-sm font-semibold transition-all ${
                    activeRole === r.key
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@circularia.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="��������"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember + Lupa Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded accent-emerald-600"
                  />
                  Ingat saya
                </label>
                <Link href="#" className="text-sm font-semibold text-emerald-700 hover:underline">
                  Lupa Password?
                </Link>
              </div>

              {/* Tombol Sign In */}
              <Link
                href="/dashboard"
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/20 hover:shadow-lg"
              >
                Sign In <ArrowRight size={16} />
              </Link>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-slate-500">
              Tidak punya akun?{' '}
              <Link href="/register" className="font-bold text-emerald-700 hover:underline">
                Join the Circle
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

