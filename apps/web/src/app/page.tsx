"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Layers, 
  Recycle, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  MapPin,
  Bot
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase">
                AI-Powered Waste Revolution
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold font-outfit leading-tight"
            >
              The Future of <span className="eco-text-gradient">Circular Economy</span> is Here.
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              Circularia leverages Digital Twin technology and AI to transform waste management into a sustainable, profitable, and transparent ecosystem for Indonesia's future.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/dashboard"
                className="bg-eco-gradient text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all group"
              >
                Launch Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#solutions"
                className="glassmorphism text-white px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all"
              >
                Explore Solutions
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-8 pt-8 border-t border-white/5">
              <div>
                <p className="text-3xl font-bold">1.2M+</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">KG Waste Tracked</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-bold">450+</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">Smart Stations</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">Recycle Rate</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-eco-gradient rounded-[2rem] blur-3xl opacity-20 animate-pulse" />
            <div className="relative glassmorphism rounded-[2.5rem] overflow-hidden border border-white/10 aspect-square lg:aspect-video shadow-2xl">
              <Image 
                src="/images/hero-digital-twin.png" 
                alt="Digital Twin Visualization" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="glassmorphism p-4 rounded-2xl border border-white/20">
                  <p className="text-xs text-slate-400 uppercase mb-1">Realtime Monitoring</p>
                  <p className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    Station #042 - Active
                  </p>
                </div>
                <div className="glassmorphism p-4 rounded-2xl border border-white/20">
                  <Layers className="w-6 h-6 text-primary mb-2" />
                  <p className="text-xs font-bold">Digital Twin Layer V2.4</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, label: "Eco Impact", value: "85%", desc: "Reduction in landfill waste across Jakarta" },
              { icon: Zap, label: "AI Efficiency", value: "3.2x", desc: "Faster waste sorting compared to manual methods" },
              { icon: ShieldCheck, label: "Traceability", value: "100%", desc: "End-to-end transparent waste tracking on blockchain" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="glassmorphism p-8 rounded-3xl border border-white/5 flex flex-col gap-4"
              >
                <div className="p-3 bg-primary/10 rounded-xl w-fit">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">{stat.label}</p>
                <h3 className="text-4xl font-bold">{stat.value}</h3>
                <p className="text-slate-500 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section id="solutions" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6">Innovative <span className="eco-text-gradient">Circular Ecosystem</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A comprehensive suite of tools designed to connect every stakeholder in the circular economy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Digital Twin Monitoring", icon: Layers, color: "text-blue-400" },
              { title: "AI Waste Simulator", icon: Bot, color: "text-green-400" },
              { title: "Smart Pickup Map", icon: MapPin, color: "text-cyan-400" },
              { title: "Realtime Analytics", icon: BarChart3, color: "text-emerald-400" },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="group relative p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-primary/30 transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-eco-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                <feature.icon className={`w-10 h-10 ${feature.color} mb-6`} />
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-slate-500 text-sm">Next-gen technology for sustainable urban management and waste optimization.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="glassmorphism p-4 md:p-12 rounded-[3rem] border border-white/10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold font-outfit mb-6">Manage Your Ecosystem From One <span className="eco-text-gradient">Smart Dashboard</span></h2>
                <div className="space-y-6">
                  {[
                    "Realtime waste level monitoring across all collection points",
                    "Automated driver dispatching with AI route optimization",
                    "Sustainability reporting and carbon footprint analytics",
                    "Marketplace integration for recycled products"
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 p-1 bg-green-500/20 rounded-full">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <Link href="/register" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                    Get started for free <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px]">
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                  <Image 
                    src="/images/dashboard-preview.png" 
                    alt="Dashboard Preview" 
                    fill
                    className="object-cover"
                  />
                </motion.div>
                {/* Floating UI elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -left-10 glassmorphism p-6 rounded-2xl border border-white/20 hidden md:block"
                >
                  <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                  <p className="text-2xl font-bold">+12%</p>
                  <p className="text-xs text-slate-400">Efficiency Gain</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-16 rounded-[4rem] bg-eco-gradient relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform your waste ecosystem?</h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Join hundreds of organizations building a more sustainable future with Circularia.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/register"
                  className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all"
                >
                  Join the Revolution
                </Link>
                <Link 
                  href="/contact"
                  className="bg-black/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-2xl font-bold hover:bg-black/30 transition-all"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>
            
            {/* Decorative background shapes */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-eco-gradient rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold eco-text-gradient tracking-tight">
                Circularia
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              Pioneering the AI-driven circular economy in Indonesia. Making waste management smart, sustainable, and circular.
            </p>
            <div className="flex gap-4">
              {/* Social icons would go here */}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-400">Platform</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Digital Twin</Link></li>
              <li><Link href="/tracking" className="hover:text-primary transition-colors">Waste Tracking</Link></li>
              <li><Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link href="/ai-simulator" className="hover:text-primary transition-colors">AI Simulator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-400">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/impact" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link href="/partners" className="hover:text-primary transition-colors">Partners</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">© 2026 Circularia. Part of Indonesia Free Nutritious Meal Program Ecosystem.</p>
          <div className="flex gap-8 text-slate-600 text-sm">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
