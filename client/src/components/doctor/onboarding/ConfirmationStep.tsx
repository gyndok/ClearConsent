import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { useDoctorOnboarding } from '../../../contexts/DoctorOnboardingContext';

export const ConfirmationStep: React.FC = () => {
  const { data } = useDoctorOnboarding();
  const { basicInfo, credentials, practiceDetails } = data;

  const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );

  const Field = ({ label, value }: { label: string; value?: string | null }) => (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={4}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1">{value || '—'}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Review Your Information
      </Typography>

      <InfoSection title="Basic Information">
        <Field label="Name" value={`${basicInfo.firstName} ${basicInfo.lastName}`} />
        <Field label="Email" value={basicInfo.email} />
        <Field label="Phone" value={basicInfo.phone} />
        <Field label="Date of Birth" value={basicInfo.dateOfBirth} />
      </InfoSection>

      <InfoSection title="Professional Credentials">
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Medical Licenses
        </Typography>
        {credentials.licenses.map((license, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Field
              label={`License ${index + 1}`}
              value={`${license.number} (${license.state})`}
            />
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Field label="NPI Number" value={credentials.npi} />
        <Field label="DEA Number" value={credentials.dea} />
      </InfoSection>

      <InfoSection title="Practice Details">
        <Field label="Practice Name" value={practiceDetails.practiceName} />
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Office Address
        </Typography>
        <Field label="Street" value={practiceDetails.officeAddress.street} />
        <Field label="City" value={practiceDetails.officeAddress.city} />
        <Field label="State" value={practiceDetails.officeAddress.state} />
        <Field label="ZIP Code" value={practiceDetails.officeAddress.zip} />

        {!practiceDetails.useOfficeForMailing && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Mailing Address
            </Typography>
            <Field label="Street" value={practiceDetails.mailingAddress?.street} />
            <Field label="City" value={practiceDetails.mailingAddress?.city} />
            <Field label="State" value={practiceDetails.mailingAddress?.state} />
            <Field label="ZIP Code" value={practiceDetails.mailingAddress?.zip} />
          </>
        )}
      </InfoSection>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        Please review all information carefully. You can go back to any previous step to make
        corrections if needed.
      </Typography>
    </Box>
  );
}; 