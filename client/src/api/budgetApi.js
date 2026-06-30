import axiosInstance from './axiosInstance';

export const getBudgets = (page = 0, size = 10, sortBy = 'month', sortDirection = 'asc') =>
  axiosInstance.get('/api/budgets', { params: { page, size, sortBy, sortDirection } });

export const addBudget = (data) =>
  axiosInstance.post('/api/budgets', data);

export const getBudget = (id) =>
  axiosInstance.get(`/api/budgets/${id}`);

export const deleteBudget = (id) =>
  axiosInstance.delete(`/api/budgets/${id}`);
