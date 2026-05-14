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
  ChevronRight,
  Star,
  Zap,
  Leaf,
  Trophy
} from 'lucide-react';
import Image from 'next/image';

const courses = [
  { 
    id: 1, 
    title: 'Circular Economy 101', 
    category: 'Foundations', 
    duration: '45 min', 
    lessons: 12, 
    progress: 100, 
    rating: 4.9,
    image: '/images/education-hero.png'
  },
  { 
    id: 2, 
    title: 'Advanced Plastic Sorting', 
    category: 'Technical', 
    duration: '1.5 hours', 
    lessons: 8, 
    progress: 45, 
    rating: 4.8,
    image: '/images/education-hero.png'
  },
  { 
    id: 3, 
    title: 'Mastering the Ecobrick', 
    category: 'DIY Guide', 
    duration: '30 min', 
    lessons: 5, 
    progress: 0, 
    rating: 5.0,
    image: '/images/education-hero.png'
  },
  { 
    id: 4, 
    title: 'Sustainable Smart Cities', 
    category: 'Advanced', 
    duration: '2 hours', 
    lessons: 15, 
    progress: 0, 
    rating: 4.7,
    image: '/images/education-hero.png'
  },
];

const EducationPage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Circular Learning Academy</h1>
            <p className="text-slate-500">Master the art of sustainability and earn exclusive ecosystem certifications.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="glassmorphism px-6 py-3 rounded-2xl border border-primary/20 bg-primary/5 flex items-center gap-3">
                <Trophy className="text-primary w-5 h-5" />
                <div>
                   <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Global Rank</p>
                   <p className="text-lg font-bold">#142 <span className="text-sm font-medium text-primary/80">IN JAKARTA</span></p>
                </div>
             </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="glassmorphism p-6 rounded-3xl border border-white/5 bg-slate-900/40">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-blue-500/20 rounded-xl">
                    <BookOpen className="text-blue-500" />
                 </div>
                 <h4 className="font-bold">Courses Completed</h4>
              </div>
              <p className="text-3xl font-bold">8 / 24</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4">
                 <div className="w-1/3 h-full bg-blue-500 rounded-full" />
              </div>
           </div>
           <div className="glassmorphism p-6 rounded-3xl border border-white/5 bg-slate-900/40">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-amber-500/20 rounded-xl">
                    <Award className="text-amber-500" />
                 </div>
                 <h4 className="font-bold">Certifications</h4>
              </div>
              <p className="text-3xl font-bold">3 Active</p>
              <p className="text-xs text-slate-500 mt-2">Next: Eco-Master Level 2</p>
           </div>
           <div className="glassmorphism p-6 rounded-3xl border border-white/5 bg-slate-900/40">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-green-500/20 rounded-xl">
                    <Zap className="text-green-500" />
                 </div>
                 <h4 className="font-bold">Learning Points</h4>
              </div>
              <p className="text-3xl font-bold">4,520 PTS</p>
              <p className="text-xs text-slate-500 mt-2">+240 this week</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Courses List */}
           <div className="lg:col-span-2 flex flex-col gap-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                 <GraduationCap className="text-primary" />
                 Recommended for You
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <motion.div 
                    key={course.id}
                    whileHover={{ scale: 1.02 }}
                    className="glassmorphism rounded-[2.5rem] border border-white/5 bg-slate-900/40 overflow-hidden"
                  >
                    <div className="relative h-48 w-full">
                       <Image src={course.image} alt={course.title} fill className="object-cover" />
                       <div className="absolute inset-0 bg-black/20" />
                       <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-lg uppercase">
                             {course.category}
                          </span>
                       </div>
                    </div>
                    <div className="p-6">
                       <h4 className="text-lg font-bold mb-4">{course.title}</h4>
                       <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                          <div className="flex items-center gap-1">
                             <Clock size={14} /> {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                             <Play size={14} /> {course.lessons} Lessons
                          </div>
                          <div className="flex items-center gap-1 text-amber-400 font-bold">
                             <Star size={14} fill="currentColor" /> {course.rating}
                          </div>
                       </div>
                       
                       {course.progress > 0 && (
                         <div className="mb-6">
                           <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                              <span className="text-slate-500">PROGRESS</span>
                              <span className="text-primary">{course.progress}%</span>
                           </div>
                           <div className="w-full h-1.5 bg-slate-800 rounded-full">
                              <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }} />
                           </div>
                         </div>
                       )}

                       <button className={cn(
                         "w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                         course.progress === 100 
                           ? "bg-green-500/10 border border-green-500/20 text-green-500 hover:bg-green-500/20" 
                           : "bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary"
                       )}>
                          {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                          <ArrowRight size={16} />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>

           {/* Achievements & Badges */}
           <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                 <Award className="text-amber-500" />
                 Your Badges
              </h3>
              <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40">
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Eco Pioneer', icon: Leaf, color: 'text-green-400', bg: 'bg-green-500/10' },
                      { name: 'Sort Master', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                      { name: 'Quick Learner', icon: Trophy, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                      { name: 'Certified Auditor', icon: ShieldCheck, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    ].map((badge, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all text-center">
                         <div className={`p-4 ${badge.bg} rounded-2xl mb-3`}>
                            <badge.icon className={`w-8 h-8 ${badge.color}`} />
                         </div>
                         <p className="text-[10px] font-bold text-slate-300">{badge.name}</p>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-8 py-4 border border-white/5 rounded-2xl text-xs font-bold text-slate-400 hover:bg-white/5 transition-all">
                    View All Achievements
                 </button>
              </div>

              {/* Weekly Challenge */}
              <div className="glassmorphism p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-24 h-24 text-primary" />
                 </div>
                 <h4 className="text-lg font-bold mb-2">Weekly Challenge</h4>
                 <p className="text-sm text-slate-300 mb-6">Complete 3 tutorials about Organic Waste and earn 500 extra points!</p>
                 <div className="flex items-center justify-between text-xs font-bold mb-4">
                    <span className="text-slate-400">Time Left: 2d 14h</span>
                    <span className="text-primary">1 / 3 Completed</span>
                 </div>
                 <div className="w-full h-2 bg-slate-800 rounded-full mb-8">
                    <div className="w-1/3 h-full bg-primary rounded-full shadow-[0_0_10px_#10B981]" />
                 </div>
                 <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                    Continue Challenge
                 </button>
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

export default EducationPage;
