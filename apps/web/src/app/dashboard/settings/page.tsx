"use client";

import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-teal-800 mb-8">Pengaturan Akun</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Profil Anda</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-700" 
              value={user?.name || ''} 
              readOnly 
              disabled
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-700" 
              value={user?.email || ''} 
              readOnly 
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Peran Akun</label>
            <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
              {user?.role || 'USER'}
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-100" />

        <h2 className="text-xl font-semibold mb-4 text-slate-800">Keamanan</h2>
        <p className="text-sm text-slate-500 mb-4">Ubah kata sandi akun Anda untuk menjaga keamanan.</p>
        
        <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
          Ubah Kata Sandi (Segera Hadir)
        </button>
      </div>
    </div>
  );
}
