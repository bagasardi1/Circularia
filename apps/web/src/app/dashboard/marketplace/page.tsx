"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Leaf, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Tag,
  Star,
  Zap
} from 'lucide-react';
import Image from 'next/image';

const categories = ['All Products', 'Home & Living', 'Construction', 'Fashion', 'Organic'];

const products = [
  { 
    id: 1, 
    name: 'Eco-Lumina Desk Lamp', 
    category: 'Home & Living', 
    price: 'Rp 450.000', 
    impact: '2.4kg Plastic Saved', 
    rating: 4.9,
    image: '/images/marketplace-hero.png',
    ecoPoints: 450
  },
  { 
    id: 2, 
    name: 'Industrial Eco-Bricks (100pcs)', 
    category: 'Construction', 
    price: 'Rp 1.200.000', 
    impact: '15kg Waste Diverted', 
    rating: 4.8,
    image: '/images/marketplace-hero.png',
    ecoPoints: 1200
  },
  { 
    id: 3, 
    name: 'Urban Upcycled Tote', 
    category: 'Fashion', 
    price: 'Rp 185.000', 
    impact: '0.8kg Textile Recycled', 
    rating: 4.7,
    image: '/images/marketplace-hero.png',
    ecoPoints: 185
  },
  { 
    id: 4, 
    name: 'Premium Bio-Compost', 
    category: 'Organic', 
    price: 'Rp 45.000', 
    impact: '5kg Organic Waste', 
    rating: 5.0,
    image: '/images/marketplace-hero.png',
    ecoPoints: 50
  },
];

const MarketplacePage = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Circular Marketplace</h1>
            <p className="text-slate-500">Buy products that matter. Every purchase supports the circular economy.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="glassmorphism px-6 py-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-center gap-3">
                <Zap className="text-amber-500 w-5 h-5" />
                <div>
                   <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Your Balance</p>
                   <p className="text-lg font-bold">1,240 <span className="text-sm font-medium text-amber-500/80">PTS</span></p>
                </div>
             </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all border",
                  activeCategory === cat 
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-slate-400">
               <Search size={18} />
               <input type="text" placeholder="Search products..." className="bg-transparent border-none outline-none text-sm w-48" />
            </div>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white">
               <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Featured Card */}
        <div className="relative rounded-[3rem] overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10" />
           <div className="relative h-[350px] w-full">
              <Image src="/images/marketplace-hero.png" alt="Featured" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
           </div>
           <div className="absolute inset-0 z-20 p-12 flex flex-col justify-center">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-full w-fit mb-4">New Release</span>
              <h2 className="text-4xl font-bold font-outfit mb-4 max-w-lg">Transforming Waste into <br/><span className="eco-text-gradient">Sustainable Art</span></h2>
              <p className="text-slate-300 max-w-md mb-8">Discover our new collection of home accessories made from 100% recycled ocean plastic.</p>
              <button className="bg-white text-slate-950 px-8 py-3.5 rounded-2xl font-bold w-fit hover:scale-105 transition-all">
                 Explore Collection
              </button>
           </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="glassmorphism rounded-[2.5rem] border border-white/5 bg-slate-900/40 overflow-hidden group"
            >
              <div className="relative h-64 w-full">
                 <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute top-4 right-4 p-2 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 text-white">
                    <ShoppingBag size={18} />
                 </div>
                 <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-green-500/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                       <Leaf size={10} /> {product.impact.split(' ')[0]}
                    </span>
                 </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                   <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</p>
                   <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star size={12} fill="currentColor" /> {product.rating}
                   </div>
                </div>
                <h3 className="text-lg font-bold mb-4 line-clamp-1">{product.name}</h3>
                
                <div className="flex items-center justify-between mb-6">
                   <p className="text-xl font-bold">{product.price}</p>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-bold">ECO POINTS</p>
                      <p className="text-sm font-bold text-amber-500">+{product.ecoPoints}</p>
                   </div>
                </div>

                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-primary hover:border-primary hover:text-white transition-all">
                   Buy with Impact
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Banner */}
        <div className="glassmorphism p-12 rounded-[3rem] border border-white/5 bg-slate-900/20 relative overflow-hidden mt-12">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center">
              <div>
                 <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
                 <h4 className="text-xl font-bold mb-2">Verified Recycled</h4>
                 <p className="text-sm text-slate-500">All products go through a rigorous AI quality check and material audit.</p>
              </div>
              <div>
                 <TrendingUp className="text-cyan-400 w-12 h-12 mx-auto mb-4" />
                 <h4 className="text-xl font-bold mb-2">Fair Economy</h4>
                 <p className="text-sm text-slate-500">Drivers and collection points receive 70% of the marketplace revenue.</p>
              </div>
              <div>
                 <Tag className="text-amber-500 w-12 h-12 mx-auto mb-4" />
                 <h4 className="text-xl font-bold mb-2">Eco-Rewards</h4>
                 <p className="text-sm text-slate-500">Earn points with every purchase to unlock exclusive green benefits.</p>
              </div>
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

export default MarketplacePage;
