import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import KaryawanTable from './components/KaryawanTable';
import KaryawanFormModal from './components/KaryawanFormModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { karyawanApi } from './services/api';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [karyawanList, setKaryawanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState({ nik: '', nama: '' });

  // Modal Form State (Tambah / Edit / Detail)
  const [formModal, setFormModal] = useState({
    isOpen: false,
    mode: 'create', // 'create' | 'edit' | 'detail'
    data: null,
  });

  // Modal Delete State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    data: null,
    deleting: false,
  });

  // Toast Notification State
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Fetch list karyawan dari REST API Backend
  const fetchKaryawan = useCallback(async (filter = searchFilter) => {
    setLoading(true);
    try {
      const response = await karyawanApi.getAll(filter.nik, filter.nama);
      if (response && response.success) {
        setKaryawanList(response.data || []);
      }
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Gagal memuat data dari server backend');
    } finally {
      setLoading(false);
    }
  }, [searchFilter]);

  useEffect(() => {
    fetchKaryawan();
  }, [fetchKaryawan]);

  // Handle Search Filter dari SearchBar
  const handleSearch = (filter) => {
    setSearchFilter(filter);
    fetchKaryawan(filter);
  };

  // Open Modal Create
  const handleOpenAddModal = () => {
    setFormModal({
      isOpen: true,
      mode: 'create',
      data: null,
    });
  };

  // Open Modal Detail
  const handleOpenDetailModal = (item) => {
    setFormModal({
      isOpen: true,
      mode: 'detail',
      data: item,
    });
  };

  // Open Modal Edit
  const handleOpenEditModal = (item) => {
    setFormModal({
      isOpen: true,
      mode: 'edit',
      data: item,
    });
  };

  // Open Modal Delete
  const handleOpenDeleteModal = (item) => {
    setDeleteModal({
      isOpen: true,
      data: item,
      deleting: false,
    });
  };

  // Submit Form (Create / Update)
  const handleFormSubmit = async (formData) => {
    if (formModal.mode === 'create') {
      const response = await karyawanApi.create(formData);
      if (response.success) {
        showNotification('success', 'Data karyawan baru berhasil ditambahkan');
        setFormModal({ isOpen: false, mode: 'create', data: null });
        fetchKaryawan();
      }
    } else if (formModal.mode === 'edit') {
      const response = await karyawanApi.update(formData.nik, formData);
      if (response.success) {
        showNotification('success', 'Data karyawan berhasil diperbarui');
        setFormModal({ isOpen: false, mode: 'edit', data: null });
        fetchKaryawan();
      }
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deleteModal.data) return;
    setDeleteModal((prev) => ({ ...prev, deleting: true }));
    try {
      const response = await karyawanApi.delete(deleteModal.data.nik);
      if (response.success) {
        showNotification('success', `Data "${deleteModal.data.namaLengkap}" berhasil dihapus`);
        setDeleteModal({ isOpen: false, data: null, deleting: false });
        fetchKaryawan();
      }
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Gagal menghapus data karyawan');
      setDeleteModal((prev) => ({ ...prev, deleting: false }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Inter',sans-serif]">
      {/* Navbar Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Toast Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center shadow-sm border animate-in slide-in-from-top-2 duration-200 ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 mr-2.5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2.5 text-red-600 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        )}

        {/* Search & Action Bar */}
        <SearchBar
          onSearch={handleSearch}
          onOpenAddModal={handleOpenAddModal}
        />

        {/* Monitoring Data Table */}
        <KaryawanTable
          karyawanList={karyawanList}
          loading={loading}
          onDetail={handleOpenDetailModal}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>Aplikasi Data Pribadi Karyawan &copy; 2026. Built with Spring Boot 3 & React + Tailwind CSS.</p>
      </footer>

      {/* Form Modal (Create, Edit, Detail) */}
      <KaryawanFormModal
        isOpen={formModal.isOpen}
        mode={formModal.mode}
        initialData={formModal.data}
        onClose={() => setFormModal({ isOpen: false, mode: 'create', data: null })}
        onSubmit={handleFormSubmit}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        data={deleteModal.data}
        deleting={deleteModal.deleting}
        onClose={() => setDeleteModal({ isOpen: false, data: null, deleting: false })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
