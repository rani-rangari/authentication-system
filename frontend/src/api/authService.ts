import apiClient from './axiosConfig';

export interface AuthResponse {
  success: boolean;
  message: string;
  email: string;
  token: string;
}

export const authService = {
  signup: async (data: any) => {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: any) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
  }
};