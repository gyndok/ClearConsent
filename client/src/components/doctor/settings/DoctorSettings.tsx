import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Grid,
  Alert,
  Snackbar,
  Tab,
  Tabs,
} from '@mui/material';
import { DoctorHeader } from '../../shared/DoctorHeader';
import { useAuth } from '../../../contexts/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

interface SettingsData {
  account: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorEnabled: boolean;
  };
  notifications: {
    patientCompletions: boolean;
    weeklySummary: boolean;
    systemUpdates: boolean;
  };
  subscription: {
    currentPlan: string;
    billingCycle: string;
    nextBillingDate: string;
  };
  preferences: {
    defaultLanguage: string;
    autoSendReminders: boolean;
    reminderFrequency: string;
  };
}

const DoctorSettings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [settings, setSettings] = useState<SettingsData>({
    account: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: false,
    },
    notifications: {
      patientCompletions: true,
      weeklySummary: true,
      systemUpdates: true,
    },
    subscription: {
      currentPlan: 'Professional',
      billingCycle: 'Monthly',
      nextBillingDate: '2024-02-01',
    },
    preferences: {
      defaultLanguage: 'English',
      autoSendReminders: true,
      reminderFrequency: 'Weekly',
    },
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (
    section: keyof SettingsData,
    field: string,
    value: string | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
      // Navigate back to dashboard after successful save
      setTimeout(() => {
        navigate('/doctor/dashboard');
      }, 1000); // Wait for 1 second to show success message
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <DoctorHeader />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            aria-label="Settings tabs"
          >
            <Tab label="Account" aria-label="Account settings" />
            <Tab label="Notifications" aria-label="Notification settings" />
            <Tab label="Subscription" aria-label="Subscription settings" />
            <Tab label="Preferences" aria-label="Preference settings" />
          </Tabs>

          {/* Account Settings */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  value={settings.account.currentPassword}
                  onChange={(e) => handleInputChange('account', 'currentPassword', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  value={settings.account.newPassword}
                  onChange={(e) => handleInputChange('account', 'newPassword', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  value={settings.account.confirmPassword}
                  onChange={(e) => handleInputChange('account', 'confirmPassword', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.account.twoFactorEnabled}
                      onChange={(e) => handleInputChange('account', 'twoFactorEnabled', e.target.checked)}
                    />
                  }
                  label="Enable Two-Factor Authentication"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Notification Settings */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.patientCompletions}
                      onChange={(e) => handleInputChange('notifications', 'patientCompletions', e.target.checked)}
                    />
                  }
                  label="Patient Form Completion Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.weeklySummary}
                      onChange={(e) => handleInputChange('notifications', 'weeklySummary', e.target.checked)}
                    />
                  }
                  label="Weekly Summary Reports"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.systemUpdates}
                      onChange={(e) => handleInputChange('notifications', 'systemUpdates', e.target.checked)}
                    />
                  }
                  label="System Updates and Announcements"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Subscription Settings */}
          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Current Plan: {settings.subscription.currentPlan}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Billing Cycle: {settings.subscription.billingCycle}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Next Billing Date: {settings.subscription.nextBillingDate}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="primary">
                  Upgrade Plan
                </Button>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Practice Preferences */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Default Language"
                  value={settings.preferences.defaultLanguage}
                  onChange={(e) => handleInputChange('preferences', 'defaultLanguage', e.target.value)}
                  SelectProps={{
                    native: true,
                    inputProps: {
                      'aria-label': 'Default Language Selection',
                      id: 'default-language-select'
                    }
                  }}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.preferences.autoSendReminders}
                      onChange={(e) => handleInputChange('preferences', 'autoSendReminders', e.target.checked)}
                    />
                  }
                  label="Automatically Send Patient Reminders"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Reminder Frequency"
                  value={settings.preferences.reminderFrequency}
                  onChange={(e) => handleInputChange('preferences', 'reminderFrequency', e.target.value)}
                  SelectProps={{
                    native: true,
                    inputProps: {
                      'aria-label': 'Reminder Frequency Selection',
                      id: 'reminder-frequency-select'
                    }
                  }}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </TextField>
              </Grid>
            </Grid>
          </TabPanel>

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/doctor/dashboard')}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Paper>
      </Container>

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
          Settings updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DoctorSettings; 