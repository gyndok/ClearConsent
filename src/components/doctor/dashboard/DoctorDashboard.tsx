import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Visibility as ViewIcon, Search as SearchIcon } from '@mui/icons-material';

// Mock data
const mockPatients = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', assignedMaterial: 'General Consent', status: 'Pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', assignedMaterial: 'Surgery Consent', status: 'Completed' },
];

const mockProcedures = [
  { id: 1, name: 'General Consent Form', type: 'General', lastUsed: '2024-02-15' },
  { id: 2, name: 'Surgery Consent', type: 'Surgical', lastUsed: '2024-02-14' },
];

export const DoctorDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [procedureSearchTerm, setProcedureSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  const filteredProcedures = mockProcedures.filter(procedure =>
    procedure.name.toLowerCase().includes(procedureSearchTerm.toLowerCase()) ||
    procedure.type.toLowerCase().includes(procedureSearchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    navigate('/doctor/patients/new');
  };

  const handleViewPatient = (patientId: number) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  const handleAddProcedure = () => {
    navigate('/doctor/procedures/new');
  };

  const handleEditProcedure = (procedureId: number) => {
    navigate(`/doctor/procedures/${procedureId}/edit`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Patients Section */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Your Patients</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddPatient}
              >
                Add New Patient
              </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search patients by name or email..."
                value={patientSearchTerm}
                onChange={(e) => setPatientSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              />
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Assigned Material</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.assignedMaterial}</TableCell>
                      <TableCell>{patient.status}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleViewPatient(patient.id)}
                          sx={{ color: theme.palette.primary.main }}
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
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Frequently Used Procedures</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddProcedure}
              >
                Add New
              </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search procedures by name or type..."
                value={procedureSearchTerm}
                onChange={(e) => setProcedureSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              />
            </Box>

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
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}; 