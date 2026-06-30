import axiosInstance from './axiosInstance';

export const loginApi = (email, password) =>
  axiosInstance.post('/api/auth/login', { email, password });

export const registerApi = (name, email, password) =>
  axiosInstance.post('/api/auth/register', { name, email, password });
