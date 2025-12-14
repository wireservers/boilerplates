import { useState } from 'react';
import { Pill, Plus, Search, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { medications } from '../lib/mockData';

export function MedicationManager() {
  const [filter, setFilter] = useState<'all' | 'due' | 'administered'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const now = new Date('2024-11-14T14:00:00');

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch && med.status === 'active';
    if (filter === 'due') {
      const nextDue = med.nextDue ? new Date(med.nextDue) : null;
      return matchesSearch && med.status === 'active' && nextDue && nextDue <= now;
    }
    if (filter === 'administered') {
      return matchesSearch && med.lastAdministered;
    }
    return matchesSearch;
  });

  const dueMedications = medications.filter(med => {
    const nextDue = med.nextDue ? new Date(med.nextDue) : null;
    return med.status === 'active' && nextDue && nextDue <= now;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Medication Management</h1>
          <p className="text-gray-500">{filteredMedications.length} medications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Alert for Due Medications */}
      {dueMedications.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <div className="flex-1">
                <p className="text-gray-900">
                  {dueMedications.length} medication{dueMedications.length !== 1 ? 's' : ''} due for administration
                </p>
                <p className="text-sm text-gray-600">Review and administer medications to patients</p>
              </div>
              <Button variant="outline" onClick={() => setFilter('due')}>
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Medications</p>
                <p className="text-2xl text-gray-900 mt-1">{medications.filter(m => m.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Due Now</p>
                <p className="text-2xl text-gray-900 mt-1">{dueMedications.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Administered Today</p>
                <p className="text-2xl text-gray-900 mt-1">{medications.filter(m => m.lastAdministered?.includes('2024-11-14')).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Discontinued</p>
                <p className="text-2xl text-gray-900 mt-1">{medications.filter(m => m.status === 'discontinued').length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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
                  placeholder="Search by patient name or medication..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All Active
              </Button>
              <Button
                variant={filter === 'due' ? 'default' : 'outline'}
                onClick={() => setFilter('due')}
              >
                Due Now
              </Button>
              <Button
                variant={filter === 'administered' ? 'default' : 'outline'}
                onClick={() => setFilter('administered')}
              >
                Administered
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medications List */}
      <Card>
        <CardHeader>
          <CardTitle>Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMedications.map(med => {
              const nextDue = med.nextDue ? new Date(med.nextDue) : null;
              const isDue = nextDue && nextDue <= now;

              return (
                <div
                  key={med.id}
                  className={`p-4 border rounded-lg ${isDue ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isDue ? 'bg-orange-100' : 'bg-blue-100'}`}>
                        <Pill className={`w-5 h-5 ${isDue ? 'text-orange-600' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <p className="text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.patientName}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={med.status === 'active' ? 'default' : 'secondary'}>
                        {med.status}
                      </Badge>
                      {isDue && <Badge className="bg-orange-500 hover:bg-orange-600">Due Now</Badge>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Dosage</p>
                      <p className="text-gray-900">{med.dosage}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Frequency</p>
                      <p className="text-gray-900">{med.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Route</p>
                      <p className="text-gray-900">{med.route}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Prescribed By</p>
                      <p className="text-gray-900">{med.prescribedBy}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Last Administered</p>
                      <p className="text-gray-900">{med.lastAdministered || 'Not yet'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Next Due</p>
                      <p className={isDue ? 'text-orange-600' : 'text-gray-900'}>
                        {med.nextDue || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {isDue && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Administered
                      </Button>
                    )}
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Discontinue</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
