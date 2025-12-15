import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },


  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', null, {
      params: { email }
    });
    return response.data;
  },

  verifyOtp: async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  resetPassword: async (email, otp, newPassword) => {
    const response = await api.post('/auth/reset-password', { email, otp, newPassword });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await api.post('/auth/change-password', null, {
      params: { oldPassword, newPassword }
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

// User Service
export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (user) => {
    const response = await api.post('/users', user);
    return response.data;
  },

  update: async (id, user) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getByTeam: async (teamId) => {
    const response = await api.get(`/users/team/${teamId}`);
    return response.data;
  },

  getByRole: async (role) => {
    const response = await api.get(`/users/role/${role}`);
    return response.data;
  }
};

export const contactService = {
  submit: async (contactData) => {
    const response = await api.post('/contact/submit', contactData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/contact/all');
    return response.data;
  },

  getByStatus: async (status) => {
    const response = await api.get(`/contact/status/${status}`);
    return response.data;
  },

  updateStatus: async (id, status, responseNotes) => {
    const response = await api.put(`/contact/${id}/status`, null, {
      params: { status, responseNotes }
    });
    return response.data;
  }
};

// Team Service
export const teamService = {
  getAll: async () => {
    const response = await api.get('/teams');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  },

  create: async (team) => {
    const response = await api.post('/teams', team);
    return response.data;
  },

  update: async (id, team) => {
    const response = await api.put(`/teams/${id}`, team);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/teams/${id}`);
    return response.data;
  },

  addMember: async (teamId, userId) => {
    const response = await api.post(`/teams/${teamId}/members/${userId}`);
    return response.data;
  },

  removeMember: async (teamId, userId) => {
    const response = await api.delete(`/teams/${teamId}/members/${userId}`);
    return response.data;
  }
};

// Salary Service
export const salaryService = {
  getAll: async () => {
    const response = await api.get('/salaries');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/salaries/${id}`);
    return response.data;
  },

  getByUserId: async (userId) => {
    const response = await api.get(`/salaries/user/${userId}`);
    return response.data;
  },

  create: async (salary) => {
    const response = await api.post('/salaries', salary);
    return response.data;
  },

  update: async (id, salary) => {
    const response = await api.put(`/salaries/${id}`, salary);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/salaries/${id}`);
    return response.data;
  },

  getByTeam: async (teamId) => {
    const response = await api.get(`/salaries/team/${teamId}`);
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/salaries/analytics');
    return response.data;
  },

  getDepartmentStats: async () => {
    const response = await api.get('/salaries/analytics/department');
    return response.data;
  }
};

export default api;