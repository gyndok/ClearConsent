import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const AuthService = {
  verifyDoctor: async (email: string, password: string) => {
    const doctor = await prisma.doctor.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        npi: true,
        licenseNumber: true,
        passwordHash: true,
      },
    });

    if (!doctor) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, doctor.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const { passwordHash, ...doctorData } = doctor;
    const token = jwt.sign(
      { 
        id: doctor.id, 
        email: doctor.email,
        role: 'doctor'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        ...doctorData,
        role: 'doctor',
      },
    };
  },

  verifyPatient: async (email: string, password: string) => {
    const patient = await prisma.patient.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        passwordHash: true,
      },
    });

    if (!patient) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, patient.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const { passwordHash, ...patientData } = patient;
    const token = jwt.sign(
      { 
        id: patient.id, 
        email: patient.email,
        role: 'patient'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        ...patientData,
        role: 'patient',
      },
    };
  },
}; 