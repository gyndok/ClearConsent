import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const DatabaseService = {
  // Doctor operations
  doctors: {
    getAll: async () => {
      return prisma.doctor.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          npi: true,
          licenseNumber: true,
          createdAt: true,
          assignments: {
            select: {
              id: true,
              title: true,
              status: true,
              patient: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });
    },

    create: async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      npi?: string;
      licenseNumber?: string;
    }) => {
      const passwordHash = await bcrypt.hash(data.password, 10);
      return prisma.doctor.create({
        data: {
          ...data,
          passwordHash,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          npi: true,
          licenseNumber: true,
          createdAt: true,
        },
      });
    },

    getById: async (id: string) => {
      return prisma.doctor.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          npi: true,
          licenseNumber: true,
          createdAt: true,
          assignments: {
            select: {
              id: true,
              title: true,
              status: true,
              patient: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });
    },
  },

  // Patient operations
  patients: {
    getAll: async () => {
      return prisma.patient.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
          createdAt: true,
          assignments: {
            select: {
              id: true,
              title: true,
              status: true,
              doctor: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });
    },

    create: async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
    }) => {
      const passwordHash = await bcrypt.hash(data.password, 10);
      return prisma.patient.create({
        data: {
          ...data,
          passwordHash,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
          createdAt: true,
        },
      });
    },

    getById: async (id: string) => {
      return prisma.patient.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
          createdAt: true,
          assignments: {
            select: {
              id: true,
              title: true,
              status: true,
              doctor: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });
    },
  },

  // Assignment operations
  assignments: {
    getAll: async () => {
      return prisma.assignment.findMany({
        include: {
          doctor: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          patient: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    },

    create: async (data: {
      title: string;
      description: string;
      doctorId: string;
      patientId: string;
    }) => {
      return prisma.assignment.create({
        data: {
          ...data,
          status: 'pending',
        },
        include: {
          doctor: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          patient: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    },

    getById: async (id: string) => {
      return prisma.assignment.findUnique({
        where: { id },
        include: {
          doctor: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          patient: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    },

    updateStatus: async (id: string, status: string) => {
      return prisma.assignment.update({
        where: { id },
        data: { status },
      });
    },
  },
}; 