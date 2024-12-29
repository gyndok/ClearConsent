import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { DoctorHeader } from '../../shared/DoctorHeader';

export const PatientDetails: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock patient data - replace with API call
  const patient = {
    id: patientId,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1980-01-01',
    status: 'Pending',
    lastUpdated: '2024-01-01',
    assignedProcedures: [
      { id: 1, name: 'General Consent Form', status: 'Pending', assignedDate: '2024-01-01' },
      { id: 2, name: 'Surgery Consent', status: 'Completed', assignedDate: '2024-01-15' },
    ],
  };

  const handleBack = () => {
    navigate('/doctor/dashboard');
  };

  const handleAssignProcedure = () => {
    // TODO: Implement procedure assignment
    setShowSuccess(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <DoctorHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBack} sx={{ color: 'primary.main' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1">
            Patient Details
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Patient Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">
                    {`${patient.firstName} ${patient.lastName}`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{patient.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{patient.phone}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date of Birth
                  </Typography>
                  <Typography variant="body1">{patient.dateOfBirth}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Assigned Procedures */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Assigned Procedures
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAssignProcedure}
                >
                  Assign Procedure
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List>
                {patient.assignedProcedures.map((procedure) => (
                  <ListItem
                    key={procedure.id}
                    divider
                    secondaryAction={
                      <Typography
                        variant="body2"
                        sx={{
                          color: procedure.status === 'Completed' ? 'success.main' : 'warning.main',
                        }}
                      >
                        {procedure.status}
                      </Typography>
                    }
                  >
                    <ListItemText
                      primary={procedure.name}
                      secondary={`Assigned: ${procedure.assignedDate}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Success Message */}
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
            Procedure assigned successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}; 