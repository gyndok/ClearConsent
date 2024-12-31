import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Divider,
  LinearProgress,
  IconButton,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Edit as EditIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { PatientsAPI } from '../../../services/mockDb';
import type { Patient } from '../../../services/mockDb';

export const PatientDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatient = async () => {
      if (!id) return;
      try {
        const patientData = await PatientsAPI.getById(id);
        if (patientData) {
          setPatient(patientData);
        }
      } catch (error) {
        console.error('Error loading patient:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPatient();
  }, [id]);

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

  if (!patient) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Typography>Patient not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton onClick={() => navigate('/doctor/dashboard')} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" component="h1">
                Patient Details
              </Typography>
            </Stack>
          </Box>

          {/* Patient Info */}
          <Grid container spacing={4}>
            {/* Basic Information */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Name
                    </Typography>
                    <Typography>
                      {`${patient.firstName} ${patient.lastName}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography>{patient.email}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography>{patient.phone}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date of Birth
                    </Typography>
                    <Typography>
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={patient.status}
                      color={patient.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Progress & Assignments */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Progress & Assignments
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Current Assignment
                    </Typography>
                    <Typography>
                      {patient.currentAssignment || 'No active assignment'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Overall Progress
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2">
                        {`${patient.assignments.completed}/${patient.assignments.total}`}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(patient.assignments.completed / patient.assignments.total) * 100}
                        sx={{ width: 100 }}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              startIcon={<MessageIcon />}
              variant="outlined"
              onClick={() => navigate('/doctor/messages')}
            >
              Send Message
            </Button>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              onClick={() => navigate(`/doctor/patients/${patient.id}/edit`)}
            >
              Edit Patient
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}; 