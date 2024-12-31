import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  useTheme,
} from '@mui/material';
import {
  AccountCircle,
  Message as MessageIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

export const DoctorNavbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const unreadMessages = 2; // This would come from a context or API call

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    handleClose();
    if (path === '/logout') {
      logout();
      navigate('/');
    } else {
      navigate(path);
    }
  };

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'white',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            color: theme.palette.primary.main,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/doctor/dashboard')}
        >
          ClearConsent
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuClick('/doctor/profile')}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick('/doctor/settings')}>
              Settings
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick('/logout')}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 