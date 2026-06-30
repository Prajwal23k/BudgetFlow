import axiosInstance from './axiosInstance';

export const getIncomes = (page = 0, size = 10, sortBy = 'date', sortDirection = 'desc') =>
  axiosInstance.get('/api/incomes', { params: { page, size, sortBy, sortDirection } });

export const addIncome = (data) =>
  axiosInstance.post('/api/incomes', data);

export const updateIncome = (id, data) =>
  axiosInstance.put(`/api/incomes/${id}`, data);

export const deleteIncome = (id) =>
  axiosInstance.delete(`/api/incomes/${id}`);

export const getIncome = (id) =>
  axiosInstance.get(`/api/incomes/${id}`);

export const searchIncomes = (title, page = 0, size = 10) =>
  axiosInstance.get('/api/incomes/search', { params: { title, page, size } });
