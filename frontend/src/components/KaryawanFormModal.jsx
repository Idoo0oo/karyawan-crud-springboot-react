import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { COUNTRIES } from '../constants/countries';

export default function KaryawanFormModal({ isOpen, mode, initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nik: '',
    namaLengkap: '',
    jenisKelamin: 'LAKI_LAKI',
    tanggalLahir: '',
    alamat: '',
    negara: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nik: initialData.nik || '',
        namaLengkap: initialData.namaLengkap || '',
        jenisKelamin: initialData.jenisKelamin || 'LAKI_LAKI',
        tanggalLahir: initialData.tanggalLahir || '',
        alamat: initialData.alamat || '',
        negara: initialData.negara || ''
      });
    } else {
      setFormData({
        nik: '',
        namaLengkap: '',
        jenisKelamin: 'LAKI_LAKI',
        tanggalLahir: '',
        alamat: '',
        negara: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const isReadOnly = mode === 'detail';
  const isEdit = mode === 'edit';

  const validate = () => {
    const errs = {};
    if (!formData.nik || !formData.nik.trim()) {
      errs.nik = 'NIK wajib diisi';
    } else if (!/^[0-9]+$/.test(formData.nik.trim())) {
      errs.nik = 'NIK harus berupa angka';
    }

    if (!formData.namaLengkap || !formData.namaLengkap.trim()) {
      errs.namaLengkap = 'Nama Lengkap wajib diisi';
    }

    if (!formData.jenisKelamin) {
      errs.jenisKelamin = 'Jenis Kelamin wajib dipilih';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReadOnly) return;

    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrors((prev) => ({ ...prev, server: err.response.data.message }));
      } else {
        setErrors((prev) => ({ ...prev, server: 'Terjadi kesalahan saat menyimpan data.' }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getTitle = () => {
    if (mode === 'create') return 'Tambah Data Baru';
    if (mode === 'edit') return 'Edit Data Pribadi';
    return 'Detail Data Pribadi';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{getTitle()}</h2>
            <p className="text-xs text-slate-500">
              {isEdit ? 'Field NIK tidak dapat diubah' : isReadOnly ? 'Mode hanya baca (read-only)' : 'Isi formulir data karyawan'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.server && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{errors.server}</span>
            </div>
          )}

          {/* Field NIK */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              NIK {mode === 'create' && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              disabled={isReadOnly || isEdit}
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              placeholder="Contoh: 3370056987450001"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border transition-all ${
                isReadOnly || isEdit
                  ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                  : errors.nik
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/30'
                  : 'border-slate-300 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white'
              }`}
            />
            {errors.nik && <p className="mt-1 text-xs text-red-500">{errors.nik}</p>}
          </div>

          {/* Field Nama Lengkap */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Nama Lengkap {!isReadOnly && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              disabled={isReadOnly}
              value={formData.namaLengkap}
              onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
              placeholder="Masukkan nama lengkap"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border transition-all ${
                isReadOnly
                  ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                  : errors.namaLengkap
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/30'
                  : 'border-slate-300 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white'
              }`}
            />
            {errors.namaLengkap && <p className="mt-1 text-xs text-red-500">{errors.namaLengkap}</p>}
          </div>

          {/* Field Jenis Kelamin (Radio Button) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Jenis Kelamin {!isReadOnly && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="jenisKelamin"
                  disabled={isReadOnly}
                  value="LAKI_LAKI"
                  checked={formData.jenisKelamin === 'LAKI_LAKI'}
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                  className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-500 disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-slate-700">Laki-laki</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="jenisKelamin"
                  disabled={isReadOnly}
                  value="PEREMPUAN"
                  checked={formData.jenisKelamin === 'PEREMPUAN'}
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                  className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-500 disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-slate-700">Perempuan</span>
              </label>
            </div>
            {errors.jenisKelamin && <p className="mt-1 text-xs text-red-500">{errors.jenisKelamin}</p>}
          </div>

          {/* Field Tanggal Lahir */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Tanggal Lahir
            </label>
            <input
              type="date"
              disabled={isReadOnly}
              value={formData.tanggalLahir}
              onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
              className={`w-full px-3.5 py-2 text-sm rounded-lg border transition-all ${
                isReadOnly
                  ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                  : 'border-slate-300 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white'
              }`}
            />
          </div>

          {/* Field Alamat (Textarea) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Alamat
            </label>
            <textarea
              rows={3}
              disabled={isReadOnly}
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              placeholder="Masukkan alamat lengkap..."
              className={`w-full px-3.5 py-2 text-sm rounded-lg border transition-all resize-none ${
                isReadOnly
                  ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                  : 'border-slate-300 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white'
              }`}
            />
          </div>

          {/* Field Negara (Dropdown) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Negara
            </label>
            <select
              disabled={isReadOnly}
              value={formData.negara}
              onChange={(e) => setFormData({ ...formData, negara: e.target.value })}
              className={`w-full px-3.5 py-2 text-sm rounded-lg border transition-all ${
                isReadOnly
                  ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                  : 'border-slate-300 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white'
              }`}
            >
              <option value="">-- Pilih Negara --</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors"
            >
              Kembali
            </button>

            {!isReadOnly && (
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
              >
                <Save className="w-4 h-4 mr-1.5" />
                {submitting ? 'Menyimpan...' : isEdit ? 'Ubah' : 'Simpan'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
