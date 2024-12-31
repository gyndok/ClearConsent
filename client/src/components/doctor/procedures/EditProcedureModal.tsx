import React, { useState, useEffect } from 'react';
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
import type { Procedure } from '../../../services/mockDb';

interface EditProcedureModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Procedure>) => Promise<void>;
  procedure: Procedure;
}

export const EditProcedureModal: React.FC<EditProcedureModalProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  procedure 
}) => {
  const [formData, setFormData] = useState<Partial<Procedure>>({
    title: procedure.title,
    type: procedure.type
  });

  useEffect(() => {
    setFormData({
      title: procedure.title,
      type: procedure.type
    });
  }, [procedure]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (e: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      type: e.target.value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Procedure</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Procedure Name"
                value={formData.title}
                onChange={handleTextChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleTypeChange}
                  label="Type"
                >
                  <MenuItem value="Orthopedic">Orthopedic</MenuItem>
                  <MenuItem value="Dental">Dental</MenuItem>
                  <MenuItem value="Cardiology">Cardiology</MenuItem>
                  <MenuItem value="General">General</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 