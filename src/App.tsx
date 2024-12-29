import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import { HomePage } from './components/home/HomePage';
import { DoctorOnboardingWizard } from './components/doctor/onboarding/DoctorOnboardingWizard';
import { DoctorDashboard } from './components/doctor/dashboard/DoctorDashboard';
import { DoctorLogin } from './components/doctor/auth/DoctorLogin';
import { Header } from './components/shared/Header';
import { DoctorNavbar } from './components/shared/DoctorNavbar';
import { AuthProvider } from './contexts/AuthContext';

const NavigationWrapper = () => {
  const location = useLocation();
  const isDoctorRoute = location.pathname.startsWith('/doctor') && 
    !location.pathname.includes('/onboarding') &&
    !location.pathname.includes('/login');

  return isDoctorRoute ? <DoctorNavbar /> : <Header />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <NavigationWrapper />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/doctor/onboarding" element={<DoctorOnboardingWizard />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
