import React from 'react';
import { Eye, Edit2, Trash2, UserX } from 'lucide-react';

export default function KaryawanTable({ karyawanList, loading, onDetail, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr + 'T00:00:00');
      const day = String(date.getDate()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const year = String(date.getFullYear()).slice(-2);
      return `${day}-${month}-${year}`;
    } catch {
      return dateStr;
    }
  };

  const formatGender = (gender) => {
    if (gender === 'LAKI_LAKI') return 'Laki-Laki';
    if (gender === 'PEREMPUAN') return 'Perempuan';
    return gender || '-';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent mb-3"></div>
        <p className="text-sm font-medium text-slate-500">Memuat data karyawan...</p>
      </div>
    );
  }

  if (!karyawanList || karyawanList.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <UserX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-700">Tidak ada data ditemukan</h3>
        <p className="text-sm text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian NIK atau Nama.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider">
              <th className="py-3.5 px-4 text-center w-12 border-r border-slate-200">No</th>
              <th className="py-3.5 px-4 border-r border-slate-200">NIK</th>
              <th className="py-3.5 px-4 border-r border-slate-200">Nama Lengkap</th>
              <th className="py-3.5 px-4 text-center w-16 border-r border-slate-200">Umur</th>
              <th className="py-3.5 px-4 border-r border-slate-200">Tanggal Lahir</th>
              <th className="py-3.5 px-4 border-r border-slate-200">Jenis Kelamin</th>
              <th className="py-3.5 px-4 border-r border-slate-200">Alamat</th>
              <th className="py-3.5 px-4 border-r border-slate-200">Negara</th>
              <th className="py-3.5 px-4 text-center w-36">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {karyawanList.map((item, index) => (
              <tr key={item.nik} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 text-center font-medium text-slate-500 border-r border-slate-200">
                  {index + 1}
                </td>
                <td className="py-3 px-4 font-mono font-medium text-slate-900 border-r border-slate-200">
                  {item.nik}
                </td>
                <td className="py-3 px-4 font-medium text-slate-900 border-r border-slate-200">
                  {item.namaLengkap}
                </td>
                <td className="py-3 px-4 text-center text-slate-700 font-medium border-r border-slate-200">
                  {item.umur != null ? item.umur : '-'}
                </td>
                <td className="py-3 px-4 text-slate-600 border-r border-slate-200 whitespace-nowrap">
                  {formatDate(item.tanggalLahir)}
                </td>
                <td className="py-3 px-4 border-r border-slate-200">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      item.jenisKelamin === 'LAKI_LAKI'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {formatGender(item.jenisKelamin)}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600 border-r border-slate-200 max-w-xs truncate" title={item.alamat}>
                  {item.alamat || '-'}
                </td>
                <td className="py-3 px-4 text-slate-600 border-r border-slate-200">
                  {item.negara || '-'}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onDetail(item)}
                      className="text-slate-600 hover:text-slate-900 font-medium text-xs hover:underline inline-flex items-center"
                      title="Lihat Detail"
                    >
                      <Eye className="w-3.5 h-3.5 mr-0.5" />
                      Detail
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={() => onEdit(item)}
                      className="text-amber-600 hover:text-amber-800 font-medium text-xs hover:underline inline-flex items-center"
                      title="Edit Data"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-0.5" />
                      Edit
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-800 font-medium text-xs hover:underline inline-flex items-center"
                      title="Hapus Data"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-0.5" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
        <span>Total Data: <strong>{karyawanList.length}</strong> karyawan</span>
      </div>
    </div>
  );
}
