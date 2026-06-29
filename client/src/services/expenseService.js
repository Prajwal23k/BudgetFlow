import axiosInstance from '../api/axios';

export const getExpenses = async (params) => {
  const response = await axiosInstance.get('/expenses', { params });
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axiosInstance.delete(`/expenses/${id}`);
  return response.data;
};