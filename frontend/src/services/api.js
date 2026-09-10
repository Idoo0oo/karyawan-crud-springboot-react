import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/karyawan';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const karyawanApi = {
  getAll: async (nik = '', nama = '') => {
    const params = {};
    if (nik?.trim()) params.nik = nik.trim();
    if (nama?.trim()) params.nama = nama.trim();
    const response = await apiClient.get('', { params });
    return response.data;
  },

  getByNik: async (nik) => {
    const response = await apiClient.get(`/${encodeURIComponent(nik)}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('', data);
    return response.data;
  },

  update: async (nik, data) => {
    const response = await apiClient.put(`/${encodeURIComponent(nik)}`, data);
    return response.data;
  },

  delete: async (nik) => {
    const response = await apiClient.delete(`/${encodeURIComponent(nik)}`);
    return response.data;
  },
};

export default apiClient;
