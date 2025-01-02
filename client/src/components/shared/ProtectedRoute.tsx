import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'doctor' | 'patient';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();

  console.log('ProtectedRoute check:', {
    isAuthenticated,
    userRole: user?.role,
    requiredRole: role,
  });

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to={role === 'doctor' ? '/doctor/login' : '/patient/login'} replace />;
  }

  if (role && user?.role !== role) {
    console.log('User role mismatch, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('Access granted');
  return <>{children}</>;
}; 