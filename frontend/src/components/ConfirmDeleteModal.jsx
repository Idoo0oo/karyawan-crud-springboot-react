import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDeleteModal({ isOpen, data, onClose, onConfirm, deleting }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2 text-slate-800">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold">Konfirmasi Hapus Data</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-base text-slate-800 font-medium mb-1">
            Anda yakin menghapus data <span className="font-bold text-slate-900">"{data.namaLengkap}"</span>?
          </p>
          <p className="text-xs text-slate-500 font-mono">
            NIK: {data.nik}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Data yang telah dihapus tidak dapat dipulihkan kembali.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center space-x-3">
          <button
            type="button"
            disabled={deleting}
            onClick={onConfirm}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
          >
            {deleting ? 'Menghapus...' : 'OK'}
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 rounded-lg transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
