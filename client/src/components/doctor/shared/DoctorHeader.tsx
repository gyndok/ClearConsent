import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
} from '@mui/material';
import {
  Message as MessageIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

export const DoctorHeader: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const unreadMessages = 2; // This would come from a context or API call

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/doctor/dashboard')}
        >
          ClearConsent
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            color="inherit"
            onClick={() => navigate('/doctor/messages')}
          >
            <Badge badgeContent={unreadMessages} color="error">
              <MessageIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={() => navigate('/doctor/profile')}
          >
            <PersonIcon />
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={() => navigate('/doctor/settings')}
          >
            <SettingsIcon />
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 