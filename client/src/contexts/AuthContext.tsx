import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'doctor' | 'patient';
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', { email });
    try {
      // Mock authentication - replace with actual API call
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // For testing purposes, create a mock patient user
      const mockUser: User = {
        id: '1',
        email,
        role: 'patient',
        firstName: 'John',
        lastName: 'Doe'
      };
      console.log('Setting user:', mockUser);
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        throw new Error(`Authentication failed: ${error.message}`);
      }
      throw new Error('Authentication failed');
    }
  };

  const logout = async () => {
    console.log('Logging out');
    try {
      // Mock logout - replace with actual API call
      setUser(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
      if (error instanceof Error) {
        throw new Error(`Logout failed: ${error.message}`);
      }
      throw new Error('Logout failed');
    }
  };

  console.log('Current auth state:', {
    user,
    isAuthenticated: user !== null
  });

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