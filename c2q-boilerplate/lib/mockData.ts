export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  roomNumber: string;
  admissionDate: string;
  status: 'stable' | 'critical' | 'recovering' | 'observation';
  primaryDiagnosis: string;
  allergies: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  photo?: string;
  conditions: string[];
  assignedNurse: string;
  assignedDoctor: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  type: 'checkup' | 'therapy' | 'consultation' | 'procedure';
  date: string;
  time: string;
  duration: number;
  provider: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
}

export interface Medication {
  id: string;
  patientId: string;
  patientName: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  status: 'active' | 'completed' | 'discontinued';
  lastAdministered?: string;
  nextDue?: string;
}

export interface VitalSign {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  bloodPressure: { systolic: number; diastolic: number };
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  recordedBy: string;
}

export interface CareTeamMember {
  id: string;
  name: string;
  role: 'doctor' | 'nurse' | 'therapist' | 'caregiver' | 'specialist';
  specialty?: string;
  phone: string;
  email: string;
  shift?: string;
  patientsAssigned: number;
  status: 'available' | 'on-duty' | 'off-duty';
  photo?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  department: string;
}

export interface Caregiver {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  shift: string;
}

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Margaret Johnson',
    age: 78,
    gender: 'Female',
    roomNumber: '201A',
    admissionDate: '2024-10-15',
    status: 'stable',
    primaryDiagnosis: 'Hypertension, Type 2 Diabetes',
    allergies: ['Penicillin', 'Latex'],
    conditions: ['Arthritis', 'Mild Dementia'],
    assignedNurse: 'Sarah Williams',
    assignedDoctor: 'Dr. Michael Chen',
    emergencyContact: {
      name: 'Robert Johnson',
      relationship: 'Son',
      phone: '(555) 123-4567',
    },
  },
  {
    id: '2',
    name: 'Henry Thompson',
    age: 82,
    gender: 'Male',
    roomNumber: '105B',
    admissionDate: '2024-11-01',
    status: 'critical',
    primaryDiagnosis: 'Congestive Heart Failure',
    allergies: ['Aspirin'],
    conditions: ['COPD', 'Atrial Fibrillation'],
    assignedNurse: 'Jessica Martinez',
    assignedDoctor: 'Dr. Emily Roberts',
    emergencyContact: {
      name: 'Susan Thompson',
      relationship: 'Daughter',
      phone: '(555) 234-5678',
    },
  },
  {
    id: '3',
    name: 'Dorothy Williams',
    age: 75,
    gender: 'Female',
    roomNumber: '302C',
    admissionDate: '2024-09-20',
    status: 'recovering',
    primaryDiagnosis: 'Hip Replacement Recovery',
    allergies: [],
    conditions: ['Osteoporosis'],
    assignedNurse: 'Sarah Williams',
    assignedDoctor: 'Dr. James Park',
    emergencyContact: {
      name: 'Linda Williams',
      relationship: 'Daughter',
      phone: '(555) 345-6789',
    },
  },
  {
    id: '4',
    name: 'George Anderson',
    age: 80,
    gender: 'Male',
    roomNumber: '208A',
    admissionDate: '2024-10-28',
    status: 'observation',
    primaryDiagnosis: 'Pneumonia',
    allergies: ['Sulfa drugs'],
    conditions: ['Parkinson\'s Disease'],
    assignedNurse: 'Michael Brown',
    assignedDoctor: 'Dr. Michael Chen',
    emergencyContact: {
      name: 'Patricia Anderson',
      relationship: 'Wife',
      phone: '(555) 456-7890',
    },
  },
  {
    id: '5',
    name: 'Elizabeth Davis',
    age: 77,
    gender: 'Female',
    roomNumber: '401D',
    admissionDate: '2024-08-12',
    status: 'stable',
    primaryDiagnosis: 'Alzheimer\'s Disease',
    allergies: [],
    conditions: ['Hypertension', 'Osteoarthritis'],
    assignedNurse: 'Jessica Martinez',
    assignedDoctor: 'Dr. Emily Roberts',
    emergencyContact: {
      name: 'Charles Davis',
      relationship: 'Husband',
      phone: '(555) 567-8901',
    },
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Margaret Johnson',
    type: 'checkup',
    date: '2024-11-14',
    time: '09:00',
    duration: 30,
    provider: 'Dr. Michael Chen',
    status: 'scheduled',
    notes: 'Monthly checkup - review blood sugar levels',
  },
  {
    id: '2',
    patientId: '3',
    patientName: 'Dorothy Williams',
    type: 'therapy',
    date: '2024-11-14',
    time: '10:30',
    duration: 60,
    provider: 'PT Alice Cooper',
    status: 'in-progress',
    notes: 'Physical therapy - hip mobility exercises',
  },
  {
    id: '3',
    patientId: '2',
    patientName: 'Henry Thompson',
    type: 'consultation',
    date: '2024-11-14',
    time: '14:00',
    duration: 45,
    provider: 'Dr. Emily Roberts',
    status: 'scheduled',
    notes: 'Cardiology consultation',
  },
  {
    id: '4',
    patientId: '5',
    patientName: 'Elizabeth Davis',
    type: 'checkup',
    date: '2024-11-15',
    time: '09:30',
    duration: 30,
    provider: 'Dr. Emily Roberts',
    status: 'scheduled',
  },
  {
    id: '5',
    patientId: '4',
    patientName: 'George Anderson',
    type: 'procedure',
    date: '2024-11-15',
    time: '11:00',
    duration: 90,
    provider: 'Dr. Michael Chen',
    status: 'scheduled',
    notes: 'Chest X-ray and breathing assessment',
  },
];

export const medications: Medication[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Margaret Johnson',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    route: 'Oral',
    startDate: '2024-10-15',
    prescribedBy: 'Dr. Michael Chen',
    status: 'active',
    lastAdministered: '2024-11-14 08:00',
    nextDue: '2024-11-14 20:00',
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'Margaret Johnson',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    route: 'Oral',
    startDate: '2024-10-15',
    prescribedBy: 'Dr. Michael Chen',
    status: 'active',
    lastAdministered: '2024-11-14 08:00',
    nextDue: '2024-11-15 08:00',
  },
  {
    id: '3',
    patientId: '2',
    patientName: 'Henry Thompson',
    name: 'Furosemide',
    dosage: '40mg',
    frequency: 'Once daily',
    route: 'Oral',
    startDate: '2024-11-01',
    prescribedBy: 'Dr. Emily Roberts',
    status: 'active',
    lastAdministered: '2024-11-14 08:00',
    nextDue: '2024-11-15 08:00',
  },
  {
    id: '4',
    patientId: '2',
    patientName: 'Henry Thompson',
    name: 'Warfarin',
    dosage: '5mg',
    frequency: 'Once daily',
    route: 'Oral',
    startDate: '2024-11-01',
    prescribedBy: 'Dr. Emily Roberts',
    status: 'active',
    lastAdministered: '2024-11-14 18:00',
    nextDue: '2024-11-15 18:00',
  },
  {
    id: '5',
    patientId: '3',
    patientName: 'Dorothy Williams',
    name: 'Calcium + Vitamin D',
    dosage: '600mg/400IU',
    frequency: 'Twice daily',
    route: 'Oral',
    startDate: '2024-09-20',
    prescribedBy: 'Dr. James Park',
    status: 'active',
    lastAdministered: '2024-11-14 08:00',
    nextDue: '2024-11-14 20:00',
  },
];

export const vitals: VitalSign[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Margaret Johnson',
    timestamp: '2024-11-14 08:00',
    bloodPressure: { systolic: 128, diastolic: 82 },
    heartRate: 72,
    temperature: 98.4,
    oxygenSaturation: 97,
    respiratoryRate: 16,
    recordedBy: 'Sarah Williams',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Henry Thompson',
    timestamp: '2024-11-14 08:15',
    bloodPressure: { systolic: 145, diastolic: 92 },
    heartRate: 88,
    temperature: 99.1,
    oxygenSaturation: 92,
    respiratoryRate: 22,
    recordedBy: 'Jessica Martinez',
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Dorothy Williams',
    timestamp: '2024-11-14 08:30',
    bloodPressure: { systolic: 118, diastolic: 76 },
    heartRate: 68,
    temperature: 98.2,
    oxygenSaturation: 98,
    respiratoryRate: 14,
    recordedBy: 'Sarah Williams',
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'George Anderson',
    timestamp: '2024-11-14 08:45',
    bloodPressure: { systolic: 132, diastolic: 84 },
    heartRate: 76,
    temperature: 100.2,
    oxygenSaturation: 94,
    respiratoryRate: 20,
    recordedBy: 'Michael Brown',
  },
];

export const careTeam: CareTeamMember[] = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    role: 'doctor',
    specialty: 'Geriatric Medicine',
    phone: '(555) 100-2001',
    email: 'mchen@eldercare.com',
    patientsAssigned: 12,
    status: 'on-duty',
  },
  {
    id: '2',
    name: 'Dr. Emily Roberts',
    role: 'doctor',
    specialty: 'Cardiology',
    phone: '(555) 100-2002',
    email: 'eroberts@eldercare.com',
    patientsAssigned: 8,
    status: 'on-duty',
  },
  {
    id: '3',
    name: 'Dr. James Park',
    role: 'doctor',
    specialty: 'Orthopedics',
    phone: '(555) 100-2003',
    email: 'jpark@eldercare.com',
    patientsAssigned: 6,
    status: 'available',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    role: 'nurse',
    phone: '(555) 100-3001',
    email: 'swilliams@eldercare.com',
    shift: 'Day (7AM-3PM)',
    patientsAssigned: 8,
    status: 'on-duty',
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    role: 'nurse',
    phone: '(555) 100-3002',
    email: 'jmartinez@eldercare.com',
    shift: 'Day (7AM-3PM)',
    patientsAssigned: 7,
    status: 'on-duty',
  },
  {
    id: '6',
    name: 'Michael Brown',
    role: 'nurse',
    phone: '(555) 100-3003',
    email: 'mbrown@eldercare.com',
    shift: 'Evening (3PM-11PM)',
    patientsAssigned: 9,
    status: 'available',
  },
  {
    id: '7',
    name: 'Alice Cooper',
    role: 'therapist',
    specialty: 'Physical Therapy',
    phone: '(555) 100-4001',
    email: 'acooper@eldercare.com',
    patientsAssigned: 15,
    status: 'on-duty',
  },
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    specialty: 'Geriatric Medicine',
    phone: '(555) 100-2001',
    email: 'mchen@eldercare.com',
    department: 'Geriatrics',
  },
  {
    id: '2',
    name: 'Dr. Emily Roberts',
    specialty: 'Cardiology',
    phone: '(555) 100-2002',
    email: 'eroberts@eldercare.com',
    department: 'Cardiology',
  },
  {
    id: '3',
    name: 'Dr. James Park',
    specialty: 'Orthopedics',
    phone: '(555) 100-2003',
    email: 'jpark@eldercare.com',
    department: 'Orthopedics',
  },
];

export const caregivers: Caregiver[] = [
  {
    id: '1',
    name: 'Sarah Williams',
    role: 'Nurse',
    phone: '(555) 100-3001',
    email: 'swilliams@eldercare.com',
    shift: 'Day (7AM-3PM)',
  },
  {
    id: '2',
    name: 'Jessica Martinez',
    role: 'Nurse',
    phone: '(555) 100-3002',
    email: 'jmartinez@eldercare.com',
    shift: 'Day (7AM-3PM)',
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Nurse',
    phone: '(555) 100-3003',
    email: 'mbrown@eldercare.com',
    shift: 'Evening (3PM-11PM)',
  },
  {
    id: '4',
    name: 'Alice Cooper',
    role: 'Physical Therapist',
    phone: '(555) 100-4001',
    email: 'acooper@eldercare.com',
    shift: 'Day (7AM-3PM)',
  },
];

// Exports with alternative names for wizard component
export const mockDoctors = doctors;
export const mockCaregivers = caregivers;
export const mockMedications = medications;