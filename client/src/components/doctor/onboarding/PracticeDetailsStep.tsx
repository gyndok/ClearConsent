import React from 'react';
import { Box, TextField, Typography, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useDoctorOnboarding } from '../../../contexts/DoctorOnboardingContext';
import { DoctorPracticeDetails, Address } from '../../../types/doctor';

export const PracticeDetailsStep: React.FC = () => {
  const { data, updatePracticeDetails } = useDoctorOnboarding();
  const { practiceDetails } = data;

  const handleChange = (field: keyof DoctorPracticeDetails) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (field === 'useOfficeForMailing') {
      handleUseOfficeForMailing(event);
    } else {
      updatePracticeDetails({
        ...practiceDetails,
        [field]: event.target.value,
      });
    }
  };

  const handleAddressChange = (type: 'officeAddress' | 'mailingAddress', field: keyof Address) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedAddress = {
      ...practiceDetails[type],
      [field]: event.target.value,
    };

    updatePracticeDetails({
      ...practiceDetails,
      [type]: updatedAddress,
    });
  };

  const handleUseOfficeForMailing = (event: React.ChangeEvent<HTMLInputElement>) => {
    const useOfficeForMailing = event.target.checked;
    updatePracticeDetails({
      ...practiceDetails,
      useOfficeForMailing,
      mailingAddress: useOfficeForMailing ? practiceDetails.officeAddress : {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA',
      },
    });
  };

  const AddressFields = ({ type, disabled = false }: { type: 'officeAddress' | 'mailingAddress', disabled?: boolean }) => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          label="Street Address"
          value={practiceDetails[type]?.street || ''}
          onChange={handleAddressChange(type, 'street')}
          fullWidth
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="City"
          value={practiceDetails[type]?.city || ''}
          onChange={handleAddressChange(type, 'city')}
          fullWidth
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          label="State"
          value={practiceDetails[type]?.state || ''}
          onChange={handleAddressChange(type, 'state')}
          fullWidth
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          label="ZIP Code"
          value={practiceDetails[type]?.zip || ''}
          onChange={handleAddressChange(type, 'zip')}
          fullWidth
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Practice Details
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Practice/Clinic Name"
          value={practiceDetails.practiceName || ''}
          onChange={handleChange('practiceName')}
          fullWidth
        />

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Office Address
          </Typography>
          <AddressFields type="officeAddress" />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={practiceDetails.useOfficeForMailing}
              onChange={handleChange('useOfficeForMailing')}
            />
          }
          label="Use office address for mailing"
        />

        {!practiceDetails.useOfficeForMailing && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Mailing Address
            </Typography>
            <AddressFields 
              type="mailingAddress" 
              disabled={practiceDetails.useOfficeForMailing}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}; 