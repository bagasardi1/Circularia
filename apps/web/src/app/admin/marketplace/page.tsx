"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Filter, 
  ShoppingBag, 
  Image as ImageIcon,
  X,
  Tag,
  Layers,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';

const initialProducts = [
  { 
    id: 1, 
    name: 'Refined Tote Bag', 
    category: 'Fashion', 
    material: 'OCEAN PLASTIC',
    price: 450, 
    idrPrice: 'IDR 45.000',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500&auto=format&fit=crop',
    stock: 124
  },
  { 
    id: 2, 
    name: 'Petal Notebook', 
    category: 'Alat Tulis', 
    material: 'PRESSED PAPER',
    price: 120, 
    idrPrice: 'IDR 12.000',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=500&auto=format&fit=crop',
    stock: 85
  },
  { 
    id: 3, 
    name: 'Volcanic Planter', 
    category: 'Dekorasi Rumah', 
    material: 'REGEN STONE',
    price: 890, 
    idrPrice: 'IDR 89.000',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=500&auto=format&fit=crop',
    stock: 42
  }
];

const AdminMarketplacePage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    material: '',
    price: '',
    idrPrice: '',
    image: '',
    stock: ''
  });

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', category: '', material: '', price: '', idrPrice: '', image: '', stock: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 font-outfit">Inventory Marketplace</h1>
            <p className="text-slate-500 text-sm">Kelola katalog produk sirkular dan stok barang.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 shadow-lg shadow-emerald-900/20 transition-all"
          >
            <Plus size={18} /> Tambah Produk Baru
          </button>
        </div>

        {/* Stats & Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
           <div className="lg:col-span-3 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Cari produk berdasarkan nama, material, atau kategori..." 
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all text-sm"
              />
           </div>
           <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50">
              <Filter size={18} /> Filter
           </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Produk</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori & Material</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Harga (Eco/IDR)</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stok</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 relative shrink-0">
                                  <Image src={product.image} alt="" fill className="object-cover" />
                               </div>
                               <div>
                                  <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                                  <p className="text-[10px] text-slate-400 font-bold">ID: PRD-{product.id.toString().padStart(3, '0')}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="space-y-1">
                               <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md uppercase tracking-wider">{product.category}</span>
                               <p className="text-[10px] text-slate-400 font-bold ml-1 uppercase">{product.material}</p>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="space-y-0.5">
                               <p className="text-sm font-black text-emerald-900">{product.price} <span className="text-[10px] font-bold text-slate-400 uppercase">PTS</span></p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase">{product.idrPrice}</p>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(product.stock / 200) * 100}%` }} />
                               </div>
                               <span className="text-xs font-bold text-slate-600">{product.stock}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button 
                                 onClick={() => handleOpenModal(product)}
                                 className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl"
                               >
                                  <Edit size={18} />
                               </button>
                               <button 
                                 onClick={() => handleDelete(product.id)}
                                 className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                               >
                                  <Trash2 size={18} />
                               </button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Modal CRUD */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl overflow-hidden"
             >
                <div className="flex justify-between items-center mb-8">
                   <div>
                      <h3 className="text-2xl font-black text-gray-900">{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                      <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">Detail Katalog Marketplace</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} className="text-slate-400" /></button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Produk</label>
                         <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori</label>
                         <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none transition-all">
                            <option value="">Pilih Kategori</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Dekorasi Rumah">Dekorasi Rumah</option>
                            <option value="Alat Tulis">Alat Tulis</option>
                         </select>
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Material</label>
                         <input type="text" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} placeholder="Contoh: OCEAN PLASTIC" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none transition-all" />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Harga (Eco)</label>
                            <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none" />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stok</label>
                            <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none" />
                         </div>
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Harga (IDR)</label>
                         <input type="text" value={formData.idrPrice} onChange={e => setFormData({...formData, idrPrice: e.target.value})} placeholder="Contoh: IDR 45.000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm focus:border-emerald-500 outline-none" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Gambar</label>
                         <div className="relative">
                            <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 pl-12 text-sm focus:border-emerald-500 outline-none" />
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mt-10 flex gap-4">
                   <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm transition-all hover:bg-slate-200">Batal</button>
                   <button onClick={() => {
                      alert('Fungsionalitas simpan berhasil dipicu!');
                      setIsModalOpen(false);
                   }} className="flex-1 py-4 bg-emerald-900 text-white rounded-2xl font-bold text-sm transition-all hover:bg-emerald-800 shadow-xl shadow-emerald-900/20">
                      {editingProduct ? 'Simpan Perubahan' : 'Terbitkan Produk'}
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default AdminMarketplacePage;
