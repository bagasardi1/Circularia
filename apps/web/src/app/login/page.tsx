"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, ArrowRight, Globe } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2 mb-8 group">
            <div className="p-3 bg-eco-gradient rounded-2xl group-hover:rotate-12 transition-transform">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold eco-text-gradient tracking-tighter">Circularia</span>
          </Link>
          <h1 className="text-3xl font-bold font-outfit mb-2">Welcome Back</h1>
          <p className="text-slate-500 text-center">Login to manage your circular ecosystem and impact.</p>
        </div>

        <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white"
                />
              </div>
            </div>

            <Link 
              href="/dashboard"
              className="w-full py-4 bg-eco-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Sign In <ArrowRight size={18} />
            </Link>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-4 text-slate-500">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all">
                <Globe size={18} /> Google
             </button>
             <button className="flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all">
                GitHub
             </button>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create Ecosystem Account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
