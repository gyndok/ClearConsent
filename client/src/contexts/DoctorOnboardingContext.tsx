import React, { createContext, useContext, useState } from 'react';
import { DoctorOnboardingData, DoctorBasicInfo, DoctorCredentials, DoctorPracticeDetails, DoctorAccountSetup } from '../types/doctor';

interface DoctorOnboardingContextType {
  data: DoctorOnboardingData;
  updateBasicInfo: (info: DoctorBasicInfo) => void;
  updateCredentials: (credentials: DoctorCredentials) => void;
  updatePracticeDetails: (details: DoctorPracticeDetails) => void;
  updateAccountSetup: (account: DoctorAccountSetup) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
}

const initialState: DoctorOnboardingData = {
  basicInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  },
  credentials: {
    licenses: [{ number: '', state: '' }],
    npi: '',
    dea: '',
  },
  practiceDetails: {
    practiceName: '',
    officeAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
    },
    mailingAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
    },
    useOfficeForMailing: true,
  },
  accountSetup: {
    username: '',
    password: '',
    confirmPassword: '',
  },
  step: 1,
};

const DoctorOnboardingContext = createContext<DoctorOnboardingContextType | undefined>(undefined);

export const DoctorOnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DoctorOnboardingData>(initialState);

  const updateBasicInfo = (info: DoctorBasicInfo) => {
    setData(prev => ({ ...prev, basicInfo: info }));
  };

  const updateCredentials = (credentials: DoctorCredentials) => {
    setData(prev => ({ ...prev, credentials }));
  };

  const updatePracticeDetails = (details: DoctorPracticeDetails) => {
    setData(prev => ({ ...prev, practiceDetails: details }));
  };

  const updateAccountSetup = (account: DoctorAccountSetup) => {
    setData(prev => ({ ...prev, accountSetup: account }));
  };

  const nextStep = () => {
    setData(prev => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
  };

  const previousStep = () => {
    setData(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  };

  const goToStep = (step: number) => {
    setData(prev => ({ ...prev, step: Math.max(1, Math.min(step, 5)) }));
  };

  return (
    <DoctorOnboardingContext.Provider
      value={{
        data,
        updateBasicInfo,
        updateCredentials,
        updatePracticeDetails,
        updateAccountSetup,
        nextStep,
        previousStep,
        goToStep,
      }}
    >
      {children}
    </DoctorOnboardingContext.Provider>
  );
};

export const useDoctorOnboarding = () => {
  const context = useContext(DoctorOnboardingContext);
  if (context === undefined) {
    throw new Error('useDoctorOnboarding must be used within a DoctorOnboardingProvider');
  }
  return context;
}; 