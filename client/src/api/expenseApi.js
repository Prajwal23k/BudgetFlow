import axiosInstance from './axiosInstance';

export const getExpenses = (page = 0, size = 10, sortBy = 'date', sortDirection = 'desc') =>
  axiosInstance.get('/api/expenses', { params: { page, size, sortBy, sortDirection } });

export const addExpense = (data) =>
  axiosInstance.post('/api/expenses', data);

export const updateExpense = (id, data) =>
  axiosInstance.put(`/api/expenses/${id}`, data);

export const deleteExpense = (id) =>
  axiosInstance.delete(`/api/expenses/${id}`);

export const getExpense = (id) =>
  axiosInstance.get(`/api/expenses/${id}`);

export const searchExpenses = (title, page = 0, size = 10) =>
  axiosInstance.get('/api/expenses/search', { params: { title, page, size } });

export const filterExpensesByCategory = (categoryId, page = 0, size = 10) =>
  axiosInstance.get(`/api/expenses/category/${categoryId}`, { params: { page, size } });
