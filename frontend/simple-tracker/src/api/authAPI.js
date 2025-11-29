import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email, password, password2, firstName = '', lastName = '') =>
    axiosInstance.post('/api/auth/register/', {
      email,
      password,
      password2,
      first_name: firstName,
      last_name: lastName,
    }),

  login: (email, password) =>
    axiosInstance.post('/api/auth/login/', { email, password }),

  logout: () =>
    axiosInstance.post('/api/auth/logout/'),

  getUser: () =>
    axiosInstance.get('/api/auth/user/'),

  setToken: (token) => {
    if (token) {
      localStorage.setItem('access_token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  clearToken: () => {
    localStorage.removeItem('access_token');
    delete axiosInstance.defaults.headers.common['Authorization'];
  },

  getToken: () => localStorage.getItem('access_token'),
};

export default axiosInstance;
