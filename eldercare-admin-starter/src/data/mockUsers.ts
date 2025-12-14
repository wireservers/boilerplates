import { User } from '../types/models';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Alice Johnson',
    role: 'Admin',
    email: 'alice.admin@eldercare.com',
    phone: '555-1000',
  },
  {
    id: 'u2',
    name: 'Dr. Robert Smith',
    role: 'Doctor',
    email: 'r.smith@eldercare.com',
    phone: '555-2000',
  },
  {
    id: 'u3',
    name: 'Karen Brown',
    role: 'Caregiver',
    email: 'k.brown@eldercare.com',
    phone: '555-3000',
  },
];
