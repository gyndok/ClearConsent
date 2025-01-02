import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  Container,
  IconButton,
  Badge,
} from '@mui/material';
import { Message as MessageIcon } from '@mui/icons-material';
import { PatientHeader } from '../shared/PatientHeader';

interface Assignment {
  id: string;
  title: string;
  type: string;
  status: 'Sent' | 'In Progress' | 'Completed';
  description: string;
}

export const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [unreadMessages] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch assignments
    const loadData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock assignments data
        const mockAssignments: Assignment[] = [
          {
            id: '1',
            title: 'Dental Cleaning Consent Form',
            type: 'Consent Form',
            status: 'Sent',
            description: 'Please review and sign the consent form for your upcoming dental cleaning procedure.',
          },
          {
            id: '2',
            title: 'Root Canal Educational Video',
            type: 'Educational Video',
            status: 'In Progress',
            description: 'Watch this informative video about the root canal procedure.',
          },
        ];
        console.log('Setting mock assignments:', mockAssignments);
        setAssignments(mockAssignments);
      } catch (error) {
        console.error('Error loading assignments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleOpenAssignment = (assignmentId: string) => {
    console.log('Opening assignment with ID:', assignmentId);
    console.log('Navigating to:', `/patient/assignment/${assignmentId}`);
    try {
      navigate(`/patient/assignment/${assignmentId}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PatientHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Welcome to Your Patient Portal
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Here you can view your assignments and communicate with your healthcare provider.
                  </Typography>
                </Box>
                <IconButton
                  color="primary"
                  onClick={() => navigate('/patient/messages')}
                >
                  <Badge badgeContent={unreadMessages} color="error">
                    <MessageIcon />
                  </Badge>
                </IconButton>
              </Box>
            </Paper>
          </Grid>

          {/* Assignments Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Assignments
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {assignments.map((assignment) => (
                    <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {assignment.title}
                          </Typography>
                          <Typography color="textSecondary" gutterBottom>
                            {assignment.type}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {assignment.description}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                              label={assignment.status}
                              color={
                                assignment.status === 'Completed'
                                  ? 'success'
                                  : assignment.status === 'In Progress'
                                  ? 'warning'
                                  : 'default'
                              }
                              size="small"
                            />
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleOpenAssignment(assignment.id)}
                            >
                              Open
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 