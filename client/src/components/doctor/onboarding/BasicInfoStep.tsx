import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useDoctorOnboarding } from '../../../contexts/DoctorOnboardingContext';
import { DoctorBasicInfo } from '../../../types/doctor';

export const BasicInfoStep: React.FC = () => {
  const { data, updateBasicInfo } = useDoctorOnboarding();
  const { basicInfo } = data;

  const handleChange = (field: keyof DoctorBasicInfo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateBasicInfo({
      ...basicInfo,
      [field]: event.target.value,
    });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Basic Information
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          required
          label="First Name"
          value={basicInfo.firstName}
          onChange={handleChange('firstName')}
          fullWidth
        />
        <TextField
          required
          label="Last Name"
          value={basicInfo.lastName}
          onChange={handleChange('lastName')}
          fullWidth
        />
        <TextField
          required
          type="email"
          label="Email"
          value={basicInfo.email}
          onChange={handleChange('email')}
          fullWidth
        />
        <TextField
          required
          label="Phone Number"
          value={basicInfo.phone}
          onChange={handleChange('phone')}
          fullWidth
          placeholder="(123) 456-7890"
        />
        <TextField
          type="date"
          label="Date of Birth"
          value={basicInfo.dateOfBirth}
          onChange={handleChange('dateOfBirth')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </Box>
  );
}; 