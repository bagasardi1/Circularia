"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Plus,
  Truck,
  ShoppingBag,
  Recycle,
  CalendarDays,
  Sparkles,
  ScanLine,
  ChevronRight,
} from "lucide-react";

/* ---------- sub-components ---------- */

const ActivityItem = ({
  icon,
  bg,
  title,
  subtitle,
  points,
  positive,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  subtitle: string;
  points: string;
  positive: boolean;
}) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
    <span className={`text-xs font-bold ${positive ? "text-emerald-700" : "text-red-600"}`}>
      {points}
    </span>
  </div>
);

/* ---------- page ---------- */

const weeklyData = [
  { week: 1, height: 40 },
  { week: 2, height: 55 },
  { week: 3, height: 70 },
  { week: 4, height: 100 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Halo, Eco Hero 👋</h1>
            <p className="text-gray-500 text-sm">
              Anda telah menghemat 42 kg CO₂ bulan ini. Teruskan kerja bagusnya!
            </p>
          </div>
          <button className="bg-emerald-900 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all w-fit">
            <Plus size={18} />
            Tindakan Baru
          </button>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — Stats & Chart */}
          <div className="lg:col-span-2 space-y-6">

            {/* Points Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                <Recycle size={200} />
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    Point Kamu Sekarang
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-5xl font-extrabold text-emerald-900">1,250</h2>
                    <span className="text-emerald-600 font-medium">Eco Points</span>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                  MASTER TIER PROGRESS
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 w-[65%] rounded-full" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>Peringkat: Level 4 Recycler</span>
                <span className="text-emerald-700">250 point menuju Master Recycler</span>
              </div>
            </div>

            {/* Impact Chart Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dampak Mingguan</h3>
                  <p className="text-sm text-gray-500">Pelacakan sampah yang terkumpul (kg)</p>
                </div>
                <button className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
                  Lihat Detail <ChevronRight size={14} />
                </button>
              </div>

              {/* Bar Chart Manual */}
              <div className="flex items-end justify-around gap-4 h-48">
                {weeklyData.map((d, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-full flex items-end justify-center" style={{ height: "160px" }}>
                      <div
                        className={`w-full rounded-2xl transition-all duration-300 ${
                          index === 3
                            ? "bg-emerald-900 shadow-lg shadow-emerald-900/20"
                            : "bg-gray-200 group-hover:bg-gray-300"
                        }`}
                        style={{ height: `${d.height}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${index === 3 ? "text-emerald-900" : "text-gray-400"}`}>
                      WEEK {d.week}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Actions & Activity */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 ml-1">Tindakan</h3>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Pickup */}
              <div className="col-span-2 bg-emerald-900 text-white p-5 rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform">
                <div>
                  <h4 className="font-bold text-lg mb-1">Pickup Sampah</h4>
                  <p className="text-emerald-200 text-sm">Schedule a collection</p>
                </div>
                <div className="bg-white/10 p-2 rounded-lg">
                  <Truck size={24} />
                </div>
              </div>

              {/* AI Scan */}
              <div className="bg-emerald-100 text-emerald-900 p-4 rounded-2xl flex flex-col justify-between h-32 cursor-pointer hover:bg-emerald-200 transition-colors">
                <div className="bg-white/50 w-10 h-10 rounded-full flex items-center justify-center">
                  <ScanLine size={20} />
                </div>
                <span className="font-bold">AI Scan</span>
              </div>

              {/* Shop */}
              <div className="bg-[#F2EBE5] text-[#5C4033] p-4 rounded-2xl flex flex-col justify-between h-32 cursor-pointer hover:brightness-95 transition-all">
                <div className="bg-white/50 w-10 h-10 rounded-full flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
                <span className="font-bold">Shop</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Aktifitas terbaru</h3>
                <button className="text-xs font-bold text-emerald-700 hover:text-emerald-900">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                <ActivityItem
                  icon={<Recycle className="text-emerald-600" size={18} />}
                  bg="bg-emerald-100"
                  title="Pengambilan Kertas"
                  subtitle="Kemarin 2:30 PM"
                  points="+45 pts"
                  positive
                />
                <ActivityItem
                  icon={<CalendarDays className="text-red-800" size={18} />}
                  bg="bg-red-100"
                  title="Toko"
                  subtitle="Pembelian Botol Air"
                  points="-120 pts"
                  positive={false}
                />
                <ActivityItem
                  icon={<Sparkles className="text-emerald-800" size={18} />}
                  bg="bg-emerald-100"
                  title="AI Scan Streak"
                  subtitle="3 Hari Scan"
                  points="+10 pts"
                  positive
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
