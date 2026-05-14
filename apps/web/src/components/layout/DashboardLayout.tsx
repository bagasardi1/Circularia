"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map, 
  Truck, 
  Recycle, 
  ShoppingBag, 
  GraduationCap, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  Activity,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }: any) => (
  <Link href={href}>
    <div className={cn(
      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
      active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:text-white hover:bg-white/5",
      collapsed && "justify-center px-2"
    )}>
      <Icon className={cn("w-5 h-5", active ? "text-white" : "group-hover:text-primary transition-colors")} />
      {!collapsed && <span className="font-medium">{label}</span>}
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
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Map, label: 'Smart Map', href: '/dashboard/map' },
    { icon: Truck, label: 'Pickups', href: '/dashboard/pickups' },
    { icon: Activity, label: 'Waste Tracking', href: '/dashboard/tracking' },
    { icon: Box, label: 'AI Simulator', href: '/dashboard/simulator' },
    { icon: Recycle, label: 'Recycling', href: '/dashboard/recycling' },
    { icon: ShoppingBag, label: 'Marketplace', href: '/dashboard/marketplace' },
    { icon: GraduationCap, label: 'Education', href: '/dashboard/education' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="h-full border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col p-4 relative z-30"
      >
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-eco-gradient rounded-xl flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold eco-text-gradient tracking-tight">Circularia</span>
          )}
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.label}
              {...item}
              active={pathname === item.href}
              collapsed={isCollapsed}
            />
          ))}
        </nav>

        <div className="mt-auto space-y-2 pt-4 border-t border-white/5">
          <SidebarItem icon={Settings} label="Settings" href="/dashboard/settings" active={pathname === '/dashboard/settings'} collapsed={isCollapsed} />
          <SidebarItem icon={LogOut} label="Logout" href="/login" collapsed={isCollapsed} />
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-20 border-b border-white/5 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10 w-96">
            <Search className="w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search data, points, or reports..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-slate-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            
            <div className="h-8 w-px bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-xs text-slate-500">System Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-eco-gradient p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                   <User className="w-6 h-6 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
