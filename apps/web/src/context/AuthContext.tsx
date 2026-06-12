"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Role = 'USER' | 'DRIVER' | 'ADMIN';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, selectedRole: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://103-253-213-183.nip.io/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('circularia_user');
    const token = localStorage.getItem('circularia_token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, selectedRole: string) => {
    setError(null);
    setIsLoading(true);
    try {
      console.log(`Attempting login at: ${API_URL}/auth/login`);
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { user: userData, accessToken } = response.data;

      if (userData.role !== selectedRole.toUpperCase()) {
        throw new Error(`Akun ini tidak memiliki akses sebagai ${selectedRole}.`);
      }

      setUser(userData);
      localStorage.setItem('circularia_user', JSON.stringify(userData));
      localStorage.setItem('circularia_token', accessToken);
      
      if (userData.role === 'ADMIN') router.push('/admin');
      else if (userData.role === 'DRIVER') router.push('/driver');
      else router.push('/dashboard');

    } catch (err: any) {
      console.error('Login error details:', err);
      const message = err.response?.data?.message || err.message || 'Login gagal. Cek kembali email dan password.';
      setError(Array.isArray(message) ? message[0] : message);
      throw new Error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: Role) => {
    setError(null);
    setIsLoading(true);
    try {
      console.log(`Attempting register at: ${API_URL}/auth/register`);
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        role: role.toUpperCase(),
      });

      const { user: userData, accessToken } = response.data;

      setUser(userData);
      localStorage.setItem('circularia_user', JSON.stringify(userData));
      localStorage.setItem('circularia_token', accessToken);
      
      if (userData.role === 'ADMIN') router.push('/admin');
      else if (userData.role === 'DRIVER') router.push('/driver');
      else router.push('/dashboard');

    } catch (err: any) {
      console.error('Register error details:', err);
      const message = err.response?.data?.message || err.message || 'Registrasi gagal.';
      setError(Array.isArray(message) ? message[0] : message);
      throw new Error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('circularia_user');
    localStorage.removeItem('circularia_token');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
