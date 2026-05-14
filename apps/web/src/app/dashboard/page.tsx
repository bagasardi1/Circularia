"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Trash2, 
  Recycle, 
  AlertTriangle,
  ArrowRight,
  Bot,
  Zap,
  Leaf
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', waste: 4000, recycled: 2400 },
  { name: 'Tue', waste: 3000, recycled: 1398 },
  { name: 'Wed', waste: 2000, recycled: 9800 },
  { name: 'Thu', waste: 2780, recycled: 3908 },
  { name: 'Fri', waste: 1890, recycled: 4800 },
  { name: 'Sat', waste: 2390, recycled: 3800 },
  { name: 'Sun', waste: 3490, recycled: 4300 },
];

const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glassmorphism p-6 rounded-3xl border border-white/5 bg-slate-900/40"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {change}
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </motion.div>
);

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold font-outfit">Ecosystem Overview</h1>
            <p className="text-slate-500">Real-time circular economy analytics and AI insights.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
              Last 7 Days
            </button>
            <button className="px-4 py-2 bg-eco-gradient rounded-xl text-sm font-bold shadow-lg shadow-primary/20">
              Download Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Waste" 
            value="12.4 Tons" 
            change="+12.5%" 
            trend="up" 
            icon={Trash2} 
            color="bg-blue-500"
          />
          <StatCard 
            title="Recycling Rate" 
            value="78.2%" 
            change="+5.2%" 
            trend="up" 
            icon={Recycle} 
            color="bg-green-500"
          />
          <StatCard 
            title="Active Drivers" 
            value="142" 
            change="-2.1%" 
            trend="down" 
            icon={Users} 
            color="bg-purple-500"
          />
          <StatCard 
            title="Eco Points" 
            value="1.2M" 
            change="+24.8%" 
            trend="up" 
            icon={Zap} 
            color="bg-amber-500"
          />
        </div>

        {/* Charts and AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glassmorphism p-8 rounded-[2rem] border border-white/5 bg-slate-900/40">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Waste vs Recycling Flow</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs text-slate-400">Recycled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-xs text-slate-400">Waste</span>
                  </div>
                </div>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        border: '1px solid #ffffff10', 
                        borderRadius: '12px',
                        color: '#f8fafc'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="waste" 
                      stroke="#60A5FA" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorWaste)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="recycled" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRecycled)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="glassmorphism p-6 rounded-[2rem] border border-white/5 bg-slate-900/40">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Hotspots Alert
                  </h4>
                  <div className="space-y-4">
                    {[
                      { area: "Station #012 - Jakarta Pusat", capacity: "92%", status: "Critical" },
                      { area: "Station #045 - Jakarta Selatan", capacity: "88%", status: "High" },
                    ].map((alert, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div>
                          <p className="text-sm font-bold">{alert.area}</p>
                          <p className="text-xs text-slate-500">Current Capacity: {alert.capacity}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${alert.status === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>
                          {alert.status}
                        </span>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="glassmorphism p-6 rounded-[2rem] border border-white/5 bg-slate-900/40">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-500" />
                    Environmental Impact
                  </h4>
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          className="text-slate-800"
                          strokeDasharray="100, 100"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-green-500"
                          strokeDasharray="75, 100"
                          strokeWidth="3"
                          stroke="currentColor"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">75%</div>
                    </div>
                    <div>
                      <p className="text-sm font-bold">CO2 Offset</p>
                      <p className="text-2xl font-bold text-green-400">4,230 kg</p>
                      <p className="text-xs text-slate-500">Equivalent to 212 trees planted</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="flex flex-col gap-6">
            <div className="glassmorphism p-8 rounded-[2rem] border border-primary/20 bg-primary/5 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary rounded-xl">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">AI Recommendations</h3>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-xs text-primary font-bold uppercase mb-2">Optimization</p>
                  <p className="text-sm text-slate-300 mb-3">Redirect 4 drivers from Zone A to Zone C. Expected 15% reduction in pickup latency.</p>
                  <button className="text-xs font-bold flex items-center gap-1 text-primary hover:gap-2 transition-all">
                    Execute Optimization <ArrowRight size={12} />
                  </button>
                </div>
                
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-xs text-primary font-bold uppercase mb-2">Market Insight</p>
                  <p className="text-sm text-slate-300 mb-3">Plastic waste quality in South Station is increasing. Recommended for Premium Ecobrick production.</p>
                  <button className="text-xs font-bold flex items-center gap-1 text-primary hover:gap-2 transition-all">
                    View Potential ROI <ArrowRight size={12} />
                  </button>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-xs text-primary font-bold uppercase mb-2">Predictive Alert</p>
                  <p className="text-sm text-slate-300 mb-3">Station #088 likely to reach full capacity in 2 hours based on historical organic waste patterns.</p>
                  <button className="text-xs font-bold flex items-center gap-1 text-primary hover:gap-2 transition-all">
                    Schedule Pickup <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>AI Model: CircularMind-v4</span>
                  <span>Confidence: 98.4%</span>
                </div>
              </div>
            </div>

            <div className="glassmorphism p-6 rounded-[2rem] border border-white/5 bg-slate-900/40">
              <h3 className="text-lg font-bold mb-4">Live Driver Activity</h3>
              <div className="space-y-4">
                {[
                  { name: "Budi Santoso", task: "Pickup @ Station #012", status: "In Transit", time: "2 min" },
                  { name: "Siti Aminah", task: "Delivering to Processing", status: "Delivering", time: "12 min" },
                  { name: "Agus Hermawan", task: "Idle in Zone B", status: "Available", time: "Now" },
                ].map((driver, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{driver.name}</p>
                      <p className="text-xs text-slate-500">{driver.task}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-primary">{driver.status}</p>
                      <p className="text-[10px] text-slate-600">{driver.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border border-white/5 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5 transition-all">
                View All Drivers
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
