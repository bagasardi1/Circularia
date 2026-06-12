"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  ShoppingBag, 
  Plus, 
  History, 
  LayoutGrid, 
  Shirt, 
  Home, 
  PenTool, 
  Leaf,
  SlidersHorizontal
} from 'lucide-react';
import Image from 'next/image';

const categories = [
  { id: 'all', label: 'Semua Item', icon: LayoutGrid },
  { id: 'fashion', label: 'Fashion', icon: Shirt },
  { id: 'home', label: 'Dekorasi Rumah', icon: Home },
  { id: 'stationery', label: 'Alat Tulis', icon: PenTool },
  { id: 'garden', label: 'Perkebunan', icon: Leaf },
];

const products = [
  { 
    id: 1, 
    name: 'Refined Tote Bag', 
    category: 'Eco Fashion', 
    material: 'OCEAN PLASTIC',
    price: 450, 
    idrPrice: 'IDR 45.000',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500&auto=format&fit=crop',
  },
  { 
    id: 2, 
    name: 'Petal Notebook', 
    category: 'Stationaries', 
    material: 'PRESSED PAPER',
    price: 120, 
    idrPrice: 'IDR 12.000',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=500&auto=format&fit=crop',
  },
  { 
    id: 3, 
    name: 'Volcanic Planter', 
    category: 'Home Decor', 
    material: 'REGEN STONE',
    price: 890, 
    idrPrice: 'IDR 89.000',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=500&auto=format&fit=crop',
  },
  { 
    id: 4, 
    name: 'Bamboo Tiffin Box', 
    category: 'Home & Living', 
    material: 'STAINLESS STEEL',
    price: 620, 
    idrPrice: 'IDR 62.000',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=500&auto=format&fit=crop',
  },
];

const MarketplacePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-20">
        {/* Header with Search */}
        <div className="flex items-center justify-between gap-6">
          
          
        </div>

        {/* Balance Card */}
        <div className="relative rounded-[2.5rem] bg-[#064e3b] p-10 overflow-hidden flex items-center justify-between">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-emerald-800/20 rounded-l-full blur-3xl -z-0" />
          
          <div className="relative z-10">
            <p className="text-[13px] text-emerald-200 uppercase font-bold tracking-[0.2em] mb-2">Marketplace</p>
            <div className="flex items-baseline gap-3 text-white">
              <h2 className="text-6xl font-bold tracking-tight">CIRCULARIA</h2>
              <span className="text-2xl font-medium text-emerald-100/80">SHOP</span>
            </div>
            
          </div>

          <div className="flex gap-4 relative z-10">
           <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari eco products, brands, materials..." 
              className="w-full h-12 bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-500"
            />
          </div>
          </div>
        </div>

        <div className="flex gap-12 mt-4">
          {/* Categories Sidebar */}
          <div className="w-64 shrink-0 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Kategori</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all group",
                    activeCategory === cat.id 
                      ? "text-emerald-900" 
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <div className={cn(
                    "p-2.5 rounded-xl transition-all",
                    activeCategory === cat.id 
                      ? "bg-emerald-900 text-white shadow-lg shadow-emerald-500/20" 
                      : "bg-white/5 border border-white/5 text-slate-400 group-hover:bg-white/10"
                  )}>
                    <cat.icon size={20} />
                  </div>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-500">Trending Eco-Products</h3>
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-xl text-slate-900 font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors">
                <SlidersHorizontal size={18} />
                Filter & Sort
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-[#6ee7b7] text-[#064e3b] text-[8px] font-black uppercase tracking-widest rounded-lg">
                        {product.material}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-black text-slate-900 mb-1">{product.name}</h4>
                    <p className="text-sm font-bold text-slate-400 mb-6">{product.category}</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-black text-slate-900 leading-none mb-1">{product.price}</p>
                        <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">{product.idrPrice}</p>
                      </div>
                      <button className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg">
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default MarketplacePage;
