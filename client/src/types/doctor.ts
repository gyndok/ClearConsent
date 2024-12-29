export interface License {
  number: string;
  state: string;
}

export interface DoctorBasicInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
}

export interface DoctorCredentials {
  licenses: License[];
  npi: string;
  dea?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface DoctorPracticeDetails {
  practiceName?: string;
  officeAddress: Address;
  mailingAddress?: Address;
  useOfficeForMailing: boolean;
}

export interface DoctorAccountSetup {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface DoctorOnboardingData {
  basicInfo: DoctorBasicInfo;
  credentials: DoctorCredentials;
  practiceDetails: DoctorPracticeDetails;
  accountSetup: DoctorAccountSetup;
  step: number;
} 