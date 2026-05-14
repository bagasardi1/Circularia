"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Bot, 
  Zap, 
  DollarSign, 
  Leaf, 
  Settings, 
  CheckCircle2, 
  Loader2,
  Scan,
  RefreshCcw,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';

const AISimulatorPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const startSimulation = () => {
    setIsScanning(true);
    setShowResult(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-outfit">AI Waste Conversion Simulator</h1>
          <p className="text-slate-500">Scan waste items to estimate their economic and environmental value.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload and Scan Area */}
          <div className="flex flex-col gap-6">
            <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 relative overflow-hidden h-[500px] flex flex-col items-center justify-center">
              {!preview ? (
                <label className="flex flex-col items-center justify-center cursor-pointer group w-full h-full">
                  <div className="p-6 bg-primary/10 rounded-3xl border border-dashed border-primary/30 group-hover:bg-primary/20 transition-all mb-4">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-lg font-bold">Upload Waste Image</p>
                  <p className="text-sm text-slate-500">Drag and drop or click to browse</p>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              ) : (
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image src={preview} alt="Waste preview" fill className="object-cover" />
                  
                  {isScanning && (
                    <motion.div 
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_#10B981] z-10"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setPreview(null)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={startSimulation}
              disabled={!preview || isScanning}
              className={cn(
                "w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all",
                !preview || isScanning 
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                  : "bg-eco-gradient text-white shadow-xl shadow-primary/20 hover:scale-[1.02]"
              )}
            >
              {isScanning ? (
                <>
                  <Loader2 className="animate-spin" />
                  Analyzing Waste Composition...
                </>
              ) : (
                <>
                  <Scan />
                  Run AI Conversion Analysis
                </>
              )}
            </button>
          </div>

          {/* Results Area */}
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glassmorphism p-12 rounded-[2.5rem] border border-white/5 bg-slate-900/20 h-full flex flex-col items-center justify-center text-center text-slate-500"
                >
                  <Bot className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-xl font-medium">Waiting for analysis...</p>
                  <p className="max-w-xs">Upload an image and run simulation to see the potential of your waste.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-6"
                >
                  <div className="glassmorphism p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">Analysis Complete</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="p-4 bg-white/5 rounded-2xl">
                          <p className="text-xs text-slate-400 uppercase mb-1">Waste Type</p>
                          <p className="text-lg font-bold text-primary">High-Density PE</p>
                       </div>
                       <div className="p-4 bg-white/5 rounded-2xl">
                          <p className="text-xs text-slate-400 uppercase mb-1">Purity Level</p>
                          <p className="text-lg font-bold text-cyan-400">92.4%</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500/20 rounded-xl">
                              <DollarSign className="text-amber-500" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">Estimated Market Value</p>
                              <p className="text-xl font-bold">Rp 12.500 / kg</p>
                            </div>
                          </div>
                          <TrendingUp className="text-green-500" />
                       </div>

                       <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/20 rounded-xl">
                              <Leaf className="text-green-500" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">Environmental ROI</p>
                              <p className="text-xl font-bold">2.4kg CO2 Saved</p>
                            </div>
                          </div>
                          <Zap className="text-amber-500" />
                       </div>
                    </div>
                  </div>

                  <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
                    <h4 className="font-bold mb-6 flex items-center gap-2">
                      <RefreshCcw className="w-5 h-5 text-cyan-400" />
                      Recommended Recycling Process
                    </h4>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                        <div>
                          <p className="font-bold">Sterilization & Cleaning</p>
                          <p className="text-sm text-slate-400">Wash with eco-friendly detergent to remove labels and organic residue.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                        <div>
                          <p className="font-bold">Granulation</p>
                          <p className="text-sm text-slate-400">Convert into small plastic pellets for easier processing into new products.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                        <div>
                          <p className="font-bold">Eco-Brick Molding</p>
                          <p className="text-sm text-slate-400">Compress pellets into high-strength bricks for sustainable construction.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-eco-gradient rounded-3xl flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <ShoppingBag className="w-8 h-8 text-white" />
                          <div>
                            <p className="text-white font-bold">Suggested End Product</p>
                            <p className="text-white/80 text-sm">Industrial Grade Eco-Brick</p>
                          </div>
                       </div>
                       <button className="bg-white text-slate-900 p-2 rounded-full hover:scale-110 transition-transform">
                          <ArrowRight />
                       </button>
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

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default AISimulatorPage;
