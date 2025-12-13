import { useState } from 'react';
import { DashboardOverview } from './components/DashboardOverview';
import { PatientList } from './components/PatientList';
import { PatientDetails } from './components/PatientDetails';
import { AppointmentCalendar } from './components/AppointmentCalendar';
import { MedicationManager } from './components/MedicationManager';
import { VitalsMonitor } from './components/VitalsMonitor';
import { CareTeam } from './components/CareTeam';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { AddPatientDialog } from './components/AddPatientDialog';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export type View = 'dashboard' | 'patients' | 'appointments' | 'medications' | 'vitals' | 'team' | 'reports' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleBackToList = () => {
    setSelectedPatientId(null);
  };

  const handleOpenAddPatient = () => {
    setIsAddPatientOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onOpenAddPatient={handleOpenAddPatient}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          {currentView === 'dashboard' && <DashboardOverview onNavigate={setCurrentView} />}
          {currentView === 'patients' && !selectedPatientId && (
            <PatientList 
              onSelectPatient={handlePatientSelect}
              onOpenAddPatient={handleOpenAddPatient}
            />
          )}
          {currentView === 'patients' && selectedPatientId && (
            <PatientDetails patientId={selectedPatientId} onBack={handleBackToList} />
          )}
          {currentView === 'appointments' && <AppointmentCalendar />}
          {currentView === 'medications' && <MedicationManager />}
          {currentView === 'vitals' && <VitalsMonitor />}
          {currentView === 'team' && <CareTeam />}
          {currentView === 'reports' && <Reports />}
          {currentView === 'settings' && <Settings />}
        </main>
      </div>

      <AddPatientDialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen} />
    </div>
  );
}