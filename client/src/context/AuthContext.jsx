import { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../api/authApi';

const AuthContext = createContext(null);

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) {
      const decoded = parseJwt(token);
      const userData = decoded
        ? { email: decoded.sub, name: decoded.name || decoded.sub }
        : null;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    const jwt = res.data.token;
    localStorage.setItem('token', jwt);
    setToken(jwt);
    return res.data;
  };

  const register = async (name, email, password) => {
    await registerApi(name, email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
