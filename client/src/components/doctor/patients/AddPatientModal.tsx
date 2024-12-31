import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import type { Patient } from '../../../services/mockDb';

type PatientFormData = Omit<Patient, 'id' | 'lastUpdated' | 'assignments'>;

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PatientFormData) => Promise<void>;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    status: 'Active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      status: 'Active'
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleTextChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleTextChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleTextChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleTextChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleTextChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleStatusChange}
                  label="Status"
                  required
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Patient
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 