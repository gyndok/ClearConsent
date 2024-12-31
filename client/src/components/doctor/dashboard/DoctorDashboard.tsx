import React, { useState, useEffect } from 'react';
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
  LinearProgress,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  VideoLibrary,
  PictureAsPdf,
} from '@mui/icons-material';
import { AddPatientModal } from '../patients/AddPatientModal';
import { AddProcedureModal } from '../procedures/AddProcedureModal';
import { PatientsAPI, ProceduresAPI } from '../../../services/mockDb';
import type { Patient, Procedure } from '../../../services/mockDb';

export const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isAddProcedureModalOpen, setIsAddProcedureModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [procedureSearchTerm, setProcedureSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientsData, proceduresData] = await Promise.all([
          PatientsAPI.getAll(),
          ProceduresAPI.getAll()
        ]);
        setPatients(patientsData);
        setProcedures(proceduresData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddPatient = async (patientData: Omit<Patient, 'id' | 'lastUpdated' | 'assignments'>) => {
    try {
      const newPatient = await PatientsAPI.create(patientData);
      setPatients(prev => [...prev, newPatient]);
      setSuccessMessage('Patient added successfully!');
      setShowSuccess(true);
      setIsAddPatientModalOpen(false);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleAddProcedure = async (procedureData: Omit<Procedure, 'id' | 'lastUsed'>) => {
    try {
      const newProcedure = await ProceduresAPI.create(procedureData);
      setProcedures(prev => [...prev, newProcedure]);
      setSuccessMessage('Procedure added successfully!');
      setShowSuccess(true);
      setIsAddProcedureModalOpen(false);
    } catch (error) {
      console.error('Error adding procedure:', error);
    }
  };

  const handleEditProcedure = (procedureId: string) => {
    navigate(`/doctor/procedures/${procedureId}/edit`);
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  const filteredProcedures = procedures.filter(procedure =>
    procedure.title.toLowerCase().includes(procedureSearchTerm.toLowerCase()) ||
    procedure.type.toLowerCase().includes(procedureSearchTerm.toLowerCase())
  );

  const handleViewPatient = (patientId: string) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
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
                      <TableCell>Current Assignment</TableCell>
                      <TableCell>Progress</TableCell>
                      <TableCell>Status</TableCell>
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
                        <TableCell>
                          {patient.currentAssignment || 'No active assignment'}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">
                              {`${patient.assignments.completed}/${patient.assignments.total}`}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={(patient.assignments.completed / patient.assignments.total) * 100}
                              sx={{ width: 100 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={patient.status}
                            color={patient.status === 'Active' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
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
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Procedures</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddProcedureModalOpen(true)}
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
                      <TableCell>Description</TableCell>
                      <TableCell>Content</TableCell>
                      <TableCell>Last Used</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProcedures.map((procedure) => (
                      <TableRow key={procedure.id}>
                        <TableCell>{procedure.title}</TableCell>
                        <TableCell>{procedure.type}</TableCell>
                        <TableCell>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                            {procedure.description || 'No description available'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            {procedure.videoUrl && (
                              <Tooltip title="View Video">
                                <IconButton
                                  size="small"
                                  href={procedure.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <VideoLibrary fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {procedure.pdfUrl && (
                              <Tooltip title="View PDF">
                                <IconButton
                                  size="small"
                                  href={procedure.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <PictureAsPdf fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>{new Date(procedure.lastUsed).toLocaleDateString()}</TableCell>
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
            </Paper>
          </Grid>

          {/* Add Patient Modal */}
          <Grid item xs={12}>
            <AddPatientModal
              open={isAddPatientModalOpen}
              onClose={() => setIsAddPatientModalOpen(false)}
              onSubmit={handleAddPatient}
            />
          </Grid>

          {/* Add Procedure Modal */}
          <Grid item xs={12}>
            <AddProcedureModal
              open={isAddProcedureModalOpen}
              onClose={() => setIsAddProcedureModalOpen(false)}
              onSubmit={handleAddProcedure}
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
                {successMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 