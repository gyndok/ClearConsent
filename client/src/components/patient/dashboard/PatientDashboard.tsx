import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Badge,
  Divider,
  Chip,
} from '@mui/material';
import {
  Message as MessageIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { PatientHeader } from '../shared/PatientHeader';

interface Assignment {
  id: string;
  title: string;
  type: string;
  status: 'Sent' | 'In Progress' | 'Completed';
  lastUpdated: string;
  description: string;
}

export const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [unreadMessages] = useState(2); // Mock unread messages count

  useEffect(() => {
    // Mock API call to fetch assignments
    const fetchAssignments = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock assignments data
      const mockAssignments: Assignment[] = [
        {
          id: '1',
          title: 'Dental Cleaning Consent Form',
          type: 'Consent Form',
          status: 'Sent',
          lastUpdated: '2024-01-20T10:00:00Z',
          description: 'Please review and sign the consent form for your upcoming dental cleaning procedure.',
        },
        {
          id: '2',
          title: 'Root Canal Educational Video',
          type: 'Educational Video',
          status: 'In Progress',
          lastUpdated: '2024-01-19T15:30:00Z',
          description: 'Watch this informative video about the root canal procedure.',
        },
        {
          id: '3',
          title: 'Post-Procedure Care Instructions',
          type: 'Document',
          status: 'Completed',
          lastUpdated: '2024-01-18T09:15:00Z',
          description: 'Important instructions for after your procedure.',
        },
      ];

      setAssignments(mockAssignments);
    };

    fetchAssignments();
  }, []);

  const handleOpenAssignment = (assignmentId: string) => {
    navigate(`/patient/assignment/${assignmentId}`);
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'In Progress':
        return <ScheduleIcon sx={{ color: 'warning.main' }} />;
      default:
        return <PlayArrowIcon sx={{ color: 'info.main' }} />;
    }
  };

  const getStatusChip = (status: Assignment['status']) => {
    const statusColors = {
      Completed: 'success',
      'In Progress': 'warning',
      Sent: 'info',
    };

    return (
      <Chip
        label={status}
        color={statusColors[status] as 'success' | 'warning' | 'info'}
        size="small"
        sx={{ minWidth: 100 }}
      />
    );
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
              <List>
                {assignments.map((assignment, index) => (
                  <React.Fragment key={assignment.id}>
                    {index > 0 && <Divider />}
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(assignment.status)}
                            <Typography variant="subtitle1">
                              {assignment.title}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {assignment.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Chip
                                label={assignment.type}
                                size="small"
                                variant="outlined"
                              />
                              {getStatusChip(assignment.status)}
                            </Box>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Button
                          variant="contained"
                          onClick={() => handleOpenAssignment(assignment.id)}
                          sx={{ minWidth: 100 }}
                        >
                          {assignment.status === 'Completed' ? 'Review' : 'Open'}
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </React.Fragment>
                ))}
                {assignments.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary="No assignments yet"
                      secondary="New assignments will appear here when your healthcare provider assigns them."
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 