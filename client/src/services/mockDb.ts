export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  status: string;
  lastUpdated: string;
  assignments: {
    total: number;
    completed: number;
  };
  currentAssignment?: string;
}

export interface Procedure {
  id: string;
  title: string;
  type: string;
  lastUsed: string;
  description?: string;
  videoUrl?: string;
  pdfUrl?: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1980-01-01',
    status: 'Active',
    lastUpdated: new Date().toISOString(),
    assignments: {
      total: 5,
      completed: 3
    },
    currentAssignment: 'Review Hip Replacement Procedure'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    dateOfBirth: '1975-06-15',
    status: 'Active',
    lastUpdated: new Date().toISOString(),
    assignments: {
      total: 3,
      completed: 1
    },
    currentAssignment: 'Complete Medical History Form'
  }
];

const mockProcedures: Procedure[] = [
  {
    id: '1',
    title: 'Hip Replacement Surgery',
    type: 'Orthopedic',
    lastUsed: new Date().toISOString(),
    description: 'Complete guide to hip replacement surgery including pre-op and post-op care.',
    videoUrl: 'https://example.com/videos/hip-replacement.mp4',
    pdfUrl: 'https://example.com/docs/hip-replacement-guide.pdf'
  },
  {
    id: '2',
    title: 'Knee Arthroscopy',
    type: 'Orthopedic',
    lastUsed: new Date().toISOString(),
    description: 'Minimally invasive procedure to diagnose and treat knee joint problems.',
    videoUrl: 'https://example.com/videos/knee-arthroscopy.mp4'
  },
  {
    id: '3',
    title: 'Dental Implant',
    type: 'Dental',
    lastUsed: new Date().toISOString(),
    description: 'Step-by-step dental implant procedure guide.',
    pdfUrl: 'https://example.com/docs/dental-implant-guide.pdf'
  }
];

export const PatientsAPI = {
  getAll: async (): Promise<Patient[]> => {
    return Promise.resolve([...mockPatients]);
  },

  getById: async (id: string): Promise<Patient | undefined> => {
    const patient = mockPatients.find(p => p.id === id);
    return Promise.resolve(patient ? { ...patient } : undefined);
  },

  create: async (data: Omit<Patient, 'id' | 'lastUpdated' | 'assignments'>): Promise<Patient> => {
    const newPatient: Patient = {
      ...data,
      id: String(mockPatients.length + 1),
      lastUpdated: new Date().toISOString(),
      assignments: {
        total: 0,
        completed: 0
      }
    };
    mockPatients.push(newPatient);
    return Promise.resolve({ ...newPatient });
  },

  update: async (id: string, data: Partial<Patient>): Promise<Patient | undefined> => {
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const updatedPatient = {
      ...mockPatients[index],
      ...data,
      lastUpdated: new Date().toISOString()
    };
    mockPatients[index] = updatedPatient;
    return Promise.resolve({ ...updatedPatient });
  },

  delete: async (id: string): Promise<boolean> => {
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) return false;

    mockPatients.splice(index, 1);
    return Promise.resolve(true);
  }
};

export const ProceduresAPI = {
  getAll: async (): Promise<Procedure[]> => {
    return Promise.resolve([...mockProcedures]);
  },

  getById: async (id: string): Promise<Procedure | undefined> => {
    const procedure = mockProcedures.find(p => p.id === id);
    return Promise.resolve(procedure ? { ...procedure } : undefined);
  },

  create: async (data: Omit<Procedure, 'id' | 'lastUsed'>): Promise<Procedure> => {
    const newProcedure: Procedure = {
      ...data,
      id: String(mockProcedures.length + 1),
      lastUsed: new Date().toISOString()
    };
    mockProcedures.push(newProcedure);
    return Promise.resolve({ ...newProcedure });
  },

  update: async (id: string, data: Partial<Procedure>): Promise<Procedure | undefined> => {
    const index = mockProcedures.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const updatedProcedure = {
      ...mockProcedures[index],
      ...data,
      lastUsed: new Date().toISOString()
    };
    mockProcedures[index] = updatedProcedure;
    return Promise.resolve({ ...updatedProcedure });
  },

  delete: async (id: string): Promise<boolean> => {
    const index = mockProcedures.findIndex(p => p.id === id);
    if (index === -1) return false;

    mockProcedures.splice(index, 1);
    return Promise.resolve(true);
  }
}; 