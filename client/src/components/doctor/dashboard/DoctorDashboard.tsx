import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  TextField,
  IconButton,
  Link,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DoctorHeader } from '../../shared/DoctorHeader';
import { AddPatientModal, PatientData } from '../patients/AddPatientModal';

interface Patient extends PatientData {
  id: string;
  status: string;
  lastUpdated: string;
}

interface Procedure {
  id: number;
  name: string;
  type: string;
  lastUsed: string;
}

export const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [procedureSearchTerm, setProcedureSearchTerm] = useState('');

  // Mock data
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1980-01-01',
      status: 'Pending',
      lastUpdated: '2024-01-01',
    },
  ]);

  const [procedures] = useState<Procedure[]>([
    { id: 1, name: 'General Consent Form', type: 'General', lastUsed: '2024-02-15' },
    { id: 2, name: 'Surgery Consent', type: 'Surgical', lastUsed: '2024-02-14' },
  ]);

  const handleAddPatient = async (patientData: PatientData) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new patient with generated ID and additional fields
    const newPatient: Patient = {
      ...patientData,
      id: (patients.length + 1).toString(),
      status: 'Pending',
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setPatients(prev => [...prev, newPatient]);
    setShowSuccess(true);
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  const filteredProcedures = procedures.filter(procedure =>
    procedure.name.toLowerCase().includes(procedureSearchTerm.toLowerCase()) ||
    procedure.type.toLowerCase().includes(procedureSearchTerm.toLowerCase())
  );

  const handleViewPatient = (patientId: string) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  const handleAddProcedure = () => {
    navigate('/doctor/procedures/new');
  };

  const handleEditProcedure = (procedureId: number) => {
    navigate(`/doctor/procedures/${procedureId}/edit`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <DoctorHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h1" gutterBottom>
                Doctor Dashboard
              </Typography>
            </Box>
          </Grid>

          {/* Patients Section */}
          <Grid item xs={12}>
            <Paper sx={{ mb: 4, p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Your Patients</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddPatientModalOpen(true)}
                >
                  Add New Patient
                </Button>
              </Box>

              <TextField
                fullWidth
                size="small"
                placeholder="Search patients by name or email..."
                value={patientSearchTerm}
                onChange={(e) => setPatientSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              />

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Updated</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <Link
                            component="button"
                            onClick={() => handleViewPatient(patient.id)}
                            sx={{
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            {`${patient.firstName} ${patient.lastName}`}
                          </Link>
                        </TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>{patient.status}</TableCell>
                        <TableCell>{patient.lastUpdated}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleViewPatient(patient.id)}
                            sx={{ color: 'primary.main' }}
                          >
                            <ViewIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Procedures Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Frequently Used Procedures</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddProcedure}
              >
                Add New Procedure
              </Button>
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Search procedures by name or type..."
              value={procedureSearchTerm}
              onChange={(e) => setProcedureSearchTerm(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Procedure Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Last Used</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProcedures.map((procedure) => (
                    <TableRow key={procedure.id}>
                      <TableCell>{procedure.name}</TableCell>
                      <TableCell>{procedure.type}</TableCell>
                      <TableCell>{procedure.lastUsed}</TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small"
                          onClick={() => handleEditProcedure(procedure.id)}
                          sx={{ color: 'primary.main' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Add Patient Modal */}
          <Grid item xs={12}>
            <AddPatientModal
              open={isAddPatientModalOpen}
              onClose={() => setIsAddPatientModalOpen(false)}
              onSubmit={handleAddPatient}
            />
          </Grid>

          {/* Success Message */}
          <Grid item xs={12}>
            <Snackbar
              open={showSuccess}
              autoHideDuration={6000}
              onClose={() => setShowSuccess(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={() => setShowSuccess(false)}
                severity="success"
                sx={{ width: '100%' }}
              >
                Patient added successfully!
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 