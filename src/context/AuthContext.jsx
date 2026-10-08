import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Keep local state in sync if storage changes
    const handleStorage = () => {
      setSession(authService.getSession());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = (identifier, password, role, rememberMe = true) => {
    const res = authService.login(identifier, password, role, rememberMe);
    if (res.success) {
      setSession(res.session);
    }
    return res;
  };

  const logout = () => {
    authService.clearSession();
    setSession(null);
  };

  const value = {
    session,
    user: session?.user || null,
    role: session?.role || null,
    isAuthenticated: !!session?.authenticated,
    isAdmin: session?.role === 'admin',
    isCreator: session?.role === 'user',
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
