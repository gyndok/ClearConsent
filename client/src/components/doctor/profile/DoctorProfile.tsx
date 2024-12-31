import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../../contexts/AuthContext';

interface DoctorProfileData {
  firstName: string;
  middleInitial: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  licenses: string;
  dea: string;
  npi: string;
  avatarUrl?: string;
}

export const DoctorProfile: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<DoctorProfileData>({
    firstName: user?.firstName || '',
    middleInitial: 'A',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    address: {
      street: '123 Medical Center Dr',
      city: 'Healthcare City',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    licenses: 'CA12345, NY67890',
    dea: 'XB1234563',
    npi: '1234567890',
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  console.log('DoctorProfile mounting, user:', user);
  console.log('DoctorProfile theme:', theme);

  // Update profile data when user context changes
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }));
    }
  }, [user]);

  // Throw error if theme is undefined
  if (!theme) {
    console.error('Theme is undefined');
    return <div>Error: Theme not loaded</div>;
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof DoctorProfileData] as Record<string, string>),
          [child]: value,
        },
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
      // Navigate back to dashboard after successful save
      setTimeout(() => {
        navigate('/doctor/dashboard');
      }, 1000); // Wait for 1 second to show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/doctor/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Avatar Section */}
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <Box position="relative">
                  <Avatar
                    src={avatar || profileData.avatarUrl}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleAvatarChange}
                    />
                    <PhotoCameraIcon />
                  </IconButton>
                </Box>
              </Grid>

              {/* Personal Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Middle Initial"
                  name="middleInitial"
                  value={profileData.middleInitial}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Address Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Address
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  name="address.street"
                  value={profileData.address.street}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="address.city"
                  value={profileData.address.city}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="State"
                  name="address.state"
                  value={profileData.address.state}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  name="address.zip"
                  value={profileData.address.zip}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Professional Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Professional Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Medical License Numbers"
                  name="licenses"
                  value={profileData.licenses}
                  onChange={handleInputChange}
                  required
                  helperText="Separate multiple licenses with commas"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="DEA Number"
                  name="dea"
                  value={profileData.dea}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="NPI Number"
                  name="npi"
                  value={profileData.npi}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Submit and Cancel Buttons */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleCancel}
                    sx={{ flex: 1 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isSubmitting}
                    sx={{ flex: 1 }}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Profile'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      {/* Success Message */}
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
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}; 