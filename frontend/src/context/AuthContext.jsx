import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister, getCurrentUser, logoutUser as apiLogout } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setLoading(true);
    try {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const result = await apiLogin(credentials);
      console.log('Login result:', result);
      
      // Wait a bit for token to be stored
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Reload user data after login
      await loadUser();
      
      // Verify we have a user
      if (!user && !isAuthenticated) {
        console.error('Login succeeded but user not loaded');
        // Try loading user again
        await loadUser();
      }
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const result = await apiRegister(userData);
      console.log('Register result:', result);
      
      // Wait a bit for token to be stored
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Reload user data after registration
      await loadUser();
      
      // Verify we have a user
      if (!user && !isAuthenticated) {
        console.error('Registration succeeded but user not loaded');
        // Try loading user again
        await loadUser();
      }
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    loadUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
