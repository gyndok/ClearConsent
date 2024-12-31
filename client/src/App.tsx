import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import { HomePage } from './components/home/HomePage';
import { DoctorOnboardingWizard } from './components/doctor/onboarding/DoctorOnboardingWizard';
import { DoctorDashboard } from './components/doctor/dashboard/DoctorDashboard';
import { DoctorLogin } from './components/doctor/auth/DoctorLogin';
import { DoctorMessages } from './components/doctor/messages/DoctorMessages';
import { Header } from './components/shared/Header';
import { DoctorNavbar } from './components/shared/DoctorNavbar';
import { PatientHeader } from './components/patient/shared/PatientHeader';
import { AuthProvider } from './contexts/AuthContext';
import { ProcedureEdit } from './components/doctor/procedures/ProcedureEdit';
import { DoctorProfile } from './components/doctor/profile/DoctorProfile';
import { DoctorSettings } from './components/doctor/settings/DoctorSettings';
import { PatientDetails } from './components/doctor/patients/PatientDetails';
import { PatientLogin } from './components/patient/auth/PatientLogin';
import { PatientDashboard } from './components/patient/dashboard/PatientDashboard';
import { PatientProfile } from './components/patient/profile/PatientProfile';
import { PatientSettings } from './components/patient/settings/PatientSettings';
import { PatientMessages } from './components/patient/messages/PatientMessages';
import { PatientAssignment } from './components/patient/assignments/PatientAssignment';

const NavigationWrapper = () => {
  const location = useLocation();
  const isDoctorRoute = location.pathname.startsWith('/doctor') && 
    !location.pathname.includes('/onboarding') &&
    !location.pathname.includes('/login');
  const isPatientRoute = location.pathname.startsWith('/patient') &&
    !location.pathname.includes('/login');

  if (isDoctorRoute) return <DoctorNavbar />;
  if (isPatientRoute) return <PatientHeader />;
  return <Header />;
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
            <Route path="/doctor/messages" element={<DoctorMessages />} />
            <Route path="/doctor/procedures/:id/edit" element={<ProcedureEdit />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
            <Route path="/doctor/settings" element={<DoctorSettings />} />
            <Route path="/doctor/patients/:id" element={<PatientDetails />} />
            <Route path="/patient/login" element={<PatientLogin />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/settings" element={<PatientSettings />} />
            <Route path="/patient/messages" element={<PatientMessages />} />
            <Route path="/patient/assignment/:id" element={<PatientAssignment />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
