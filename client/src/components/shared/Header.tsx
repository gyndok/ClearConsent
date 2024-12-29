import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LocalHospital, Person } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  const handleDoctorPortal = () => {
    if (isAuthenticated) {
      navigate('/doctor/dashboard');
    } else {
      navigate('/doctor/login');
    }
  };

  const handleDoctorEnroll = () => {
    navigate('/doctor/onboarding');
  };

  const handlePatientPortal = () => {
    navigate('/patient/login');
  };

  const handleNavClick = (section: string) => {
    handleCloseMobileMenu();
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 64; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={0}
      sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'white',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - visible on all screens */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mr: 3,
            }}
            onClick={() => navigate('/')}
          >
            <LocalHospital sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              ClearConsent
            </Typography>
          </Box>

          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMobileMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={mobileMenuAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleCloseMobileMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => handleNavClick('features')}>
                <Typography textAlign="center">Features</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavClick('testimonials')}>
                <Typography textAlign="center">Testimonials</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavClick('faq')}>
                <Typography textAlign="center">FAQ</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop navigation links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            <Button
              onClick={() => handleNavClick('features')}
              sx={{ color: 'text.primary' }}
            >
              Features
            </Button>
            <Button
              onClick={() => handleNavClick('testimonials')}
              sx={{ color: 'text.primary' }}
            >
              Testimonials
            </Button>
            <Button
              onClick={() => handleNavClick('faq')}
              sx={{ color: 'text.primary' }}
            >
              FAQ
            </Button>
          </Box>

          {/* Action buttons - visible on all screens */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<LocalHospital />}
              onClick={handleDoctorPortal}
              sx={{ 
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Doctor Portal
            </Button>
            <Button
              variant="outlined"
              startIcon={<Person />}
              onClick={handlePatientPortal}
              sx={{ 
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Patient Portal
            </Button>
            <Button
              variant="contained"
              startIcon={<LocalHospital />}
              onClick={handleDoctorEnroll}
              sx={{ 
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Doctor Enroll
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}; 