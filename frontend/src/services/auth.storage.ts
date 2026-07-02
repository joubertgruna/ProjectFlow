import { AuthResponse } from '../types/auth';

const TOKEN_KEY = 'projectflow_token';
const USER_KEY = 'projectflow_user';

export const authStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setSession(session: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, session.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getUser() {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : null;
  },
};
