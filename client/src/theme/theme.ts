import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C5282',    // Deep blue
      light: '#4299E1',   // Lighter blue
      dark: '#1A365D',    // Darker blue
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#38B2AC',    // Teal
      light: '#4FD1C5',   // Light teal
      dark: '#2C7A7B',    // Dark teal
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7FAFC',  // Cool white
      paper: '#FFFFFF',    // White
    },
    text: {
      primary: '#1A202C',   // Darker slate for better contrast
      secondary: '#2D3748', // Darker medium slate
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      color: '#FFFFFF', // White for better contrast on dark backgrounds
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      color: '#1A202C', // Darker slate for better contrast
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#2C5282', // Deep blue
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: '#1A202C', // Darker slate for better contrast
      fontWeight: 400,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#2D3748', // Darker medium slate
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          transition: 'all 0.2s ease-in-out',
          fontWeight: 600,
        },
        contained: {
          backgroundColor: '#38B2AC', // Teal for better visibility
          color: '#FFFFFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#2C7A7B', // Darker teal
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
        outlined: {
          borderColor: '#FFFFFF', // White border for contrast
          color: '#FFFFFF', // White text for contrast
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#E2E8F0',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C5282', // Deep blue
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px -8px rgba(44, 82, 130, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px -2px rgba(44, 82, 130, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#E6FFFA', // Very light teal
          color: '#234E52', // Dark teal for better contrast
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#B2F5EA', // Light teal
          },
        },
      },
    },
  },
}); 