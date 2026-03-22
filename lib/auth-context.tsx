import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'employee' | 'manager' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  departmentId: string;
  managerId?: string;
  startDate: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      const tokenJson = await AsyncStorage.getItem('token');
      
      if (userJson && tokenJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (e) {
      console.error('Failed to restore token', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'employee',
        departmentId: 'dept-1',
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('token', mockToken);
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'employee',
        departmentId: 'dept-1',
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('token', mockToken);
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSignedIn: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
