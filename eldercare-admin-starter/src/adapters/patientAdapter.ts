import { Patient, PatientInput } from '../types/models';
import { mockPatients } from '../data/mockPatients';

let patients = [...mockPatients];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getPatients(): Promise<Patient[]> {
  await delay(100);
  return [...patients];
}

export async function createPatient(input: PatientInput): Promise<Patient> {
  await delay(120);
  const patient: Patient = {
    id: Date.now().toString(),
    ...input,
  };
  patients.push(patient);
  return patient;
}
