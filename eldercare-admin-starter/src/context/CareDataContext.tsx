import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  User,
  UserInput,
  Patient,
  PatientInput,
} from '../types/models';
import * as userAdapter from '../adapters/userAdapter';
import * as patientAdapter from '../adapters/patientAdapter';

type CareDataContextType = {
  users: User[];
  patients: Patient[];
  loading: boolean;
  reload: () => Promise<void>;
  createUser: (input: UserInput) => Promise<void>;
  updateUser: (id: string, input: UserInput) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  createPatient: (input: PatientInput) => Promise<void>;
};

const CareDataContext = createContext<CareDataContextType | undefined>(
  undefined,
);

export const CareDataProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = async () => {
    setLoading(true);
    try {
      const [u, p] = await Promise.all([
        userAdapter.getUsers(),
        patientAdapter.getPatients(),
      ]);
      setUsers(u);
      setPatients(p);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const createUser = async (input: UserInput) => {
    const created = await userAdapter.createUser(input);
    setUsers((prev) => [...prev, created]);
  };

  const updateUserFn = async (id: string, input: UserInput) => {
    const updated = await userAdapter.updateUser(id, input);
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
  };

  const deleteUserFn = async (id: string) => {
    await userAdapter.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const createPatientFn = async (input: PatientInput) => {
    const created = await patientAdapter.createPatient(input);
    setPatients((prev) => [...prev, created]);
  };

  return (
    <CareDataContext.Provider
      value={{
        users,
        patients,
        loading,
        reload,
        createUser,
        updateUser: updateUserFn,
        deleteUser: deleteUserFn,
        createPatient: createPatientFn,
      }}
    >
      {children}
    </CareDataContext.Provider>
  );
};

export const useCareData = (): CareDataContextType => {
  const ctx = useContext(CareDataContext);
  if (!ctx) {
    throw new Error('useCareData must be used within CareDataProvider');
  }
  return ctx;
};
