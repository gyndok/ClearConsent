import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAPI, AuthResponse } from '../services/api';

interface User {
  id: string;
  email: string;
  role: 'doctor' | 'patient';
  firstName: string;
  lastName: string;
  npi?: string;
  licenseNumber?: string;
  dateOfBirth?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: 'doctor' | 'patient') => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  });
  const navigate = useNavigate();

  const login = async (email: string, password: string, role: 'doctor' | 'patient' = 'patient') => {
    try {
      let response: AuthResponse;
      
      if (role === 'doctor') {
        response = await AuthAPI.loginDoctor(email, password);
      } else {
        response = await AuthAPI.loginPatient(email, password);
      }

      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      setUser(response.user);

      // Navigate based on role
      if (response.user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Authentication failed');
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: user !== null
    }}>
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