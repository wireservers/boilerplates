import { useState } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { patients } from '../lib/mockData';

interface PatientListProps {
  onSelectPatient: (patientId: string) => void;
  onOpenAddPatient: () => void;
}

export function PatientList({ onSelectPatient, onOpenAddPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.roomNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'observation': return 'default';
      case 'stable': return 'secondary';
      case 'recovering': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Patients</h1>
          <p className="text-gray-500">{filteredPatients.length} total patients</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onOpenAddPatient}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or room number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'critical' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('critical')}
              >
                Critical
              </Button>
              <Button
                variant={statusFilter === 'stable' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('stable')}
              >
                Stable
              </Button>
              <Button
                variant={statusFilter === 'recovering' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('recovering')}
              >
                Recovering
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map(patient => (
          <Card
            key={patient.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectPatient(patient.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.age} years, {patient.gender}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Room:</span>
                  <span className="text-gray-900">{patient.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Admitted:</span>
                  <span className="text-gray-900">{new Date(patient.admissionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Doctor:</span>
                  <span className="text-gray-900">{patient.assignedDoctor}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">Primary Diagnosis</p>
                <p className="text-sm text-gray-900 mt-1">{patient.primaryDiagnosis}</p>
              </div>

              {patient.allergies.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">
                    ⚠ {patient.allergies.length} Allergies
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}