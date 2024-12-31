import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

export const DoctorNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer', color: 'primary.main', fontWeight: 600 }}
          onClick={() => navigate('/doctor/dashboard')}
        >
          ClearConsent
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={() => navigate('/doctor/messages')}>
            <Badge badgeContent={2} color="error">
              <MessageIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon />
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
            <MenuItem onClick={() => {
              handleClose();
              navigate('/doctor/profile');
            }}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => {
              handleClose();
              navigate('/doctor/settings');
            }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {
              handleClose();
              handleLogout();
            }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 