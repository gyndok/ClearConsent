import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Doctor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  npi?: string;
  licenseNumber?: string;
  createdAt: string;
  assignments?: Assignment[];
}

export interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  createdAt: string;
  assignments?: Assignment[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  status: string;
  doctorId: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  doctor?: {
    firstName: string;
    lastName: string;
  };
  patient?: {
    firstName: string;
    lastName: string;
  };
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'doctor' | 'patient';
    npi?: string;
    licenseNumber?: string;
    dateOfBirth?: string;
  };
}

export const AuthAPI = {
  loginDoctor: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/doctor/login', { email, password });
    return response.data;
  },

  loginPatient: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/patient/login', { email, password });
    return response.data;
  },
};

export const DoctorsAPI = {
  getAll: async (): Promise<Doctor[]> => {
    const response = await api.get('/doctors');
    return response.data;
  },

  getById: async (id: string): Promise<Doctor> => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  create: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    npi?: string;
    licenseNumber?: string;
  }): Promise<Doctor> => {
    const response = await api.post('/doctors', data);
    return response.data;
  },
};

export const PatientsAPI = {
  getAll: async (): Promise<Patient[]> => {
    const response = await api.get('/patients');
    return response.data;
  },

  getById: async (id: string): Promise<Patient> => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  create: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }): Promise<Patient> => {
    const response = await api.post('/patients', data);
    return response.data;
  },
};

export const AssignmentsAPI = {
  getAll: async (): Promise<Assignment[]> => {
    const response = await api.get('/assignments');
    return response.data;
  },

  getById: async (id: string): Promise<Assignment> => {
    const response = await api.get(`/assignments/${id}`);
    return response.data;
  },

  create: async (data: {
    title: string;
    description: string;
    doctorId: string;
    patientId: string;
  }): Promise<Assignment> => {
    const response = await api.post('/assignments', data);
    return response.data;
  },

  updateStatus: async (id: string, status: string): Promise<Assignment> => {
    const response = await api.patch(`/assignments/${id}/status`, { status });
    return response.data;
  },
}; 