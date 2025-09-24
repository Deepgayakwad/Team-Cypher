import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const LoansAPI = {
  list: async () => {
    const { data } = await api.get('/loans');
    return data;
  },
  add: async (userId, payload) => {
    await api.post(`/loans/${userId}`, payload);
  },
  deleteById: async (id) => {
    await api.delete(`/delete/${id}`);
  },
};

export const ConsolidationAPI = {
  consolidate: async (payload) => {
    const { data } = await api.post('/consolidate', payload);
    return data;
  },
};


