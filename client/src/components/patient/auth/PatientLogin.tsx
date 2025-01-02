import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

export const PatientLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    console.log('Attempting login with email:', email);
    try {
      await login(email, password);
      console.log('Login successful, navigating to dashboard');
      navigate('/patient/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Patient Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{ mt: 3 }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}; 