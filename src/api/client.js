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
  deleteAll: async () => {
    await api.delete('/delete');
  },
};

export const ConsolidationAPI = {
  consolidate: async ({ loanIds, tenureMonths, newInterestRate }) => {
    const { data } = await api.post('/consolidate', {
      loanIds,
      tenureMonths,
      newInterestRate,
    });
    return data;
  },
};


