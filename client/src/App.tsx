import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { DoctorDashboard } from './components/doctor/dashboard/DoctorDashboard';
import DoctorProfile from './components/doctor/profile/DoctorProfile';
import DoctorSettings from './components/doctor/settings/DoctorSettings';
import { DoctorLogin } from './components/doctor/auth/DoctorLogin';
import { PatientDetails } from './components/doctor/patients/PatientDetails';
import { HomePage } from './components/home/HomePage';
import { NewProcedurePage } from './components/doctor/procedures/NewProcedurePage';
import { EditProcedurePage } from './components/doctor/procedures/EditProcedurePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route
              path="/doctor/dashboard"
              element={
                <PrivateRoute>
                  <DoctorDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/profile"
              element={
                <PrivateRoute>
                  <DoctorProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/settings"
              element={
                <PrivateRoute>
                  <DoctorSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/procedures/new"
              element={
                <PrivateRoute>
                  <NewProcedurePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/procedures/:procedureId/edit"
              element={
                <PrivateRoute>
                  <EditProcedurePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/patients/:patientId"
              element={
                <PrivateRoute>
                  <PatientDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
