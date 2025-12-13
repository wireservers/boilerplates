import { Patient } from '../types/models';

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    dob: '1942-04-15',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '555-555-1111',
    doctorName: 'Dr. Robert Smith',
    caregiverName: 'Karen Brown',
    medications: ['Lisinopril 10mg', 'Metformin 500mg'],
    vitalsTemplate: 'Stable BP / HR',
    appointments: [{ date: '2025-11-20 10:00', type: 'Routine check-up' }],
  },
  {
    id: 'p2',
    name: 'Mary Johnson',
    dob: '1938-09-02',
    emergencyContactName: 'Tom Johnson',
    emergencyContactPhone: '555-555-2222',
    doctorName: 'Dr. Robert Smith',
    caregiverName: 'Karen Brown',
    medications: ['Amlodipine 5mg'],
    vitalsTemplate: 'Mild hypertension',
    appointments: [{ date: '2025-11-18 14:30', type: 'Cardiology follow-up' }],
  },
];
