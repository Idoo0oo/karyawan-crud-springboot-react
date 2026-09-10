import React from 'react';
import { Users } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-16 flex items-center justify-between gap-3">
        {/* Logo & Judul */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="p-2 bg-sky-600 text-white rounded-lg shadow-sm flex-shrink-0">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 tracking-tight truncate">
              Aplikasi Data Pribadi
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 truncate hidden xs:block sm:block">
              Sistem Manajemen Data Karyawan
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0">
          <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline">Server Terhubung</span>
            <span className="sm:hidden">Online</span>
          </span>
        </div>
      </div>
    </header>
  );
}
