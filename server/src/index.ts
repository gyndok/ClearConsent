import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DatabaseService } from './services/database';
import { AuthService } from './services/auth';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Authentication routes
app.post('/api/auth/doctor/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.verifyDoctor(email, password);
    res.json(result);
  } catch (error) {
    console.error('Doctor login error:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/patient/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.verifyPatient(email, password);
    res.json(result);
  } catch (error) {
    console.error('Patient login error:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Doctor routes
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await DatabaseService.doctors.getAll();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/doctors', async (req, res) => {
  try {
    const { email, firstName, lastName, password, npi, licenseNumber } = req.body;
    const doctor = await DatabaseService.doctors.create({
      email,
      firstName,
      lastName,
      password,
      npi,
      licenseNumber,
    });
    res.json(doctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/doctors/:id', async (req, res) => {
  try {
    const doctor = await DatabaseService.doctors.getById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Patient routes
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await DatabaseService.patients.getAll();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const { email, firstName, lastName, password, dateOfBirth } = req.body;
    const patient = await DatabaseService.patients.create({
      email,
      firstName,
      lastName,
      password,
      dateOfBirth: new Date(dateOfBirth),
    });
    res.json(patient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/patients/:id', async (req, res) => {
  try {
    const patient = await DatabaseService.patients.getById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Assignment routes
app.get('/api/assignments', async (req, res) => {
  try {
    const assignments = await DatabaseService.assignments.getAll();
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/assignments', async (req, res) => {
  try {
    const { title, description, doctorId, patientId } = req.body;
    const assignment = await DatabaseService.assignments.create({
      title,
      description,
      doctorId,
      patientId,
    });
    res.json(assignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/assignments/:id', async (req, res) => {
  try {
    const assignment = await DatabaseService.assignments.getById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/assignments/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const assignment = await DatabaseService.assignments.updateStatus(req.params.id, status);
    res.json(assignment);
  } catch (error) {
    console.error('Error updating assignment status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 