"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Zap, 
  DollarSign, 
  Leaf, 
  Loader2,
  RefreshCcw,
  ShoppingBag,
  Trash2,
  Scale,
  Sparkles,
  AlertCircle,
  Tag,
  Hammer,
  Wrench,
  Trophy
} from 'lucide-react';

const AISimulatorPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [itemName, setItemName] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const startSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !weight) return;
    
    setIsScanning(true);
    setShowResult(false);
    setError(null);

    try {
      const response = await fetch('/api/simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName, weight }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Terjadi kesalahan pada server');
      }

      setResult(data.result);
      setShowResult(true);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-primary-200">Ubah Sampah Otomatis dengan AI</h1>
          <p className="text-slate-500">Buat sampahmu menjadi produk kerajinan bernilai seni dan ekonomi.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40\">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 ">
                <Trash2 className="text-emerald-900" /> Bahan Baku Sampah
              </h3>
              
              <form onSubmit={startSimulation} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nama/Jenis Sampah</label>
                  <input 
                    type="text"
                    placeholder="Contoh: Koran Bekas, Sedotan, Tutup Botol..."
                    className="w-full bg-white border border-primary rounded-xl px-4 py-3 text-white-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Berat Total (Kg)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      className="w-full bg-white border border-primary rounded-xl px-4 py-3 text-white-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                    <Scale className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isScanning || !itemName || !weight}
                  className="w-full py-4 rounded-xl bg-[#004532] text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all  "
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" /> Merancang Kerajinan...
                    </>
                  ) : (
                    <>
                      <Hammer className="w-5 h-5" /> Rancang Ide Kerajinan
                    </>
                  )}
                </button>
              </form>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glassmorphism p-12 rounded-[2.5rem] border border-white/5 bg-slate-900/20 h-full flex flex-col items-center justify-center text-center text-slate-500"
                >
                  <Bot className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg font-medium">Ide kerajinan kreatif akan muncul di sini</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="glassmorphism p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="flex items-center gap-2 font-bold text-white-900 text-xl">
                        <Sparkles className="w-6 h-6 text-emerald-900" /> Ide: {result.craftIdea}
                      </h4>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Tingkat Kesulitan</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          result.craftDifficulty === 'Mudah' ? 'bg-green-500/20 text-green-400' :
                          result.craftDifficulty === 'Sedang' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {result.craftDifficulty}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-700 leading-relaxed border-l-2 border-primary/30 pl-4">
                      {result.craftDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="w-4 h-4 text-emerald-900" />
                          <span className="text-xs text-slate-900">Estimasi Harga Jual</span>
                        </div>
                        <p className="text-lg font-bold text-slate-700">{result.craftMarketValue}</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="w-4 h-4 text-emerald-900" />
                          <span className="text-xs text-white-900">Hemat CO2</span>
                        </div>
                        <p className="text-lg font-bold text-slate-700">{result.co2Saved} kg</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glassmorphism p-6 rounded-[2rem] bg-slate-900/40 border border-white/5">
                      <h5 className="flex items-center gap-2 font-bold text-white-900 mb-4 text-sm">
                        <Wrench className="w-4 h-4 text-emerald-900" /> Alat & Bahan Tambahan
                      </h5>
                      <ul className="space-y-2">
                        {result.toolsNeeded?.map((tool: string, i: number) => (
                          <li key={i} className="text-xs text-slate-900 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" /> {tool}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glassmorphism p-6 rounded-[2rem] bg-slate-900/40 border border-white/5">
                      <h5 className="flex items-center gap-2 font-bold text-white-900 mb-4 text-sm">
                        <Trophy className="w-4 h-4 text-yellow-500" /> Fun Fact
                      </h5>
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        "{result.funFact}"
                      </p>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AISimulatorPage;
