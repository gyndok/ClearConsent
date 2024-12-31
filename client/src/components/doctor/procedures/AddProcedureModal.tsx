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
  Typography,
  Link,
} from '@mui/material';
import { VideoLibrary, PictureAsPdf } from '@mui/icons-material';
import type { Procedure } from '../../../services/mockDb';

type ProcedureFormData = Omit<Procedure, 'id' | 'lastUsed'>;

interface AddProcedureModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProcedureFormData) => Promise<void>;
}

export const AddProcedureModal: React.FC<AddProcedureModalProps> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProcedureFormData>({
    title: '',
    type: '',
    description: '',
    videoUrl: '',
    pdfUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      title: '',
      type: '',
      description: '',
      videoUrl: '',
      pdfUrl: ''
    });
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
        <DialogTitle>Add New Procedure</DialogTitle>
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
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleTextChange}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="videoUrl"
                label="Video URL"
                value={formData.videoUrl}
                onChange={handleTextChange}
                fullWidth
                placeholder="Enter HIPAA-compliant video URL"
                InputProps={{
                  startAdornment: <VideoLibrary sx={{ color: 'action.active', mr: 1 }} />,
                }}
              />
              {formData.videoUrl && (
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Link href={formData.videoUrl} target="_blank" rel="noopener noreferrer">
                    Preview Video
                  </Link>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="pdfUrl"
                label="PDF URL"
                value={formData.pdfUrl}
                onChange={handleTextChange}
                fullWidth
                placeholder="Enter PDF document URL"
                InputProps={{
                  startAdornment: <PictureAsPdf sx={{ color: 'action.active', mr: 1 }} />,
                }}
              />
              {formData.pdfUrl && (
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Link href={formData.pdfUrl} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </Link>
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Procedure
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 