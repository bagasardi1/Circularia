"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Map, 
  ScanLine, 
  Store, 
  Award, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Recycle
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

  const menuItems = [
    { icon: <Home size={20} />, label: 'Beranda', href: '/dashboard' },
    { icon: <Map size={20} />, label: 'Peta Sustainability', href: '/dashboard/map' },
    { icon: <ScanLine size={20} />, label: 'AI Scan', href: '/dashboard/simulator' },
    { icon: <Store size={20} />, label: 'Eco Shop', href: '/dashboard/marketplace' },
    { icon: <Award size={20} />, label: 'Pencapaian Saya', href: '/dashboard/tracking' },
  ];

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
            <div className="absolute inset-0 border-2 border-yellow-400 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Recycle className="w-5 h-5 text-emerald-700" />
            </div>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-emerald-900 tracking-tight">Circularia</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto">
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
            label="Settings" 
            href="/dashboard/settings" 
            active={pathname === '/dashboard/settings'} 
            collapsed={isCollapsed} 
          />
          <SidebarItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            href="/login" 
            collapsed={isCollapsed} 
          />

          {!isCollapsed && (
            <div className="p-3 flex items-center gap-3 mt-4 rounded-xl bg-slate-50 border border-slate-100">
              <img 
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                alt="User" 
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Eco Hero</p>
                <p className="text-[10px] text-gray-500">Level 4 Recycler</p>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors z-50 shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

