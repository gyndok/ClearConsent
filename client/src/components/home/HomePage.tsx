import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  DescriptionOutlined as DocumentIcon,
  OndemandVideoOutlined as VideoIcon,
  TrackChangesOutlined as TrackingIcon,
  SecurityOutlined as SecurityIcon,
  CreateOutlined as CreateIcon,
  QrCodeOutlined as QrCodeIcon,
  FactCheckOutlined as CheckIcon,
  QueryStatsOutlined as StatsIcon,
} from '@mui/icons-material';

// Brand Colors
const colors = {
  primary: '#2C5282',    // Deep blue - trustworthy, professional
  secondary: '#38B2AC',  // Teal - modern, healthcare
  accent1: '#5A67D8',    // Indigo - calming, tech-forward
  accent2: '#4FD1C5',    // Light teal - fresh, approachable
  background: '#F7FAFC', // Cool white - clean, medical
  text: '#2D3748',       // Dark slate - readable
  gradient: {
    start: '#2C5282',    // Deep blue
    end: '#5A67D8',      // Indigo
  }
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Digital Consents & E-Signatures',
      description: 'Secure, compliant electronic consent forms with legally binding e-signatures.',
      icon: <DocumentIcon fontSize="large" />,
    },
    {
      title: 'Educational Videos & Documents',
      description: 'Comprehensive multimedia resources for better patient understanding.',
      icon: <VideoIcon fontSize="large" />,
    },
    {
      title: 'Progress Tracking & Reminders',
      description: 'Monitor patient engagement and automate follow-ups.',
      icon: <TrackingIcon fontSize="large" />,
    },
    {
      title: 'HIPAA-Ready Storage',
      description: 'Enterprise-grade security for all your patient data.',
      icon: <SecurityIcon fontSize="large" />,
    },
  ];

  const steps = [
    {
      title: 'Create Procedures & Forms',
      description: 'Doctors set up digital consent forms and educational materials.',
      icon: <CreateIcon fontSize="large" />,
    },
    {
      title: 'Invite Patients',
      description: 'Share secure access via email, link, or QR code.',
      icon: <QrCodeIcon fontSize="large" />,
    },
    {
      title: 'Review & E-Sign',
      description: 'Patients complete forms and acknowledge understanding.',
      icon: <CheckIcon fontSize="large" />,
    },
    {
      title: 'Track Progress',
      description: 'Monitor completion and patient engagement.',
      icon: <StatsIcon fontSize="large" />,
    },
  ];

  const testimonials = [
    {
      quote: "ClearConsent has transformed how we handle patient education and consent. It's efficient and our patients love it.",
      author: "Dr. Sarah Chen",
      role: "Orthopedic Surgeon",
      avatar: "SC",
    },
    {
      quote: "The platform is intuitive and has significantly reduced our paperwork while improving patient understanding.",
      author: "Dr. Michael Wilson",
      role: "Family Medicine",
      avatar: "MW",
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation */}
      <AppBar position="static" sx={{ bgcolor: colors.primary, boxShadow: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            ClearConsent
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => navigate('/doctor/login')}
              sx={{ fontWeight: 500 }}
            >
              Doctor Portal
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/patient/login')}
              sx={{ fontWeight: 500 }}
            >
              Patient Portal
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, ${colors.gradient.start} 0%, ${colors.gradient.end} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 3,
                }}
              >
                ClearConsent: Empowering Informed Healthcare Decisions
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 400,
                }}
              >
                Streamline your patient education, digital consent, and communication in one secure platform.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/doctor/onboarding')}
                  sx={{ 
                    bgcolor: colors.secondary,
                    '&:hover': { bgcolor: '#319795' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  For Doctors
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/patient/login')}
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': { 
                      borderColor: 'rgba(255,255,255,0.8)',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  For Patients
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={6}
                sx={{ 
                  height: 300,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Hero Image Placeholder
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ 
            color: colors.text,
            mb: 6,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: colors.primary, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: colors.background, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ 
              color: colors.text,
              mb: 6,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: colors.primary,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ 
            color: colors.text,
            mb: 6,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          What Doctors Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: colors.accent2,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{testimonial.quote}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Secondary CTA Section */}
      <Box 
        sx={{ 
          bgcolor: colors.accent1,
          color: 'white',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            Ready to Transform Your Practice?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Join thousands of healthcare providers using ClearConsent to streamline patient communication.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/doctor/onboarding')}
            sx={{ 
              bgcolor: colors.secondary,
              '&:hover': { bgcolor: '#319795' },
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: colors.text, color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © 2024 ClearConsent. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8,
                    cursor: 'pointer',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  Terms of Service
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8,
                    cursor: 'pointer',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  Privacy Policy
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8,
                    cursor: 'pointer',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  Contact Support
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}; 