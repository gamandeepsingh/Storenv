import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const register = async (username: string, password: string) => {
  const response = await api.post('/register', { username, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};