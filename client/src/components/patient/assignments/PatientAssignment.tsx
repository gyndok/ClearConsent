import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Description as DescriptionIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { PatientHeader } from '../shared/PatientHeader';

interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'consent';
  status: 'pending' | 'in_progress' | 'completed';
  steps: {
    id: string;
    title: string;
    type: 'video' | 'document' | 'consent';
    content: {
      url: string;
      duration?: string;
      fileType?: string;
    };
    completed: boolean;
  }[];
}

export const PatientAssignment: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Mock API call to fetch assignment
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock assignment data
        const mockAssignment: Assignment = {
          id: '1',
          title: 'Dental Cleaning Procedure',
          description: 'Please review the following materials about your upcoming dental cleaning procedure.',
          type: 'video',
          status: 'in_progress',
          steps: [
            {
              id: '1',
              title: 'Introduction Video',
              type: 'video',
              content: {
                url: 'https://example.com/video1.mp4',
                duration: '5:30',
              },
              completed: true,
            },
            {
              id: '2',
              title: 'Procedure Details',
              type: 'document',
              content: {
                url: 'https://example.com/document1.pdf',
                fileType: 'PDF',
              },
              completed: false,
            },
            {
              id: '3',
              title: 'Consent Form',
              type: 'consent',
              content: {
                url: 'https://example.com/consent1.pdf',
                fileType: 'PDF',
              },
              completed: false,
            },
          ],
        };

        setAssignment(mockAssignment);
        setActiveStep(mockAssignment.steps.findIndex(step => !step.completed));
      } catch {
        setError('Failed to load assignment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (assignmentId) {
      fetchAssignment();
    }
  }, [assignmentId]);

  const handleNext = async () => {
    if (!assignment) return;
    
    try {
      // Mock API call to mark step as completed
      await new Promise(resolve => setTimeout(resolve, 500));

      setAssignment(prev => {
        if (!prev) return null;
        const updatedSteps = [...prev.steps];
        updatedSteps[activeStep] = {
          ...updatedSteps[activeStep],
          completed: true,
        };
        return {
          ...prev,
          steps: updatedSteps,
          status: updatedSteps.every(step => step.completed) ? 'completed' : 'in_progress',
        };
      });

      if (activeStep < assignment.steps.length - 1) {
        setActiveStep(activeStep + 1);
      }
    } catch {
      setError('Failed to update progress. Please try again.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step: Assignment['steps'][0]) => {
    switch (step.type) {
      case 'video':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {step.title}
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                }}
              >
                <Box
                  component="iframe"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  src={step.content.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Duration: {step.content.duration}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<PlayArrowIcon />}
                variant="contained"
                onClick={handleNext}
                disabled={step.completed}
              >
                {step.completed ? 'Completed' : 'Mark as Watched'}
              </Button>
            </CardActions>
          </Card>
        );

      case 'document':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {step.title}
              </Typography>
              <Box
                sx={{
                  height: 600,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="iframe"
                  sx={{
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  src={step.content.url}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                File Type: {step.content.fileType}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<DescriptionIcon />}
                variant="contained"
                onClick={handleNext}
                disabled={step.completed}
              >
                {step.completed ? 'Completed' : 'Mark as Read'}
              </Button>
            </CardActions>
          </Card>
        );

      case 'consent':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {step.title}
              </Typography>
              <Box
                sx={{
                  height: 400,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  overflow: 'hidden',
                  mb: 2,
                }}
              >
                <Box
                  component="iframe"
                  sx={{
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  src={step.content.url}
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={step.completed}
                  />
                }
                label="I have read and agree to the terms outlined in this consent form"
              />
            </CardContent>
            <CardActions>
              <Button
                startIcon={<CheckIcon />}
                variant="contained"
                onClick={handleNext}
                disabled={!consent || step.completed}
              >
                {step.completed ? 'Signed' : 'Sign Consent Form'}
              </Button>
            </CardActions>
          </Card>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!assignment) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="error">
          Assignment not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PatientHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {assignment.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {assignment.description}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {assignment.steps.map((step) => (
              <Step key={step.id} completed={step.completed}>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {renderStepContent(assignment.steps[activeStep])}
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/patient/dashboard')}
              disabled={!assignment.steps.every(step => step.completed)}
            >
              Complete Assignment
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}; 