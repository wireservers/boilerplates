export type UserRole = 'Admin' | 'Doctor' | 'Caregiver';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
}

export type UserInput = Omit<User, 'id'>;

export interface Appointment {
  date: string;
  type: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  doctorName?: string;
  caregiverName?: string;
  medications?: string[];
  vitalsTemplate?: string;
  appointments?: Appointment[];
}

export type PatientInput = Omit<Patient, 'id'>;
