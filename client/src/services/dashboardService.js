import axiosInstance from '../api/axios';

export const getDashboard = async (month, year) => {
  const response = await axiosInstance.get(`/dashboard?month=${month}&year=${year}`);
  return response.data;
};