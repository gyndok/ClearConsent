import proceduresData from '../mockDb/procedures.json';
import patientsData from '../mockDb/patients.json';
import doctorsData from '../mockDb/doctors.json';

// Types
interface EducationalContent {
  risks: string;
  benefits: string;
  alternatives: string;
}

interface Procedure {
  id: string;
  title: string;
  type: string;
  description: string;
  documentUrl: string;
  videoUrl: string;
  lastUsed: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  requiredFields: string[];
  educationalContent: EducationalContent;
}

interface AssignedProcedure {
  procedureId: string;
  status: 'Pending' | 'InProgress' | 'Completed';
  assignedDate: string;
  completedDate?: string;
  lastViewed?: string;
  signatureType?: 'drawn' | 'typed';
  signedBy?: string;
  signatureDate?: string;
}

interface PatientPreferences {
  language: string;
  communicationMethod: 'email' | 'sms';
  reminders: boolean;
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  status: string;
  lastUpdated: string;
  createdAt: string;
  doctorId: string;
  assignedProcedures: AssignedProcedure[];
  preferences: PatientPreferences;
}

interface DoctorPreferences {
  language: string;
  notificationMethod: 'email' | 'sms';
  autoAssignConsent: boolean;
  defaultProcedures: string[];
}

interface PracticeInfo {
  practiceName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  website: string;
}

interface DoctorAuth {
  username: string;
  password: string;
  role: 'doctor';
}

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  speciality: string;
  licenseNumber: string;
  npi: string;
  status: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  auth: DoctorAuth;
  patientIds: string[];
  preferences: DoctorPreferences;
  practiceInfo: PracticeInfo;
}

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Procedures API
export const ProceduresAPI = {
  getAll: async (): Promise<Procedure[]> => {
    await delay(500);
    return proceduresData.procedures as Procedure[];
  },

  getById: async (id: string): Promise<Procedure | null> => {
    await delay(300);
    const procedure = (proceduresData.procedures as Procedure[]).find(p => p.id === id);
    return procedure || null;
  },

  create: async (procedure: Omit<Procedure, 'id' | 'createdAt' | 'updatedAt' | 'lastUsed'>): Promise<Procedure> => {
    await delay(800);
    const now = new Date().toISOString();
    const newProcedure: Procedure = {
      ...procedure,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
      lastUsed: now,
      status: 'Active'
    };
    
    const procedures = JSON.parse(localStorage.getItem('procedures') || '[]') as Procedure[];
    procedures.unshift(newProcedure);
    localStorage.setItem('procedures', JSON.stringify(procedures));
    
    return newProcedure;
  },

  update: async (id: string, updates: Partial<Procedure>): Promise<Procedure> => {
    await delay(500);
    
    const procedures = JSON.parse(localStorage.getItem('procedures') || '[]') as Procedure[];
    const index = procedures.findIndex((p: Procedure) => p.id === id);
    
    if (index === -1) {
      throw new Error('Procedure not found');
    }
    
    const updatedProcedure: Procedure = {
      ...procedures[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    procedures[index] = updatedProcedure;
    localStorage.setItem('procedures', JSON.stringify(procedures));
    
    return updatedProcedure;
  },

  delete: async (id: string): Promise<void> => {
    await delay(500);
    
    const procedures = JSON.parse(localStorage.getItem('procedures') || '[]') as Procedure[];
    const filteredProcedures = procedures.filter((p: Procedure) => p.id !== id);
    localStorage.setItem('procedures', JSON.stringify(filteredProcedures));
  }
};

// Patients API
export const PatientsAPI = {
  getAll: async (): Promise<Patient[]> => {
    await delay(500);
    return patientsData.patients as Patient[];
  },

  getAllByDoctorId: async (doctorId: string): Promise<Patient[]> => {
    await delay(500);
    return (patientsData.patients as Patient[]).filter(p => p.doctorId === doctorId);
  },

  getById: async (id: string): Promise<Patient | null> => {
    await delay(300);
    const patient = (patientsData.patients as Patient[]).find(p => p.id === id);
    return patient || null;
  },

  create: async (patient: Omit<Patient, 'id' | 'createdAt' | 'lastUpdated' | 'assignedProcedures'>): Promise<Patient> => {
    await delay(800);
    const now = new Date().toISOString();
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
      createdAt: now,
      lastUpdated: now,
      assignedProcedures: [],
      status: 'Pending'
    };
    
    const patients = JSON.parse(localStorage.getItem('patients') || '[]') as Patient[];
    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));
    
    return newPatient;
  },

  update: async (id: string, updates: Partial<Patient>): Promise<Patient> => {
    await delay(500);
    
    const patients = JSON.parse(localStorage.getItem('patients') || '[]') as Patient[];
    const index = patients.findIndex((p: Patient) => p.id === id);
    
    if (index === -1) {
      throw new Error('Patient not found');
    }
    
    const updatedPatient: Patient = {
      ...patients[index],
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    
    patients[index] = updatedPatient;
    localStorage.setItem('patients', JSON.stringify(patients));
    
    return updatedPatient;
  },

  delete: async (id: string): Promise<void> => {
    await delay(500);
    
    const patients = JSON.parse(localStorage.getItem('patients') || '[]') as Patient[];
    const filteredPatients = patients.filter((p: Patient) => p.id !== id);
    localStorage.setItem('patients', JSON.stringify(filteredPatients));
  },

  // Additional methods for patient-procedure management
  assignProcedure: async (patientId: string, procedureId: string): Promise<AssignedProcedure> => {
    await delay(500);
    
    const patients = JSON.parse(localStorage.getItem('patients') || '[]') as Patient[];
    const patientIndex = patients.findIndex((p: Patient) => p.id === patientId);
    
    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }
    
    const newAssignment: AssignedProcedure = {
      procedureId,
      status: 'Pending',
      assignedDate: new Date().toISOString()
    };
    
    patients[patientIndex].assignedProcedures.push(newAssignment);
    patients[patientIndex].lastUpdated = new Date().toISOString();
    
    localStorage.setItem('patients', JSON.stringify(patients));
    return newAssignment;
  },

  updateProcedureStatus: async (
    patientId: string,
    procedureId: string,
    status: AssignedProcedure['status'],
    signature?: { type: 'drawn' | 'typed'; name: string }
  ): Promise<AssignedProcedure> => {
    await delay(500);
    
    const patients = JSON.parse(localStorage.getItem('patients') || '[]') as Patient[];
    const patientIndex = patients.findIndex((p: Patient) => p.id === patientId);
    
    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }
    
    const procedureIndex = patients[patientIndex].assignedProcedures
      .findIndex(p => p.procedureId === procedureId);
    
    if (procedureIndex === -1) {
      throw new Error('Assigned procedure not found');
    }
    
    const now = new Date().toISOString();
    const updatedAssignment: AssignedProcedure = {
      ...patients[patientIndex].assignedProcedures[procedureIndex],
      status,
      lastViewed: now
    };
    
    if (status === 'Completed' && signature) {
      Object.assign(updatedAssignment, {
        completedDate: now,
        signatureType: signature.type,
        signedBy: signature.name,
        signatureDate: now
      });
    }
    
    patients[patientIndex].assignedProcedures[procedureIndex] = updatedAssignment;
    patients[patientIndex].lastUpdated = now;
    
    localStorage.setItem('patients', JSON.stringify(patients));
    return updatedAssignment;
  }
};

// Doctors API
export const DoctorsAPI = {
  getAll: async (): Promise<Doctor[]> => {
    await delay(500);
    return doctorsData.doctors as Doctor[];
  },

  getById: async (id: string): Promise<Doctor | null> => {
    await delay(300);
    const doctor = (doctorsData.doctors as Doctor[]).find(d => d.id === id);
    return doctor || null;
  },

  authenticate: async (username: string, password: string): Promise<Doctor | null> => {
    await delay(500);
    const doctor = (doctorsData.doctors as Doctor[]).find(
      d => d.auth.username === username && d.auth.password === password
    );
    
    if (doctor) {
      const now = new Date().toISOString();
      const updatedDoctor = {
        ...doctor,
        lastLogin: now,
        updatedAt: now
      };
      
      // Update in localStorage
      const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
      const index = doctors.findIndex(d => d.id === doctor.id);
      if (index !== -1) {
        doctors[index] = updatedDoctor;
        localStorage.setItem('doctors', JSON.stringify(doctors));
      }
      
      return updatedDoctor;
    }
    
    return null;
  },

  create: async (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt' | 'lastLogin' | 'patientIds'>): Promise<Doctor> => {
    await delay(800);
    const now = new Date().toISOString();
    const newDoctor: Doctor = {
      ...doctor,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
      lastLogin: now,
      status: 'Active',
      patientIds: []
    };
    
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    doctors.push(newDoctor);
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return newDoctor;
  },

  update: async (id: string, updates: Partial<Doctor>): Promise<Doctor> => {
    await delay(500);
    
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    const index = doctors.findIndex((d: Doctor) => d.id === id);
    
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    const updatedDoctor: Doctor = {
      ...doctors[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    doctors[index] = updatedDoctor;
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return updatedDoctor;
  },

  delete: async (id: string): Promise<void> => {
    await delay(500);
    
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    const filteredDoctors = doctors.filter((d: Doctor) => d.id !== id);
    localStorage.setItem('doctors', JSON.stringify(filteredDoctors));
  },

  // Additional methods for doctor-specific operations
  updateLastLogin: async (id: string): Promise<Doctor> => {
    await delay(300);
    
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    const index = doctors.findIndex((d: Doctor) => d.id === id);
    
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    const now = new Date().toISOString();
    const updatedDoctor: Doctor = {
      ...doctors[index],
      lastLogin: now,
      updatedAt: now
    };
    
    doctors[index] = updatedDoctor;
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return updatedDoctor;
  },

  updatePreferences: async (id: string, preferences: Partial<DoctorPreferences>): Promise<Doctor> => {
    await delay(500);
    
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    const index = doctors.findIndex((d: Doctor) => d.id === id);
    
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    const updatedDoctor: Doctor = {
      ...doctors[index],
      preferences: {
        ...doctors[index].preferences,
        ...preferences
      },
      updatedAt: new Date().toISOString()
    };
    
    doctors[index] = updatedDoctor;
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return updatedDoctor;
  },

  updatePracticeInfo: async (id: string, practiceInfo: Partial<PracticeInfo>): Promise<Doctor> => {
    await delay(500);
    
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    const index = doctors.findIndex((d: Doctor) => d.id === id);
    
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    const updatedDoctor: Doctor = {
      ...doctors[index],
      practiceInfo: {
        ...doctors[index].practiceInfo,
        ...practiceInfo
      },
      updatedAt: new Date().toISOString()
    };
    
    doctors[index] = updatedDoctor;
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return updatedDoctor;
  },

  // Additional methods for doctor-patient management
  assignPatient: async (doctorId: string, patientId: string): Promise<Doctor> => {
    await delay(500);
    
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    const index = doctors.findIndex(d => d.id === doctorId);
    
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    if (!doctors[index].patientIds.includes(patientId)) {
      doctors[index].patientIds.push(patientId);
      doctors[index].updatedAt = new Date().toISOString();
      localStorage.setItem('doctors', JSON.stringify(doctors));
    }
    
    return doctors[index];
  },

  removePatient: async (doctorId: string, patientId: string): Promise<Doctor> => {
    await delay(500);
    
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    const index = doctors.findIndex(d => d.id === doctorId);
    
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    doctors[index].patientIds = doctors[index].patientIds.filter(id => id !== patientId);
    doctors[index].updatedAt = new Date().toISOString();
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return doctors[index];
  }
}; 