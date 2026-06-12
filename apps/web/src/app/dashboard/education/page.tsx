"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Play, 
  BookOpen, 
  Award, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Leaf,
  Trophy,
  Trash2,
  Hammer,
  Blocks,
  Container
} from 'lucide-react';
import Image from 'next/image';

const courses = [
  { 
    id: 1, 
    title: 'Seni Pemilahan Limbah', 
    category: 'Dasar', 
    duration: '20 mnt', 
    lessons: 5, 
    progress: 100, 
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=500&auto=format&fit=crop',
    icon: Trash2
  },
  { 
    id: 2, 
    title: 'Plastik Jadi Karya Seni', 
    category: 'Kerajinan', 
    duration: '1 jam', 
    lessons: 8, 
    progress: 45, 
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1526657782461-9fe134027df5?q=80&w=500&auto=format&fit=crop',
    icon: Hammer
  },
  { 
    id: 3, 
    title: 'Panduan Master Ecobrick', 
    category: 'Konstruksi', 
    duration: '45 mnt', 
    lessons: 6, 
    progress: 0, 
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=500&auto=format&fit=crop',
    icon: Blocks
  },
  { 
    id: 4, 
    title: 'Kompos Organik Rumahan', 
    category: 'Organik', 
    duration: '30 mnt', 
    lessons: 4, 
    progress: 0, 
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=500&auto=format&fit=crop',
    icon: Container
  },
];

const EducationPage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold font-outfit text-emerald-950">Akademi Edukasi Limbah</h1>
            <p className="text-slate-500">Pahami proses pengolahan limbah menjadi produk bernilai ekonomi tinggi.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
                <Trophy className="text-emerald-600 w-5 h-5" />
                <div>
                   <p className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest">Peringkat Belajar</p>
                   <p className="text-lg font-bold text-emerald-950">TOP 5% <span className="text-sm font-medium text-emerald-600/80">NASIONAL</span></p>
                </div>
             </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-emerald-50 rounded-xl">
                    <BookOpen className="text-emerald-600" />
                 </div>
                 <h4 className="font-bold text-emerald-950">Materi Selesai</h4>
              </div>
              <p className="text-3xl font-bold text-emerald-900">12 / 24</p>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4">
                 <div className="w-1/2 h-full bg-emerald-500 rounded-full" />
              </div>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-blue-50 rounded-xl">
                    <Award className="text-blue-600" />
                 </div>
                 <h4 className="font-bold text-emerald-950">Sertifikasi Aktif</h4>
              </div>
              <p className="text-3xl font-bold text-blue-900">4 Sertifikat</p>
              <p className="text-xs text-slate-500 mt-2">Baru: Ahli Ecobrick Madya</p>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-amber-50 rounded-xl">
                    <Zap className="text-amber-500" />
                 </div>
                 <h4 className="font-bold text-emerald-950">Eco Learning Points</h4>
              </div>
              <p className="text-3xl font-bold text-amber-600">8,450 PTS</p>
              <p className="text-xs text-slate-500 mt-2">+450 poin minggu ini</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Courses Grid */}
           <div className="lg:col-span-2 flex flex-col gap-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-900">
                 <GraduationCap className="text-emerald-500" />
                 Materi Rekomendasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <motion.div 
                    key={course.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group"
                  >
                    <div className="relative h-48 w-full">
                       <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-emerald-900 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                             {course.category}
                          </span>
                       </div>
                    </div>
                    <div className="p-8">
                       <div className="flex justify-between items-start mb-4">
                          <h4 className="text-xl font-bold text-emerald-950 leading-tight pr-4">{course.title}</h4>
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                             <Star size={14} fill="currentColor" /> {course.rating}
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-4 mb-6 text-slate-500 text-xs font-medium">
                          <div className="flex items-center gap-1">
                             <Clock size={14} /> {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                             <Play size={14} /> {course.lessons} Materi
                          </div>
                       </div>

                       {course.progress > 0 && (
                         <div className="mb-6">
                           <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                              <span className="text-slate-400">PROGRES</span>
                              <span className="text-emerald-600">{course.progress}%</span>
                           </div>
                           <div className="w-full h-1.5 bg-slate-100 rounded-full">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${course.progress}%` }} />
                           </div>
                         </div>
                       )}

                       <button className={cn(
                         "w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                         course.progress === 100 
                           ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" 
                           : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100"
                       )}>
                          {course.progress === 100 ? 'Review Materi' : course.progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                          <ArrowRight size={16} />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>

           {/* Interactive Content & Badges */}
           <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-900">
                 <ShieldCheck className="text-blue-500" />
                 Lencana Keterampilan
              </h3>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Pemilah Ahli', icon: Trash2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                      { name: 'Craft Master', icon: Hammer, color: 'text-amber-500', bg: 'bg-amber-50' },
                      { name: 'Eco Builder', icon: Blocks, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { name: 'Compost Pro', icon: Container, color: 'text-emerald-700', bg: 'bg-emerald-50' },
                    ].map((badge, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-50 border border-transparent hover:border-emerald-100 transition-all text-center">
                         <div className={`p-4 ${badge.bg} rounded-2xl mb-3`}>
                            <badge.icon className={`w-8 h-8 ${badge.color}`} />
                         </div>
                         <p className="text-[10px] font-bold text-slate-700">{badge.name}</p>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-8 py-4 bg-slate-50 text-slate-500 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all">
                    Lihat Semua Pencapaian
                 </button>
              </div>

              {/* Weekly Interactive Content */}
              <div className="bg-emerald-900 p-8 rounded-[2.5rem] relative overflow-hidden text-white">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-24 h-24" />
                 </div>
                 <h4 className="text-lg font-bold mb-2">Tantangan Interaktif</h4>
                 <p className="text-sm text-emerald-100/80 mb-6">Selesaikan tutorial pembuatan Ecobrick minggu ini dan dapatkan 500 Poin tambahan!</p>
                 
                 <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-emerald-300">Waktu Tersisa: 2 Hari</span>
                    <span className="text-white">65% Populasi Ikut</span>
                 </div>
                 <div className="w-full h-2 bg-white/10 rounded-full mb-8">
                    <div className="w-2/3 h-full bg-emerald-400 rounded-full" />
                 </div>
                 
                 <button className="w-full py-4 bg-white text-emerald-900 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all">
                    Ikuti Tantangan Sekarang
                 </button>
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

export default EducationPage;
