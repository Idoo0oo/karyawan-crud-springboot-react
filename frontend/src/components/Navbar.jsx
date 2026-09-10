import React from 'react';
import { Users } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-900 text-white rounded-lg flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Aplikasi Data Pribadi
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
