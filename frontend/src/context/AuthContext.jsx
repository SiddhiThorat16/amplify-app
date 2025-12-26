// amplify-app/frontend/src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('amplify_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = ({ user, token }) => {
    setUser(user);
    localStorage.setItem('amplify_user', JSON.stringify(user));
    localStorage.setItem('amplify_token', token);
  };

  const signup = async (payload) => {
    const data = await registerUser(payload);
    handleAuthSuccess(data);
  };

  const login = async (payload) => {
    const data = await loginUser(payload);
    handleAuthSuccess(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('amplify_user');
    localStorage.removeItem('amplify_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
