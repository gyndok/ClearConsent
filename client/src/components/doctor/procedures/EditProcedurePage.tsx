import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { VideoLibrary as VideoLibraryIcon } from '@mui/icons-material';
import { DoctorHeader } from '../../shared/DoctorHeader';
import { VideoEmbed } from '../../shared/VideoEmbed';
import { FileUpload } from '../../shared/FileUpload';

interface ProcedureFormData {
  title: string;
  description: string;
  documentUrl: string;
  videoUrl: string;
  type: string;
}

export const EditProcedurePage: React.FC = () => {
  const navigate = useNavigate();
  const { procedureId } = useParams();
  const [formData, setFormData] = useState<ProcedureFormData>({
    title: '',
    description: '',
    documentUrl: '',
    videoUrl: '',
    type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load existing procedure data
    const procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
    const procedure = procedures.find((p: any) => p.id.toString() === procedureId);
    
    if (procedure) {
      setFormData({
        title: procedure.title || procedure.name,
        description: procedure.description || '',
        documentUrl: procedure.documentUrl || '',
        videoUrl: procedure.videoUrl || '',
        type: procedure.type || '',
      });
    }
  }, [procedureId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentUrlChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      documentUrl: url,
    }));
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 6000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update procedure in localStorage
      const procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
      const updatedProcedures = procedures.map((p: any) => 
        p.id.toString() === procedureId
          ? {
              ...p,
              ...formData,
              name: formData.title, // Maintain compatibility with dashboard display
              lastUsed: new Date().toISOString(),
            }
          : p
      );
      
      localStorage.setItem('procedures', JSON.stringify(updatedProcedures));
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/doctor/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error updating procedure:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this procedure?')) {
      try {
        // Mock API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Remove procedure from localStorage
        const procedures = JSON.parse(localStorage.getItem('procedures') || '[]');
        const filteredProcedures = procedures.filter((p: any) => p.id.toString() !== procedureId);
        localStorage.setItem('procedures', JSON.stringify(filteredProcedures));
        
        navigate('/doctor/dashboard');
      } catch (error) {
        console.error('Error deleting procedure:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/doctor/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <DoctorHeader />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Edit Procedure
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Procedure Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Procedure Type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FileUpload
                  value={formData.documentUrl}
                  onChange={handleDocumentUrlChange}
                  onError={handleError}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Video URL"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <VideoLibraryIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText="Enter a YouTube or Vimeo URL"
                />
                <VideoEmbed url={formData.videoUrl} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    sx={{ minWidth: 120 }}
                  >
                    Delete
                  </Button>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{ minWidth: 120 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{ minWidth: 120 }}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setErrorMessage(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

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
          Procedure updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}; 