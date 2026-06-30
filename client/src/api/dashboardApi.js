import axiosInstance from './axiosInstance';

export const getDashboard = (month, year) =>
  axiosInstance.get('/api/dashboard', { params: { month, year } });
