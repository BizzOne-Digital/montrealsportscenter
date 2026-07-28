import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || '/api' });
API.interceptors.request.use(config => {
  const token = localStorage.getItem('msc_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('msc_admin_token');
    if (!token) { setLoading(false); return; }
    API.get('/auth/me').then(res => setAdmin(res.data.admin)).catch(() => localStorage.removeItem('msc_admin_token')).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('msc_admin_token', res.data.token);
    setAdmin(res.data.admin);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('msc_admin_token');
    setAdmin(null);
  };

  return <AuthContext.Provider value={{ admin, loading, login, logout, api: API }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
export { API };
