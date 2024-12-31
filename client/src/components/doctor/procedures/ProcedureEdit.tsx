import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Link,
  IconButton,
  Stack,
} from '@mui/material';
import { ArrowBack, VideoLibrary, PictureAsPdf } from '@mui/icons-material';
import { ProceduresAPI } from '../../../services/mockDb';
import type { Procedure } from '../../../services/mockDb';

export const ProcedureEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Procedure>>({
    title: '',
    type: '',
    description: '',
    videoUrl: '',
    pdfUrl: ''
  });

  useEffect(() => {
    const loadProcedure = async () => {
      if (!id) return;
      try {
        const procedure = await ProceduresAPI.getById(id);
        if (procedure) {
          setFormData(procedure);
        }
      } catch (error) {
        console.error('Error loading procedure:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProcedure();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await ProceduresAPI.update(id, formData);
      navigate('/doctor/dashboard');
    } catch (error) {
      console.error('Error updating procedure:', error);
    }
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

  if (isLoading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton onClick={() => navigate('/doctor/dashboard')} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" component="h1">
                Edit Procedure
              </Typography>
            </Stack>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                  rows={4}
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
                  <Box sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <VideoLibrary fontSize="small" color="action" />
                      <Link href={formData.videoUrl} target="_blank" rel="noopener noreferrer">
                        Preview Video
                      </Link>
                    </Stack>
                  </Box>
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
                  <Box sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PictureAsPdf fontSize="small" color="action" />
                      <Link href={formData.pdfUrl} target="_blank" rel="noopener noreferrer">
                        View PDF
                      </Link>
                    </Stack>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button onClick={() => navigate('/doctor/dashboard')}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}; 