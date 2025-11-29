import React, { createContext, useState, useCallback, useEffect } from 'react';
import { authAPI } from '../api/authAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = authAPI.getToken();
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user details
      fetchUser();
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await authAPI.getUser();
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Error fetching user:', err);
      authAPI.clearToken();
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const register = useCallback(async (email, password, password2, firstName = '', lastName = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(email, password, password2, firstName, lastName);
      authAPI.setToken(response.data.access);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.email?.[0] || err.response?.data?.password?.[0] || 'Registration failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      authAPI.setToken(response.data.access);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.email || err.response?.data?.password || 'Invalid email or password';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      authAPI.clearToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
