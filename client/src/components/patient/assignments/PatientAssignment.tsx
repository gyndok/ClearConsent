import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Stack,
  Divider,
  Chip,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import { ArrowBack, Send as SendIcon } from '@mui/icons-material';
import SignatureCanvas from 'react-signature-canvas';
import { PatientHeader } from '../shared/PatientHeader';
import { VideoEmbed } from '../../shared/VideoEmbed';
import { PdfViewer } from '../../shared/PdfViewer';

interface Assignment {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  steps: Array<{
    id: string;
    title: string;
    type: 'video' | 'document';
    content: {
      url: string;
    };
  }>;
}

export const PatientAssignment: React.FC = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signatureType, setSignatureType] = useState<'type' | 'draw'>('type');
  const [typedSignature, setTypedSignature] = useState('');
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock assignment data
        const mockAssignment: Assignment = {
          id: assignmentId || '',
          title: 'Dental Cleaning Consent Form',
          description: 'Please review the following information about your upcoming dental cleaning procedure.',
          status: 'pending',
          steps: [
            {
              id: '1',
              title: 'Educational Video',
              type: 'video',
              content: {
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              },
            },
            {
              id: '2',
              title: 'Consent Form',
              type: 'document',
              content: {
                url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              },
            },
          ],
        };
        setAssignment(mockAssignment);
      } catch (error) {
        console.error('Error loading assignment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssignment();
  }, [assignmentId]);

  const handleSaveProgress = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('Progress saved successfully!');
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleSubmit = async () => {
    const hasSignature = signatureType === 'type' ? typedSignature : !signatureRef.current?.isEmpty();
    if (!hasSignature) {
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('Assignment submitted successfully!');
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  const handleSendQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setQuestionDialogOpen(false);
      setQuestion('');
      setSuccessMessage('Question sent successfully!');
      setShowSuccess(true);
    } catch (error) {
      console.error('Error sending question:', error);
    }
  };

  if (isLoading) {
    return (
      <Box>
        <PatientHeader />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!assignment) {
    return (
      <Box>
        <PatientHeader />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <Typography>Assignment not found</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <PatientHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate('/patient/dashboard')}
              >
                Back to Dashboard
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                startIcon={<SendIcon />}
                onClick={() => setQuestionDialogOpen(true)}
                sx={{ mr: 2 }}
              >
                Ask a Question
              </Button>
              <Chip
                label={assignment.status.replace('_', ' ').toUpperCase()}
                color={
                  assignment.status === 'completed' ? 'success' :
                  assignment.status === 'in_progress' ? 'warning' : 'default'
                }
              />
            </Stack>
          </Box>

          {/* Title & Description */}
          <Typography variant="h4" gutterBottom>
            {assignment.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {assignment.description}
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Content Steps */}
          <Grid container spacing={4}>
            {assignment.steps.map((step) => (
              <Grid item xs={12} key={step.id}>
                <Typography variant="h6" gutterBottom>
                  {step.title}
                </Typography>
                {step.type === 'video' && (
                  <Box sx={{ mt: 2 }}>
                    <VideoEmbed url={step.content.url} />
                  </Box>
                )}
                {step.type === 'document' && (
                  <Box sx={{ mt: 2 }}>
                    <PdfViewer url={step.content.url} />
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Signature Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Signature
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Signature Method</FormLabel>
              <RadioGroup
                row
                value={signatureType}
                onChange={(e) => setSignatureType(e.target.value as 'type' | 'draw')}
              >
                <FormControlLabel
                  value="type"
                  control={<Radio />}
                  label="Type Signature"
                />
                <FormControlLabel
                  value="draw"
                  control={<Radio />}
                  label="Draw Signature"
                />
              </RadioGroup>
            </FormControl>

            {signatureType === 'type' ? (
              <TextField
                fullWidth
                label="Type your full name"
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                sx={{ maxWidth: 400 }}
              />
            ) : (
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                }}
              >
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    width: 500,
                    height: 200,
                    style: { width: '100%', height: 200 },
                  }}
                />
                <Button
                  size="small"
                  onClick={() => signatureRef.current?.clear()}
                  sx={{ mt: 1 }}
                >
                  Clear Signature
                </Button>
              </Box>
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleSaveProgress}>
              Save Progress
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={signatureType === 'type' ? !typedSignature : signatureRef.current?.isEmpty()}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Question Dialog */}
      <Dialog
        open={questionDialogOpen}
        onClose={() => setQuestionDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ask a Question</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuestionDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSendQuestion}
            disabled={!question.trim()}
          >
            Send Question
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
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
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 