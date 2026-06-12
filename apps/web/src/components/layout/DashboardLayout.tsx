"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Map, 
  ScanLine, 
  Store, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Truck,
  Activity,
  Award,
  DollarSign,
  ClipboardList,
  Navigation,
  Users,
  Shield,
  Coins,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarItem = ({ icon, label, href, active, collapsed }: any) => (
  <Link href={href}>
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative cursor-pointer",
      active 
        ? "bg-emerald-900 text-white shadow-md" 
        : "text-slate-500 hover:bg-slate-50 hover:text-emerald-900",
      collapsed && "justify-center px-2"
    )}>
      <span className={cn("shrink-0", active ? "text-white" : "text-slate-400 group-hover:text-emerald-900")}>
        {icon}
      </span>
      {!collapsed && <span className="font-medium text-sm">{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  </Link>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Role checks based on path
  const isDriver = pathname.includes('/driver');
  const isAdmin = pathname.includes('/admin');

  const userMenuItems = [
    { icon: <Home size={20} />, label: 'Beranda', href: '/dashboard' },
    { icon: <ScanLine size={20} />, label: 'AI Craft Simulator', href: '/dashboard/simulator' },
    { icon: <Store size={20} />, label: 'Eco Marketplace', href: '/dashboard/marketplace' },
    { icon: <Activity size={20} />, label: 'Lacak Limbah', href: '/dashboard/tracking' },
    { icon: <Map size={20} />, label: 'Peta Sustainability', href: '/dashboard/map' },
    { icon: <Award size={20} />, label: 'Pencapaian', href: '/dashboard/achievements' },
  ];

  const driverMenuItems = [
    { icon: <Home size={20} />, label: 'Driver Dashboard', href: '/driver' },
    { icon: <ClipboardList size={20} />, label: 'Daftar Pickup', href: '/driver/pickups' },
    { icon: <Navigation size={20} />, label: 'Rute Koleksi', href: '/driver/routes' },
    { icon: <DollarSign size={20} />, label: 'Pendapatan', href: '/driver/earnings' },
    { icon: <Award size={20} />, label: 'Performa & Rank', href: '/driver/performance' },
  ];

  const adminMenuItems = [
    { icon: <BarChart3 size={20} />, label: 'Admin Panel', href: '/admin' },
    { icon: <Users size={20} />, label: 'Manajemen User', href: '/admin/users' },
    { icon: <Truck size={20} />, label: 'Manajemen Driver', href: '/admin/drivers' },
    { icon: <Coins size={20} />, label: 'Point Collection', href: '/admin/points' },
    { icon: <Store size={20} />, label: 'Marketplace Admin', href: '/admin/marketplace' },
  ];

  const menuItems = isAdmin ? adminMenuItems : isDriver ? driverMenuItems : userMenuItems;

  return (
    <div className="flex h-screen bg-[#F7F9F8] text-slate-800 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="h-full border-r border-gray-200 bg-white flex flex-col p-4 relative z-30 shrink-0"
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-2 mb-4 shrink-0">
          <div className="relative w-8 h-8">
            <div className={cn(
              "absolute inset-0 border-2 rounded-full",
              isAdmin ? "border-emerald-600" : "border-emerald-500"
            )}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/Logo_circular-removebg-preview.png"
                alt="Circularia Logo"
                width={20}
                height={32}
                className="object-contain"
              />
            </div>
          </div>
          {!isCollapsed && (
            <span className={cn(
              "text-xl font-bold tracking-tight",
              isAdmin ? "text-emerald-900" : "text-emerald-900"
            )}>Circularia</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.label}
              {...item}
              active={pathname === item.href}
              collapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Bottom Profile / Settings */}
        <div className="mt-auto pt-4 border-t border-gray-100 space-y-2 shrink-0">
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Pengaturan" 
            href={isAdmin ? "/admin/settings" : isDriver ? "/driver/settings" : "/dashboard/settings"} 
            active={pathname.includes('/settings')} 
            collapsed={isCollapsed} 
          />
          <SidebarItem 
            icon={<LogOut size={20} />} 
            label="Keluar" 
            href="/" 
            collapsed={isCollapsed} 
          />

          {!isCollapsed && (
            <div className={cn(
              "p-3 flex items-center gap-3 mt-4 rounded-xl border shadow-sm",
              isAdmin ? "bg-emerald-50 border-emerald-100" : isDriver ? "bg-amber-50 border-amber-100" : "bg-emerald-50 border-emerald-100"
            )}>
              <img 
                src={isAdmin ? "https://i.pravatar.cc/150?u=admin" : isDriver ? "https://i.pravatar.cc/150?u=driver1" : "https://i.pravatar.cc/150?u=a042581f4e29026704d"} 
                alt="User" 
                className={cn(
                  "w-9 h-9 rounded-full object-cover border shadow-sm",
                  isAdmin ? "border-emerald-200" : isDriver ? "border-amber-200" : "border-emerald-200"
                )}
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-gray-900 truncate">{isAdmin ? "Super Admin" : isDriver ? "Andi Wijaya" : "Eco Hero"}</p>
                <p className={cn(
                  "text-[10px] font-medium",
                  isAdmin ? "text-emerald-700" : isDriver ? "text-amber-600" : "text-emerald-600"
                )}>{isAdmin ? "System Controller" : isDriver ? "Elite Driver" : "Level 4 Recycler"}</p>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors z-50 shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

