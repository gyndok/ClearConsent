import React, { useState } from 'react';
import { Box, Button, Container, Paper, Step, StepLabel, Stepper, useTheme, Fade, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DoctorOnboardingProvider, useDoctorOnboarding } from '../../../contexts/DoctorOnboardingContext';
import { BasicInfoStep } from './BasicInfoStep';
import { CredentialsStep } from './CredentialsStep';
import { PracticeDetailsStep } from './PracticeDetailsStep';
import { AccountSetupStep } from './AccountSetupStep';
import { ConfirmationStep } from './ConfirmationStep';

const steps = [
  'Basic Information',
  'Professional Credentials',
  'Practice Details',
  'Account Setup',
  'Review & Confirm',
];

const StepContent = ({ step }: { step: number }) => {
  switch (step) {
    case 1:
      return <BasicInfoStep />;
    case 2:
      return <CredentialsStep />;
    case 3:
      return <PracticeDetailsStep />;
    case 4:
      return <AccountSetupStep />;
    case 5:
      return <ConfirmationStep />;
    default:
      return null;
  }
};

const OnboardingWizardContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, nextStep, previousStep } = useDoctorOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    if (data.step === steps.length) {
      setIsSubmitting(true);
      setError(null);
      try {
        // Submit the form and redirect to dashboard
        console.log('Form submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        navigate('/doctor/dashboard');
      } catch {
        console.error('Error submitting onboarding data');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    setError(null);
    previousStep();
  };

  return (
    <Fade in timeout={600}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Doctor Onboarding
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
            Please complete the following steps to set up your account
          </Typography>

          <Stepper 
            activeStep={data.step - 1} 
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-label': {
                fontSize: '0.875rem',
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Box sx={{ mb: 3 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}

          <Fade in timeout={300} key={data.step}>
            <Box sx={{ mb: 4 }}>
              <StepContent step={data.step} />
            </Box>
          </Fade>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={data.step === 1 || isSubmitting}
              sx={{ minWidth: 100 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isSubmitting}
              sx={{ minWidth: 100 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : data.step === steps.length ? (
                'Complete'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
};

export const DoctorOnboardingWizard = () => {
  return (
    <DoctorOnboardingProvider>
      <OnboardingWizardContent />
    </DoctorOnboardingProvider>
  );
}; 