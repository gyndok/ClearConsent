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
  Schedule as ScheduleIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

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

  useEffect(() => {
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
    setAssignments(mockAssignments);
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
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
                              <Chip
                                label={assignment.status}
                                color={
                                  assignment.status === 'Completed' ? 'success' :
                                  assignment.status === 'In Progress' ? 'warning' : 'info'
                                }
                                size="small"
                              />
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