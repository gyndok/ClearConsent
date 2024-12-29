import React, { useState } from 'react';
import { Box, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDoctorOnboarding } from '../../../contexts/DoctorOnboardingContext';
import { DoctorAccountSetup } from '../../../types/doctor';

export const AccountSetupStep: React.FC = () => {
  const { data, updateAccountSetup } = useDoctorOnboarding();
  const { accountSetup } = data;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof DoctorAccountSetup) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateAccountSetup({
      ...accountSetup,
      [field]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Account Setup
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          required
          label="Username"
          value={accountSetup.username}
          onChange={handleChange('username')}
          fullWidth
          helperText="Choose a unique username for your account"
        />

        <TextField
          required
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={accountSetup.password}
          onChange={handleChange('password')}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText="Password must be at least 8 characters long"
        />

        <TextField
          required
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm Password"
          value={accountSetup.confirmPassword}
          onChange={handleChange('confirmPassword')}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={accountSetup.password !== accountSetup.confirmPassword}
          helperText={
            accountSetup.password !== accountSetup.confirmPassword
              ? "Passwords don't match"
              : ' '
          }
        />
      </Box>
    </Box>
  );
}; 