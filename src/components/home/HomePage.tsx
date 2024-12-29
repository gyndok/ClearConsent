import React from 'react';
import { Box, Button, Container, Grid, Typography, useTheme, useMediaQuery, Paper, Tooltip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CheckIcon from '@mui/icons-material/Check';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DataIcon from '@mui/icons-material/DataUsage';
import LanguageIcon from '@mui/icons-material/Language';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';

export const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      component="main"
      sx={{ 
        bgcolor: theme.palette.secondary.light,
        minHeight: '100vh',
        pb: { xs: 8, md: 12 }
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '80vh', md: '90vh' },
          width: '100vw',
          marginLeft: '-50vw',
          left: '50%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: { xs: '70vh', md: '80vh' },
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
              px: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                color: theme.palette.text.primary,
                lineHeight: 1.2,
              }}
            >
              Precise and complete patient consent.
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                color: theme.palette.primary.main,
                lineHeight: 1.2,
              }}
            >
              Better data, better outcomes.
            </Typography>
            <Typography
              variant="h3"
              sx={{ 
                mb: 6, 
                fontSize: { xs: '1.25rem', md: '1.5rem' }, 
                color: theme.palette.text.secondary,
                fontWeight: 500
              }}
            >
              Medical Consents, Transformed.
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <Button
                variant="contained"
                size="large"
                sx={{ 
                  minWidth: 180,
                  fontSize: '1.125rem',
                  py: 1.5,
                  px: 3,
                }}
              >
                Request a Demo
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ 
                  minWidth: 180,
                  fontSize: '1.125rem',
                  py: 1.5,
                  px: 3,
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Overview - Updated to match FirstHx style */}
      <Box 
        id="features"
        sx={{ 
          py: { xs: 8, md: 12 },
          backgroundColor: '#FFBA4F',
          width: '100vw',
          position: 'relative',
          marginLeft: '-50vw',
          left: '50%',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              mb: { xs: 6, md: 8 }, 
              textAlign: 'center',
              color: '#2D2620',
            }}
          >
            Why ClearConsent?
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {React.cloneElement(feature.icon, {
                    sx: { 
                      fontSize: 40,
                      color: theme.palette.primary.main,
                      mb: 2
                    },
                    'aria-hidden': 'true'
                  })}
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section - Inspired by FirstHx */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              mb: { xs: 6, md: 8 }, 
              textAlign: 'center'
            }}
          >
            Benefits
          </Typography>
          <Grid container spacing={6}>
            {/* Clinicians Benefits */}
            <Grid item xs={12} md={3}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Clinicians
              </Typography>
              {clinicianBenefits.map((benefit, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <CheckIcon sx={{ color: '#4CAF50', mr: 1, mt: 0.5 }} />
                  <Typography variant="body1">
                    {benefit}
                  </Typography>
                </Box>
              ))}
            </Grid>
            
            {/* Patients Benefits */}
            <Grid item xs={12} md={3}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Patients
              </Typography>
              {patientBenefits.map((benefit, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <CheckIcon sx={{ color: '#4CAF50', mr: 1, mt: 0.5 }} />
                  <Typography variant="body1">
                    {benefit}
                  </Typography>
                </Box>
              ))}
            </Grid>

            {/* Healthcare System Benefits */}
            <Grid item xs={12} md={3}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Healthcare System
              </Typography>
              {systemBenefits.map((benefit, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <CheckIcon sx={{ color: '#4CAF50', mr: 1, mt: 0.5 }} />
                  <Typography variant="body1">
                    {benefit}
                  </Typography>
                </Box>
              ))}
            </Grid>

            {/* Data Benefits */}
            <Grid item xs={12} md={3}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Data
              </Typography>
              {dataBenefits.map((benefit, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <CheckIcon sx={{ color: '#4CAF50', mr: 1, mt: 0.5 }} />
                  <Typography variant="body1">
                    {benefit}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box 
        id="testimonials"
        sx={{ 
          py: { xs: 8, md: 12 },
          backgroundColor: '#FFFFFF',
          borderRadius: 4,
          my: 8,
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            mb: { xs: 6, md: 8 }, 
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          What Healthcare Providers Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  position: 'relative',
                  backgroundColor: theme.palette.secondary.light,
                }}
              >
                <FormatQuoteIcon 
                  sx={{ 
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    color: theme.palette.primary.main,
                    opacity: 0.2,
                    fontSize: 40
                  }}
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    color: theme.palette.text.primary,
                    fontStyle: 'italic',
                  }}
                >
                  "{testimonial.quote}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {testimonial.title}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box 
        id="faq"
        sx={{ 
          py: { xs: 8, md: 12 },
          mb: 8,
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            mb: { xs: 6, md: 8 }, 
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              elevation={0}
              sx={{
                mb: 2,
                border: `1px solid ${theme.palette.secondary.light}`,
                '&:before': { display: 'none' },
                borderRadius: '8px !important',
                overflow: 'hidden',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
                sx={{
                  backgroundColor: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.light,
                  },
                }}
              >
                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#FFFFFF' }}>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>

      {/* Portal Links */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 10 },
          px: { xs: 3, md: 6 },
          textAlign: 'center',
          bgcolor: '#FFFFFF',
          borderRadius: 4,
          boxShadow: `0 8px 32px -8px rgba(${hexToRgb(theme.palette.primary.main)}, 0.12)`,
        }}
      >
        <Typography variant="h2" sx={{ mb: 2 }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, maxWidth: '600px', mx: 'auto', color: theme.palette.text.secondary }}>
          Choose your portal to begin streamlining the consent process
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Tooltip title="For healthcare providers to manage consent forms and patient education" arrow>
              <Button 
                variant="contained" 
                size="large" 
                fullWidth
                startIcon={<MedicalServicesIcon />}
              >
                Doctor Portal
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Tooltip title="For patients to review materials and provide consent" arrow>
              <Button 
                variant="outlined" 
                size="large" 
                fullWidth
                startIcon={<PersonIcon />}
              >
                Patient Portal
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// Helper function to convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
};

const features = [
  {
    icon: <AutoGraphIcon />,
    title: 'AI-Guided Process',
    description: 'Smart workflows that adapt to each patient, ensuring comprehensive and efficient consent collection.',
  },
  {
    icon: <GpsFixedIcon />,
    title: 'Precise Documentation',
    description: 'Generate accurate, detailed consent forms based on best practices and regulatory requirements.',
  },
  {
    icon: <DataIcon />,
    title: 'Comprehensive Records',
    description: 'Collect and manage all patient consents, education materials, and communication history.',
  },
  {
    icon: <LanguageIcon />,
    title: 'Multi-Language Support',
    description: 'Provide consent forms and educational materials in multiple languages for better accessibility.',
  },
  {
    icon: <SecurityIcon />,
    title: 'HIPAA Compliant',
    description: 'Enterprise-grade security ensuring patient data protection and regulatory compliance.',
  },
  {
    icon: <GroupsIcon />,
    title: 'Team Collaboration',
    description: 'Seamless sharing and coordination between healthcare providers and staff.',
  },
  {
    icon: <DescriptionIcon />,
    title: 'Smart Templates',
    description: 'Customizable consent form templates that adapt to your specific practice needs.',
  },
  {
    icon: <StarIcon />,
    title: 'Patient Satisfaction',
    description: '95% patient satisfaction rate with improved understanding and engagement.',
  },
];

const clinicianBenefits = [
  'Increases efficiency, saves time',
  'Improves documentation quality',
  'Reduces medical errors',
  'Improves quality of care',
  'Streamlines workflow'
];

const patientBenefits = [
  'Better prepared for procedures',
  'Improved understanding',
  'Higher satisfaction rates',
  'Easy digital access',
  'Multilingual support'
];

const systemBenefits = [
  'Standardizes care delivery',
  'Improves data collection',
  'Increases throughput',
  'Better financial outcomes',
  'Enhanced compliance'
];

const dataBenefits = [
  'Real-time analytics',
  'Comprehensive reporting',
  'Quality metrics tracking',
  'Outcome analysis',
  'Performance insights'
];

const testimonials = [
  {
    quote: "ClearConsent has transformed how we handle patient education and consent. The digital process is seamless, and patients appreciate the clarity and convenience.",
    name: "Dr. Sarah Chen",
    title: "Orthopedic Surgeon",
  },
  {
    quote: "The platform has significantly reduced our administrative workload while improving patient understanding of procedures. It's a win-win solution.",
    name: "Dr. Michael Rodriguez",
    title: "Family Medicine",
  },
  {
    quote: "Having all consent forms and educational materials in one secure place has made our practice more efficient and reduced potential liability concerns.",
    name: "Dr. Emily Thompson",
    title: "Dental Surgeon",
  },
];

const faqs = [
  {
    question: "Is ClearConsent HIPAA compliant?",
    answer: "Yes, ClearConsent is fully HIPAA compliant. We implement industry-standard encryption, secure data storage, and strict access controls to protect patient information. Our platform undergoes regular security audits and updates.",
  },
  {
    question: "How do patients access their consent forms?",
    answer: "Patients receive a secure link or QR code from their healthcare provider. They can then create an account and access all their assigned materials and consent forms through our patient portal.",
  },
  {
    question: "Can we customize consent forms for our practice?",
    answer: "Absolutely! ClearConsent provides customizable templates that you can modify to match your practice's specific needs. You can add your own branding, specific procedure details, and additional educational materials.",
  },
  {
    question: "What types of digital signatures do you support?",
    answer: "We support both typed and drawn signatures. All signatures are timestamped and legally binding, meeting healthcare compliance requirements. Patients can sign using any device - computer, tablet, or smartphone.",
  },
  {
    question: "How long are signed consent forms stored?",
    answer: "Consent forms are securely stored for the duration required by healthcare regulations. You can access your historical records at any time through your provider portal, and export them as needed for your records.",
  },
]; 