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
  TextField,
  IconButton,
  Link,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { PatientsAPI, AssignmentsAPI } from '../../../services/api';
import type { Patient, Assignment } from '../../../services/api';

export const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [assignmentSearchTerm, setAssignmentSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientsData, assignmentsData] = await Promise.all([
          PatientsAPI.getAll(),
          AssignmentsAPI.getAll(),
        ]);
        setPatients(patientsData);
        setAssignments(assignmentsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddPatient = () => {
    navigate('/doctor/patients/new');
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  const handleAddAssignment = () => {
    navigate('/doctor/assignments/new');
  };

  const handleViewAssignment = (assignmentId: string) => {
    navigate(`/doctor/assignments/${assignmentId}`);
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(assignmentSearchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Patients Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Your Patients</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddPatient}
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
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>Assignments</TableCell>
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
                      <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {patient.assignments ? `${patient.assignments.length} assignments` : 'No assignments'}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleViewPatient(patient.id)}
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

        {/* Assignments Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Assignments</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddAssignment}
              >
                Create New Assignment
              </Button>
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Search assignments by title..."
              value={assignmentSearchTerm}
              onChange={(e) => setAssignmentSearchTerm(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <Link
                          component="button"
                          onClick={() => handleViewAssignment(assignment.id)}
                          sx={{
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {assignment.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {assignment.patient
                          ? `${assignment.patient.firstName} ${assignment.patient.lastName}`
                          : 'Unknown Patient'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={assignment.status}
                          color={
                            assignment.status === 'completed'
                              ? 'success'
                              : assignment.status === 'in_progress'
                              ? 'warning'
                              : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(assignment.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleViewAssignment(assignment.id)}
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
      </Grid>
    </Container>
  );
}; 