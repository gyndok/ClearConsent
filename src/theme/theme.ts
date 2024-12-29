import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#829A41', // Olive Green
      light: '#EBEFB1', // Light Yellow-Green
      dark: '#667A33', // Darker Olive
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FD694B', // Coral
      light: '#E1DFE2', // Light Gray
      dark: '#F90627', // Bright Red
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#E1DFE2', // Light Gray
    },
    text: {
      primary: '#2D2620', // Dark text for contrast
      secondary: '#667A33', // Darker Olive for secondary text
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#829A41', // Olive Green
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#FD694B', // Coral
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#829A41', // Olive Green
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: '#2D2620',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#667A33', // Darker Olive
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
          padding: '0.875rem 1.75rem',
          fontSize: '1.125rem',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          backgroundColor: '#829A41', // Olive Green
          color: '#FFFFFF',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#667A33', // Darker Olive
            boxShadow: '0 8px 16px -4px rgba(130, 154, 65, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: '#829A41', // Olive Green
          borderWidth: '2px',
          color: '#829A41', // Olive Green
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(130, 154, 65, 0.08)',
            borderColor: '#667A33', // Darker Olive
            color: '#667A33', // Darker Olive
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px -8px rgba(130, 154, 65, 0.15)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 600px)': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderColor: '#EBEFB1', // Light Yellow-Green
          '&:hover': {
            borderColor: '#829A41', // Olive Green
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#EBEFB1', // Light Yellow-Green
          color: '#829A41', // Olive Green
          '&:hover': {
            backgroundColor: '#829A41', // Olive Green
            color: '#FFFFFF',
          },
        },
      },
    },
  },
}); 