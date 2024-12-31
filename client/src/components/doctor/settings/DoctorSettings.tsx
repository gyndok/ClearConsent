import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Button,
  Divider,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface SettingsState {
  notifications: {
    email: boolean;
    sms: boolean;
    desktop: boolean;
    frequency: string;
  };
  privacy: {
    profileVisibility: string;
    showContactInfo: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: string;
  };
  appearance: {
    theme: string;
    fontSize: string;
  };
}

export const DoctorSettings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      sms: false,
      desktop: true,
      frequency: 'immediate',
    },
    privacy: {
      profileVisibility: 'registered',
      showContactInfo: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30min',
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
    },
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNotificationChange = (field: keyof typeof settings.notifications) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: event.target.checked,
      },
    }));
  };

  const handlePrivacyChange = (field: keyof typeof settings.privacy) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: event.target.checked,
      },
    }));
  };

  const handleSecurityChange = (field: keyof typeof settings.security) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: event.target.checked,
      },
    }));
  };

  const handleSelectChange = (section: keyof SettingsState, field: string) => (
    event: SelectChangeEvent
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: event.target.value,
      },
    }));
  };

  const handleSave = () => {
    // Mock API call to save settings
    setTimeout(() => {
      setShowSuccess(true);
    }, 500);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        {/* Notifications Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.email}
                    onChange={handleNotificationChange('email')}
                  />
                }
                label="Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.sms}
                    onChange={handleNotificationChange('sms')}
                  />
                }
                label="SMS Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.desktop}
                    onChange={handleNotificationChange('desktop')}
                  />
                }
                label="Desktop Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Notification Frequency</InputLabel>
                <Select
                  value={settings.notifications.frequency}
                  label="Notification Frequency"
                  onChange={handleSelectChange('notifications', 'frequency')}
                >
                  <MenuItem value="immediate">Immediate</MenuItem>
                  <MenuItem value="hourly">Hourly Digest</MenuItem>
                  <MenuItem value="daily">Daily Digest</MenuItem>
                  <MenuItem value="weekly">Weekly Digest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Privacy Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Privacy
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Profile Visibility</InputLabel>
                <Select
                  value={settings.privacy.profileVisibility}
                  label="Profile Visibility"
                  onChange={handleSelectChange('privacy', 'profileVisibility')}
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="registered">Registered Users Only</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.showContactInfo}
                    onChange={handlePrivacyChange('showContactInfo')}
                  />
                }
                label="Show Contact Information"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Security Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Security
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onChange={handleSecurityChange('twoFactorAuth')}
                  />
                }
                label="Two-Factor Authentication"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Session Timeout</InputLabel>
                <Select
                  value={settings.security.sessionTimeout}
                  label="Session Timeout"
                  onChange={handleSelectChange('security', 'sessionTimeout')}
                >
                  <MenuItem value="15min">15 minutes</MenuItem>
                  <MenuItem value="30min">30 minutes</MenuItem>
                  <MenuItem value="1hour">1 hour</MenuItem>
                  <MenuItem value="4hours">4 hours</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Appearance Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={settings.appearance.theme}
                  label="Theme"
                  onChange={handleSelectChange('appearance', 'theme')}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System Default</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Font Size</InputLabel>
                <Select
                  value={settings.appearance.fontSize}
                  label="Font Size"
                  onChange={handleSelectChange('appearance', 'fontSize')}
                >
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}; 