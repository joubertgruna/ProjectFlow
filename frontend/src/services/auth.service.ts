import { api } from './api';
import { authStorage } from './auth.storage';
import { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth';

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    authStorage.setSession(data);
    return data;
  },
  async register(payload: RegisterPayload) {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    authStorage.setSession(data);
    return data;
  },
  async me() {
    const { data } = await api.get('/auth/me');
    return data;
  },
  logout() {
    authStorage.clear();
  },
};
