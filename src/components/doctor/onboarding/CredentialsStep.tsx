import React from 'react';
import { Box, TextField, Typography, IconButton, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDoctorOnboarding } from '../../../contexts/DoctorOnboardingContext';
import { DoctorCredentials, License } from '../../../types/doctor';

export const CredentialsStep: React.FC = () => {
  const { data, updateCredentials } = useDoctorOnboarding();
  const { credentials } = data;

  const handleChange = (field: keyof DoctorCredentials) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateCredentials({
      ...credentials,
      [field]: event.target.value,
    });
  };

  const handleLicenseChange = (index: number, field: keyof License) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLicenses = [...credentials.licenses];
    newLicenses[index] = {
      ...newLicenses[index],
      [field]: event.target.value,
    };
    updateCredentials({
      ...credentials,
      licenses: newLicenses,
    });
  };

  const addLicense = () => {
    updateCredentials({
      ...credentials,
      licenses: [...credentials.licenses, { number: '', state: '' }],
    });
  };

  const removeLicense = (index: number) => {
    const newLicenses = credentials.licenses.filter((_, i) => i !== index);
    updateCredentials({
      ...credentials,
      licenses: newLicenses,
    });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Professional Credentials
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Medical Licenses
          </Typography>
          {credentials.licenses.map((license, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={5}>
                <TextField
                  required
                  label="License Number"
                  value={license.number}
                  onChange={handleLicenseChange(index, 'number')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  label="State"
                  value={license.state}
                  onChange={handleLicenseChange(index, 'state')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                {credentials.licenses.length > 1 && (
                  <IconButton
                    onClick={() => removeLicense(index)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addLicense}
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
          >
            Add Another License
          </Button>
        </Box>

        <TextField
          required
          label="NPI Number"
          value={credentials.npi}
          onChange={handleChange('npi')}
          fullWidth
          helperText="National Provider Identifier"
        />

        <TextField
          label="DEA Number"
          value={credentials.dea}
          onChange={handleChange('dea')}
          fullWidth
          helperText="Optional - Required only if prescribing controlled substances"
        />
      </Box>
    </Box>
  );
}; 