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
import { AssignmentsAPI } from '../../../services/api';
import type { Assignment } from '../../../services/api';

export const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [unreadMessages] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const assignmentsData = await AssignmentsAPI.getAll();
        setAssignments(assignmentsData);
      } catch (error) {
        console.error('Error loading assignments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleOpenAssignment = (assignmentId: string) => {
    navigate(`/patient/assignment/${assignmentId}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <PatientHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Messages Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Messages</Typography>
                <IconButton color="primary">
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
              <Divider sx={{ mb: 3 }} />

              {assignments.length === 0 ? (
                <Typography color="textSecondary">No assignments yet.</Typography>
              ) : (
                <Grid container spacing={3}>
                  {assignments.map((assignment) => (
                    <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {assignment.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" paragraph>
                            {assignment.description}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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