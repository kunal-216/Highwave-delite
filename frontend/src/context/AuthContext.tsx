import React, { createContext, useState, useEffect } from 'react';
import api from '../components/utils/api';
import { setAuthToken } from "../components/utils/auth";

interface User {
  _id: string;
  email: string;
  name: string;
  gender: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, gender: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  resetPassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signup = async (email: string, password: string, name: string, gender: string) => {
    try {
      await api.post('/auth/register', { email, password, name, gender });
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const { data } = await api.post('/auth/verifyOTP', { email, otp });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  const resetPassword = async (currentPassword: string, newPassword: string) => {
    try {
      await api.post('/auth/resetPassword', { currentPassword, newPassword });
    } catch (error) {
      console.error('Password reset error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, verifyOTP, resetPassword }}>
        {children}
    </AuthContext.Provider>
  );
};
