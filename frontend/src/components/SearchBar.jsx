import React, { useState } from 'react';
import { Search, Plus, RotateCcw } from 'lucide-react';

export default function SearchBar({ onSearch, onOpenAddModal }) {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ nik, nama });
  };

  const handleReset = () => {
    setNik('');
    setNama('');
    onSearch({ nik: '', nama: '' });
  };

  return (
    <div className="bg-gradient-to-r from-amber-50/90 to-orange-50/90 border border-orange-200/80 rounded-xl p-5 shadow-sm mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          {/* Input NIK */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label htmlFor="search-nik" className="w-24 text-sm font-semibold text-slate-700 mb-1 sm:mb-0">
              NIK
            </label>
            <input
              id="search-nik"
              type="text"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder="Cari berdasarkan NIK..."
              className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-inner"
            />
          </div>

          {/* Input Nama */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label htmlFor="search-nama" className="w-24 text-sm font-semibold text-slate-700 mb-1 sm:mb-0">
              Nama
            </label>
            <input
              id="search-nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Cari berdasarkan Nama..."
              className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-orange-200/60">
          {(nik || nama) && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors shadow-sm"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Reset
            </button>
          )}

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
          >
            <Search className="w-4 h-4 mr-1.5" />
            Search
          </button>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
